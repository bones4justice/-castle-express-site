/*
 * ═══════════════════════════════════════════════════════
 *  CASTLE EXPRESS - SITE CONTENT
 *  Edit this file to update any text on the site.
 *  Save and push to GitHub → Vercel deploys automatically.
 * ═══════════════════════════════════════════════════════
 */

export const COMPANY = {
  name: "Castle Express Moving & Storage",
  shortName: "Castle Express",
  phone: "1-888-553-4503",
  phoneLink: "tel:18885534503",
  address: "4 Niblick Rd, Unit A",
  city: "Enfield",
  state: "CT",
  zip: "06082",
  fullAddress: "4 Niblick Rd, Unit A, Enfield, CT 06082",
  email: "info@castleexpressmoving.com",
  founded: 2008,
  hours: "24 hours a day, 7 days a week",

  // Licensing
  mc: "MC-990616",
  usdot: "2307446",
  ctPermit: "C-1768",
  fmcsaUrl: "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=2307446",

  // Social
  facebook: "https://www.facebook.com/cemoving",
  instagram: "https://www.instagram.com/castleexpressmovingandstorage/",
  tiktok: "https://www.tiktok.com/@castleexpressmovi",
  linkedin: "https://www.linkedin.com/in/joseph-caronna-767a616",

  // Stats
  reviewCount: "200+",
  reviewAvg: "4.9",
  truckCount: "7",
  facilitySize: "10,000",
};

export const SERVICES = [
  {
    id: "residential",
    title: "Residential Moving",
    shortDesc: "Local and long-distance home moves. Houses, apartments, condos, senior relocations, and downsizing—handled with care.",
    fullDesc: "Whether you're moving across town or across the state, we make home moves smooth, efficient, and stress-free. Houses, apartments, condos, townhouses, senior relocations, and downsizing—we've done it all.",
    features: [
      "Local & long-distance moves",
      "Senior relocations & downsizing",
      "Apartment & condo specialists",
      "Furniture disassembly/reassembly",
    ],
    popular: true,
  },
  {
    id: "commercial",
    title: "Commercial & Office Moving",
    shortDesc: "Office and business relocations with minimal downtime. We plan around your schedule so your business keeps running.",
    fullDesc: "Your business can't afford downtime. Castle Express plans your office relocation around your schedule with clear timelines, professional crews, and organized execution.",
    features: [
      "Office relocations",
      "Business & retail moves",
      "Minimal downtime planning",
      "IT & furniture coordination",
    ],
  },
  {
    id: "packing",
    title: "Full-Service Packing",
    shortDesc: "Full-service or partial packing. We bring the materials, the manpower, and the expertise to protect every item.",
    fullDesc: "Short on time or energy? Our trained packers use the best materials and techniques to safeguard your items. Choose full or partial packing based on your needs.",
    features: [
      "Professional packing materials",
      "Full or partial packing",
      "Fragile item specialty",
      "Supplies delivered to your door",
    ],
  },
  {
    id: "storage",
    title: "Climate-Controlled Storage",
    shortDesc: "Short and long-term storage in our secure Enfield, CT facility. Clean, climate-controlled, and accessible.",
    fullDesc: "Our secure facility in Enfield, CT offers clean, climate-controlled storage for short or long-term needs. Ideal between closings, during renovations, or for downsizing.",
    features: [
      "Climate-controlled environment",
      "Short & long-term options",
      "Secure, clean facility",
      "Convenient Enfield location",
    ],
  },
  {
    id: "specialty",
    title: "Specialty Moving",
    shortDesc: "Piano, gun safe, fine art, and white-glove deliveries. Special items need special handling.",
    fullDesc: "Heavy safes, pianos, fine art, and delicate deliveries require special handling. Our specialty team has the equipment, training, and care to move it safely.",
    features: [
      "Piano moving",
      "Gun safe & fire safe",
      "Final-mile white glove delivery",
      "Heavy & oversized items",
    ],
  },
];

