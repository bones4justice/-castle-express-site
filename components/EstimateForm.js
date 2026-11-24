"use client";
import { useState, useEffect, useRef, useCallback, useId } from "react";
import {
  SERVICE_OPTIONS,
  PROPERTY_OPTIONS,
  getSizeOptions,
  SM_MOVE_SIZE,
  stepTally,
  validLocation,
  fmtPhone,
  MONTHS,
  pad2,
  formatShortDate,
  formatLongDate,
  nextBusinessLabel,
  ICONS,
} from "@/lib/estimateHelp";
import { COMPANY, SERVICE_AREAS } from "@/content";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";
import { boxOfferSeen, BOX_OFFER_NOTE } from "@/components/AdBoxOffer";
import { readVariantCookie } from "@/lib/lpAbTest";
import { geVariantForLead } from "@/lib/geAbTest";
import { sendGenerateLead } from "@/lib/leadEvents";
import { responseWindow } from "@/lib/salesHours";

// Inline 5-step estimate card used across the site (homepage, /contact/,
// town pages, service pages). Modeled on the clean tap-to-advance Dibs flow
// in Castle Express gold and charcoal.
//
// Only the final contact screen wraps a real <form> with type="submit"; every
// tile and intermediate step button is type="button", so GTM's form-submit
// trigger and lead submission can never fire early.

const GA4 = "G-97Z4EHJM63";
const MAX_DAYS_AHEAD = 540;
const NEARBY_TOWNS = Object.values(SERVICE_AREAS).flat();

const RESPONSE_LINE = {
  now: "Typically responds in 20 min. or less",
  this_morning: "We reply first thing this morning",
  next_business: "We reply first thing the next business morning",
};

const EMPTY = {
  moveType: "",
  homeType: "",
  size: "",
  fromTown: "",
  toTown: "",
  notSureDest: false,
  dateChoice: "",
  moveDate: "",
  fullName: "",
  phone: "",
  textOk: false,
};

function Icon({ name, size = 24, strokeWidth = 1.85 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
    />
  );
}

function track(name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", name, { ...params, send_to: GA4 });
    }
  } catch {}
}

