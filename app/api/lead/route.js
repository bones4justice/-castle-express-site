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

// Secrets live ONLY in Vercel env vars (Project Settings -> Environment
// Variables), never in this repo. A missing key is not fatal to the customer:
// the SmartMoving write fails, Formspree still catches the lead, and
// reportWriteFailure alerts Joe — but it should never happen outside a
// misconfigured deploy, so we also log loudly at module load below.
const FORMS = {
  estimate: {
    formspree: "https://formspree.io/f/xpqjkjga",
    providerKey: process.env.SMARTMOVING_PROVIDER_KEY,
  },
  referral: {
    formspree: "https://formspree.io/f/xnjojwly",
    providerKey: process.env.SMARTMOVING_REFERRAL_PROVIDER_KEY,
  },
};

const BRANCH_ID = "352498a1-e171-40cd-8b35-ac5d011720d0";

// Failed downstream writes used to die silently in Vercel logs; now they are
// reported to the ops box, which emails Joe (rate-limited server-side).
// HTTPS via the marketing vhost (nginx -> :8080) so the shared secret never
// travels in cleartext.
const ALERT_URL = "https://marketing.castleexpressmoving.com/api/lead-write-alert";
const ALERT_SECRET = process.env.LEAD_ALERT_SECRET;

for (const [name, val] of [
  ["SMARTMOVING_PROVIDER_KEY", FORMS.estimate.providerKey],
  ["SMARTMOVING_REFERRAL_PROVIDER_KEY", FORMS.referral.providerKey],
  ["LEAD_ALERT_SECRET", ALERT_SECRET],
]) {
  if (!val) console.error(`[lead] MISCONFIGURED DEPLOY: env var ${name} is not set`);
}

// OpenAI Ads Conversions API: server-side lead_created so conversions are
// counted even when ad blockers eat the browser pixel. The client sends the
// same event id to the pixel (event_id) and here (oaiEventId); OpenAI dedupes
// on pixelId + event type + id, so a lead is never double-counted.
const OPENAI_PIXEL_ID = "CPxY6DboesSjpsV4bFGcp4";

