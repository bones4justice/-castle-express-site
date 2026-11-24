"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { TIMING_OPTIONS, TIMING_QUESTION, CALLBACK_NOTE, sizeStepFor } from "@/lib/estimateHelp";
import EstimateTownFields from "@/components/EstimateTownFields";
import { COMPANY } from "@/content";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";
import { boxOfferSeen, BOX_OFFER_NOTE } from "@/components/AdBoxOffer";
import { readVariantCookie } from "@/lib/lpAbTest";
import { geVariantForLead } from "@/lib/geAbTest";
import { sendGenerateLead } from "@/lib/leadEvents";
import { responseWindow, SALES_HOURS, CLOSED_DATES } from "@/lib/salesHours";

// Keep in sync with SM_MOVE_SIZE in components/StepEstimateForm.js so
// SmartMoving always matches an existing move size (with volume) instead of
// auto-creating blank duplicate sizes.
const SM_MOVE_SIZE = {
  "4+ bedrooms": "4 Bedroom",
  "3 bedrooms": "3 Bedroom",
  "3+ bedrooms": "3 Bedroom",
  "2 bedrooms": "2 Bedroom",
  "1 bedroom": "1 Bedroom",
  "1 bedroom or studio": "1 Bedroom",
  "1 bedroom or a few items": "1 Bedroom",
  "A few items": "Room or Less",
  Office: "Office / Commercial",
};

// Inline multi-step estimate card used across the site (homepage, /contact/,
// town pages, service pages). Starts with moving dates and shares the
// SmartMoving move-size mapping as /get-estimate/ (StepEstimateForm.js).
//
// Only the final phone screen wraps a real <form> with type="submit"; every
// intermediate card and advance button is type="button", so GTM's form-submit
// trigger and lead submission can never fire early.

const GA4 = "G-97Z4EHJM63";
const MAX_DAYS_AHEAD = 540;
const TRUCK_IMG = { src: "/images/ge-loader-truck.webp", width: 600, height: 261 };

const RESPONSE_LINE = {
  now: "Typically responds in 20 min. or less",
  this_morning: "We reply first thing this morning",
  next_business: "We reply first thing the next business morning",
};

const ICON = {
  house: '<path d="M4 15L16 5l12 10M7 13v14h18V13M13 27v-8h6v8"/>',
  apt: '<rect x="7" y="4" width="18" height="24" rx="1.5"/><path d="M12 9h2M18 9h2M12 14h2M18 14h2M12 19h2M18 19h2M14 28v-4h4v4"/>',
  condo: '<path d="M3 27V13l6.500-5 6.500 5v14M16 27V13l6.500-5 6.500 5v14M3 27h26M8 27v-6h3v6M21 27v-6h3v6"/>',
  box: '<path d="M4 11l12-6 12 6v11l-12 6-12-6V11zM4 11l12 6 12-6M16 17v11M10 8l12 6"/>',
  bed4: '<path d="M3 16L16 5l13 11M6 14v13h20V14M11 19h3M18 19h3M11 23h3M18 23h3"/>',
  bed3: '<path d="M4 16L16 6l12 10M7 14v13h18V14M12 20h3M17 20h3M14.500 24h3"/>',
  bed2: '<path d="M5 17L16 8l11 9M8 15v12h16V15M12 21h3M17 21h3"/>',
  bed1: '<path d="M7 18l9-7 9 7M10 16v11h12V16M14.500 21h3"/>',
  office: '<rect x="4" y="11" width="24" height="15" rx="2"/><path d="M12 11V8a2 2 0 012-2h4a2 2 0 012 2v3M4 18h24M14.500 18v2h3v-2"/>',
  exact: '<rect x="5" y="7" width="22" height="20" rx="2"/><path d="M5 13h22M11 4v6M21 4v6M11.500 20l3 3 6-6"/>',
  flex: '<rect x="5" y="7" width="22" height="20" rx="2"/><path d="M5 13h22M11 4v6M21 4v6M10 20h12M19 17l3 3-3 3M13 17l-3 3 3 3"/>',
  unsure: '<circle cx="16" cy="16" r="11"/><path d="M12.500 13a3.500 3.500 0 116 2.500c-1.300 1.200-2.500 1.700-2.500 3.500M16 23v.200"/>',
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON[name] }}
    />
  );
}

