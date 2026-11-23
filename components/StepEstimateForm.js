"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { COMPANY } from "@/content";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";
import { readVariantCookie } from "@/lib/lpAbTest";
import { geVariantForLead } from "@/lib/geAbTest";
import { sendGenerateLead } from "@/lib/leadEvents";
import { BOX_OFFER_NOTE } from "@/components/AdBoxOffer";
import { responseWindow, SALES_HOURS, CLOSED_DATES } from "@/lib/salesHours";

// /get-estimate/ step form: one question per screen, tap-to-advance cards.
// Screens, question tree, copy, validation and progress values follow
// step-form-prototype.html (Joe, 2026-11-17).
//
// Submission matches LandingEstimateForm: POST /api/lead/ (server spam filter
// -> Formspree + SmartMoving), same payload shape, same conversion events, and
// conversions fire ONLY after the server confirms the lead was accepted. The
// shared submit code is deliberately copied rather than refactored (Joe's
// call, 2026-11-17); fold the three forms together in a later change.
//
// Sales hours come from lib/salesHours.js (same as the homepage).

const GA4 = "G-97Z4EHJM63";
const EVENT_LABEL = "get_estimate_step";
const LANDING = "get-estimate";
// The server rejects move dates more than 550 days out; stop the calendar a
// little before that so no one can pick a date the server would refuse.
const MAX_DAYS_AHEAD = 540;
// Artwork (Joe, 2026-11-17), WebP in public/images, served as-is (next/image
// unoptimized). width/height are the real pixel sizes so the browser reserves
// the box before the image loads (no jump).
const HERO_IMG = { src: "/images/ge-hero-street.webp", width: 1000, height: 254 };
const TRUCK_IMG = { src: "/images/ge-loader-truck.webp", width: 600, height: 261 };

/* ---------- icons (inner SVG markup from the prototype, static strings) ---------- */
const ICON = {
  pin: '<path d="M16 28s9-8.2 9-15a9 9 0 10-18 0c0 6.800 9 15 9 15z"/><circle cx="16" cy="13" r="3.2"/>',
  road: '<path d="M11 4L5 28M21 4l6 24M16 5v4M16 14v4M16 23v4"/>',
  state: '<circle cx="8" cy="23" r="3"/><circle cx="24" cy="8" r="3"/><path d="M11 23h7a4 4 0 004-4v-1a4 4 0 00-4-4h-4a4 4 0 01-4-4 2 2 0 012-2h9"/>',
  lift: '<rect x="6" y="14" width="13" height="12" rx="1.5"/><path d="M6 19h13M12.500 14v5M24 26V7M20 11l4-4 4 4"/>',
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
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON[name] }} />
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.500l5 5L20 6.500" />
    </svg>
  );
}

const Hl = ({ children }) => <span className="ge-hl">{children}</span>;

/* ---------- the question tree (prototype FLOW) ---------- */
const sizeNext = (s) => (s.moveType === "Out of state" ? "zip2" : "zip1");