export default function EstimateForm({ dark = false, twoStep = false, design = null }) {
  const uid = useId();
  const [current, setCurrent] = useState("service");
  const [hist, setHist] = useState([]);
  const [dir, setDir] = useState("fwd");
  const [data, setData] = useState(EMPTY);
  const [picked, setPicked] = useState(null);
  const [touched, setTouched] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [calMonth, setCalMonth] = useState(null);
  const [advancePulse, setAdvancePulse] = useState(0);
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
  const currentRef = useRef("service");

  const save = (patch) => setData((d) => ({ ...d, ...patch }));

  useEffect(() => {
    const check = () => setReplyWindow(responseWindow());
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => () => clearTimeout(pickTimer.current), []);

  const keepCardInView = useCallback(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.top < 72) {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cardRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, []);

  const go = useCallback((id, { replace = false } = {}) => {
    const cur = currentRef.current;
    hasInteracted.current = true;
    setTouched(true);
    setErr("");
    setPicked(null);
    setShowCal(false);
    setDir("fwd");
    setAdvancePulse((n) => n + 1);
    if (!replace) setHist((h) => [...h, cur]);
    currentRef.current = id;
    setCurrent(id);
  }, []);

  const back = () => {
    if (!hist.length) return;
    clearTimeout(pickTimer.current);
    setErr("");
    setPicked(null);
    setShowCal(false);
    setDir("back");
    const prev = hist[hist.length - 1];
    currentRef.current = prev;
    setCurrent(prev);
    setHist(hist.slice(0, -1));
  };

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (current === "contact") setShowAdOffer(boxOfferSeen());
    if (!seenSteps.current.has(current)) {
      seenSteps.current.add(current);
      const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
      const { pct } = stepTally(current, data.moveType);
      track("step_view", {
        step_name: current,
        step_progress: Math.round(pct),
        form_location: pathname,
        form_style: "inline_step",
        ge_variant: geVariantForLead(document.cookie),
        ...(design ? { home_design: design } : {}),
      });
    }
    keepCardInView();
    if (current === "locations") {
      if (inputRef.current) {
        try { inputRef.current.focus({ preventScroll: true }); } catch { inputRef.current.focus(); }
      }
    } else if (headingRef.current) {
      try { headingRef.current.focus({ preventScroll: true }); } catch { headingRef.current.focus(); }
    }
  }, [current, data.moveType, design, keepCardInView]);

  const pickTile = (stepKey, value, patch, nextStep) => {
    if (picked !== null) return;
    setTouched(true);
    if (stepKey === "service" && !seenSteps.current.has("service")) {
      seenSteps.current.add("service");
      const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
      track("step_view", {
        step_name: "service",
        step_progress: 20,
        form_location: pathname,
        form_style: "inline_step",
        ge_variant: geVariantForLead(document.cookie),
        ...(design ? { home_design: design } : {}),
      });
    }
    save(patch);
    setPicked(value);
    pickTimer.current = setTimeout(() => go(nextStep), 210);
  };

  const isStorage = data.moveType === "Storage";

  const advanceLocations = () => {
    const from = data.fromTown.trim();
    const to = data.notSureDest || isStorage ? "" : data.toTown.trim();
    if (!validLocation(from)) {
      setErr(isStorage ? "Enter your pickup town or ZIP code." : "Enter the town or ZIP code you are moving from.");
      return;
    }
    if (!isStorage && !data.notSureDest && to && !validLocation(to)) {
      setErr("Enter a valid destination town or ZIP code, or check \"I don't know the destination yet.\"");
      return;
    }
    save({ fromTown: from, toTown: to });
    go("contact");
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (sending || inFlight.current) return;
    const cleanedName = data.fullName.trim();
    if (cleanedName.length < 2) {
      setErr("Please enter your name.");
      return;
    }
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setErr("Please enter a 10-digit phone number.");
      return;
    }
    inFlight.current = true;
    setSending(true);
    setErr("");

    try {
      const sizeAnswer = data.size || (data.homeType === "Office" ? "Office" : "");
      const smSize = SM_MOVE_SIZE[sizeAnswer] || "";
      const boxOffer = boxOfferSeen() ? "shown" : "not_shown";
      const timingNote =
        data.dateChoice === "date" && data.moveDate
          ? `Exact date (${data.moveDate})`
          : data.dateChoice === "asap"
          ? "ASAP"
          : data.dateChoice === "planning"
          ? "Not sure yet"
          : "Not specified";
      const destNote = isStorage ? "Castle Storage" : data.notSureDest ? "Destination TBD" : "";
      const noteParts = [
        "INLINE STEP FORM",
        data.moveType,
        data.homeType,
        sizeAnswer && `Size: ${sizeAnswer}`,
        `Timing: ${timingNote}`,
        destNote,
        `Text OK: ${data.textOk ? "yes" : "no"}`,
      ];
      if (boxOffer === "shown") noteParts.push(BOX_OFFER_NOTE);

      const smPayload = {
        FullName: cleanedName,
        PhoneNumber: data.phone,
        UserOptIn: Boolean(data.textOk),
        Notes: noteParts.filter(Boolean).join(" | "),
      };
      if (data.dateChoice === "date" && data.moveDate) {
        smPayload.MoveDate = data.moveDate.replace(/-/g, "");
      }
      if (smSize) smPayload.MoveSize = smSize;
      if (data.fromTown) smPayload.OriginAddressFull = data.fromTown;
      if (!isStorage && !data.notSureDest && data.toTown) {
        smPayload.DestinationAddressFull = data.toTown;
      }
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
            name: cleanedName,
            phone: data.phone,
            moveType: data.moveType || "Local",
            homeType: data.homeType,
            moveSize: sizeAnswer,
            moveDate: data.dateChoice === "date" ? data.moveDate : timingNote,
            dateType: timingNote,
            moveFrom: data.fromTown,
            moveTo: isStorage ? "Storage" : data.notSureDest ? "Not sure yet" : data.toTown,
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
      setHist([]);
      go("thanks", { replace: true });
    } catch (e2) {
      console.error("Inline step lead submission error:", e2);
      setErr(`We could not send your request (connection problem). Please try again, or call us at ${COMPANY.phone}.`);
    }
    setSending(false);
    inFlight.current = false;
  };

  const tally = stepTally(current, data.moveType);
  const firstScreenNudge = current === "service" && !touched;

  const renderTileGrid = (options, selectedValue, onSelect) => (
    <div className={`isf-grid-quad${firstScreenNudge ? " isf-nudge" : ""}`}>
      {options.map((opt) => {
        const isSel = picked === opt.value || (picked === null && selectedValue === opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            className={`isf-opt${isSel ? " picked" : ""}`}
            onClick={() => onSelect(opt)}
          >
            <span className="isf-opt-check" aria-hidden="true">
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            <span className="isf-opt-icon" aria-hidden="true">
              <Icon name={opt.icon} size={26} strokeWidth={1.75} />
            </span>
            <span className="isf-opt-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );

  const renderCalendar = () => {
    if (!showCal) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today.getTime());
    maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD);
    const cm = calMonth || new Date(today.getFullYear(), today.getMonth(), 1);
    const y = cm.getFullYear();
    const m = cm.getMonth();
    const firstDow = new Date(y, m, 1).getDay();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const atStart = y === today.getFullYear() && m === today.getMonth();
    const atEnd = new Date(y, m + 1, 1) > maxDate;
    const cells = [];
    for (let b = 0; b < firstDow; b++) cells.push(<span key={`b${b}`} />);
    for (let d = 1; d <= daysIn; d++) {
      const dt = new Date(y, m, d);
      const iso = `${y}-${pad2(m + 1)}-${pad2(d)}`;
      const disabled = dt < today || dt > maxDate;
      const isToday = dt.getTime() === today.getTime();
      const isSel = data.moveDate === iso;
      cells.push(
        <button
          key={d}
          type="button"
          disabled={disabled}
          className={`isf-cal-day${isSel ? " sel" : isToday ? " today" : ""}`}
          aria-label={`${MONTHS[m]} ${d}, ${y}`}
          onClick={() => {
            save({ dateChoice: "date", moveDate: iso });
            setShowCal(false);
          }}
        >
          {d}
        </button>
      );
    }
    return (
      <div className="isf-cal" role="dialog" aria-label="Choose a move date">
        <div className="isf-calhead">
          <button type="button" aria-label="Previous month" disabled={atStart} onClick={() => setCalMonth(new Date(y, m - 1, 1))}>
            &lsaquo;
          </button>
          <strong>{MONTHS[m]} {y}</strong>
          <button type="button" aria-label="Next month" disabled={atEnd} onClick={() => setCalMonth(new Date(y, m + 1, 1))}>
            &rsaquo;
          </button>
        </div>
        <div className="isf-cal-grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => (
            <span key={w} className="isf-cal-dow">{w}</span>
          ))}
          {cells}
        </div>
      </div>
    );
  };

  const stepClass = `isf-step-wrap isf-enter-${dir}`;
  let content;
  let nav = null;

  if (current === "service") {
    content = (
      <div key="service" className={stepClass}>
        <h2 className="isf-q" ref={headingRef} tabIndex={-1}>What can we help you with?</h2>
        {renderTileGrid(SERVICE_OPTIONS, data.moveType, (opt) => {
          if (opt.value === "Commercial") {
            pickTile("service", opt.value, { moveType: "Commercial", homeType: "Office", size: "" }, "size");
          } else {
            pickTile("service", opt.value, { moveType: opt.value, homeType: "", size: "" }, "property");
          }
        })}
      </div>
    );
  } else if (current === "property") {
    content = (
      <div key="property" className={stepClass}>
        <h2 className="isf-q" ref={headingRef} tabIndex={-1}>
          {isStorage ? "What are you storing?" : "What are you moving?"}
        </h2>
        {renderTileGrid(PROPERTY_OPTIONS, data.homeType, (opt) => {
          pickTile("property", opt.value, { homeType: opt.value, size: "" }, "size");
        })}
      </div>
    );
    nav = (
      <div className="isf-mini-nav">
        <button type="button" className="isf-back-whisper" onClick={back}>
          &larr; back
        </button>
      </div>
    );
  } else if (current === "size") {
    const sizeOpts = getSizeOptions(data.homeType);
    const title = data.homeType === "Office" ? "How many employees work there?" : "How many bedrooms?";
    content = (
      <div key="size" className={stepClass}>
        <h2 className="isf-q" ref={headingRef} tabIndex={-1}>{title}</h2>
        {renderTileGrid(sizeOpts, data.size, (opt) => {
          pickTile("size", opt.value, { size: opt.value }, "locations");
        })}
      </div>
    );
    nav = (
      <div className="isf-mini-nav">
        <button type="button" className="isf-back-whisper" onClick={back}>
          &larr; back
        </button>
      </div>
    );
  } else if (current === "locations") {
    const fromReady = validLocation(data.fromTown);
    const toReady = isStorage || data.notSureDest || !data.toTown.trim() || validLocation(data.toTown);
    const canContinue = fromReady && toReady;
    content = (
      <div key="locations" className={stepClass}>
        <h2 className="isf-q" ref={headingRef} tabIndex={-1}>
          {isStorage ? "Where are we picking up?" : "Where are you moving?"}
        </h2>
        <p className="isf-sub">A town or ZIP code, either works.</p>
        <div className="isf-fields">
          <div className="isf-field">
            <label htmlFor={`${uid}-from`}>{isStorage ? "Picking up from" : "Moving from"}</label>
            <div className="isf-input-wrap">
              <span className="isf-input-ico" aria-hidden="true"><Icon name="pin" size={16} /></span>
              <input
                id={`${uid}-from`}
                ref={inputRef}
                list={`${uid}-towns`}
                autoComplete="section-origin address-level2"
                maxLength={100}
                placeholder="Town or ZIP (e.g. Enfield, CT)"
                value={data.fromTown}
                onChange={(e) => { save({ fromTown: e.target.value }); setErr(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); advanceLocations(); } }}
              />
            </div>
          </div>
          {!isStorage && (
            <>
              <div className="isf-field">
                <label htmlFor={`${uid}-to`}>Moving to</label>
                <div className="isf-input-wrap">
                  <span className="isf-input-ico" aria-hidden="true"><Icon name="pin" size={16} /></span>
                  <input
                    id={`${uid}-to`}
                    list={`${uid}-towns`}
                    autoComplete="section-destination address-level2"
                    maxLength={100}
                    placeholder="Town or ZIP (e.g. Longmeadow, MA)"
                    value={data.notSureDest ? "" : data.toTown}
                    disabled={data.notSureDest}
                    onChange={(e) => { save({ toTown: e.target.value }); setErr(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); advanceLocations(); } }}
                  />
                </div>
              </div>
              <label className="isf-check" htmlFor={`${uid}-nosure`}>
                <input
                  type="checkbox"
                  id={`${uid}-nosure`}
                  checked={data.notSureDest}
                  onChange={(e) => { save({ notSureDest: e.target.checked, toTown: e.target.checked ? "" : data.toTown }); setErr(""); }}
                />
                <span>I don&apos;t know the destination yet</span>
              </label>
            </>
          )}
          <datalist id={`${uid}-towns`}>
            {NEARBY_TOWNS.map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>
        {err && <p className="isf-err" role="alert">{err}</p>}
      </div>
    );
    nav = (
      <div className="isf-nav">
        <button type="button" className="isf-btn-ghost" onClick={back}>
          <Icon name="back" size={15} strokeWidth={2.2} /> Back
        </button>
        <button type="button" className="isf-btn-primary" disabled={!canContinue} onClick={advanceLocations}>
          Continue &rsaquo;
        </button>
      </div>
    );
  } else if (current === "contact") {
    const dateChipLabel = data.dateChoice === "date" && data.moveDate ? formatShortDate(data.moveDate) : "Choose a date";
    const dateChipOn = data.dateChoice === "date" && (Boolean(data.moveDate) || showCal);
    content = (
      <form id={`${uid}-final-form`} key="contact" className={`${stepClass} isf-step-contact`} noValidate onSubmit={submitLead}>
        <h2 className="isf-q isf-q-contact" ref={headingRef} tabIndex={-1}>
          {isStorage
            ? "When do you need storage, and where should we send your estimate?"
            : "When are you moving, and where should we send your estimate?"}
        </h2>
        <div className="isf-when">
          <div className="isf-chips" role="group" aria-label="Move timing">
            <button
              type="button"
              className={`isf-chip${data.dateChoice === "asap" ? " on" : ""}`}
              onClick={() => { save({ dateChoice: "asap", moveDate: "" }); setShowCal(false); }}
            >
              {data.dateChoice === "asap" && <Icon name="check" size={12} strokeWidth={3} />}
              ASAP
            </button>
            <button
              type="button"
              className={`isf-chip isf-chip-date${dateChipOn ? " on" : ""}`}
              onClick={() => {
                save({ dateChoice: "date" });
                setShowCal((s) => !s);
              }}
            >
              <Icon name="calendar" size={13} strokeWidth={2} />
              {dateChipLabel}
            </button>
            <button
              type="button"
              className={`isf-chip${data.dateChoice === "planning" ? " on" : ""}`}
              onClick={() => { save({ dateChoice: "planning", moveDate: "" }); setShowCal(false); }}
            >
              {data.dateChoice === "planning" && <Icon name="check" size={12} strokeWidth={3} />}
              Not sure yet
            </button>
          </div>
          {renderCalendar()}
        </div>
        {showAdOffer && (
          <div className="isf-offer">
            <Icon name="box" size={20} />
            <span><strong>20 free moving boxes</strong> when you book a walk-through estimate.</span>
          </div>
        )}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
        <div className="isf-fields isf-fields-tight">
          <div className="isf-input-wrap">
            <span className="isf-input-ico" aria-hidden="true"><Icon name="user" size={16} /></span>
            <input
              id={`${uid}-name`}
              type="text"
              name="name"
              autoComplete="name"
              autoCapitalize="words"
              aria-label="Your name"
              maxLength={60}
              placeholder="Your name"
              value={data.fullName}
              onChange={(e) => { save({ fullName: e.target.value }); setErr(""); }}
            />
          </div>
          <div className="isf-input-wrap">
            <span className="isf-input-ico" aria-hidden="true"><Icon name="phone" size={16} /></span>
            <input
              id={`${uid}-phone`}
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              aria-label="Phone number"
              placeholder="(860) 555-0123"
              value={data.phone}
              onChange={(e) => { save({ phone: fmtPhone(e.target.value) }); setErr(""); }}
            />
          </div>
          <label className="isf-check" htmlFor={`${uid}-textOk`}>
            <input
              type="checkbox"
              id={`${uid}-textOk`}
              checked={data.textOk}
              onChange={(e) => save({ textOk: e.target.checked })}
            />
            <span>You can also text me about my estimate (optional)</span>
          </label>
        </div>
        {err && <p className="isf-err" role="alert">{err}</p>}
        <div className="isf-nav isf-nav-inline">
          <button type="button" className="isf-btn-ghost" onClick={back}>
            <Icon name="back" size={15} strokeWidth={2.2} /> Back
          </button>
          <button type="submit" className="isf-btn-primary isf-btn-submit" disabled={sending}>
            {sending ? "Sending..." : "Get My Free Estimate"}
          </button>
        </div>
        <p className="isf-fine">
          By tapping Get My Free Estimate, you agree that Castle Express Moving &amp; Storage may call you at this number about your move.
        </p>
      </form>
    );
  } else {
    const open = !followUp || followUp.open;
    const firstWord = data.fullName.trim().split(/\s+/)[0] || "there";
    const moving = [data.homeType, data.size].filter(Boolean).join(", ");
    const dateLabel =
      data.dateChoice === "date" && data.moveDate
        ? formatLongDate(data.moveDate)
        : data.dateChoice === "asap"
        ? "ASAP"
        : data.dateChoice === "planning"
        ? "Not sure yet"
        : "";
    const rows = [
      ["Service", data.moveType],
      ["Details", moving],
      ["From", data.fromTown],
      ["To", isStorage ? "Castle Storage" : data.notSureDest ? "Not sure yet" : data.toTown],
      ["Timing", dateLabel],
      ["Phone", data.phone],
    ].filter(([, v]) => v);
    content = (
      <div key="thanks" className="isf-success">
        <div className="isf-success-check" aria-hidden="true">
          <Icon name="check" size={34} strokeWidth={2.8} />
        </div>
        <h2 className="isf-q" ref={headingRef} tabIndex={-1}>
          Thanks, {firstWord}!
        </h2>
        <p className="isf-sub">
          {open
            ? "Keep your phone handy. Our Enfield team will call you shortly with your free estimate."
            : `Our office is closed right now. You are first on the list ${followUp.label}.`}
        </p>
        <dl className="isf-recap">
          {rows.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="isf-sub isf-call-line">
          Need us sooner?{" "}
          <a href={COMPANY.phoneLink}>888-553-4503</a>
        </p>
      </div>
    );
  }

  return (
    <div
      id="estimate-form"
      ref={cardRef}
      className={`isf-card${dark ? " isf-dark" : ""}${twoStep ? " isf-hero" : ""}${touched ? " isf-touched" : ""}`}
      data-step={current}
      aria-label="Free moving estimate"
      onPointerDown={() => { if (!touched) setTouched(true); }}
      onKeyDown={() => { if (!touched) setTouched(true); }}
    >
      {current !== "thanks" && (
        <>
          <div className="isf-progress" aria-hidden="true">
            <div className="isf-progress-bar">
              <div className="isf-progress-fill" style={{ transform: `translateX(${tally.pct - 100}%)` }}>
                <div className="isf-progress-tint" style={{ transform: `translateX(${100 - tally.pct}%)` }}>
                  {advancePulse > 0 && dir === "fwd" && <span key={`s-${advancePulse}`} className="isf-progress-shine" />}
                </div>
              </div>
            </div>
            <div className="isf-progress-rail" style={{ transform: `translateX(${tally.pct}%)` }}>
              <span key={`d-${advancePulse}-${dir}`} className={`isf-progress-dot${advancePulse > 0 && dir === "fwd" ? " isf-dot-anim" : ""}`} />
            </div>
          </div>
          <div
            className="isf-header"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(tally.pct)}
            aria-label="Estimate form progress"
          >
            <span className="isf-header-step">{tally.headerLabel}</span>
          </div>
        </>
      )}
      <div className="isf-body">{content}</div>
      {nav}
      {current === "service" && (
        <p className="isf-foot-note">
          <span className={`isf-dot${replyWindow === "now" ? " live" : ""}`} aria-hidden="true" />
          {RESPONSE_LINE[replyWindow || "now"]}
        </p>
      )}
    </div>
  );
}
