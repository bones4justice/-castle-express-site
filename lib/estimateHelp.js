export const CALLBACK_NOTE = "Our Enfield team will call you with your free estimate.";

export const TIMING_QUESTION = "When are you thinking about moving?";
export const TIMING_OPTIONS = [
  { t: "I have a date", s: "Pick your moving day.", i: "exact", save: { dateType: "Exact", timeframe: "" }, next: "date" },
  { t: "I have a rough timeframe", s: "A month or season is fine.", i: "flex", save: { dateType: "Flexible", moveDate: "" }, next: "timeframe" },
  { t: "Just planning", s: "My timing is still open.", i: "unsure", save: { dateType: "Not sure", moveDate: "", timeframe: "" }, next: "type" },
];

export function sizeStepFor(homeType) {
  if (homeType === "House") return "size-house";
  if (homeType === "Apartment") return "size-apartment";
  if (homeType === "Condo or townhouse") return "size-condo";
  return "size-other";
}