const FLOW = {
  move: { p: 10, title: "How far are you moving?", cards: [
    { t: "Local", s: "Under 35 miles", i: "pin", save: { moveType: "Local" }, next: "type" },
    { t: "Over an hour away", s: "More than 35 miles", i: "road", save: { moveType: "Over an hour away" }, next: "type" },
    { t: "Out of state", s: "Long distance, door to door", i: "state", save: { moveType: "Out of state" }, next: "type" },
    { t: "Loading or unloading help", s: "You drive, we do the lifting", i: "lift", save: { moveType: "Labor only", homeType: "", size: "" }, next: "zip1" },
  ] },
  type: { p: 20, title: "What are we moving?", cards: [
    { t: "House", s: "Family owned and moving homes since 2011", i: "house", save: { homeType: "House" }, next: "size-house" },
    { t: "Apartment", s: "Stairs and elevators are no problem", i: "apt", save: { homeType: "Apartment" }, next: "size-apartment" },
    { t: "Condo or townhouse", s: "We work with your building's rules", i: "condo", save: { homeType: "Condo or townhouse" }, next: "size-condo" },
    { t: "A few items or an office", s: "Something else? We handle it", i: "box", save: { homeType: "Other" }, next: "size-other" },
  ] },
  "size-house": { p: 30, title: <>How many bedrooms in your <Hl>house?</Hl></>, cards: [
    { t: "4+ bedrooms", s: "Experienced crews for big homes", i: "bed4", save: { size: "4+ bedrooms" }, next: sizeNext },
    { t: "3 bedrooms", s: "Our most common move", i: "bed3", save: { size: "3 bedrooms" }, next: sizeNext },
    { t: "2 bedrooms", s: "Quick and simple. We keep it that way", i: "bed2", save: { size: "2 bedrooms" }, next: sizeNext },
    { t: "1 bedroom or a few items", s: "No job too small", i: "box", save: { size: "1 bedroom or a few items" }, next: sizeNext },
  ] },
  "size-apartment": { p: 30, title: <>How many bedrooms in your <Hl>apartment?</Hl></>, cards: [
    { t: "1 bedroom or studio", s: "Quick and simple. We keep it that way", i: "bed1", save: { size: "1 bedroom or studio" }, next: sizeNext },
    { t: "2 bedrooms", s: "Our most common apartment move", i: "bed2", save: { size: "2 bedrooms" }, next: sizeNext },
    { t: "3+ bedrooms", s: "Experienced crews for any size", i: "bed3", save: { size: "3+ bedrooms" }, next: sizeNext },
    { t: "A few items", s: "No job too small", i: "box", save: { size: "A few items" }, next: sizeNext },
  ] },
  "size-condo": { p: 30, title: <>How many bedrooms in your <Hl>condo?</Hl></>, cards: [
    { t: "3+ bedrooms", s: "Experienced crews for any size", i: "bed3", save: { size: "3+ bedrooms" }, next: sizeNext },
    { t: "2 bedrooms", s: "Our most common condo move", i: "bed2", save: { size: "2 bedrooms" }, next: sizeNext },
    { t: "1 bedroom", s: "Quick and simple. We keep it that way", i: "bed1", save: { size: "1 bedroom" }, next: sizeNext },
    { t: "A few items", s: "No job too small", i: "box", save: { size: "A few items" }, next: sizeNext },
  ] },
  "size-other": { p: 30, title: "What type of move?", cards: [
    { t: "Office", s: "We keep your business moving", i: "office", save: { homeType: "Office", size: "" }, next: sizeNext },
    { t: "A few items", s: "No job too small", i: "box", save: { homeType: "A few items", size: "A few items" }, next: sizeNext },
  ] },
  zip1: { p: 40, kind: "zip", two: false },
  zip2: { p: 40, kind: "zip", two: true },
  when: { p: 50, title: "Tell us about your move date", cards: [
    { t: "I have an exact date", s: "Pick it on the next screen", i: "exact", save: { dateType: "Exact" }, next: "date" },
    { t: "I have some flexibility", s: "Gives you the most options", i: "flex", save: { dateType: "Flexible" }, next: "date" },
    { t: "Not sure yet", s: "You can still get a free estimate", i: "unsure", save: { dateType: "Not sure", moveDate: "" }, next: "loading" },
  ] },
  date: { p: 60, kind: "date" },
  loading: { p: 70, kind: "loading" },
  name: { p: 80, kind: "name" },
  phone: { p: 90, kind: "phone" },
  thanks: { p: 100, kind: "thanks" },
};

