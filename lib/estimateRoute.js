// Server only. ZIP centers are estimated coordinates, never driving mileage.
// data/us-zip-centers.json selects ZIP, town, state and coordinates from GeoNames'
// US postal data (https://download.geonames.org/export/zip/US.zip).
// GeoNames, https://www.geonames.org/ ; CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
import centers from "@/data/us-zip-centers.json";

const radians = (degrees) => degrees * Math.PI / 180;

// Towns can cover several ZIPs. Average their centers for an approximate
// distance. A bare town name resolves only when the state is unambiguous.
let towns;
function locationCenter(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const key = value.trim().toLowerCase().replace(/,/g, " ").replace(/\s+/g, " ");
  if (/^\d{5}$/.test(key)) return centers[key];
  if (!towns) {
    towns = new Map();
    const qualified = new Map();
    for (const [state, lat, lon, town] of Object.values(centers)) {
      const name = town.toLowerCase();
      const full = name + " " + state.toLowerCase();
      const entry = qualified.get(full) || { name, state, lat: 0, lon: 0, count: 0 };
      entry.lat += lat;
      entry.lon += lon;
      entry.count++;
      qualified.set(full, entry);
    }
    for (const [full, entry] of qualified) {
      const point = [entry.state, entry.lat / entry.count, entry.lon / entry.count];
      towns.set(full, point);
      towns.set(entry.name, towns.has(entry.name) ? null : point);
    }
  }
  return towns.get(key);
}

export function describeEstimateRoute(origin, destination, fallbackType = "Truck and crew") {
  const from = locationCenter(origin);
  const to = locationCenter(destination);
  if (!from || !to) {
    return { moveType: fallbackType, description: "Confirm route on callback" };
  }

  const [fromState, lat1, lon1] = from;
  const [toState, lat2, lon2] = to;
  const a = Math.sin(radians(lat2 - lat1) / 2) ** 2
    + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(radians(lon2 - lon1) / 2) ** 2;
  const miles = 3958.8 * 2 * Math.asin(Math.sqrt(Math.min(1, a)));
  const interstate = fromState !== toState;
  const moveType = interstate ? "Out of state" : miles < 35 ? "Local" : "In-state, 35+ miles";
  const points = /^\d{5}$/.test(origin) && /^\d{5}$/.test(destination) ? "ZIP centers" : "location centers";
  const description = `${fromState} to ${toState}, ${interstate ? "interstate" : "in-state"}, approx. ${Math.round(miles)} miles between ${points}`;
  return { moveType, description };
}
