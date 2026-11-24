// Server only. ZIP centers are estimated coordinates, never driving mileage.
// data/us-zip-centers.json selects ZIP, state and coordinates from GeoNames'
// US postal data (https://download.geonames.org/export/zip/US.zip).
// GeoNames, https://www.geonames.org/ ; CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
import centers from "@/data/us-zip-centers.json";

const radians = (degrees) => degrees * Math.PI / 180;

export function describeEstimateRoute(fromZip, toZip) {
  const from = /^\d{5}$/.test(fromZip) && centers[fromZip];
  const to = /^\d{5}$/.test(toZip) && centers[toZip];
  if (!from || !to) {
    return { moveType: "Truck and crew", description: "Confirm route on callback" };
  }

  const [fromState, lat1, lon1] = from;
  const [toState, lat2, lon2] = to;
  const a = Math.sin(radians(lat2 - lat1) / 2) ** 2
    + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(radians(lon2 - lon1) / 2) ** 2;
  const miles = 3958.8 * 2 * Math.asin(Math.sqrt(Math.min(1, a)));
  const interstate = fromState !== toState;
  const moveType = interstate ? "Out of state" : miles < 35 ? "Local" : "In-state, 35+ miles";
  const description = `${fromState} to ${toState}, ${interstate ? "interstate" : "in-state"}, approx. ${Math.round(miles)} miles between ZIP centers`;
  return { moveType, description };
}
