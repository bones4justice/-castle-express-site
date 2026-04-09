"use client";
import { useState, useEffect } from "react";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function StoragePopup() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Don't show on storage-offer or services/storage pages
    const path = window.location.pathname;
    if (path.startsWith("/storage-offer") || path === "/services/storage/" || path === "/services/storage") return;

    // Don't show if already dismissed
    if (getCookie("ce_storage_popup") === "dismissed") return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    };

    // Show after 5 seconds
    const timer = setTimeout(show, 5000);

    // Show on exit intent
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setAnimate(false);
    setTimeout(() => setVisible(false), 300);
    setCookie("ce_storage_popup", "dismissed", 30);
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: animate ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        transition: "background 0.3s ease",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#000000",
          borderRadius: "12px",
          maxWidth: "480px",
          width: "100%",
          padding: "40px 32px 32px",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          transition: "all 0.3s ease",
          border: "1px solid rgba(251, 203, 11, 0.3)",
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            color: "#969a9d",
            fontSize: "24px",
            lineHeight: 1,
            padding: "4px 8px",
            cursor: "pointer",
            minHeight: "auto",
            minWidth: "auto",
          }}
        >
          &#x2715;
        </button>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(22px, 5vw, 28px)",
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Your First Month of Storage is On Us
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "var(--font-body), 'Merriweather', serif",
            fontSize: "15px",
            color: "#FFFFFF",
            lineHeight: 1.65,
            marginBottom: "14px",
          }}
        >
          Book a move with Castle Express and get your first month of
          climate-controlled storage FREE at our Enfield facility.
        </p>

        {/* Bold third line */}
        <p
          style={{
            fontFamily: "var(--font-body), 'Merriweather', serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#FBCB0B",
            lineHeight: 1.65,
            marginBottom: "24px",
          }}
        >
          We never raise your storage price. Ever.
        </p>

        {/* CTA button */}
        <a
          href="/storage-offer?utm_source=website&utm_medium=popup&utm_campaign=free-storage"
          onClick={() => setCookie("ce_storage_popup", "dismissed", 30)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            background: "#FBCB0B",
            color: "#000000",
            fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            padding: "14px 24px",
            borderRadius: "6px",
            border: "none",
            textDecoration: "none",
            marginBottom: "12px",
          }}
        >
          Tell Me More
        </a>

        {/* No thanks */}
        <button
          onClick={dismiss}
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            background: "none",
            border: "none",
            color: "#969a9d",
            fontFamily: "var(--font-body), 'Merriweather', serif",
            fontSize: "13px",
            padding: "8px",
            cursor: "pointer",
            textDecoration: "underline",
            minHeight: "auto",
          }}
        >
          No thanks
        </button>

        {/* Fine print */}
        <p
          style={{
            fontSize: "11px",
            color: "#969a9d",
            textAlign: "center",
            marginTop: "12px",
            lineHeight: 1.4,
          }}
        >
          With any booked move. New storage customers only.
        </p>
      </div>
    </div>
  );
}