const Hl = ({ children }) => <span className="isf-hl">{children}</span>;

const FLOW = {
  when: {
    p: 14,
    label: "Step 1",
    title: TIMING_QUESTION,
    cards: TIMING_OPTIONS,
  },
  type: {
    p: 42,
    label: "Move details",
    title: "What are you moving out of?",
    cards: [
      { t: "House", s: "Family owned and moving homes since 2011", i: "house", save: { homeType: "House", size: "" }, next: "towns" },
      { t: "Apartment", s: "Stairs and elevators are no problem", i: "apt", save: { homeType: "Apartment", size: "" }, next: "towns" },
      { t: "Condo or townhouse", s: "We work with your building's rules", i: "condo", save: { homeType: "Condo or townhouse", size: "" }, next: "towns" },
      { t: "A few items or an office", s: "Something else? We handle it", i: "box", save: { homeType: "Other", size: "" }, next: "towns" },
    ],
  },
  "size-house": {
    p: 56,
    label: "Move size",
    title: <>How many bedrooms in your <Hl>house?</Hl></>,
    cards: [
      { t: "4+ bedrooms", s: "Experienced crews for big homes", i: "bed4", save: { size: "4+ bedrooms" }, next: "loading" },
      { t: "3 bedrooms", s: "Our most common move", i: "bed3", save: { size: "3 bedrooms" }, next: "loading" },
      { t: "2 bedrooms", s: "Quick and simple. We keep it that way", i: "bed2", save: { size: "2 bedrooms" }, next: "loading" },
      { t: "1 bedroom or a few items", s: "No job too small", i: "box", save: { size: "1 bedroom or a few items" }, next: "loading" },
    ],
  },
  "size-apartment": {
    p: 56,
    label: "Move size",
    title: <>How many bedrooms in your <Hl>apartment?</Hl></>,
    cards: [
      { t: "1 bedroom or studio", s: "Quick and simple. We keep it that way", i: "bed1", save: { size: "1 bedroom or studio" }, next: "loading" },
      { t: "2 bedrooms", s: "Our most common apartment move", i: "bed2", save: { size: "2 bedrooms" }, next: "loading" },
      { t: "3+ bedrooms", s: "Experienced crews for any size", i: "bed3", save: { size: "3+ bedrooms" }, next: "loading" },
      { t: "A few items", s: "No job too small", i: "box", save: { size: "A few items" }, next: "loading" },
    ],
  },
  "size-condo": {
    p: 56,
    label: "Move size",
    title: <>How many bedrooms in your <Hl>condo?</Hl></>,
    cards: [
      { t: "3+ bedrooms", s: "Experienced crews for any size", i: "bed3", save: { size: "3+ bedrooms" }, next: "loading" },
      { t: "2 bedrooms", s: "Our most common condo move", i: "bed2", save: { size: "2 bedrooms" }, next: "loading" },
      { t: "1 bedroom", s: "Quick and simple. We keep it that way", i: "bed1", save: { size: "1 bedroom" }, next: "loading" },
      { t: "A few items", s: "No job too small", i: "box", save: { size: "A few items" }, next: "loading" },
    ],
  },
  "size-other": {
    p: 56,
    label: "Move size",
    title: "What type of move?",
    cards: [
      { t: "Office", s: "We keep your business moving", i: "office", save: { homeType: "Office", size: "" }, next: "loading" },
      { t: "A few items", s: "No job too small", i: "box", save: { homeType: "A few items", size: "A few items" }, next: "loading" },
    ],
  },
  towns: { p: 48, label: "Locations", kind: "towns" },
  date: { p: 24, label: "Move date", kind: "date" },
  timeframe: { p: 24, label: "Timing", kind: "timeframe" },
  loading: { p: 82, label: "Almost ready", kind: "loading" },
  name: { p: 88, label: "Almost done", kind: "name" },
  phone: { p: 95, label: "Final step", kind: "phone" },
  thanks: { p: 100, label: "Complete", kind: "thanks" },
};

