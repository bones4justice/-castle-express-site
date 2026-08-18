// Server-side lead proxy with spam filtering.
//
// Forms POST here instead of hitting Formspree / SmartMoving directly from the
// browser. Rationale: the SmartMoving from-provider endpoint needs no auth
// beyond the providerKey, and with the key shipped in the client bundle bots
// were posting junk leads straight into SmartMoving (gibberish names, 1970
// move dates, dot-trick gmail addresses). Routing through this handler keeps
// the provider keys out of the client bundle and lets us validate before
// anything reaches SmartMoving or email.
//
// Spam responses still return { ok: true } so bots can't distinguish a
// rejection from a success and adapt.

const FORMS = {
  estimate: {
    formspree: "https://formspree.io/f/xpqjkjga",
    providerKey:
      process.env.SMARTMOVING_PROVIDER_KEY ||
      "8f882454-9968-445e-8f50-ac5d011a33fc",
  },
  referral: {
    formspree: "https://formspree.io/f/xnjojwly",
    providerKey:
      process.env.SMARTMOVING_REFERRAL_PROVIDER_KEY ||
      "d1cc3234-4fdc-4b3d-ad89-b0ec010a0ee8",
  },
};

const BRANCH_ID = "352498a1-e171-40cd-8b35-ac5d011720d0";

// Failed downstream writes used to die silently in Vercel logs; now they are
// reported to the ops box, which emails Joe (rate-limited server-side).
const ALERT_URL = "http://16.59.150.90:8080/api/lead-write-alert";
const ALERT_SECRET =
  process.env.LEAD_ALERT_SECRET ||
  "7c1612913607aa97ff12ca7f4be402bada84922f70c9a576";

async function reportWriteFailure(target, formName, detail) {
  try {
    await fetch(ALERT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: ALERT_SECRET,
        target,
        form: formName,
        detail: String(detail).slice(0, 800),
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error("[lead] failure alert not delivered:", err);
  }
}

// ─── Spam heuristics ───

// A real name word of 3+ letters virtually always contains a vowel.
// Catches bot names like "Jchr Pzqhzctzd".
function isGibberishName(name) {
  if (!name || name.trim().length < 2) return true;
  if (/\d/.test(name)) return true;
  if (/https?:|www\./i.test(name)) return true;
  const words = name.trim().split(/\s+/);
  const gibberish = words.filter(
    (w) => w.replace(/[^a-z]/gi, "").length >= 3 && !/[aeiouy]/i.test(w)
  );
  return gibberish.length > 0;
}

// NANP: 10 digits (optionally 11 with leading 1); area code and exchange
// can't start with 0 or 1.
function isValidPhone(phone) {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") d = d.slice(1);
  if (d.length !== 10) return false;
  if (!/[2-9]/.test(d[0]) || !/[2-9]/.test(d[3])) return false;
  if (/^(\d)\1{9}$/.test(d)) return false;
  return true;
}

// Dot-trick spam signature: gmail ignores dots, so bots generate endless
// unique addresses like up.a.r.uw.ew51.2@gmail.com. 4+ dots in the local
// part of a gmail address is never a real customer.
function isSpamEmail(email) {
  if (!email) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return true;
  const [local, domain] = email.toLowerCase().split("@");
  if (/gmail\.com|googlemail\.com/.test(domain)) {
    const dots = (local.match(/\./g) || []).length;
    if (dots >= 4) return true;
  }
  return false;
}

// MoveDate arrives as YYYYMMDD. Anything in the past or more than ~18
// months out is a bot (the spam lead had 19700531).
function isValidMoveDate(yyyymmdd) {
  if (!yyyymmdd) return true; // optional field
  if (!/^\d{8}$/.test(yyyymmdd)) return false;
  const d = new Date(
    Number(yyyymmdd.slice(0, 4)),
    Number(yyyymmdd.slice(4, 6)) - 1,
    Number(yyyymmdd.slice(6, 8))
  );
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  const min = new Date(now.getTime() - 2 * 86400000);
  const max = new Date(now.getTime() + 550 * 86400000);
  return d >= min && d <= max;
}

function spamReason(body) {
  const sm = body.smartmoving || {};
  if (body.hp) return "honeypot filled";
  if (typeof body.elapsedMs === "number" && body.elapsedMs < 3000)
    return `filled too fast (${body.elapsedMs}ms)`;
  if (isGibberishName(sm.FullName)) return `gibberish name: ${sm.FullName}`;
  if (!isValidPhone(sm.PhoneNumber)) return `invalid phone: ${sm.PhoneNumber}`;
  if (isSpamEmail(sm.Email)) return `spam email: ${sm.Email}`;
  if (!isValidMoveDate(sm.MoveDate)) return `bad move date: ${sm.MoveDate}`;
  return null;
}

// Per-IP rate limit (best-effort: per serverless instance). 5 leads per
// 10 minutes is far beyond any real customer.
const ipHits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < 600000);
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) ipHits.clear();
  return hits.length > 5;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const form = FORMS[body.form];
  if (!form) return Response.json({ ok: false }, { status: 400 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const reason = rateLimited(ip)
    ? "rate limited"
    : spamReason(body);
  if (reason) {
    console.warn(
      `[lead-spam] blocked ${body.form} lead from ${ip}: ${reason}`
    );
    // Fake success — don't teach the bot what tripped.
    return Response.json({ ok: true });
  }

  let ok = true;

  if (body.formspree && typeof body.formspree === "object") {
    try {
      const r = await fetch(form.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body.formspree),
      });
      if (!r.ok) {
        console.error(`[lead] Formspree error ${r.status} for ${body.form}`);
        ok = false;
        await reportWriteFailure("formspree", body.form, `HTTP ${r.status}`);
      }
    } catch (err) {
      console.error("[lead] Formspree submission error:", err);
      ok = false;
      await reportWriteFailure("formspree", body.form, err);
    }
  }

  if (body.smartmoving && typeof body.smartmoving === "object") {
    try {
      const r = await fetch(
        `https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=${form.providerKey}&branchId=${BRANCH_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body.smartmoving),
        }
      );
      if (!r.ok) {
        const detail = await r.text();
        console.error(
          `[lead] SmartMoving error ${r.status} for ${body.form}:`,
          detail
        );
        await reportWriteFailure(
          "smartmoving",
          body.form,
          `HTTP ${r.status}: ${detail}`
        );
      }
    } catch (err) {
      console.error("[lead] SmartMoving submission error:", err);
      await reportWriteFailure("smartmoving", body.form, err);
    }
  }

  return Response.json({ ok });
}
