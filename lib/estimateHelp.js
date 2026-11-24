export const HELP_QUESTION = "What kind of help do you need?";
export const CALLBACK_NOTE = "Our Enfield team will call you with your free estimate.";

export const HELP_OPTIONS = [
  {
    t: "A truck and moving crew",
    s: "We bring the truck and move your belongings.",
    i: "truck",
    save: { moveType: "Truck and crew" },
    next: "zip2",
  },
  {
    t: "A crew to load or unload",
    s: "You provide the truck or container.",
    i: "lift",
    save: { moveType: "Labor only", homeType: "", size: "", toZip: "" },
    next: "zip1",
  },
];

export function validMoveZips(origin, destination) {
  return /^\d{5}$/.test(origin) && (destination === "" || /^\d{5}$/.test(destination));
}