const EMPTY = {
  homeType: "",
  size: "",
  fromTown: "",
  toTown: "",
  dateType: "", timeframe: "",
  moveDate: "",
  firstName: "",
  phone: "",
  textOk: false,
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const pad = (n) => String(n).padStart(2, "0");

function fmtPhone(v) {
  let d = v.replace(/\D/g, "");
  if (d[0] === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}

function nextBusinessLabel(now = new Date()) {
  try {
    const p = {};
    for (const { type, value } of new Intl.DateTimeFormat("en-US", {
      timeZone: SALES_HOURS.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now)) p[type] = value;
    const y = Number(p.year), m = Number(p.month), d = Number(p.day);
    for (let i = 1; i <= 14; i++) {
      const dt = new Date(Date.UTC(y, m - 1, d + i, 12));
      const ymd = dt.toISOString().slice(0, 10);
      const wd = dt.getUTCDay();
      if (SALES_HOURS.days.includes(wd) && !CLOSED_DATES.includes(ymd)) return `${DAY_NAMES[wd]} morning`;
    }
  } catch {}
  return "the next business morning";
}

function track(name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", name, { ...params, send_to: GA4 });
    }
  } catch {}
}

export default function EstimateForm({ dark = false, twoStep = false, design = null }) {
  const [current, setCurrent] = useState("when");
  const [hist, setHist] = useState([]);
  const [data, setData] = useState(EMPTY);
  const [picked, setPicked] = useState(null);
  const [calMonth, setCalMonth] = useState(null);
  const [loadingText, setLoadingText] = useState("Saving your move details");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [replyWindow, setReplyWindow] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [showAdOffer, setShowAdOffer] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const inFlight = useRef(false);
  const openedAt = useRef(Date.now());
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const inputRef = useRef(null);
  const seenSteps = useRef(new Set());
  const hasInteracted = useRef(false);
  const pickTimer = useRef(null);
  const currentRef = useRef("when");

  const save = (patch) => setData((d) => ({ ...d, ...patch }));

  // Live response window text (rechecked every minute if tab stays open).
  useEffect(() => {
    const check = () => setReplyWindow(responseWindow());
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);

  // Warm the small truck illustration once user interacts so loading step is instant.
  useEffect(() => {
    if (current === "type") {
      const im = new window.Image();
      im.src = TRUCK_IMG.src;
    }
  }, [current]);

  useEffect(() => () => clearTimeout(pickTimer.current), []);

  const keepCardInView = useCallback(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.top < 80) {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cardRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, []);

  const go = useCallback((id, { replace = false } = {}) => {
    const cur = currentRef.current;
    hasInteracted.current = true;
    setErr("");
    setPicked(null);
    if (!replace && cur !== "loading") setHist((h) => [...h, cur]);
    currentRef.current = id;
    setCurrent(id);
  }, []);

  const back = () => {
    if (!hist.length) return;
    clearTimeout(pickTimer.current);
    setErr("");
    setPicked(null);
    const prev = hist[hist.length - 1];
    currentRef.current = prev;
    setCurrent(prev);
    setHist(hist.slice(0, -1));
  };

  const resetForm = () => {
    clearTimeout(pickTimer.current);
    setData(EMPTY);
    setHist([]);
    setPicked(null);
    setErr("");
    setCalMonth(null);
    setFollowUp(null);
    currentRef.current = "when";
    setCurrent("when");
  };

  // Funnel tracking (only after the visitor actually starts tapping) + gentle focus management.
  useEffect(() => {
    if (!hasInteracted.current) return;
    if (current === "phone") setShowAdOffer(boxOfferSeen());
    if (current !== "loading" && !seenSteps.current.has(current)) {
      seenSteps.current.add(current);
      const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
      track("step_view", {
        step_name: current,
        step_progress: FLOW[current].p,
        form_location: pathname,
        form_style: "inline_step",
        ge_variant: geVariantForLead(document.cookie),
        ...(design ? { home_design: design } : {}),
      });
    }
    keepCardInView();
    if (current === "towns" || current === "timeframe" || current === "name" || current === "phone") {
      if (inputRef.current) {
        try { inputRef.current.focus({ preventScroll: true }); } catch { inputRef.current.focus(); }
      }
    } else if (headingRef.current) {
      try { headingRef.current.focus({ preventScroll: true }); } catch { headingRef.current.focus(); }
    }
  }, [current, design, keepCardInView]);

  // Brief loading transition before asking for contact info.
  useEffect(() => {
    if (current !== "loading") return;
    setLoadingText("Saving your move details");
    const t1 = setTimeout(() => setLoadingText("Preparing your callback request"), 800);
    const t2 = setTimeout(() => go("name", { replace: true }), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [current, go]);

  const pickCard = (card, n) => {
    if (picked !== null) return;
    // Record the initial step start once the visitor taps an option.
    if (current === "when" && !seenSteps.current.has("when")) {
      seenSteps.current.add("when");
      const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
      track("step_view", {
        step_name: "when",
        step_progress: FLOW.when.p,
        form_location: pathname,
        form_style: "inline_step",
        ge_variant: geVariantForLead(document.cookie),
        ...(design ? { home_design: design } : {}),
      });
    }
    save(card.save);
    setPicked(n);
    pickTimer.current = setTimeout(() => go(card.next), 150);
  };

  const advanceName = () => {
    const cleaned = data.firstName.trim();
    if (cleaned.length < 2) {
      setErr("Enter your first name.");
      return;
    }
    save({ firstName: cleaned });
    go("phone");
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (sending || inFlight.current) return;
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setErr("Enter a 10 digit phone number.");
      return;
    }
    inFlight.current = true;
    setSending(true);
    setErr("");

    try {
      const sizeAnswer = data.size || (data.homeType === "Office" ? "Office" : "");
      const smSize = SM_MOVE_SIZE[sizeAnswer] || "";
      const boxOffer = boxOfferSeen() ? "shown" : "not_shown";
      const noteParts = [
        "INLINE STEP FORM",
        data.homeType,
        sizeAnswer && `Size: ${sizeAnswer}`,
        data.timeframe || data.dateType,
        `Text OK: ${data.textOk ? "yes" : "no"}`,
      ];
      if (boxOffer === "shown") noteParts.push(BOX_OFFER_NOTE);

      const smPayload = {
        FullName: data.firstName,
        PhoneNumber: data.phone,
        UserOptIn: Boolean(data.textOk),
        Notes: noteParts.filter(Boolean).join(" | "),
      };
      if (data.moveDate) smPayload.MoveDate = data.moveDate.replace(/-/g, "");
      if (smSize) smPayload.MoveSize = smSize;
      if (data.fromTown) smPayload.OriginAddressFull = data.fromTown;
      if (data.toTown) smPayload.DestinationAddressFull = data.toTown;
      Object.assign(smPayload, getSmartMovingAttribution());

      const attribution = getAttribution();
      const oaiEventId = crypto.randomUUID();
      const lpVariant = readVariantCookie(document.cookie) || "not_in_test";
      const geVariant = geVariantForLead(document.cookie);
      const hv = document.cookie.split("; ").find((c) => c.startsWith("hero_ab_test="))?.split("=")[1] || "not_set";
      const pathname = window.location.pathname || "/";

      const leadRes = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "estimate",
          hp: honeypot,
          elapsedMs: Date.now() - openedAt.current,
          formspree: {
            name: data.firstName,
            phone: data.phone,
            moveType: "Moving estimate",
            homeType: data.homeType,
            moveSize: sizeAnswer,
            moveDate: data.moveDate || data.timeframe || data.dateType,
            dateType: data.dateType,
            timeframe: data.timeframe,
            moveFrom: data.fromTown,
            moveTo: data.toTown,
            textOk: data.textOk ? "yes" : "no",
            form_style: "inline_step",
            page_path: pathname,
            lp_variant: lpVariant,
            ge_variant: geVariant,
            box_offer: boxOffer,
            ...(design ? { home_design: design } : {}),
            utm_source: attribution.utm_source || "",
            utm_medium: attribution.utm_medium || "",
            utm_campaign: attribution.utm_campaign || "",
            utm_term: attribution.utm_term || "",
            utm_content: attribution.utm_content || "",
            gclid: attribution.gclid || "",
            fbclid: attribution.fbclid || "",
            landing_page: attribution.landing_page || "",
            referrer: attribution.referrer || "",
          },
          smartmoving: smPayload,
          oaiEventId,
          pageUrl: window.location.href,
        }),
      });
      const res = await leadRes.json().catch(() => ({}));
      if (!leadRes.ok || res.ok === false) {
        setErr(res.error || `Something went wrong sending your request. Please try again, or call us at ${COMPANY.phone}.`);
        setSending(false);
        inFlight.current = false;
        return;
      }

      // Conversion events ONLY on confirmed accepted leads (never on quiet spam).
      if (!res.s) {
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
        if (typeof window.oaiq === "function") {
          window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
        }
        sendGenerateLead(oaiEventId, {
          event_category: "form",
          event_label: "estimate_form",
          form_style: "inline_step",
          hero_variant: hv,
          lp_variant: lpVariant,
          ge_variant: geVariant,
          box_offer: boxOffer,
          ...(design ? { home_design: design } : {}),
        });
        track("form_submission_success", {
          form_location: pathname,
          form_style: "inline_step",
          lp_variant: lpVariant,
          ge_variant: geVariant,
          ...(design ? { home_design: design } : {}),
        });
        if (typeof window.clarity === "function") window.clarity("set", "form_completed", "true");
      }

      const win = responseWindow();
      setFollowUp(
        win === "now"
          ? { open: true }
          : { open: false, label: win === "this_morning" ? "this morning" : nextBusinessLabel() }
      );
      go("thanks", { replace: true });
    } catch (e2) {
      console.error("Inline step lead submission error:", e2);
      setErr(`We could not send your request (connection problem). Please try again, or call us at ${COMPANY.phone}.`);
    }
    setSending(false);
    inFlight.current = false;
  };

  const step = FLOW[current];
  const showBack = hist.length > 0 && current !== "loading" && current !== "thanks";
  const pct = step.p;

  const qHeading = (children) => (
    <h2 className="isf-q" ref={headingRef} tabIndex={-1}>{children}</h2>
  );

  let body;
  if (step.cards) {
    body = (
      <div className="isf-body">
        {qHeading(step.title)}
        <div className={`isf-cards${step.cards.length === 2 ? " isf-cards-2" : ""}${step.cards.length === 3 ? " isf-cards-3" : ""}`}>
          {step.cards.map((c, n) => (
            <button
              key={c.t}
              type="button"
              aria-label={`${c.t}. ${c.s}`}
              className={`isf-opt${picked === n ? " picked" : ""}`}
              onClick={() => pickCard(c, n)}
            >
              <span className="isf-opt-t">{c.t}</span>
              <span className="isf-opt-foot">
                <span className="isf-opt-s">{c.s}</span>
                <Icon name={c.i} />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  } else if (step.kind === "towns") {
    body = (
      <div className="isf-body">
        {qHeading("What town are you moving from?")}
        <EstimateTownFields prefix="isf" data={data} save={save} inputRef={inputRef}
          onContinue={() => go(sizeStepFor(data.homeType))} />
      </div>
    );
  } else if (step.kind === "timeframe") {
    body = (
      <div className="isf-body">
        {qHeading("About when are you thinking?")}
        <div className="isf-fields">
          <div className="isf-field">
            <label htmlFor="isf-timeframe">Rough timeframe</label>
            <input id="isf-timeframe" ref={inputRef} value={data.timeframe} maxLength={80}
              placeholder="Next month, late spring, after closing..."
              onChange={e => save({ timeframe: e.target.value })}
              onKeyDown={e => { if (e.key === "Enter" && data.timeframe.trim()) go("type"); }} />
          </div>
          <button className="isf-cta" type="button" disabled={!data.timeframe.trim()} onClick={() => go("type")}>Continue</button>
        </div>
      </div>
    );
  } else if (step.kind === "date") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today.getTime());
    maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD);
    const cm = calMonth || new Date(today.getFullYear(), today.getMonth(), 1);
    const y = cm.getFullYear(), m = cm.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const atStart = y === today.getFullYear() && m === today.getMonth();
    const atEnd = new Date(y, m + 1, 1) > maxDate;
    const cells = [];
    for (let b = 0; b < first; b++) cells.push(<i key={`b${b}`} />);
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d);
      const disabled = dt < today || dt > maxDate;
      const isToday = dt.getTime() === today.getTime();
      cells.push(
        <button
          key={d}
          type="button"
          disabled={disabled}
          className={isToday ? "today" : undefined}
          aria-label={`${MONTHS[m]} ${d}`}
          onClick={() => {
            save({ moveDate: `${y}-${pad(m + 1)}-${pad(d)}` });
            go("type");
          }}
        >
          {d}
        </button>
      );
    }
    body = (
      <div className="isf-body">
        {qHeading("Pick your move date")}
        <p className="isf-sub">You can change it later.</p>
        <div className="isf-cal">
          <div className="isf-calhead">
            <button type="button" aria-label="Previous month" disabled={atStart} onClick={() => setCalMonth(new Date(y, m - 1, 1))}>&lsaquo;</button>
            <strong>{MONTHS[m]} {y}</strong>
            <button type="button" aria-label="Next month" disabled={atEnd} onClick={() => setCalMonth(new Date(y, m + 1, 1))}>&rsaquo;</button>
          </div>
          <div className="isf-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => <span key={i}>{w}</span>)}
            {cells}
          </div>
        </div>
      </div>
    );
  } else if (step.kind === "loading") {
    body = (
      <div className="isf-body isf-center">
        {qHeading(loadingText)}
        <Image
          className="isf-truck"
          src={TRUCK_IMG.src}
          width={TRUCK_IMG.width}
          height={TRUCK_IMG.height}
          alt="Castle Express Moving & Storage truck"
          unoptimized
        />
        <p className="isf-sub">This only takes a second.</p>
      </div>
    );
  } else if (step.kind === "name") {
    const ok = data.firstName.trim().length >= 2;
    body = (
      <div className="isf-body">
        {qHeading(<>Almost done. <Hl>Who should we ask for?</Hl></>)}
        <div className="isf-fields">
          <div className="isf-field">
            <label htmlFor="isf-firstName">First name</label>
            <input
              ref={inputRef}
              id="isf-firstName"
              autoComplete="given-name"
              autoCapitalize="words"
              maxLength={40}
              placeholder="Your first name"
              value={data.firstName}
              onChange={(e) => { save({ firstName: e.target.value }); setErr(""); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  advanceName();
                }
              }}
            />
          </div>
          {err && <p className="isf-err" role="alert">{err}</p>}
          <button type="button" className="isf-cta" disabled={!ok} onClick={advanceName}>
            Continue
          </button>
        </div>
      </div>
    );
  } else if (step.kind === "phone") {
    const ok = data.phone.replace(/\D/g, "").length === 10;
    body = (
      <div className="isf-body">
        {qHeading(<>{data.firstName}, where should we call with your <Hl>free estimate?</Hl></>)}
        {showAdOffer && (
          <div className="isf-offer">
            <Icon name="box" />
            <span><strong>20 free moving boxes</strong> when you book a walk-through estimate.</span>
          </div>
        )}
        <form className="isf-fields" noValidate onSubmit={submitLead}>
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
            <label htmlFor="isf-website">Website</label>
            <input id="isf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>
          <div className="isf-field">
            <label htmlFor="isf-phone">Phone number</label>
            <input
              ref={inputRef}
              id="isf-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(860) 555-0123"
              value={data.phone}
              onChange={(e) => { save({ phone: fmtPhone(e.target.value) }); setErr(""); }}
            />
          </div>
          <label className="isf-check" htmlFor="isf-textOk">
            <input
              type="checkbox"
              id="isf-textOk"
              checked={data.textOk}
              onChange={(e) => save({ textOk: e.target.checked })}
            />
            <span>You can also text me about my estimate. (Optional)</span>
          </label>
          {err && <p className="isf-err" role="alert">{err}</p>}
          <button className="isf-cta" type="submit" disabled={!ok || sending}>
            {sending ? "Sending..." : "Get my free estimate"}
          </button>
          <p className="isf-fine">
            By tapping the button you agree that Castle Express Moving &amp; Storage may call you at this number about your move.
          </p>
        </form>
      </div>
    );
  } else {
    const open = !followUp || followUp.open;
    const moving = [data.homeType, data.size]
      .filter((x) => x && x !== "Other")
      .filter((x, i, a) => a.indexOf(x) === i)
      .join(", ");
    let dateLabel = data.timeframe || (data.dateType === "Not sure" ? "Just planning" : "");
    if (data.moveDate) {
      const [yy, mm, dd] = data.moveDate.split("-").map(Number);
      dateLabel = `${MONTHS[mm - 1].slice(0, 3)} ${dd}, ${yy}`;
    }
    const rows = [
      ["Moving", moving],
      ["From", data.fromTown],
      ["To", data.toTown],
      ["Date", dateLabel],
      ["Call", data.phone],
    ].filter(([, v]) => v);
    body = (
      <div className="isf-body isf-center">
        {qHeading(<>Thanks, {data.firstName}. We will call you <Hl>{open ? "shortly." : `${followUp.label}.`}</Hl></>)}
        <p className="isf-sub">
          {open
            ? "Keep your phone handy. The call comes from our Enfield office."
            : "Our office is closed right now. You are first on the list when we open."}
        </p>
        <dl className="isf-recap">
          {rows.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="isf-sub">
          Rather call us?{" "}
          <a href={COMPANY.phoneLink} style={{ color: "inherit", fontWeight: 700, textDecoration: "underline" }}>
            888-553-4503
          </a>
        </p>
        <button type="button" className="isf-reset" onClick={resetForm}>
          Start another estimate
        </button>
      </div>
    );
  }

  return (
    <div
      id="estimate-form"
      ref={cardRef}
      className={`isf-card${dark ? " isf-dark" : ""}${twoStep ? " isf-hero" : ""}`}
      data-step={current}
      aria-label="Free moving estimate"
    >
      <div className="isf-top">
        {showBack ? (
          <button type="button" className="isf-back" onClick={back} aria-label="Go back one step">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            Back
          </button>
        ) : (
          <span className="isf-eyebrow">Free Moving Estimate</span>
        )}
        <span className="isf-meta">
          {current === "when" ? (
            <>
              <span className={`isf-dot${replyWindow === "now" ? " live" : ""}`} aria-hidden="true" />
              {RESPONSE_LINE[replyWindow || "now"]}
            </>
          ) : (
            step.label
          )}
        </span>
      </div>
      <div className="isf-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Estimate form progress">
        <div style={{ width: `${pct}%` }} />
      </div>
      {body}
      {current === "when" && (
        <p className="isf-foot-note">{CALLBACK_NOTE}</p>
      )}
    </div>
  );
}
