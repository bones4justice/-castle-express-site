import { BRAND_ICON_SET } from "@/lib/brandIconSet";

// One official icon per service (lib/brandIconSet.js). Decorative by default:
// the label beside it names the thing. Pass dark on navy backgrounds for the
// white-outline version.
export default function BrandSetIcon({ name, size = 48, dark = false, ...p }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={dark ? "#FFFFFF" : "#141414"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      // Never a tap target: inside a button the drawing can be re-created by a
      // re-render between press and release, and the browser then drops the
      // click (seen on the estimate form's first tap). The parent gets the tap.
      style={{ pointerEvents: "none" }}
      {...p}
      dangerouslySetInnerHTML={{ __html: BRAND_ICON_SET[name] || "" }}
    />
  );
}
