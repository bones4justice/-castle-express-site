import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/Icons";
import data from "@/data/feeding-america.json";

export const metadata = {
  title: "Castle Express Gives Back: Feeding America Partnership",
  description: "Castle Express Moving & Storage donates $5 to Feeding America for every move we complete. Every $1 becomes 10 meals. See our live donation tracker.",
  alternates: { canonical: "/giving-back/" },
  openGraph: {
    title: "Castle Express Gives Back: Feeding America Partnership",
    description: "$5 per move to Feeding America. Every $1 becomes 10 meals. See the live tracker.",
    url: "/giving-back/",
  },
};

function fmtMoney(n) {
  return "$" + Number(n || 0).toLocaleString("en-US");
}

function fmtInt(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function fmtMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1, 1));
  return d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function currentYearMonth() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const C = {
  black: "#000000",
  white: "#FFFFFF",
  gold: "#FBCB0B",
  gray: "#969a9d",
  light: "#ebeced",
};

export default function GivingBackPage() {
  const months = [...(data.months || [])].sort((a, b) => a.month.localeCompare(b.month));
  const totalDonated = months.reduce((s, m) => s + (m.donated || 0), 0);
  const totalMatched = months.reduce((s, m) => s + (m.matched || 0), 0);
  const totalCombined = totalDonated + totalMatched;
  const mealsPerDollar = data.mealsPerDollar || 10;
  const totalMeals = totalCombined * mealsPerDollar;

  const nowYM = currentYearMonth();
  const currentMonth = months.find(m => m.month === nowYM);
  const currentMonthMatched = currentMonth ? (currentMonth.matched || 0) > 0 : false;
  const showActiveBanner = data.matchActive && currentMonthMatched;
  const anyMatchedHistory = totalMatched > 0;

  const monthsDesc = [...months].reverse();

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Castle Express Gives Back — Feeding America Partnership",
    "url": "https://www.castleexpressmoving.com/giving-back/",
    "description": "Castle Express Moving & Storage donates $5 to Feeding America for every move we complete. Tracker of monthly donations, matches, and meals provided.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Castle Express Moving & Storage",
      "url": "https://www.castleexpressmoving.com"
    },
    "about": {
      "@type": "NGO",
      "name": "Feeding America",
      "url": "https://www.feedingamerica.org/"
    },
    "publisher": {
      "@type": "MovingCompany",
      "name": "Castle Express Moving & Storage",
      "url": "https://www.castleexpressmoving.com"
    }
  };

  const fontHead = "var(--font-body), Merriweather, Georgia, serif";
  const fontBody = "var(--font-body), Merriweather, Georgia, serif";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Hero */}
      <section style={{ background: C.black, color: C.white, padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", border: `1px solid ${C.gold}`, borderRadius: 999, marginBottom: 24, color: C.gold, fontFamily: fontBody, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span>Castle Express Gives Back</span>
          </div>
          <h1 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, margin: "0 0 20px" }}>
            Every Move Helps Feed a Family
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.8, color: C.light, margin: "0 auto", maxWidth: 720 }}>
            Every move we complete provides <strong style={{ color: C.gold }}>50 meals</strong> to families through Feeding America. Here&apos;s how: we donate <strong style={{ color: C.gold }}>$5 to Feeding America</strong> for every move, and Feeding America turns every <strong style={{ color: C.gold }}>$1 into 10 meals</strong>.{showActiveBanner ? <> Right now <strong style={{ color: C.gold }}>{data.matchPartner}</strong> is matching every dollar we donate, so the impact is doubled.</> : ""} Here&apos;s our impact so far.
          </p>

          {showActiveBanner && (
            <div role="status" style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px", background: C.gold, color: C.black, borderRadius: 8, fontFamily: fontBody, fontWeight: 700, fontSize: 15, maxWidth: 640 }}>
              <span aria-hidden="true">&#128276;</span>
              <span>Donations doubled this month thanks to the {data.matchPartner} match</span>
            </div>
          )}
        </div>
      </section>

      {/* Live Counters */}
      <section style={{ background: C.white, color: C.black, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: "clamp(26px, 3.4vw, 36px)", textAlign: "center", margin: "0 0 8px" }}>
            Live Impact
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 15, color: C.gray, textAlign: "center", margin: "0 0 40px" }}>
            Updated as moves complete. Program start: {fmtMonth(data.programStartDate.slice(0, 7))}.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            <StatCard label="Castle Express Donated" value={fmtMoney(totalDonated)} />
            {anyMatchedHistory && (
              <StatCard label={`Matched by ${data.matchPartner}`} value={fmtMoney(totalMatched)} />
            )}
            <StatCard label="Combined Donation" value={fmtMoney(totalCombined)} />
            <StatCard label="Meals Provided" value={fmtInt(totalMeals)} accent />
          </div>

          {currentMonth && (
            <div style={{ marginTop: 36, padding: "24px 28px", background: C.light, borderRadius: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: fontBody, fontSize: 12, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                  This Month ({fmtMonth(currentMonth.month)})
                </div>
                <div style={{ fontFamily: fontHead, fontWeight: 900, fontSize: 28, color: C.black }}>
                  {fmtMoney((currentMonth.donated || 0) + (currentMonth.matched || 0))} donated &middot; {fmtInt(((currentMonth.donated || 0) + (currentMonth.matched || 0)) * mealsPerDollar)} meals
                </div>
              </div>
              {currentMonth.partial && (
                <span style={{ fontFamily: fontBody, fontSize: 13, color: C.gray, fontStyle: "italic" }}>
                  Partial month{currentMonth.note ? `. ${currentMonth.note}` : ""}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Monthly History Table */}
      <section style={{ background: C.light, color: C.black, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", margin: "0 0 32px" }}>
            Monthly History
          </h2>
          <div style={{ overflowX: "auto", background: C.white, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: fontBody, fontSize: 14, minWidth: 720 }}>
              <thead>
                <tr style={{ background: C.black, color: C.white }}>
                  <Th>Month</Th>
                  <Th align="right">Castle Donated</Th>
                  <Th align="right">Match</Th>
                  <Th align="right">Total</Th>
                  <Th align="right">Meals Provided</Th>
                </tr>
              </thead>
              <tbody>
                {monthsDesc.map((m, i) => {
                  const total = (m.donated || 0) + (m.matched || 0);
                  return (
                    <tr key={m.month} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.light}` }}>
                      <Td>
                        <div style={{ fontWeight: 700 }}>{fmtMonth(m.month)}</div>
                        {m.partial && (
                          <div style={{ fontSize: 12, color: C.gray, fontStyle: "italic", marginTop: 2 }}>
                            Partial month{m.note ? `. ${m.note}` : ""}
                          </div>
                        )}
                      </Td>
                      <Td align="right">{fmtMoney(m.donated || 0)}</Td>
                      <Td align="right">{(m.matched || 0) > 0 ? fmtMoney(m.matched) : <span style={{ color: C.gray }}>$0</span>}</Td>
                      <Td align="right"><strong>{fmtMoney(total)}</strong></Td>
                      <Td align="right">{fmtInt(total * mealsPerDollar)}</Td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: C.black, color: C.white }}>
                  <Td><strong>Lifetime Totals</strong></Td>
                  <Td align="right"><strong>{fmtMoney(totalDonated)}</strong></Td>
                  <Td align="right"><strong>{anyMatchedHistory ? fmtMoney(totalMatched) : "$0"}</strong></Td>
                  <Td align="right"><strong>{fmtMoney(totalCombined)}</strong></Td>
                  <Td align="right"><strong>{fmtInt(totalMeals)}</strong></Td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* About Feeding America */}
      <section style={{ background: C.white, color: C.black, padding: "72px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }}>
          <a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit Feeding America">
            <Image src="/images/feeding-america-logo.png" alt="Feeding America" width={160} height={160} style={{ objectFit: "contain" }} />
          </a>
          <div>
            <h2 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: "clamp(22px, 2.6vw, 28px)", margin: "0 0 14px" }}>
              About Feeding America
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.8, color: C.black, margin: "0 0 14px" }}>
              Feeding America is the largest hunger-relief organization in the United States, with a nationwide network of food banks, food pantries, and meal programs that serve every community. Their efficiency is what makes our pledge meaningful: every dollar we send delivers {mealsPerDollar} meals to families who need them.
            </p>
            <a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: fontBody, fontWeight: 700, color: C.black, borderBottom: `2px solid ${C.gold}`, textDecoration: "none", paddingBottom: 2 }}>
              Visit feedingamerica.org
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.gold, color: C.black, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: "clamp(28px, 3.6vw, 40px)", margin: "0 0 14px" }}>
            Book your move, feed a family.
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.7, margin: "0 0 28px", color: C.black }}>
            When you choose Castle Express Moving &amp; Storage, your move puts food on someone&apos;s table. Get a free estimate and add your move to the tracker.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.black, color: C.white, fontFamily: fontBody, fontWeight: 700, fontSize: 16, padding: "16px 28px", borderRadius: 8, textDecoration: "none" }}>
            Get a Free Estimate <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, accent = false }) {
  return (
    <div style={{
      background: accent ? "#000000" : "#FFFFFF",
      color: accent ? "#FFFFFF" : "#000000",
      border: `1px solid ${accent ? "#000000" : "#ebeced"}`,
      borderRadius: 12,
      padding: "28px 22px",
      textAlign: "center"
    }}>
      <div style={{
        fontFamily: "var(--font-body), Merriweather, Georgia, serif",
        fontWeight: 900,
        fontSize: "clamp(28px, 3.4vw, 40px)",
        lineHeight: 1.05,
        color: accent ? "#FBCB0B" : "#000000",
        marginBottom: 8,
        letterSpacing: "-0.01em"
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "var(--font-body), Merriweather, Georgia, serif",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: accent ? "#ebeced" : "#969a9d"
      }}>
        {label}
      </div>
    </div>
  );
}

function Th({ children, align = "left" }) {
  return (
    <th style={{ padding: "14px 18px", textAlign: align, fontFamily: "var(--font-body), Merriweather, Georgia, serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {children}
    </th>
  );
}

function Td({ children, align = "left" }) {
  return (
    <td style={{ padding: "16px 18px", textAlign: align, verticalAlign: "top" }}>
      {children}
    </td>
  );
}