// Form size label -> the EXISTING SmartMoving move size it is sent as.
// SmartMoving auto-creates a brand-new move size for any MoveSize name it does
// not already have (seen 2026-11-17: "1 bedroom or studio" and "A few items"
// each minted a new size), so MoveSize is ONLY ever sent from this table and
// any label missing from it is left off the lead. Names must match the
// SmartMoving list exactly (Settings > Move Sizes, or GET /move-sizes).
// Targets are the original sizes that carry volume + weight, except Office:
// the only office size is "Office / Commercial". Labor only has no size.
// The customer's exact answer always rides in Notes.
export const SM_MOVE_SIZE = {
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

const EMPTY = {
  moveType: "", homeType: "", size: "", fromZip: "", toZip: "",
  dateType: "", moveDate: "", firstName: "", phone: "", textOk: false,
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad = (n) => String(n).padStart(2, "0");

function fmtPhone(v) {
  // Autofill often supplies "+1 (860) 555-0123". No US area code starts with
  // 1, so a leading 1 is always the country code: drop it before trimming to
  // 10 digits (it used to shift every digit and lose the last one).
  let d = v.replace(/\D/g, "");
  if (d[0] === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}

// "Monday morning" style label for the next business day, using the same
// days and closed dates as lib/salesHours.js. Never throws.
function nextBusinessLabel(now = new Date()) {
  try {
    const p = {};
    for (const { type, value } of new Intl.DateTimeFormat("en-US", {
      timeZone: SALES_HOURS.timeZone, year: "numeric", month: "2-digit", day: "2-digit",
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
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined")
      window.gtag("event", name, { ...params, send_to: GA4 });
  } catch {}
}

export default function StepEstimateForm() {
  const [current, setCurrent] = useState("landing");
  const [hist, setHist] = useState([]);
  const [data, setData] = useState(EMPTY);
  const [picked, setPicked] = useState(null);
  const [calMonth, setCalMonth] = useState(null);
  const [loadingText, setLoadingText] = useState("Saving your move details");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false); // one submission at a time (state alone lags a fast double tap)
  const [followUp, setFollowUp] = useState(null);
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());
  const headingRef = useRef(null);
  const seenSteps = useRef(new Set());
  const pickTimer = useRef(null);

  const save = (patch) => setData((d) => ({ ...d, ...patch }));

  const currentRef = useRef("landing");
  const go = useCallback((id, { replace = false } = {}) => {
    const cur = currentRef.current;
    setErr("");
    setPicked(null);
    if (!replace && cur !== "loading") setHist((h) => [...h, cur]);
    currentRef.current = id;
    setCurrent(id);
  }, []);

  const back = () => {
    if (!hist.length) return;
    setErr("");
    setPicked(null);
    currentRef.current = hist[hist.length - 1];
    setCurrent(hist[hist.length - 1]);
    setHist(hist.slice(0, -1));
  };

  // GA4 step_view: once per step per page load, so the funnel shows how many
  // visitors reached each screen (drop-off), not how often they went back.
  useEffect(() => {
    if (current !== "loading" && !seenSteps.current.has(current)) {
      seenSteps.current.add(current);
      track("step_view", {
        step_name: current,
        step_progress: current === "landing" ? 0 : FLOW[current].p,
        form_location: "/get-estimate",
        ge_variant: geVariantForLead(document.cookie),
      });
    }
    if (current !== "landing" && headingRef.current) headingRef.current.focus({ preventScroll: true });
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [current]);

  // Loading interstitial (prototype): 1 s, swap the line, 1 s, then the name
  // screen replaces it in history so Back skips over it.
  useEffect(() => {
    if (current !== "loading") return;
    setLoadingText("Saving your move details");
    const t1 = setTimeout(() => setLoadingText("Getting your estimate ready"), 1000);
    const t2 = setTimeout(() => go("name", { replace: true }), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [current, go]);

  useEffect(() => () => clearTimeout(pickTimer.current), []);

  // Warm the loading-screen truck in the background so it is already cached
  // when that screen appears a few taps later (it only shows for 2 seconds).
  useEffect(() => {
    const t = setTimeout(() => { const im = new window.Image(); im.src = TRUCK_IMG.src; }, 1500);
    return () => clearTimeout(t);
  }, []);

  const pickCard = (card, n) => {
    if (picked !== null) return;
    const nextData = { ...data, ...card.save };
    setData(nextData);
    setPicked(n);
    const nxt = typeof card.next === "function" ? card.next(nextData) : card.next;
    pickTimer.current = setTimeout(() => go(nxt), 160);
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (sending || inFlight.current) return;
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length !== 10) { setErr("Enter a 10 digit phone number."); return; }
    inFlight.current = true;
    setSending(true);
    setErr("");
    try {
      // Office leads have no size answer; their size comes from homeType.
      const sizeAnswer = data.size || (data.homeType === "Office" ? "Office" : "");
      const smSize = SM_MOVE_SIZE[sizeAnswer] || "";
      const notes = ["STEP FORM", data.moveType, data.homeType, sizeAnswer && `Size: ${sizeAnswer}`, data.dateType, `Text OK: ${data.textOk ? "yes" : "no"}`]
        .filter(Boolean).join(" | ");

      const smPayload = {
        FullName: data.firstName,
        PhoneNumber: data.phone,
        UserOptIn: Boolean(data.textOk),
        // Every visitor sees the 20 free boxes offer on the phone screen.
        Notes: `${notes} | ${BOX_OFFER_NOTE}`,
      };
      if (data.moveDate) smPayload.MoveDate = data.moveDate.replace(/-/g, "");
      if (smSize) smPayload.MoveSize = smSize;
      if (data.fromZip) smPayload.OriginAddressFull = data.fromZip;
      if (data.toZip) smPayload.DestinationAddressFull = data.toZip;
      Object.assign(smPayload, getSmartMovingAttribution());

      const attribution = getAttribution();
      const oaiEventId = crypto.randomUUID();
      const lpVariant = readVariantCookie(document.cookie) || "not_in_test";
      const geVariant = geVariantForLead(document.cookie);

      const leadRes = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "estimate",
          landing: LANDING,
          hp: honeypot,
          elapsedMs: Date.now() - openedAt.current,
          formspree: {
            // Old field names, so the leads sheet and the nightly email
            // ingest (fetch_website_leads.py) keep reading them.
            name: data.firstName,
            phone: data.phone,
            moveFrom: data.fromZip,
            moveTo: data.toZip,
            moveSize: data.size,
            moveDate: data.moveDate,
            ...attribution,
            landing: LANDING,
            moveType: data.moveType,
            homeType: data.homeType,
            dateType: data.dateType,
            textOk: data.textOk ? "yes" : "no",
            lp_variant: lpVariant,
            ge_variant: geVariant,
            box_offer: "shown",
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
      // Conversion events ONLY on a confirmed accepted submit. res.s = the
      // server quietly discarded this as spam: thank-you screen, no conversions.
      if (!res.s) {
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
      if (typeof window.oaiq === "function")
        window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
      // GTM's Ads conversion trigger fires on this same generate_lead push.
      sendGenerateLead(oaiEventId, { event_category: "form", event_label: EVENT_LABEL, lp_variant: lpVariant, ge_variant: geVariant, box_offer: "shown" });
      track("form_submission_success", { form_location: "/get-estimate", lp_variant: lpVariant, ge_variant: geVariant });
      if (typeof window.clarity === "function") window.clarity("set", "form_completed", "true");
      }

      const win = responseWindow();
      setFollowUp(win === "now" ? { open: true } : { open: false, label: win === "this_morning" ? "this morning" : nextBusinessLabel() });
      setHist([]);
      go("thanks", { replace: true });
    } catch (error) {
      console.error("Lead submission error:", error);
      setErr(`We could not send your request (connection problem). Please try again, or call us at ${COMPANY.phone}.`);
    }
    setSending(false);
    inFlight.current = false;
  };

  /* ---------- screens ---------- */
  const step = FLOW[current];
  const progress = step ? step.p : 0;
  const showBack = !(current === "landing" || current === "thanks" || current === "loading" || !hist.length);

  const h2 = (children) => <h2 ref={headingRef} tabIndex={-1}>{children}</h2>;

  let screen;
  let screenClass = "ge-screen";

  if (current === "landing") {
    screenClass += " ge-landing";
    screen = (
      <>
        <p className="ge-eyebrow">Enfield, CT &middot; Family owned since 2011</p>
        <h1>Let our family move <Hl>yours.</Hl></h1>
        <p className="ge-sub">Answer a few quick questions and get your free moving estimate. It takes about a minute.</p>
        <button className="ge-cta" type="button" onClick={() => go("move")}>Get my free estimate</button>
        <ul className="ge-proof">
          <li><Tick /><span>Local and long distance moves across Connecticut and Massachusetts</span></li>
          <li><Tick /><span>Experienced crews and our own trucks</span></li>
          <li><Tick /><span>Storage available for our moving customers</span></li>
        </ul>
        <Image className="ge-street" src={HERO_IMG.src} width={HERO_IMG.width} height={HERO_IMG.height}
          alt="A yellow Castle Express Moving & Storage truck parked on a neighborhood street between two houses"
          priority unoptimized />
      </>
    );
  } else if (step.cards) {
    screen = (
      <>
        {h2(<>{step.title}</>)}
        <div className="ge-cards">
          {step.cards.map((c, n) => (
            <button key={c.t} type="button" aria-label={`${c.t}. ${c.s}`} className={`ge-card${picked === n ? " picked" : ""}`} onClick={() => pickCard(c, n)}>
              <span className="t">{c.t}</span>
              <span className="foot"><span className="s">{c.s}</span><Icon name={c.i} /></span>
            </button>
          ))}
        </div>
      </>
    );
  } else if (step.kind === "zip") {
    const two = step.two;
    const title = two ? "Where are you moving from and to?" : (data.moveType === "Labor only" ? "Where do you need our movers?" : "Where are you moving from?");
    const ok = /^\d{5}$/.test(data.fromZip) && (!two || /^\d{5}$/.test(data.toZip));
    const onZip = (field) => (e) => { save({ [field]: e.target.value.replace(/\D/g, "").slice(0, 5) }); setErr(""); };
    screen = (
      <>
        {h2(<>{title}</>)}
        <form className="ge-fields" noValidate onSubmit={(e) => {
          e.preventDefault();
          if (!ok) { setErr("Enter a 5 digit zip code."); return; }
          if (!two && data.toZip) save({ toZip: "" });
          go("when");
        }}>
          <div className="ge-field">
            <label htmlFor="ge-fromZip">{two ? "Moving from (zip code)" : "Your zip code"}</label>
            <input id="ge-fromZip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="06082" value={data.fromZip} onChange={onZip("fromZip")} />
          </div>
          {two && (
            <div className="ge-field">
              <label htmlFor="ge-toZip">Moving to (zip code)</label>
              <input id="ge-toZip" inputMode="numeric" maxLength={5} placeholder="29577" value={data.toZip} onChange={onZip("toZip")} />
            </div>
          )}
          <p className="ge-err" role="alert">{err}</p>
          <button className="ge-cta" type="submit" disabled={!ok}>Continue</button>
        </form>
      </>
    );
  } else if (step.kind === "date") {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today.getTime()); maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD);
    const cm = calMonth || new Date(today.getFullYear(), today.getMonth(), 1);
    const y = cm.getFullYear(), m = cm.getMonth();
    const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    const atStart = y === today.getFullYear() && m === today.getMonth();
    const atEnd = new Date(y, m + 1, 1) > maxDate;
    const cells = [];
    for (let b = 0; b < first; b++) cells.push(<i key={`b${b}`} />);
    for (let d = 1; d <= days; d++) {
      const dt = new Date(y, m, d);
      const disabled = dt < today || dt > maxDate;
      const isToday = dt.getTime() === today.getTime();
      cells.push(
        <button key={d} type="button" disabled={disabled} className={isToday ? "today" : undefined} aria-label={`${MONTHS[m]} ${d}`}
          onClick={() => { save({ moveDate: `${y}-${pad(m + 1)}-${pad(d)}` }); go("loading"); }}>{d}</button>
      );
    }
    screen = (
      <>
        {h2(<>{data.dateType === "Flexible" ? "About when are you moving?" : "Pick your move date"}</>)}
        <p className="ge-sub">You can change it later.</p>
        <div className="ge-cal">
          <div className="ge-calhead">
            <button type="button" aria-label="Previous month" disabled={atStart} onClick={() => setCalMonth(new Date(y, m - 1, 1))}>&lsaquo;</button>
            <strong>{MONTHS[m]} {y}</strong>
            <button type="button" aria-label="Next month" disabled={atEnd} onClick={() => setCalMonth(new Date(y, m + 1, 1))}>&rsaquo;</button>
          </div>
          <div className="ge-grid">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d}>{d}</span>)}
            {cells}
          </div>
        </div>
      </>
    );
  } else if (step.kind === "loading") {
    screenClass += " ge-center";
    screen = (
      <>
        <h2>{loadingText}</h2>
        <Image className="ge-truck" src={TRUCK_IMG.src} width={TRUCK_IMG.width} height={TRUCK_IMG.height}
          alt="Castle Express Moving & Storage truck" unoptimized />
        <p className="ge-sub">This only takes a second.</p>
      </>
    );
  } else if (step.kind === "name") {
    const ok = data.firstName.trim().length >= 2;
    screen = (
      <>
        {h2(<>Almost done. <Hl>Who should we ask for?</Hl></>)}
        <form className="ge-fields" noValidate onSubmit={(e) => {
          e.preventDefault();
          if (!ok) return;
          save({ firstName: data.firstName.trim() });
          go("phone");
        }}>
          <div className="ge-field">
            <label htmlFor="ge-firstName">First name</label>
            <input id="ge-firstName" autoComplete="given-name" autoCapitalize="words" maxLength={40} value={data.firstName} onChange={(e) => save({ firstName: e.target.value })} />
          </div>
          <p className="ge-err" role="alert">{err}</p>
          <button className="ge-cta" type="submit" disabled={!ok}>Continue</button>
        </form>
      </>
    );
  } else if (step.kind === "phone") {
    const ok = data.phone.replace(/\D/g, "").length === 10;
    screen = (
      <>
        {h2(<>{data.firstName}, where should we call with your <Hl>free estimate?</Hl></>)}
        <div className="ge-offer"><Icon name="box" /><span><strong>20 free moving boxes</strong> when you book a walk-through estimate.</span></div>
        <form className="ge-fields" noValidate onSubmit={submitLead}>
          {/* Honeypot: invisible to humans, bots auto-fill it. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
            <label htmlFor="ge-website">Website</label>
            <input id="ge-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>
          <div className="ge-field">
            <label htmlFor="ge-phone">Phone number</label>
            <input id="ge-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(860) 555-0123" value={data.phone}
              onChange={(e) => { save({ phone: fmtPhone(e.target.value) }); setErr(""); }} />
          </div>
          <label className="ge-check" htmlFor="ge-textOk">
            <input type="checkbox" id="ge-textOk" checked={data.textOk} onChange={(e) => save({ textOk: e.target.checked })} />
            <span>You can also text me about my estimate. (Optional)</span>
          </label>
          <p className="ge-err" role="alert">{err}</p>
          <button className="ge-cta" type="submit" disabled={!ok || sending}>{sending ? "Sending..." : "Get my free estimate"}</button>
          <p className="ge-fine">By tapping the button you agree that Castle Express Moving &amp; Storage may call you at this number about your move.</p>
        </form>
      </>
    );
  } else {
    screenClass += " ge-center";
    const open = !followUp || followUp.open;
    const moving = [data.homeType, data.size].filter((x) => x && x !== "Other").filter((x, i, a) => a.indexOf(x) === i).join(", ");
    let dateLabel = data.dateType === "Not sure" ? "Not sure yet" : "";
    if (data.moveDate) {
      const [yy, mm, dd] = data.moveDate.split("-").map(Number);
      dateLabel = `${MONTHS[mm - 1].slice(0, 3)} ${dd}, ${yy}`;
    }
    const rows = [["Move", data.moveType], ["Moving", moving], ["From", data.fromZip], ["To", data.toZip], ["Date", dateLabel], ["Call", data.phone]]
      .filter(([, v]) => v);
    screen = (
      <>
        {h2(<>Thanks, {data.firstName}. We will call you <Hl>{open ? "shortly." : `${followUp.label}.`}</Hl></>)}
        <p className="ge-sub">{open ? "Keep your phone handy. The call comes from our Enfield office." : "Our office is closed right now. You are first on the list when we open."}</p>
        <dl className="ge-recap">
          {rows.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <p className="ge-sub">Rather call us? <a href="tel:18885534503" style={{ color: "inherit", fontWeight: 700, textDecoration: "underline" }}>888-553-4503</a></p>
      </>
    );
  }

  return (
    <div className="ge-page">
      <style>{CSS}</style>
      <div className="ge-shell">
        <div className="ge-app">
          <header className="ge-top">
            {showBack && (
              <button className="ge-back" type="button" aria-label="Go back one step" onClick={back}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
            )}
            <div className="ge-brand"><b>Castle Express</b><span>Moving &amp; Storage</span><i /></div>
            <a className="ge-call" href={COMPANY.phoneLink}><span>Call us</span><strong>888-553-4503</strong></a>
          </header>
          <div className="ge-bar" role="progressbar" aria-label="Estimate progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div style={{ width: `${progress}%` }} />
          </div>
          <div className={screenClass} aria-live="polite">{screen}</div>
        </div>
      </div>
    </div>
  );
}

// Prototype styles, scoped under ge- class names so they never collide with
// the sitewide CSS. Fonts: the site's own Merriweather (headings) and DM Sans
// (body) from next/font in app/layout.js, in place of the prototype's Google
// Fonts link. Colors are the site's gold #FBCB0B and steel #969a9d.
const CSS = `
.ge-page{--ink:#000;--paper:#fff;--gold:#FBCB0B;--steel:#969a9d;--mist:#ebeced;--ink-soft:#4a4d50;--danger:#b3261e;--radius:14px;
  --ge-display:var(--font-body),Georgia,"Times New Roman",serif;--ge-body:var(--font-dm-sans),"Segoe UI",Helvetica,Arial,sans-serif;
  background:var(--mist);color:var(--ink);font-family:var(--ge-body);font-size:16px;line-height:1.45;min-height:100vh;min-height:100dvh;-webkit-font-smoothing:antialiased}
.ge-page *{box-sizing:border-box}
.ge-page button{font-family:inherit;color:inherit}
.ge-shell{max-width:460px;margin:0 auto;padding:16px 16px 40px}
.ge-app{background:var(--paper);border-radius:20px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.06),0 12px 30px -18px rgba(0,0,0,.35)}
.ge-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid var(--mist)}
.ge-back{width:36px;height:36px;border-radius:50%;border:1px solid var(--mist);background:var(--paper);display:grid;place-items:center;cursor:pointer;flex:none;padding:0}
.ge-back svg{width:18px;height:18px}
.ge-brand{display:flex;flex-direction:column;line-height:1.05;margin-right:auto;min-width:0}
.ge-brand b{font-family:var(--ge-display);font-weight:900;font-size:clamp(14px,4.1vw,17px);letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}
.ge-brand span{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-top:3px;white-space:nowrap}
.ge-brand i{display:block;width:34px;height:4px;background:var(--gold);margin-top:5px;border-radius:2px}
.ge-call{display:flex;flex-direction:column;align-items:flex-end;text-decoration:none;color:var(--ink);font-size:11px;letter-spacing:.08em;text-transform:uppercase;line-height:1.2}
.ge-call strong{font-size:14px;letter-spacing:0;font-variant-numeric:tabular-nums;white-space:nowrap}
.ge-bar{height:6px;background:var(--mist)}
.ge-bar div{height:100%;background:var(--gold);transition:width .35s ease}
.ge-screen{padding:26px 18px 28px;min-height:430px;display:flex;flex-direction:column;gap:18px}
.ge-page h1,.ge-page h2{font-family:var(--ge-display);font-weight:900;margin:0;text-wrap:balance;line-height:1.2;color:var(--ink);outline:none}
.ge-page h1{font-size:30px}
.ge-page h2{font-size:23px;text-align:center}
.ge-sub{margin:0;text-align:center;color:var(--ink-soft);font-size:15px}
.ge-hl{box-shadow:inset 0 -0.42em 0 var(--gold)}
.ge-landing{text-align:left;gap:16px}
.ge-landing .ge-sub{text-align:left}
.ge-eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin:0}
.ge-proof{list-style:none;margin:4px 0 0;padding:0;display:flex;flex-direction:column;gap:10px;font-size:15px}
.ge-proof li{display:flex;gap:10px;align-items:flex-start}
.ge-proof svg{width:18px;height:18px;flex:none;margin-top:2px}
.ge-street{width:100%;height:auto;display:block;margin-top:auto}
.ge-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ge-card{appearance:none;border:1.5px solid var(--mist);background:#f7f7f8;border-radius:var(--radius);padding:14px 12px 12px;min-height:138px;text-align:left;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;gap:12px;transition:border-color .12s,background .12s,transform .12s}
.ge-card:hover{border-color:var(--steel)}
.ge-card:active{transform:scale(.985)}
.ge-card.picked{border-color:var(--ink);background:var(--gold)}
.ge-card .t{font-family:var(--ge-display);font-weight:700;font-size:17px;line-height:1.25}
.ge-card .foot{display:flex;align-items:flex-end;justify-content:space-between;gap:8px}
.ge-card .s{font-size:12.5px;line-height:1.3;color:var(--ink-soft)}
.ge-card.picked .s{color:var(--ink)}
.ge-card svg{width:30px;height:30px;flex:none}
@media (max-width:360px){.ge-card .t{font-size:15px}.ge-card{min-height:128px}.ge-brand span{letter-spacing:.08em}.ge-top{gap:8px}}
.ge-fields{display:flex;flex-direction:column;gap:12px}
.ge-field label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
.ge-field input{width:100%;font:inherit;font-size:20px;padding:14px 16px;border:1.5px solid var(--mist);border-radius:var(--radius);background:#f7f7f8;color:var(--ink);font-variant-numeric:tabular-nums}
.ge-field input::placeholder{color:var(--steel)}
.ge-err{min-height:18px;margin:4px 2px 0;font-size:13px;color:var(--danger)}
.ge-cta{appearance:none;border:0;background:var(--gold);color:var(--ink);font-weight:700;font-size:17px;padding:16px 20px;border-radius:999px;cursor:pointer;width:100%;box-shadow:0 2px 0 rgba(0,0,0,.85)}
.ge-cta:active{transform:translateY(1px);box-shadow:0 1px 0 rgba(0,0,0,.85)}
.ge-cta[disabled]{background:var(--mist);color:var(--steel);box-shadow:none;cursor:not-allowed}
.ge-offer{display:flex;gap:10px;align-items:center;background:#fff8d6;border:1.5px solid var(--gold);border-radius:var(--radius);padding:12px;font-size:14px}
.ge-offer svg{width:26px;height:26px;flex:none}
.ge-check{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--ink-soft)}
.ge-page .ge-check input[type="checkbox"]{appearance:auto;-webkit-appearance:checkbox;width:18px;height:18px;min-width:18px;min-height:0;padding:0;margin:1px 0 0;border:0;border-radius:0;box-shadow:none;accent-color:var(--ink);flex:none}
.ge-fine{font-size:11.5px;line-height:1.45;color:var(--ink-soft);margin:0}
.ge-cal{border:1.5px solid var(--mist);border-radius:var(--radius);padding:12px}
.ge-calhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.ge-calhead strong{font-family:var(--ge-display);font-size:16px}
.ge-calhead button{width:34px;height:34px;border-radius:50%;border:1px solid var(--mist);background:var(--paper);cursor:pointer;font-size:16px;padding:0}
.ge-calhead button[disabled]{opacity:.35;cursor:not-allowed}
.ge-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}
.ge-grid span{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--steel);padding:4px 0}
.ge-grid button{aspect-ratio:1;border:0;border-radius:50%;background:transparent;font-size:15px;cursor:pointer;font-variant-numeric:tabular-nums;padding:0;min-width:0;min-height:0;width:100%}
.ge-grid button:hover{background:var(--mist)}
.ge-grid button[disabled]{color:#c9cccf;cursor:not-allowed;background:transparent}
.ge-grid button.today{box-shadow:inset 0 0 0 1.5px var(--steel)}
.ge-center{align-items:center;justify-content:center;text-align:center}
.ge-truck{width:190px;max-width:70%;height:auto;display:block;animation:ge-bob .5s ease-in-out infinite alternate}
@keyframes ge-bob{to{transform:translateY(-3px)}}
@media (prefers-reduced-motion:reduce){.ge-bar div{transition:none}.ge-truck{animation:none}}
.ge-recap{width:100%;border-top:1px solid var(--mist);margin:6px 0 0;padding:14px 0 0;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;text-align:left;font-size:14px}
.ge-recap dt{color:var(--ink-soft)}
.ge-recap dd{margin:0;font-weight:600}
.ge-page :focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.ge-page h1:focus,.ge-page h1:focus-visible,.ge-page h2:focus,.ge-page h2:focus-visible{outline:none;box-shadow:none}
.ge-card:focus-visible,.ge-cta:focus-visible{outline-offset:3px}
`;
