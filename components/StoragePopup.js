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
    const path = window.location.pathname;
    if (path.startsWith("/storage-offer") || path === "/services/storage/" || path === "/services/storage") return;

    if (getCookie("ce_storage_popup") === "dismissed") return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    };

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setAnimate(false);
    setTimeout(() => setVisible(false), 350);
    setCookie("ce_storage_popup", "dismissed", 30);
  };

  if (!visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Storage offer notification"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 9999,
        maxWidth: "400px",
        width: "calc(100% - 24px)",
        margin: "0 12px 0 12px",
        background: "#000000",
        color: "#FFFFFF",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        border: "1px solid rgba(251, 203, 11, 0.3)",
        borderBottom: "none",
        boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.4)",
        padding: "24px 24px 20px",
        transform: animate ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Close button */}
      <button
        onClick={dismiss}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          color: "#969a9d",
          fontSize: "20px",
          lineHeight: 1,
          padding: "6px 10px",
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
          fontFamily: "var(--font-heading), 'Merriweather', serif",
          fontWeight: 900,
          fontSize: "28px",
          color: "#FBCB0B",
          lineHeight: 1.1,
          letterSpacing: "0.01em",
          marginBottom: "12px",
          paddingRight: "24px",
        }}
      >
        NEED STORAGE?
      </h2>

      {/* Subheadline */}
      <p
        style={{
          fontFamily: "var(--font-body), 'Merriweather', serif",
          fontSize: "13px",
          color: "#ebeced",
          lineHeight: 1.6,
          marginBottom: "10px",
        }}
      >
        Book a move with Castle Express and get your first month of climate-controlled storage FREE.
      </p>

      {/* Bold gold line */}
      <p
        style={{
          fontFamily: "var(--font-body), 'Merriweather', serif",
          fontSize: "13px",
          fontWeight: 700,
          color: "#FBCB0B",
          lineHeight: 1.55,
          marginBottom: "16px",
        }}
      >
        We never raise your price. Ever.
      </p>

      {/* CTA */}
      <a
        href="/storage-offer?utm_source=website&utm_medium=popup&utm_campaign=free-storage"
        onClick={() => setCookie("ce_storage_popup", "dismissed", 30)}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          background: "#FBCB0B",
          color: "#000000",
          fontFamily: "var(--font-heading), 'Merriweather', serif",
          fontWeight: 700,
          fontSize: "14px",
          padding: "12px 20px",
          borderRadius: "6px",
          border: "none",
          textDecoration: "none",
          marginBottom: "10px",
        }}
      >
        Learn More
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
          fontSize: "12px",
          padding: "4px",
          cursor: "pointer",
          textDecoration: "underline",
          minHeight: "auto",
          marginBottom: "8px",
        }}
      >
        No thanks
      </button>

      {/* Fine print */}
      <p
        style={{
          fontSize: "10px",
          color: "#969a9d",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        With any booked move. New storage customers only.
      </p>
    </div>
  );
}
