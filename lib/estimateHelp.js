import { SALES_HOURS, CLOSED_DATES } from "@/lib/salesHours";

export const CALLBACK_NOTE = "Our Enfield team will call you with your free estimate.";

export const SERVICE_OPTIONS = [
  { value: "Local", label: "Local", icon: "pin" },
  { value: "Long Distance", label: "Long Distance", icon: "route" },
  { value: "Storage", label: "Storage", icon: "box" },
  { value: "Commercial", label: "Commercial", icon: "commercial" },
];

export const PROPERTY_OPTIONS = [
  { value: "Apartment", label: "Apartment", icon: "apt" },
  { value: "Townhouse", label: "Townhouse", icon: "townhouse" },
  { value: "House", label: "House", icon: "house" },
  { value: "Office", label: "Office", icon: "office" },
];

export function getSizeOptions(homeType) {
  switch (homeType) {
    case "Apartment":
      return [
        { value: "Studio", label: "Studio", icon: "bed" },
        { value: "1 BR", label: "1 BR", icon: "bed" },
        { value: "2 BR", label: "2 BR", icon: "bed" },
        { value: "3+ BR", label: "3+ BR", icon: "bed" },
      ];
    case "Townhouse":
      return [
        { value: "1 BR", label: "1 BR", icon: "bed" },
        { value: "2 BR", label: "2 BR", icon: "bed" },
        { value: "3 BR", label: "3 BR", icon: "bed" },
        { value: "4+ BR", label: "4+ BR", icon: "bed" },
      ];
    case "House":
      return [
        { value: "2 BR", label: "2 BR", icon: "bed" },
        { value: "3 BR", label: "3 BR", icon: "bed" },
        { value: "4 BR", label: "4 BR", icon: "bed" },
        { value: "5+ BR", label: "5+ BR", icon: "bed" },
      ];
    case "Office":
      return [
        { value: "1-10 employees", label: "1-10", icon: "team" },
        { value: "11-30 employees", label: "11-30", icon: "team" },
        { value: "31-50 employees", label: "31-50", icon: "team" },
        { value: "50+ employees", label: "50+", icon: "team" },
      ];
    default:
      return [
        { value: "2 BR", label: "2 BR", icon: "bed" },
        { value: "3 BR", label: "3 BR", icon: "bed" },
        { value: "4 BR", label: "4 BR", icon: "bed" },
        { value: "5+ BR", label: "5+ BR", icon: "bed" },
      ];
  }
}

// Form size label -> the EXISTING SmartMoving move size with volume/weight.
// SmartMoving auto-creates a brand-new move size for any MoveSize string it
// does not recognize, so MoveSize is ONLY ever sent from this table. The
// customer's exact tap choice always rides in Notes too.
export const SM_MOVE_SIZE = {
  Studio: "1 Bedroom",
  "1 BR": "1 Bedroom",
  "2 BR": "2 Bedroom",
  "3 BR": "3 Bedroom",
  "3+ BR": "3 Bedroom",
  "4 BR": "4 Bedroom",
  "4+ BR": "4 Bedroom",
  "5+ BR": "4 Bedroom",
  "1-10 employees": "Office / Commercial",
  "11-30 employees": "Office / Commercial",
  "31-50 employees": "Office / Commercial",
  "50+ employees": "Office / Commercial",
  Office: "Office / Commercial",
};

export function stepTally(currentStep, moveType) {
  const skipsProperty = moveType === "Commercial";
  const total = skipsProperty ? 4 : 5;
  let position = 1;
  if (currentStep === "service") {
    position = 1;
  } else if (currentStep === "property") {
    position = 2;
  } else if (currentStep === "size") {
    position = skipsProperty ? 2 : 3;
  } else if (currentStep === "locations") {
    position = skipsProperty ? 3 : 4;
  } else {
    position = total;
  }
  const pct = Math.max(0, Math.min(100, (position / total) * 100));
  let headerLabel = `Step ${position} of ${total}`;
  if (position === 1) {
    headerLabel = `Step 1 of ${total} \u00B7 Takes 30 seconds`;
  } else if (position >= total) {
    headerLabel = `Step ${total} of ${total} \u00B7 Almost done`;
  }
  return { position, total, pct, headerLabel };
}

export function validLocation(value) {
  const v = String(value || "").trim();
  return /^\d{5}$/.test(v) || /\p{L}.*\p{L}/u.test(v);
}

export function fmtPhone(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d[0] === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function formatShortDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [, mm, dd] = iso.split("-").map(Number);
  return `${MONTHS[mm - 1].slice(0, 3)} ${dd}`;
}

export function formatLongDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [yy, mm, dd] = iso.split("-").map(Number);
  return `${MONTHS[mm - 1].slice(0, 3)} ${dd}, ${yy}`;
}

// "Monday morning" style label for the next business day, using the same
// days and closed dates as lib/salesHours.js. Never throws.
export function nextBusinessLabel(now = new Date()) {
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

// Clean 24x24 line icons matching the lightweight Dibs tile aesthetic.
export const ICONS = {
  pin: '<path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
  route: '<circle cx="6.5" cy="18" r="2.2"/><circle cx="17.5" cy="6" r="2.2"/><path d="M8.7 18h5.3a3 3 0 0 0 0-6H10a3 3 0 0 1 0-6h5.3"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/><path d="M8 5.25l8 4.5"/>',
  commercial: '<rect x="4" y="3" width="10" height="18" rx="1.5"/><path d="M14 9h5a1 1 0 0 1 1 1v11H14"/><path d="M7.5 7h3M7.5 10.5h3M7.5 14h3M16.5 13h1M16.5 16.5h1M9 21v-3"/>',
  apt: '<rect x="5" y="3" width="14" height="18" rx="1.8"/><path d="M9 7.5h1.5M13.5 7.5H15M9 11.5h1.5M13.5 11.5H15M9 15.5h1.5M13.5 15.5H15M10.5 21v-3h3v3"/>',
  townhouse: '<path d="M2.5 20.5V11l5-4 5 4v9.5M12.5 20.5V11l4.5-3.6 4.5 3.6v9.5"/><path d="M2 20.5h20M6.2 20.5v-4.2h2.6v4.2M15.7 20.5v-4.2h2.6v4.2"/>',
  house: '<path d="M3 11.5L12 4l9 7.5"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5.5h4V20"/>',
  office: '<rect x="4" y="4" width="16" height="17" rx="1.8"/><path d="M8.5 8.5h1.5M14 8.5h1.5M8.5 12.5h1.5M14 12.5h1.5M9.5 21v-4h5v4"/>',
  bed: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 14.5h18"/><path d="M6 11.5V9.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v2"/>',
  team: '<circle cx="9" cy="8.5" r="2.8"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="16.5" cy="9.5" r="2.2"/><path d="M15.5 14.2a4.5 4.5 0 0 1 5 4.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3.2v3.2M16 3.2v3.2"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5a7 7 0 0 1 14 0"/>',
  phone: '<path d="M6.5 4.5h3l1.4 3.6-1.9 1.3a11 11 0 0 0 5.6 5.6l1.3-1.9 3.6 1.4v3a1.8 1.8 0 0 1-1.8 1.8A13.8 13.8 0 0 1 4.7 6.3 1.8 1.8 0 0 1 6.5 4.5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
};
