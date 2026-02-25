import { Nunito, Merriweather } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: {
    default: "Castle Express Moving & Storage | CT & MA Movers Since 2008",
    template: "%s | Castle Express Moving & Storage",
  },
  description: "Family-owned moving company serving Hartford County, CT and Western Massachusetts since 2008. Residential, commercial, packing, and climate-controlled storage. Flat-rate pricing, no hidden fees. A+ BBB. 4.9★ Google.",
  keywords: ["movers", "moving company", "Enfield CT", "Hartford CT", "Springfield MA", "storage", "packing", "local movers", "long distance movers"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://castleexpressmoving.com",
    siteName: "Castle Express Moving & Storage",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2008",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Flat-rate pricing, professional crews, 200+ 5-star reviews.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${merriweather.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
