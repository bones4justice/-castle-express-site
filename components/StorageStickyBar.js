"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ALLOWED_PATHS = [
  "/",
  "/services",
  "/services/",
  "/piano-moving",
  "/piano-moving/",
  "/senior-moving",
  "/senior-moving/",
];

function isAllowedPage(path) {
  if (ALLOWED_PATHS.includes(path)) return true;
  if (path.startsWith("/services/") && path !== "/services/storage/" && path !== "/services/storage") return true;
  return false;
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function fireEvent(eventName) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, { page_path: window.location.pathname });
  }
}

export default function StorageStickyBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const impressionFired = useRef(false);

  const shouldRender = isAllowedPage(pathname);

  useEffect(() => {
    if (!shouldRender) return;
    if (getCookie("storage_bar_dismissed") === "1") {
      setDismissed(true);
      return;
    }

    impressionFired.current = false;
    setShow(false);
    setDismissed(false);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.5) {
        setShow(true);
        if (!impressionFired.current) {
          impressionFired.current = true;
          fireEvent("storage_bar_impression");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldRender, pathname]);

  if (!shouldRender || dismissed) return null;

  const handleDismiss = () => {
    setShow(false);
    setCookie("storage_bar_dismissed", "1", 7);
    fireEvent("storage_bar_dismissed");
    setTimeout(() => setDismissed(true), 350);
  };

  const handleClick = () => {
    fireEvent("storage_bar_click");
  };

  return (
    <div
      role="complementary"
      aria-label="Storage offer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        background: "#000000",
        color: "#FFFFFF",
        padding: "16px 24px",
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 16,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          {"\uD83D\uDCE6"} Need storage? First month free.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/storage-offer?utm_source=website&utm_medium=sticky_bar&utm_campaign=free-storage"
            onClick={handleClick}
            style={{
              display: "inline-block",
              background: "#FBCB0B",
              color: "#000000",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 6,
              textDecoration: "none",
              whiteSpace: "nowrap",
              minHeight: 44,
              lineHeight: "24px",
            }}
          >
            Learn More &rarr;
          </a>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss storage offer"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              fontSize: 20,
              lineHeight: 1,
              padding: "8px",
              cursor: "pointer",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &#x2715;
          </button>
        </div>
      </div>
    </div>
  );
}
