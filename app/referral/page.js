import Link from "next/link";
import { COMPANY } from "@/content";
import { Users, Truck, DollarSign, ArrowRight } from "@/components/Icons";

export const metadata = { title: "Golden Star Referral Program" };

const STEPS = [
  { step: "1", icon: <Users />, title: "Refer a Friend", desc: "Fill out the referral form with your friend's details." },
  { step: "2", icon: <Truck />, title: "We Handle the Move", desc: "Your referral gets VIP treatment and a great moving experience." },
  { step: "3", icon: <DollarSign />, title: "Get Paid 10%", desc: "Once the move is complete, we send you 10% of the job total." },
];

export default function ReferralPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Earn Cash</span></div>
        <h1 className="heading-2 text-white">Golden Star Referral Program</h1>
        <p className="body-md text-white-muted" style={{ maxWidth: 480, margin: "8px auto 0" }}>
          Know someone who's moving? Refer them to Castle Express and earn 10% of the job when their move is complete.
        </p>
      </section>

      <section className="section section-light">
        <div className="container-sm">
          <div className="grid-3" style={{ marginBottom: 48 }}>
            {STEPS.map((s) => (
              <div key={s.step} className="card" style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  width: 28, height: 28, borderRadius: "50%", background: "#D4A017",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 14,
                }}>{s.step}</div>
                <div style={{ color: "#D4A017", marginBottom: 12, marginTop: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8 }}>{s.title}</h3>
                <p className="body-sm text-gray">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 24, color: "#1A1A2E", marginBottom: 12 }}>Ready to Refer?</h2>
            <p className="body-md text-gray" style={{ maxWidth: 480, margin: "0 auto 24px" }}>
              Submit your referral below or call us at{" "}
              <a href={COMPANY.phoneLink} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> to let us know who's moving.
            </p>
            <Link href="/contact" className="btn btn-primary">Submit a Referral <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
