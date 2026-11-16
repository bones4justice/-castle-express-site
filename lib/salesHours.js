// Sales response hours: drives the "we reply within 20 minutes" promise on
// the estimate form and its thank-you screen. Outside these hours the site
// says we will reach out first thing the next business morning instead.
//
// EDIT HERE: closed days are treated as out of hours all day. Add a year's
// dates before it starts (format YYYY-MM-DD, in Connecticut time).
export const CLOSED_DATES = [
  // Thanksgiving Day
  "2026-11-26",
  "2027-11-25",
  "2028-11-23",
  // Christmas Day
  "2026-12-25",
  "2027-12-25",
  "2028-12-25",
  // New Year's Day
  "2027-01-01",
  "2028-01-01",
  "2029-01-01",
];

// Monday to Friday, 6:00 AM to 5:00 PM, America/New_York.
export const SALES_HOURS = {
  timeZone: "America/New_York",
  days: [1, 2, 3, 4, 5], // 0 = Sunday ... 6 = Saturday
  openHour: 6, // 6:00 AM
  closeHour: 17, // 5:00 PM (closed from 5:00 PM on)
};

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// Wall-clock parts in the sales time zone, independent of the visitor's own
// time zone. Pure and window-free so scripts can test it in plain node.
function partsInZone(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23",
  });
  const p = {};
  for (const { type, value } of fmt.formatToParts(date)) p[type] = value;
  return {
    ymd: `${p.year}-${p.month}-${p.day}`,
    weekday: WEEKDAYS[p.weekday],
    hour: Number(p.hour) % 24,
  };
}

// True during sales response hours. Never throws; on any error it answers
// true so the site falls back to the long-standing 20 minute wording.
export function isWithinSalesHours(date = new Date()) {
  try {
    const { ymd, weekday, hour } = partsInZone(date, SALES_HOURS.timeZone);
    if (CLOSED_DATES.includes(ymd)) return false;
    if (!SALES_HOURS.days.includes(weekday)) return false;
    return hour >= SALES_HOURS.openHour && hour < SALES_HOURS.closeHour;
  } catch {
    return true;
  }
}
