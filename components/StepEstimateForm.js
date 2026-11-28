"use client";
import EstimateTownInput from "@/components/EstimateTownInput";
import { useState, useEffect, useRef, useCallback, useId } from "react";
import Image from "next/image";
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
import { COMPANY } from "@/content";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";
import { readVariantCookie } from "@/lib/lpAbTest";
import { geVariantForLead } from "@/lib/geAbTest";
import { sendGenerateLead } from "@/lib/leadEvents";
import BrandSetIcon from "@/components/BrandSetIcon";
import { BOX_OFFER_NOTE } from "@/components/AdBoxOffer";
import { responseWindow } from "@/lib/salesHours";

export { SM_MOVE_SIZE };

// /get-estimate/ standalone step form: same Dibs-style 5-step card as the
// sitewide EstimateForm, inside a focused landing shell with Castle Express
// branding, direct call link, and 20 free boxes offer on the final step.

const GA4 = "G-97Z4EHJM63";
const EVENT_LABEL = "get_estimate_step";
const LANDING = "get-estimate";
const MAX_DAYS_AHEAD = 540;

const HERO_IMG = { src: "/images/ge-hero-street.webp", width: 1000, height: 254 };

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
      style={{ pointerEvents: "none" }}
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

export default function StepEstimateForm() {
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
  const inFlight = useRef(false);
  const [followUp, setFollowUp] = useState(null);
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());
  const headingRef = useRef(null);
  const [invalidField, setInvalidField] = useState("");
  const seenSteps = useRef(new Set());
  const pickTimer = useRef(null);
  const currentRef = useRef("service");

  const save = (patch) => setData((d) => ({ ...d, ...patch }));

  const go = useCallback((id, { replace = false } = {}) => {
    const cur = currentRef.current;
    setTouched(true);
    setErr("");
    setInvalidField("");
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
    setInvalidField("");
    setPicked(null);
    setShowCal(false);
    setDir("back");
    const prev = hist[hist.length - 1];
    currentRef.current = prev;
    setCurrent(prev);
    setHist(hist.slice(0, -1));
  };

  useEffect(() => {
    if (!seenSteps.current.has(current)) {
      seenSteps.current.add(current);
      const { pct } = stepTally(current, data.moveType);
      track("step_view", {
        step_name: current,
        step_progress: Math.round(pct),
        form_location: "/get-estimate",
        ge_variant: geVariantForLead(document.cookie),
      });
    }
    if (current !== "service" && headingRef.current) {
      try { headingRef.current.focus({ preventScroll: true }); } catch { headingRef.current.focus(); }
    }
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [current, data.moveType]);

  useEffect(() => () => clearTimeout(pickTimer.current), []);

  const pickTile = (value, patch, nextStep) => {
    if (picked !== null) return;
    setTouched(true);
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

  const flagContactField = (field, message) => {
    setInvalidField(field);
    setErr(message);
    const input = document.getElementById(`${uid}-${field}`);
    input.focus({ preventScroll: true });
    input.scrollIntoView({ block: "center", behavior: "instant" });
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (sending || inFlight.current) return;
    const cleanedName = data.fullName.trim();
    if (cleanedName.length < 2) {
      flagContactField("name", "Please enter your name.");
      return;
    }
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      flagContactField("phone", "Please enter a 10-digit phone number.");
      return;
    }
    inFlight.current = true;
    setSending(true);
    setErr("");
    try {
      const sizeAnswer = data.size || (data.homeType === "Office" ? "Office" : "");
      const smSize = SM_MOVE_SIZE[sizeAnswer] || "";
      const timingNote =
        data.dateChoice === "date" && data.moveDate
          ? `Exact date (${data.moveDate})`
          : data.dateChoice === "asap"
          ? "ASAP"
          : data.dateChoice === "planning"
          ? "Not sure yet"
          : "Not specified";
      const destNote = isStorage ? "Castle Storage" : data.notSureDest ? "Destination TBD" : "";
      const notes = [
        "STEP FORM",
        data.moveType,
        data.homeType,
        sizeAnswer && `Size: ${sizeAnswer}`,
        `Timing: ${timingNote}`,
        destNote,
        `Text OK: ${data.textOk ? "yes" : "no"}`,
        BOX_OFFER_NOTE,
      ]
        .filter(Boolean)
        .join(" | ");

      const smPayload = {
        FullName: cleanedName,
        PhoneNumber: data.phone,
        UserOptIn: Boolean(data.textOk),
        Notes: notes,
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

      const leadRes = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "estimate",
          landing: LANDING,
          hp: honeypot,
          renderedAt: openedAt.current,
          formspree: {
            name: cleanedName,
            phone: data.phone,
            moveFrom: data.fromTown,
            moveTo: isStorage ? "Storage" : data.notSureDest ? "Not sure yet" : data.toTown,
            moveSize: sizeAnswer,
            moveDate: data.dateChoice === "date" ? data.moveDate : timingNote,
            ...attribution,
            landing: LANDING,
            moveType: data.moveType || "Local",
            homeType: data.homeType,
            dateType: timingNote,
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
      if (!res.s) {
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
        if (typeof window.oaiq === "function") {
          window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
        }
        sendGenerateLead(oaiEventId, {
          event_category: "form",
          event_label: EVENT_LABEL,
          lp_variant: lpVariant,
          ge_variant: geVariant,
          box_offer: "shown",
        });
        track("form_submission_success", {
          form_location: "/get-estimate",
          lp_variant: lpVariant,
          ge_variant: geVariant,
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
    } catch (error) {
      console.error("Lead submission error:", error);
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
              {opt.brand ? <BrandSetIcon name={opt.brand} size={34} /> : <Icon name={opt.icon} size={26} strokeWidth={1.75} />}
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
        <h1 className="isf-q" ref={headingRef} tabIndex={-1}>What can we help you with?</h1>
        {renderTileGrid(SERVICE_OPTIONS, data.moveType, (opt) => {
          if (opt.value === "Commercial") {
            pickTile(opt.value, { moveType: "Commercial", homeType: "Office", size: "" }, "size");
          } else {
            pickTile(opt.value, { moveType: opt.value, homeType: "", size: "" }, "property");
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
          pickTile(opt.value, { homeType: opt.value, size: "" }, "size");
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
          pickTile(opt.value, { size: opt.value }, "locations");
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
          <EstimateTownInput
            id={`${uid}-from`} label={isStorage ? "Picking up from" : "Moving from"}
            icon={<Icon name="pin" size={16} />} placeholder="Town or ZIP (e.g. Enfield, CT)"
            value={data.fromTown} onChange={(fromTown) => save({ fromTown })}
            error={!fromReady && (isStorage ? "Enter your pickup town or ZIP code." : "Enter the town or ZIP code you are moving from.")}
            onNext={() => {
              if (!fromReady) return;
              if (!isStorage && !data.notSureDest) document.getElementById(`${uid}-to`)?.focus();
              else advanceLocations();
            }}
          />
          {!isStorage && (
            <>
              <EstimateTownInput
                id={`${uid}-to`} label="Moving to" icon={<Icon name="pin" size={16} />}
                placeholder="Town or ZIP (e.g. Longmeadow, MA)" disabled={data.notSureDest}
                value={data.notSureDest ? "" : data.toTown} onChange={(toTown) => save({ toTown })}
                error={!toReady && "Enter a valid destination town or ZIP code."}
                onNext={() => { if (canContinue) advanceLocations(); }}
              />
              <label className="isf-check" htmlFor={`${uid}-nosure`}>
                <input
                  type="checkbox"
                  id={`${uid}-nosure`}
                  checked={data.notSureDest}
                  onChange={(e) => { save({ notSureDest: e.target.checked, toTown: e.target.checked ? "" : data.toTown }); setInvalidField(""); setErr(""); }}
                />
                <span>I don&apos;t know the destination yet</span>
              </label>
            </>
          )}
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
      <form key="contact" className={`${stepClass} isf-step-contact`} noValidate onSubmit={submitLead}>
        <h2 className="isf-q isf-q-contact" ref={headingRef} tabIndex={-1}>
          {isStorage
            ? "When do you need storage, and where should we send your estimate?"
            : "When are you moving, and where should we send your estimate?"}
        </h2>
        <div className="isf-fields isf-fields-tight">
          <div className="isf-input-wrap">
            <span className="isf-input-ico" aria-hidden="true"><Icon name="user" size={16} /></span>
            <input
              id={`${uid}-name`}
              type="text"
              name="name"
              aria-invalid={invalidField === "name"}
              aria-describedby={invalidField === "name" ? `${uid}-contact-error` : undefined}
              autoComplete="name"
              autoCapitalize="words"
              aria-label="Your name"
              maxLength={60}
              placeholder="Your name"
              value={data.fullName}
              onChange={(e) => { save({ fullName: e.target.value }); setInvalidField(""); setErr(""); }}
            />
          </div>
          {invalidField === "name" && <p id={`${uid}-contact-error`} className="isf-err" role="alert">{err}</p>}
          <div className="isf-input-wrap">
            <span className="isf-input-ico" aria-hidden="true"><Icon name="phone" size={16} /></span>
            <input
              id={`${uid}-phone`}
              type="tel"
              name="phone"
              aria-invalid={invalidField === "phone"}
              aria-describedby={invalidField === "phone" ? `${uid}-contact-error` : undefined}
              inputMode="tel"
              autoComplete="tel"
              aria-label="Phone number"
              placeholder="(860) 555-0123"
              value={data.phone}
              onChange={(e) => { save({ phone: fmtPhone(e.target.value) }); setInvalidField(""); setErr(""); }}
            />
          </div>
          {invalidField === "phone" && <p id={`${uid}-contact-error`} className="isf-err" role="alert">{err}</p>}
        </div>
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
        <div className="isf-offer">
          <Icon name="box" size={20} />
          <span><strong>20 free moving boxes</strong> when you book a walk-through estimate.</span>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
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
        {err && !invalidField && <p className="isf-err" role="alert">{err}</p>}
        <div className="isf-nav isf-nav-inline">
          <button type="button" className="isf-btn-ghost" onClick={back}>
            <Icon name="back" size={15} strokeWidth={2.2} /> Back
          </button>
          <button type="submit" className="isf-btn-primary isf-btn-submit" disabled={sending} aria-busy={sending}>
            {sending && <span className="isf-spinner" aria-hidden="true" />}
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
          Need us sooner? <a href={COMPANY.phoneLink}>888-553-4503</a>
        </p>
      </div>
    );
  }

  return (
    <div className="ge-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ge-shell">
        <header className="ge-top">
          <div className="ge-brand">
            <b>Castle Express</b>
            <span>Moving &amp; Storage</span>
            <i />
          </div>
          <a className="ge-call" href={COMPANY.phoneLink}>
            <span>Call us</span>
            <strong>888-553-4503</strong>
          </a>
        </header>

        <div
          className={`isf-card${touched ? " isf-touched" : ""}`}
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
                aria-label="Estimate progress"
              >
                <span className="isf-header-step">{tally.headerLabel}</span>
              </div>
            </>
          )}
          <div className="isf-body">{content}</div>
          {nav}
        </div>

        <div className="ge-below">
          <p className="ge-trust">Enfield, CT &middot; Family owned since 2011 &middot; {COMPANY.reviewAvg} stars ({COMPANY.reviewCount} Google reviews)</p>
          <Image
            className="ge-street"
            src={HERO_IMG.src}
            width={HERO_IMG.width}
            height={HERO_IMG.height}
            alt="A yellow Castle Express Moving & Storage truck parked on a neighborhood street between two houses"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

const CSS = `
.ge-page{background:#FDF8F2;color:#1A1A2E;font-family:var(--font-dm-sans),Arial,sans-serif;min-height:100vh;min-height:100dvh;-webkit-font-smoothing:antialiased}
.ge-page *{box-sizing:border-box}
.ge-shell{max-width:480px;margin:0 auto;padding:16px 16px 36px;display:flex;flex-direction:column;gap:14px}
.ge-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 4px}
.ge-brand{display:flex;flex-direction:column;line-height:1.05;min-width:0}
.ge-brand b{font-weight:800;font-size:clamp(15px,4.2vw,18px);letter-spacing:.01em;text-transform:uppercase;color:#1A1A2E;white-space:nowrap}
.ge-brand span{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5F6472;margin-top:3px;white-space:nowrap}
.ge-brand i{display:block;width:36px;height:4px;background:#FFC003;margin-top:5px;border-radius:2px}
.ge-call{display:flex;flex-direction:column;align-items:flex-end;text-decoration:none;color:#1A1A2E;font-size:11px;letter-spacing:.08em;text-transform:uppercase;line-height:1.2}
.ge-call strong{font-size:14.5px;font-weight:800;letter-spacing:0;font-variant-numeric:tabular-nums;white-space:nowrap}
.ge-below{display:flex;flex-direction:column;align-items:center;gap:12px;padding-top:4px}
.ge-trust{margin:0;text-align:center;font-size:12.5px;font-weight:600;color:#5F6472}
.ge-street{width:100%;max-width:420px;height:auto;display:block;border-radius:14px}
`;
