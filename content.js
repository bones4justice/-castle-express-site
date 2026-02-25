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

export const CITY_PAGES = {
  "enfield-ct": {
    name: "Enfield", state: "CT", fullName: "Enfield, CT",
    hub: "Enfield, CT Hub",
    headline: "Enfield's Most Trusted Moving Company",
    intro: "Castle Express is headquartered right here in Enfield at 4 Niblick Rd. As your neighbors, we take extra pride in every local move — whether you're relocating across town or heading out of state.",
    features: ["Same-day availability for local Enfield moves", "Headquartered at 4 Niblick Rd — minutes from your door", "Deep knowledge of every Enfield neighborhood"],
    nearby: ["Somers", "Suffield", "East Windsor", "Windsor Locks", "Ellington"],
  },
  "bloomfield-ct": {
    name: "Bloomfield", state: "CT", fullName: "Bloomfield, CT",
    hub: "Enfield, CT Hub",
    headline: "Professional Movers Serving Bloomfield, CT",
    intro: "From the historic homes near Filley Park to newer developments along Cottage Grove Road, Castle Express knows Bloomfield inside and out. Our crews handle narrow driveways, steep stairs, and tight turns with care.",
    features: ["Experience with Bloomfield's older homes and tight layouts", "Quick dispatch from our Enfield headquarters", "Full packing and storage available"],
    nearby: ["West Hartford", "Windsor", "Simsbury", "Avon", "Glastonbury"],
  },
  "east-granby-ct": {
    name: "East Granby", state: "CT", fullName: "East Granby, CT",
    hub: "Enfield, CT Hub",
    headline: "Moving Services in East Granby, CT",
    intro: "East Granby's rural charm comes with unique moving challenges — long driveways, country roads, and homes tucked into hillsides. Castle Express crews are experienced with the area and handle every detail.",
    features: ["Experience navigating East Granby's rural properties", "Just minutes away from our Enfield base", "Flexible scheduling for seasonal moves"],
    nearby: ["Granby", "Simsbury", "Suffield", "Windsor Locks", "Bloomfield"],
  },
  "east-windsor-ct": {
    name: "East Windsor", state: "CT", fullName: "East Windsor, CT",
    hub: "Enfield, CT Hub",
    headline: "Trusted Movers in East Windsor, CT",
    intro: "Whether you're moving from a condo off Route 5 or a farmhouse on Scantic Road, Castle Express delivers the same professional, flat-rate service East Windsor residents have trusted since 2008.",
    features: ["Familiar with East Windsor neighborhoods and condo complexes", "Short drive from our Enfield headquarters", "Flat-rate pricing with no surprises"],
    nearby: ["Enfield", "Ellington", "Somers", "Windsor Locks", "Vernon"],
  },
  "ellington-ct": {
    name: "Ellington", state: "CT", fullName: "Ellington, CT",
    hub: "Enfield, CT Hub",
    headline: "Ellington's Go-To Moving Company",
    intro: "Ellington families choose Castle Express for our careful handling, honest pricing, and crews who respect your home. From Crystal Lake neighborhoods to Pinney Street, we've moved them all.",
    features: ["Experienced with Ellington's residential neighborhoods", "Climate-controlled storage at our nearby facility", "Crews trained for both rural and suburban properties"],
    nearby: ["Somers", "Vernon", "Tolland", "East Windsor", "Enfield"],
  },
  "granby-ct": {
    name: "Granby", state: "CT", fullName: "Granby, CT",
    hub: "Enfield, CT Hub",
    headline: "Reliable Moving Services in Granby, CT",
    intro: "Granby's mix of classic New England colonials and modern builds requires movers who pay attention. Castle Express crews protect hardwood floors, navigate narrow staircases, and treat every piece of furniture like their own.",
    features: ["Careful with Granby's historic and custom homes", "Full-service packing and unpacking available", "Consistent flat-rate pricing"],
    nearby: ["East Granby", "Simsbury", "Suffield", "Bloomfield", "Avon"],
  },
  "simsbury-ct": {
    name: "Simsbury", state: "CT", fullName: "Simsbury, CT",
    hub: "Enfield, CT Hub",
    headline: "Simsbury's Preferred Moving Company",
    intro: "From the estates along West Mountain Road to the condos in Simsbury Center, Castle Express handles Simsbury moves with the professionalism this community expects. Fully licensed, A+ BBB rated, and family-owned.",
    features: ["Experienced with Simsbury's upscale properties and estates", "White-glove handling for high-value items", "Princess Packing™ available for pre-move packing"],
    nearby: ["Avon", "Granby", "Bloomfield", "Farmington", "East Granby"],
  },
  "somers-ct": {
    name: "Somers", state: "CT", fullName: "Somers, CT",
    hub: "Enfield, CT Hub",
    headline: "Professional Movers for Somers, CT",
    intro: "Just minutes from our Enfield home base, Somers is one of our most frequently served communities. Our crews know the back roads, the neighborhoods, and exactly how to get your move done efficiently.",
    features: ["One of our closest service areas — fast response times", "Experienced with Somers' varied property types", "No fuel surcharges for local Somers moves"],
    nearby: ["Enfield", "Ellington", "East Windsor", "Stafford Springs", "Tolland"],
  },
  "suffield-ct": {
    name: "Suffield", state: "CT", fullName: "Suffield, CT",
    hub: "Enfield, CT Hub",
    headline: "Moving Services in Suffield, CT",
    intro: "Suffield's tree-lined streets and historic district deserve movers who take care. Castle Express has been moving Suffield families for years — protecting antiques, navigating old staircases, and handling every detail.",
    features: ["Careful with Suffield's historic homes and antiques", "Just 10 minutes from our Enfield headquarters", "Commercial and residential moves available"],
    nearby: ["Enfield", "East Granby", "Granby", "Windsor Locks", "Agawam"],
  },
  "windsor-ct": {
    name: "Windsor", state: "CT", fullName: "Windsor, CT",
    hub: "Enfield, CT Hub",
    headline: "Trusted Moving Company in Windsor, CT",
    intro: "As Connecticut's first town, Windsor has a rich history — and homes to match. Castle Express crews handle everything from downtown condos to sprawling properties along the Connecticut River with professionalism and care.",
    features: ["Familiar with Windsor's diverse housing stock", "Quick access via I-91 from our Enfield base", "Full-service moves including packing and storage"],
    nearby: ["Bloomfield", "East Granby", "Windsor Locks", "Suffield", "West Hartford"],
  },
  "windsor-locks-ct": {
    name: "Windsor Locks", state: "CT", fullName: "Windsor Locks, CT",
    hub: "Enfield, CT Hub",
    headline: "Windsor Locks Moving & Storage",
    intro: "Right next door to our Enfield headquarters, Windsor Locks is one of our fastest-response service areas. Whether you're near the canal or off Route 75, we'll get you moved quickly and professionally.",
    features: ["Fastest response time — right next to our home base", "Experience with Windsor Locks condos and single-family homes", "Storage solutions available at our nearby facility"],
    nearby: ["Enfield", "Suffield", "East Granby", "Windsor", "East Windsor"],
  },
  "glastonbury-ct": {
    name: "Glastonbury", state: "CT", fullName: "Glastonbury, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Glastonbury's Premier Moving Service",
    intro: "Glastonbury is one of our busiest markets — and for good reason. From the upscale homes in Minnechaug to the townhouses on Main Street, Castle Express delivers the careful, professional moves this community demands.",
    features: ["High volume of Glastonbury moves — we know the area well", "Dispatch from our Glastonbury-area hub", "White-glove service for high-value homes"],
    nearby: ["Wethersfield", "Newington", "West Hartford", "Farmington", "Vernon"],
  },
  "avon-ct": {
    name: "Avon", state: "CT", fullName: "Avon, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Professional Movers in Avon, CT",
    intro: "Avon's beautiful properties deserve movers who match the standard. Castle Express provides meticulous, flat-rate moving services — no hidden fees, no corner-cutting, just professional crews who protect your home and belongings.",
    features: ["Experience with Avon's luxury properties", "Princess Packing™ available for pre-move day packing", "Flat-rate pricing — your estimate is your price"],
    nearby: ["Simsbury", "Farmington", "Bloomfield", "Granby", "West Hartford"],
  },
  "farmington-ct": {
    name: "Farmington", state: "CT", fullName: "Farmington, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Farmington Moving Services",
    intro: "From the Farmington Valley to the Unionville section, Castle Express has been helping Farmington families relocate with confidence since 2008. Fully licensed, insured, and A+ BBB rated.",
    features: ["Serving all Farmington neighborhoods including Unionville", "Experienced with both residential and commercial moves", "Climate-controlled storage available"],
    nearby: ["Avon", "Simsbury", "Newington", "West Hartford", "Bloomfield"],
  },
  "newington-ct": {
    name: "Newington", state: "CT", fullName: "Newington, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Newington's Trusted Moving Company",
    intro: "Newington's mix of split-levels, raised ranches, and newer construction means every move is different. Castle Express crews adapt to the property and get the job done right — every time.",
    features: ["Experienced with Newington's diverse home styles", "Easy access via Route 175 and I-91", "Competitive flat-rate pricing for local moves"],
    nearby: ["Wethersfield", "West Hartford", "Farmington", "Glastonbury", "Bloomfield"],
  },
  "tolland-ct": {
    name: "Tolland", state: "CT", fullName: "Tolland, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Moving Company Serving Tolland, CT",
    intro: "Tolland's spacious properties and wooded lots require movers who can handle long driveways and large homes. Castle Express brings the right equipment, the right crew size, and the right attitude to every Tolland move.",
    features: ["Equipped for Tolland's larger suburban properties", "Flexible scheduling including weekends", "Full packing services available"],
    nearby: ["Vernon", "Ellington", "Somers", "East Windsor", "Glastonbury"],
  },
  "vernon-ct": {
    name: "Vernon", state: "CT", fullName: "Vernon, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Professional Movers in Vernon, CT",
    intro: "Whether you're moving from the Rockville section or a home near Fox Hill, Castle Express provides the same reliable, professional service Vernon families have come to count on.",
    features: ["Serving all Vernon neighborhoods including Rockville", "Quick access from both our Enfield and Glastonbury hubs", "No hidden fees — flat-rate pricing guaranteed"],
    nearby: ["Tolland", "Ellington", "East Windsor", "Glastonbury", "Wethersfield"],
  },
  "west-hartford-ct": {
    name: "West Hartford", state: "CT", fullName: "West Hartford, CT",
    hub: "Glastonbury, CT Hub",
    headline: "West Hartford's Preferred Movers",
    intro: "West Hartford is one of Connecticut's most sought-after communities — and Castle Express is one of its most trusted movers. From the Center to Bishops Corner, we handle every move with care and professionalism.",
    features: ["High volume of West Hartford moves — deep local experience", "Skilled with the area's older homes, tight streets, and walk-ups", "Princess Packing™ and full packing services available"],
    nearby: ["Bloomfield", "Newington", "Farmington", "Avon", "Wethersfield"],
  },
  "wethersfield-ct": {
    name: "Wethersfield", state: "CT", fullName: "Wethersfield, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Moving Services in Wethersfield, CT",
    intro: "As one of Connecticut's oldest towns, Wethersfield has homes that require extra care — and Castle Express delivers. Our crews are trained to handle antiques, narrow doorways, and the unique character of historic properties.",
    features: ["Expertise with Wethersfield's historic Old Wethersfield homes", "Careful handling of antiques and delicate items", "Flat-rate pricing with no surprises"],
    nearby: ["Glastonbury", "Newington", "West Hartford", "Farmington", "Vernon"],
  },
  "springfield-ma": {
    name: "Springfield", state: "MA", fullName: "Springfield, MA",
    hub: "Western Massachusetts",
    headline: "Springfield, MA Moving & Storage",
    intro: "Castle Express proudly serves Springfield and the greater Pioneer Valley. Whether you're moving from Forest Park, the South End, or anywhere in between, our Connecticut-based crews deliver the same professional, licensed service across the border.",
    features: ["Licensed for Connecticut-to-Massachusetts moves", "Experience with Springfield's multi-family and single-family homes", "Storage available at our Enfield, CT facility"],
    nearby: ["Agawam", "Enfield", "Suffield", "Somers", "Windsor Locks"],
  },
  "agawam-ma": {
    name: "Agawam", state: "MA", fullName: "Agawam, MA",
    hub: "Western Massachusetts",
    headline: "Agawam, MA Moving Services",
    intro: "Just across the Connecticut border, Agawam is a quick trip from our Enfield headquarters. Castle Express brings the same licensed, insured, flat-rate moving service that Hartford County residents have trusted since 2008.",
    features: ["Just over the CT border — fast response from Enfield", "Licensed for interstate moves between CT and MA", "Serving Agawam, Feeding Hills, and surrounding areas"],
    nearby: ["Springfield", "Suffield", "Enfield", "Granby", "East Granby"],
  },
};

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