export const SERVICE_AREAS = {
  "Enfield, CT Hub": [
    "Enfield, CT", "Bloomfield, CT", "East Granby, CT", "East Windsor, CT",
    "Ellington, CT", "Granby, CT", "Simsbury, CT", "Somers, CT",
    "Suffield, CT", "Windsor, CT", "Windsor Locks, CT",
  ],
  "Glastonbury, CT Hub": [
    "Glastonbury, CT", "Avon, CT", "Farmington, CT", "Newington, CT",
    "Tolland, CT", "Vernon, CT", "West Hartford, CT", "Wethersfield, CT",
  ],
  "Western Massachusetts": [
    "Springfield, MA", "Agawam, MA",
  ],
};

// Flat list for homepage chips
export const ALL_CITIES = Object.values(SERVICE_AREAS).flat().map(c => c.replace(/, (CT|MA)$/, ''));

export const REVIEWS = [
  {
    name: "Sarah M.",
    text: "Castle Express was amazing! On time, professional, and handled everything with care. The pricing was fair with zero hidden fees.",
  },
  {
    name: "James T.",
    text: "Joe and his team went above and beyond. They worked around our double closing and held our stuff an extra night. Couldn't recommend them enough.",
  },
  {
    name: "Linda R.",
    text: "Third time using Castle Express for family moves. They're fast, careful, and always a pleasure to work with. True professionals.",
  },
  {
    name: "Mike D.",
    text: "The crew showed up early, worked hard, and finished ahead of schedule. They were careful with our furniture and super friendly. Best moving experience I've had.",
  },
  {
    name: "Karen P.",
    text: "Joe, Penny and all the guys involved in our move were so great. Communication was quick and they were very accommodating with rescheduling our unload.",
  },
  {
    name: "Tom W.",
    text: "The movers were fantastic—very friendly, showed up 15 minutes early, and were very amenable to my specific needs. Would definitely recommend them.",
  },
];

export const FAQ = [
  {
    q: "What's included in my estimate?",
    a: "Loading, transport, and unloading at your new home. Packing and storage are available as add-on services.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend 2–3 weeks in advance, especially during busy seasons (May–September). Last-minute moves? Call us—we'll do our best to accommodate.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We're fully licensed (USDOT 2307446, CT Permit C-1768) and insured for your protection and peace of mind.",
  },
  {
    q: "Do I need to tip the movers?",
    a: "Tips are never required. But if you're happy with the service, we recommend $5–$10 per mover per billed hour.",
  },
  {
    q: "What if I need to change my move date?",
    a: "Contact us as soon as possible and we'll give you the next best date for your move. We're flexible and understand plans change.",
  },
];

export const MOVE_SIZES = [
  "Small / Studio",
  "1 Bedroom Apt",
  "1 Bedroom House",
  "2 Bedroom Apt",
  "2 Bedroom House",
  "3 Bedroom Apt",
  "3 Bedroom House",
  "4+ Bedroom",
  "Office / Commercial",
  "Piano / Gun Safe",
  "Other / Small Move",
];

export const LEAD_SOURCES = [
  "Google Search",
  "Google Ad",
  "Facebook",
  "Instagram",
  "YouTube",
  "Thumbtack",
  "TikTok",
  "BBB",
  "Referral",
  "Repeat Customer",
];

export const ABOUT_TEXT = {
  intro: `In the heart of Windsor Locks, Connecticut, Joseph "Joe" Caronna grew up in a family that valued hard work and service. From paper routes to lawn care to working in his family's grocery store, Joe learned early that treating people right was the foundation of any good business.`,
  
  middle: `After earning his bachelor's degree in business from Western New England University, Joe honed his skills at a high-end furniture store, where he discovered a passion for delivering not just products—but exceptional experiences. That passion became Castle Express Moving & Storage.`,
  
  growth: `Starting with labor-only jobs loading PODS, the company quickly evolved into a fully licensed, full-service moving operation. By 2023, Castle Express was operating a fleet of seven trucks out of a 10,000 square-foot facility in Enfield, CT—a far cry from the storage yard where it all began.`,
  
  values: `As a dedicated father of three, Joe built Castle Express on strong family values and a commitment to community. His dedication to personal growth—through business coaching, coursework, and continuous self-development—shaped a company culture centered on improvement, teamwork, and genuine care. Today, Castle Express is more than a moving company. It's a trusted partner for local and long-distance moves, secure storage solutions, and white-glove delivery services.`,
  
  mission: `"To deliver professional, efficient, and stress-free moving and storage solutions—combining competitive pricing with a 5-star customer experience, one family at a time."`,
};