async function sendOpenAIConversion(eventId, sourceUrl) {
  const key = process.env.OPENAI_ADS_API_KEY;
  if (!key) return; // not configured yet — pixel-only tracking still works
  try {
    const r = await fetch(
      `https://bzr.openai.com/v1/events?pid=${OPENAI_PIXEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validate_only: false,
          events: [
            {
              id: eventId,
              type: "lead_created",
              timestamp_ms: Date.now(),
              source_url: sourceUrl,
              action_source: "web",
              data: { type: "customer_action" },
            },
          ],
        }),
        signal: AbortSignal.timeout(4000),
      }
    );
    if (!r.ok) {
      console.error(
        `[lead] OpenAI conversion error ${r.status}:`,
        await r.text()
      );
    }
  } catch (err) {
    console.error("[lead] OpenAI conversion send failed:", err);
  }
}

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
// Catches bot names like "Jchr Pzqhzctzd". Diacritics are folded to ASCII
// first so real names like Björn or Françoise never trip the check.
function isGibberishName(name) {
  if (!name || name.trim().length < 2) return true;
  if (/\d/.test(name)) return true;
  if (/https?:|www\./i.test(name)) return true;
  const ascii = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const words = ascii.trim().split(/\s+/);
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
// part of a gmail address is never a real customer. (A merely malformed
// email is a typo, not spam - that's handled by validationError below.)
function isSpamEmail(email) {
  if (!email) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  const [local, domain] = email.toLowerCase().split("@");
  if (/gmail\.com|googlemail\.com/.test(domain)) {
    const dots = (local.match(/\./g) || []).length;
    if (dots >= 4) return true;
  }
  return false;
}

// ── Primary bot signature: default dropdowns + skipped date ──
// The overnight wave (10/24-10/25) takes the FIRST real option of every
// dropdown and never touches the date picker. Every hit has the first-listed
// move size AND an empty move date. That combination is the durable tell:
// the bot can swap its wordlist tomorrow, but it can't cheaply start selecting
// realistic dropdown values plus a valid future date. Confirmed against 6
// months of real submissions: this pair matches all 10 known spam hits and
// zero real leads (Joe, 10/25).
//
// First real option = index 0 of the option array (the <select> renders an
// empty "Select..." placeholder first, then these). Sitewide EstimateForm uses
// MOVE_SIZES[0] = "Studio"; the /free-estimate LandingEstimateForm uses
// "Studio / 1 Bedroom". Keep both in sync with those forms if the lists change.
// IMPORTANT: empty moveDate is NEVER a standalone signal - real customers skip
// it. It only counts paired with the first-option size.
const FIRST_SIZE_OPTIONS = new Set(["Studio", "Studio / 1 Bedroom"]);

function isDefaultDropdownSpam(body) {
  const fs = body.formspree || {};
  const sm = body.smartmoving || {};
  const size = String(fs.moveSize || sm.MoveSize || "").trim();
  if (!FIRST_SIZE_OPTIONS.has(size)) return false;
  const hasDate = Boolean(
    (fs.moveDate && String(fs.moveDate).trim()) ||
      (sm.MoveDate && String(sm.MoveDate).trim())
  );
  return !hasDate;
}

// ── Secondary signal: classical-Latin / lorem-ipsum filler ──
// Backstop for when the bot varies its structure. These bots submit a
// plausible name + valid-format phone + non-gmail email, so the only
// content tell is junk origin/destination like "textilis -> tutis" or
// "dolorem -> bene". No real CT/MA customer types a Latin word for where they
// are moving. Checked per-field (a match in EITHER moveFrom OR moveTo is
// enough - one 10/24 hit had a blank moveFrom and only moveTo). Whole-word,
// case-insensitive, length >= 4 (so short real tokens never trip). "vero" is
// deliberately omitted (Vero Beach FL is a real origin).
const LATIN_FILLER = new Set([
  "lorem", "ipsum", "dolor", "dolore", "dolorem", "doloremque", "dolorum",
  "amet", "consectetur", "adipiscing", "elit", "eiusmod", "tempor",
  "incididunt", "labore", "magna", "aliqua", "aliquam", "enim", "minim",
  "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "commodo", "consequat", "duis", "aute", "irure", "reprehenderit",
  "voluptate", "voluptatem", "velit", "esse", "cillum", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "proident", "sunt",
  "culpa", "officia", "deserunt", "mollit", "anim", "laborum", "tutis",
  "textilis", "bene", "quia", "quae", "porro", "numquam", "neque", "modi",
  "tempora", "accusantium", "laudantium", "veritatis", "architecto", "beatae",
  "vitae", "dicta", "explicabo", "aspernatur", "odit", "fugit", "nemo",
  "ratione", "sequi", "nesciunt", "fuga", "harum", "quidem", "rerum",
  "facilis", "expedita", "distinctio", "libero", "soluta", "nobis", "eligendi",
  "optio", "cumque", "impedit", "maxime", "placeat", "perspiciatis", "unde",
  "iste", "natus", "totam", "eaque", "quasi", "inventore",
]);

function hasLatinFiller(...vals) {
  for (const v of vals) {
    if (!v) continue;
    const words = String(v).toLowerCase().match(/[a-z]+/g) || [];
    for (const w of words) {
      if (w.length >= 4 && LATIN_FILLER.has(w)) return true;
    }
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

// Strong abuse signals only - these get the deceptive { ok: true } so bots
// can't learn what tripped them.
function spamReason(body) {
  const sm = body.smartmoving || {};
  const fs = body.formspree || {};
  if (body.hp) return "honeypot filled";
  if (typeof body.elapsedMs === "number" && body.elapsedMs < 3000)
    return `filled too fast (${body.elapsedMs}ms)`;
  if (isGibberishName(sm.FullName)) return `gibberish name: ${sm.FullName}`;
  if (isSpamEmail(sm.Email)) return `spam email: ${sm.Email}`;
  // Primary structural signature (first-option size + no date).
  if (isDefaultDropdownSpam(body))
    return `default-dropdown bot (size=${fs.moveSize || sm.MoveSize || ""}, no date)`;
  // Secondary content backstop.
  if (
    hasLatinFiller(
      sm.FullName,
      sm.OriginAddressFull,
      sm.DestinationAddressFull,
      fs.moveFrom,
      fs.moveTo,
      fs.name,
      fs.notes,
      fs.message
    )
  )
    return "latin filler content";
  return null;
}

// Honest-mistake validation (typos in phone/email/date). These return a real
// field error so a legitimate customer can fix it, instead of silently
// vanishing behind a fake success. A human sees the message; a bot gains
// nothing it couldn't guess.
function validationError(body) {
  const sm = body.smartmoving || {};
  if (!isValidPhone(sm.PhoneNumber))
    return "That phone number doesn't look complete - please double-check it.";
  if (sm.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sm.Email))
    return "That email address doesn't look right - please double-check it.";
  if (!isValidMoveDate(sm.MoveDate))
    return "That move date doesn't look right - please double-check it.";
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

  // Honest typos get a real, fixable error (the forms display it).
  const fieldError = validationError(body);
  if (fieldError) {
    console.warn(`[lead-validation] ${body.form} from ${ip}: ${fieldError}`);
    return Response.json({ ok: false, error: fieldError }, { status: 400 });
  }

  // Success = at least one durable sink accepted the lead. Either sink alone
  // is recoverable (Formspree emails + nightly ingest; SmartMoving is the
  // CRM), and a failure on either side alerts Joe via reportWriteFailure.
  let attempted = 0;
  let accepted = 0;

  if (body.formspree && typeof body.formspree === "object") {
    attempted++;
    try {
      const r = await fetch(form.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body.formspree),
        signal: AbortSignal.timeout(8000),
      });
      if (r.ok) accepted++;
      else {
        console.error(`[lead] Formspree error ${r.status} for ${body.form}`);
        await reportWriteFailure("formspree", body.form, `HTTP ${r.status}`);
      }
    } catch (err) {
      console.error("[lead] Formspree submission error:", err);
      await reportWriteFailure("formspree", body.form, err);
    }
  }

  if (body.smartmoving && typeof body.smartmoving === "object") {
    attempted++;
    try {
      const r = await fetch(
        `https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=${form.providerKey}&branchId=${BRANCH_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body.smartmoving),
          signal: AbortSignal.timeout(8000),
        }
      );
      if (r.ok) accepted++;
      else {
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

  const ok = attempted === 0 || accepted > 0;

  // Conversions count only leads that were durably accepted somewhere.
  // Falls back to a server-generated id when the client didn't send one
  // (older cached JS) — no pixel event exists then, nothing to dedupe.
  if (ok) {
    await sendOpenAIConversion(
      typeof body.oaiEventId === "string" && body.oaiEventId
        ? body.oaiEventId.slice(0, 64)
        : crypto.randomUUID(),
      typeof body.pageUrl === "string" && /^https:\/\/(www\.)?castleexpressmoving\.com\//.test(body.pageUrl)
        ? body.pageUrl.slice(0, 500)
        : "https://www.castleexpressmoving.com/"
    );
  }

  return Response.json(
    ok
      ? { ok: true }
      : {
          ok: false,
          error:
            "We could not save your request just now. Please try again in a minute, or call us at 1-888-553-4503.",
        },
    { status: ok ? 200 : 502 }
  );
}
