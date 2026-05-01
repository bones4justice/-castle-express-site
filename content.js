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
  address: "4 Niblick Rd Unit A",
  city: "Enfield",
  state: "CT",
  zip: "06082",
  fullAddress: "4 Niblick Rd Unit A, Enfield, CT 06082",
  email: "info@castleexpressmoving.com",
  founded: 2013,
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
  truckCount: "5",
  facilitySize: "5,000",
};

export const SERVICES = [
  {
    id: "residential",
    slug: "residential-moving",
    title: "Residential Moving",
    shortDesc: "Local and long-distance home moves. Houses, apartments, condos, senior relocations, and downsizing - handled with care.",
    fullDesc: "Whether you're moving across town or across the state, we make home moves smooth, efficient, and stress-free. Houses, apartments, condos, townhouses, senior relocations, and downsizing - we've done it all.",
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
    slug: "commercial-moving",
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
    slug: "packing-services",
    title: "Full-Service Packing",
    shortDesc: "Full-service or partial packing. We bring the materials, the manpower, and the expertise to protect every item.",
    fullDesc: "Short on time or energy? Our experienced packers use the best materials and techniques to safeguard your items. Choose full or partial packing based on your needs.",
    features: [
      "Professional packing materials",
      "Full or partial packing",
      "Fragile item specialty",
      "Supplies delivered to your door",
    ],
  },
  {
    id: "storage",
    slug: "storage",
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
    slug: "specialty-moving",
    title: "Specialty Moving",
    shortDesc: "Piano, gun safe, fine art, and white-glove deliveries. Special items need special handling.",
    fullDesc: "Heavy safes, pianos, fine art, and delicate deliveries require special handling. Our specialty team has the equipment and experience to move it safely.",
    features: [
      "Piano moving",
      "Gun safe & fire safe",
      "Final-mile white glove delivery",
      "Heavy & oversized items",
    ],
  },
  {
    id: "longdistance",
    slug: "long-distance-moving",
    title: "Long Distance Moving",
    shortDesc: "Licensed interstate movers serving CT, MA, and the East Coast. Flat-rate pricing, no surprises.",
    fullDesc: "Castle Express is licensed for interstate moves (USDOT 2307446, MC-990616). We handle long distance relocations with flat-rate pricing, experienced crews, and full packing available.",
    features: [
      "Licensed interstate moves",
      "Flat-rate pricing",
      "East Coast coverage",
      "Full packing available",
    ],
  },
];

export const SERVICE_PAGES = {
  "residential-moving": {
    id: "residential",
    title: "Residential Moving",
    headline: "Your Home Move, Handled With Care",
    metaTitle: "Residential Moving Services in CT & MA | Castle Express Moving & Storage",
    metaDesc: "Residential movers serving Hartford County, CT and Western MA since 2013. Houses, apartments, condos, and senior relocations. 200+ five-star reviews. (888) 553-4503",
    heroImage: "/images/truck-residential.jpg",
    intro: "Moving is one of life's biggest transitions  -  and Castle Express has been helping Connecticut and Massachusetts families navigate it since 2013. Whether you're moving across town or across the state, our professional crews handle every detail so you can focus on settling into your new home.",
    sections: [
      {
        heading: "What's Included in Every Residential Move",
        items: [
          "Pre-move walkthrough and detailed estimate  -  no surprises on move day",
          "Professional loading with furniture pads, shrink wrap, and floor protection",
          "Safe transport in our clean, well-maintained fleet",
          "Careful unloading and furniture placement in your new home",
          "Furniture disassembly and reassembly as needed",
        ],
      },
      {
        heading: "Types of Home Moves We Handle",
        items: [
          "Single-family homes  -  from starter homes to large estates",
          "Apartments and condos  -  including walk-ups and elevator buildings",
          "Townhouses and multi-level homes",
          "Senior relocations and downsizing  -  patient, respectful crews",
          "Double closings  -  we can hold your belongings overnight if needed",
          "Local moves within CT and MA, plus long-distance relocations",
        ],
      },
      {
        heading: "Senior Moving Services",
        items: [
          "Moving a parent or loved one out of a longtime family home requires patience, care, and clear communication. Whether it is a downsizing move, a transition to assisted living, or a relocation closer to family, our experienced crews handle senior moves with the attention they deserve. Learn more about our dedicated [senior moving services](/senior-moving/).",
        ],
      },
      {
        heading: "Apartment Moving",
        items: [
          "Studio apartments, walk-ups, high-rise buildings with elevator reservations, tight hallways, and limited parking  -  our crews handle apartment moves of every size across Hartford County and Western Massachusetts. We bring floor runners to protect common areas and coordinate with building management on timing and access.",
        ],
      },
      {
        heading: "Single-Item and Furniture Delivery",
        items: [
          "Need one piece of furniture moved across town or delivered from a store? We handle single-item furniture deliveries alongside our full-service moves. Couches, dressers, dining tables, bedroom sets, and any large item that will not fit in your vehicle  -  we can pick it up and deliver it for you.",
        ],
      },
    ],
    callout: "Every residential move includes padded furniture protection, floor coverings, and a dedicated crew leader who manages your move from start to finish.",
    faq: [
      { q: "How far in advance should I book?", a: "We recommend 2-3 weeks, especially during peak season (May-September). We accommodate last-minute moves when possible  -  just call." },
      { q: "Do you charge by the hour?", a: "Yes, we charge hourly, but we do a detailed inventory and move analysis so our estimates are accurate within 10%. No surprises on move day." },
      { q: "Can you handle stairs and tight spaces?", a: "Absolutely. Our crews are experienced with walk-ups, narrow doorways, spiral staircases, and tight hallways." },
      { q: "Do you move apartments?", a: "Yes. We move apartments of all sizes, from studios to multi-bedroom units. We handle elevator reservations, building access coordination, and floor protection for common areas." },
      { q: "Do you offer senior moving services?", a: "Yes. We provide dedicated senior moving services for downsizing, assisted living transitions, and estate moves. Visit our senior moving page for details." },
    ],
    relatedServices: ["packing-services", "storage", "specialty-moving"],
    relatedPosts: ["/blog/how-to-move-step-by-step-guide/", "/blog/packing-tips-from-professional-movers/"],
    photo1: "/images/truck-aframe.webp",
    photo2: "/images/joe-with-customers.jpg",
  },
  "commercial-moving": {
    id: "commercial",
    title: "Commercial & Office Moving",
    headline: "Commercial and Office Moving in Connecticut",
    metaTitle: "Commercial & Office Moving in Connecticut | Castle Express Moving & Storage",
    metaDesc: "Commercial and office movers serving CT and Western MA. Minimal downtime, experienced crews, and planning around your business schedule. 200+ reviews. (888) 553-4503",
    heroImage: "/images/truck-brick-building.webp",
    intro: "Your business doesn't stop for a move  -  and neither do we. Castle Express plans and executes commercial relocations around your schedule, minimizing disruption to your operations and getting your team back to work fast.",
    sections: [
      {
        heading: "Commercial Moving Services",
        items: [
          "Office relocations  -  desks, cubicles, conference rooms, and common areas",
          "Retail and storefront moves",
          "Medical and dental office relocations",
          "Warehouse and industrial moves",
          "IT equipment coordination  -  servers, workstations, and networking gear",
          "After-hours and weekend scheduling available",
        ],
      },
      {
        heading: "Our Commercial Moving Process",
        items: [
          "Initial walkthrough and space assessment with your team",
          "Custom move plan with timeline and crew assignments",
          "Labeling system for desks, departments, and floors",
          "Professional packing of office equipment and files",
          "Setup and placement at your new location",
          "Post-move walkthrough to confirm everything is in place",
        ],
      },
      {
        heading: "Office Moving Services",
        items: [
          "Office furniture disassembly and reassembly  -  desks, workstations, modular systems, and executive furniture",
          "IT equipment handling  -  safe disconnection, transport, and setup of workstations, servers, and networking gear",
          "Cubicle and conference room teardown  -  full breakdown and reinstallation at your new location",
          "Minimizing business downtime  -  detailed scheduling built around your operations so your team can get back to work fast",
          "Weekend and after-hours office moves  -  Friday evening and weekend scheduling available so move day does not interrupt your business",
          "Labeling and floor plan coordination  -  every piece of furniture and equipment ends up exactly where it belongs",
        ],
      },
    ],
    callout: "We've relocated offices, retail stores, and medical practices across Connecticut and Western Massachusetts  -  always on time, always on budget.",
    faq: [
      { q: "Can you move us after business hours?", a: "Yes. We offer evening and weekend scheduling to minimize disruption to your business." },
      { q: "Do you handle IT equipment?", a: "We coordinate with your IT team to safely disconnect, transport, and reconnect workstations and servers." },
      { q: "How do you handle a multi-floor office?", a: "We create a detailed floor plan with labeling systems so every item ends up in the right spot at your new location." },
      { q: "How much does it cost to move an office in Connecticut?", a: "Office moving costs depend on the size of the office, amount of furniture and equipment, number of floors, and whether you need after-hours or weekend service. We provide free on-site estimates for all commercial moves. Contact us and we will walk through your space and give you a straightforward number." },
      { q: "Can you move our office over a weekend to avoid business disruption?", a: "Yes. Most of our office moves happen on Friday evenings and weekends specifically to minimize downtime. We work with your schedule to make sure your team can walk in Monday morning and get back to work." },
    ],
    relatedServices: ["residential-moving", "storage", "specialty-moving"],
    relatedPosts: ["/blog/how-to-move-step-by-step-guide/", "/blog/ultimate-moving-checklist-connecticut/"],
    photo1: "/images/truck-brick-building.webp",
    photo2: "/images/crew-commercial.webp",
  },
  "packing-services": {
    id: "packing",
    title: "Packing Services",
    headline: "Professional Packing. Every Item Protected.",
    metaTitle: "Full-Service Packing for Your Move | Castle Express Moving & Storage CT",
    metaDesc: "Full-service and partial packing for your move. All materials included. Princess Packing™ white-glove service available. Serving Hartford County CT & Western MA. Call 1-888-553-4503.",
    heroImage: "/images/truck-loading.webp",
    intro: "Packing is the most time-consuming part of any move  -  and the part where damage is most likely to happen. Castle Express offers both full-service and partial packing by experienced professionals who know how to protect your belongings.",
    sections: [
      {
        heading: "Packing Options",
        items: [
          "Full-service packing  -  we pack your entire home, room by room",
          "Partial packing  -  we handle the kitchen, fragile items, or specific rooms",
          "Princess Packing™  -  our boutique white-glove service, completed before move day",
          "Unpacking services available at your new home",
        ],
      },
      {
        heading: "Materials & Techniques",
        items: [
          "Double-walled boxes for heavy items and dishes",
          "Bubble wrap and newsprint for fragile items",
          "Wardrobe boxes for hanging clothes",
          "Custom crating for artwork, mirrors, and oversized items",
          "Shrink wrap for upholstered furniture",
          "Clear labeling system for easy unpacking",
        ],
      },
    ],
    callout: "Looking for a premium experience? Princess Packing™ is our boutique white-glove packing service  -  your home packed by an experienced team before move day even begins. Starting at $595.",
    calloutLink: "/princess-packing.html",
    calloutLabel: "Learn About Princess Packing™",
    faq: [
      { q: "Do I need to provide boxes and materials?", a: "No. We bring everything  -  boxes, tape, bubble wrap, newsprint, and wardrobe boxes. It's all included in your packing quote." },
      { q: "How long does packing take?", a: "A typical 3-bedroom home takes 4-6 hours for a full pack. Larger homes may require a full day." },
      { q: "What's the difference between standard packing and Princess Packing?", a: "Standard packing happens on move day. Princess Packing™ is a separate service completed before your move  -  by a dedicated team, with boutique-level care and room-by-room labeling." },
    ],
    relatedServices: ["residential-moving", "commercial-moving", "storage"],
    relatedPosts: ["/blog/packing-tips-from-professional-movers/", "/blog/ultimate-moving-checklist-connecticut/"],
    photo1: "/images/packed-truck.webp",
    photo2: "/images/princess-packing-crew.jpg",
  },
  "storage": {
    id: "storage",
    title: "Climate-Controlled Storage",
    headline: "Moving and Storage Services in Connecticut",
    metaTitle: "Climate-Controlled Storage in Enfield, CT | Castle Express Moving & Storage",
    metaDesc: "Secure, climate-controlled storage at our 5,000 sq ft Enfield facility. We never raise your price. Free first month with your move. Call (888) 553-4503",
    heroImage: "/images/storage-crates.webp",
    intro: "Need somewhere safe for your belongings? Our secure, climate-controlled facility in Enfield, CT keeps your items protected  -  whether you need storage for a week between closings or several months during a renovation.",
    sections: [
      {
        heading: "Storage Features",
        items: [
          "Climate-controlled environment  -  no extreme heat, cold, or humidity",
          "Secure wooden vault storage  -  your items in dedicated, numbered containers",
          "24/7 facility monitoring",
          "Clean, well-maintained warehouse space",
          "Convenient Enfield, CT location off I-91",
        ],
      },
      {
        heading: "When You Might Need Storage",
        items: [
          "Between closings  -  your old home closes before your new one is ready",
          "Home renovations or remodeling projects",
          "Downsizing  -  hold items while you decide what to keep",
          "Staging your home for sale",
          "Seasonal storage for businesses",
          "Long-term storage during extended travel or relocation",
        ],
      },
    ],
    callout: "Our numbered wooden vault system means your belongings are organized and protected  -  not stacked on a warehouse floor. Each vault is assigned to your account and accessible when you need it.",
    faq: [
      { q: "Is your storage climate-controlled?", a: "Yes. Our Enfield facility maintains a stable environment year-round to protect your belongings from temperature and humidity damage." },
      { q: "How does pricing work?", a: "Storage is billed monthly based on the number of vaults you need. We'll estimate this during your move consultation." },
      { q: "Can I access my items?", a: "Yes. Contact us to schedule access to your vault during business hours." },
    ],
    relatedServices: ["residential-moving", "commercial-moving", "packing-services"],
    relatedPosts: ["/blog/benefits-of-climate-controlled-storage/", "/blog/what-to-do-with-furniture-when-liquidating-an-estate-in-connecticut/"],
    photo1: "/images/storage-crates.webp",
    photo2: "/images/truck-loading.webp",
  },
  "specialty-moving": {
    id: "specialty",
    title: "Specialty Moving",
    headline: "Special Items Need Special Handling",
    metaTitle: "Specialty Movers in CT | Pianos, Safes & Fine Art | Castle Express",
    metaDesc: "Specialty movers for pianos, gun safes, fine art, and white-glove deliveries. Serving Hartford County CT & Western MA. Licensed & insured. Call 1-888-553-4503.",
    heroImage: "/images/truck-tobacco-barn.jpg",
    intro: "Some items can't go on a regular moving truck without special preparation. Castle Express has the equipment and experience to safely move pianos, gun safes, fine art, antiques, and other high-value or oversized items.",
    sections: [
      {
        heading: "Specialty Items We Move",
        items: [
          "Pianos  -  uprights, baby grands, and concert grands",
          "Gun safes and fire safes  -  including staircase and basement extraction",
          "Fine art, sculptures, and framed pieces",
          "Antique furniture requiring extra protection",
          "Pool tables and hot tubs",
          "Heavy machinery and commercial equipment",
        ],
      },
      {
        heading: "Our Specialty Moving Process",
        items: [
          "Pre-move assessment  -  we evaluate the item, the path, and any obstacles",
          "Custom protection  -  padding, wrapping, and crating as needed",
          "Specialized equipment  -  piano boards, heavy-duty dollies, stair climbers",
          "Experienced crew  -  our specialty team handles these items regularly",
          "Placement at destination  -  positioned exactly where you want it",
        ],
      },
    ],
    callout: "Moving a piano or safe is not a DIY job. These items require specific equipment and technique to move safely without damaging your home or the item itself. Let our specialty crew handle it.",
    faq: [
      { q: "How much does it cost to move a piano?", a: "Pricing depends on the type of piano, number of stairs, and distance. Contact us for a specific quote." },
      { q: "Can you move a gun safe from a basement?", a: "Yes. We have stair climbers and experienced crews who regularly handle basement safe extractions." },
      { q: "Do you provide custom crating?", a: "Yes. For fine art, mirrors, and fragile oversized items, we build custom crates to ensure safe transport." },
    ],
    relatedServices: ["residential-moving", "commercial-moving", "storage"],
    relatedPosts: ["/blog/how-to-move-a-sleep-number-bed/", "/blog/how-to-move-a-hyperbaric-oxygen-chamber/"],
    photo1: "/images/truck-tobacco-barn.jpg",
    photo2: "/images/truck-aframe.webp",
  },
};

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
    text: "The movers were fantastic - very friendly, showed up 15 minutes early, and were very amenable to my specific needs. Would definitely recommend them.",
  },
];

export const CITY_PAGES = {
  "enfield-ct": {
    name: "Enfield", state: "CT", fullName: "Enfield, CT",
    hub: "Enfield, CT Hub",
    headline: "Enfield's Most Trusted Moving Company",
    intro: "Castle Express is headquartered right here in Enfield at 4 Niblick Rd. As your neighbors, we take extra pride in every local move  -  whether you're relocating across town or heading out of state.",
    features: ["Same-day availability for local Enfield moves", "Headquartered at 4 Niblick Rd  -  minutes from your door", "Deep knowledge of every Enfield neighborhood"],
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
    intro: "East Granby's rural charm comes with unique moving challenges  -  long driveways, country roads, and homes tucked into hillsides. Castle Express crews are experienced with the area and handle every detail.",
    features: ["Experience navigating East Granby's rural properties", "Just minutes away from our Enfield base", "Flexible scheduling for seasonal moves"],
    nearby: ["Granby", "Simsbury", "Suffield", "Windsor Locks", "Bloomfield"],
  },
  "east-windsor-ct": {
    name: "East Windsor", state: "CT", fullName: "East Windsor, CT",
    hub: "Enfield, CT Hub",
    headline: "Trusted Movers in East Windsor, CT",
    intro: "Whether you're moving from a condo off Route 5 or a farmhouse on Scantic Road, Castle Express delivers the same professional, reliable, professionally estimated service East Windsor residents have trusted since 2013.",
    features: ["Familiar with East Windsor neighborhoods and condo complexes", "Short drive from our Enfield headquarters", "Accurate estimates with no surprises"],
    nearby: ["Enfield", "Ellington", "Somers", "Windsor Locks", "Vernon"],
  },
  "ellington-ct": {
    name: "Ellington", state: "CT", fullName: "Ellington, CT",
    hub: "Enfield, CT Hub",
    headline: "Ellington's Go-To Moving Company",
    intro: "Ellington families choose Castle Express for our careful handling, honest pricing, and crews who respect your home. From Crystal Lake neighborhoods to Pinney Street, we've moved them all.",
    features: ["Experienced with Ellington's residential neighborhoods", "Climate-controlled storage at our nearby facility", "Crews experienced in both rural and suburban properties"],
    nearby: ["Somers", "Vernon", "Tolland", "East Windsor", "Enfield"],
  },
  "granby-ct": {
    name: "Granby", state: "CT", fullName: "Granby, CT",
    hub: "Enfield, CT Hub",
    headline: "Reliable Moving Services in Granby, CT",
    intro: "Granby's mix of classic New England colonials and modern builds requires movers who pay attention. Castle Express crews protect hardwood floors, navigate narrow staircases, and treat every piece of furniture like their own.",
    features: ["Careful with Granby's historic and custom homes", "Full-service packing and unpacking available", "Accurate, transparent pricing"],
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
    features: ["One of our closest service areas  -  fast response times", "Experienced with Somers' varied property types", "No fuel surcharges for local Somers moves"],
    nearby: ["Enfield", "Ellington", "East Windsor", "Stafford Springs", "Tolland"],
  },
  "suffield-ct": {
    name: "Suffield", state: "CT", fullName: "Suffield, CT",
    hub: "Enfield, CT Hub",
    headline: "Moving Services in Suffield, CT",
    intro: "Suffield's tree-lined streets and historic district deserve movers who take care. Castle Express has been moving Suffield families for years  -  protecting antiques, navigating old staircases, and handling every detail.",
    features: ["Careful with Suffield's historic homes and antiques", "Just 10 minutes from our Enfield headquarters", "Commercial and residential moves available"],
    nearby: ["Enfield", "East Granby", "Granby", "Windsor Locks", "Agawam"],
  },
  "windsor-ct": {
    name: "Windsor", state: "CT", fullName: "Windsor, CT",
    hub: "Enfield, CT Hub",
    headline: "Trusted Moving Company in Windsor, CT",
    intro: "As Connecticut's first town, Windsor has a rich history  -  and homes to match. Castle Express crews handle everything from downtown condos to sprawling properties along the Connecticut River with professionalism and care.",
    features: ["Familiar with Windsor's diverse housing stock", "Quick access via I-91 from our Enfield base", "Full-service moves including packing and storage"],
    nearby: ["Bloomfield", "East Granby", "Windsor Locks", "Suffield", "West Hartford"],
  },
  "windsor-locks-ct": {
    name: "Windsor Locks", state: "CT", fullName: "Windsor Locks, CT",
    hub: "Enfield, CT Hub",
    headline: "Windsor Locks Moving & Storage",
    intro: "Right next door to our Enfield headquarters, Windsor Locks is one of our fastest-response service areas. Whether you're near the canal or off Route 75, we'll get you moved quickly and professionally.",
    features: ["Fastest response time  -  right next to our home base", "Experience with Windsor Locks condos and single-family homes", "Storage solutions available at our nearby facility"],
    nearby: ["Enfield", "Suffield", "East Granby", "Windsor", "East Windsor"],
  },
  "glastonbury-ct": {
    name: "Glastonbury", state: "CT", fullName: "Glastonbury, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Glastonbury's Premier Moving Service",
    intro: "Glastonbury is one of our busiest markets  -  and for good reason. From the upscale homes in Minnechaug to the townhouses on Main Street, Castle Express delivers the careful, professional moves this community demands.",
    features: ["High volume of Glastonbury moves  -  we know the area well", "Dispatch from our Glastonbury-area hub", "White-glove service for high-value homes"],
    nearby: ["Wethersfield", "Newington", "West Hartford", "Farmington", "Vernon"],
  },
  "avon-ct": {
    name: "Avon", state: "CT", fullName: "Avon, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Professional Movers in Avon, CT",
    intro: "Avon's beautiful properties deserve movers who match the standard. Castle Express provides meticulous moving services with accurate, upfront estimates  -  no hidden fees, no corner-cutting, just professional crews who protect your home and belongings.",
    features: ["Experience with Avon's luxury properties", "Princess Packing™ available for pre-move day packing", "Accurate estimates  -  your quote is what you can expect to pay"],
    nearby: ["Simsbury", "Farmington", "Bloomfield", "Granby", "West Hartford"],
  },
  "farmington-ct": {
    name: "Farmington", state: "CT", fullName: "Farmington, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Farmington Moving Services",
    intro: "From the Farmington Valley to the Unionville section, Castle Express has been helping Farmington families relocate with confidence since 2013. Fully licensed, insured, and A+ BBB rated.",
    features: ["Serving all Farmington neighborhoods including Unionville", "Experienced with both residential and commercial moves", "Climate-controlled storage available"],
    nearby: ["Avon", "Simsbury", "Newington", "West Hartford", "Bloomfield"],
  },
  "newington-ct": {
    name: "Newington", state: "CT", fullName: "Newington, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Newington's Trusted Moving Company",
    intro: "Newington's mix of split-levels, raised ranches, and newer construction means every move is different. Castle Express crews adapt to the property and get the job done right  -  every time.",
    features: ["Experienced with Newington's diverse home styles", "Easy access via Route 175 and I-91", "Competitive, transparent pricing for local moves"],
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
    features: ["Serving all Vernon neighborhoods including Rockville", "Quick access from both our Enfield and Glastonbury hubs", "No hidden fees  -  accurate, detailed estimates every time"],
    nearby: ["Tolland", "Ellington", "East Windsor", "Glastonbury", "Wethersfield"],
  },
  "west-hartford-ct": {
    name: "West Hartford", state: "CT", fullName: "West Hartford, CT",
    hub: "Glastonbury, CT Hub",
    headline: "West Hartford's Preferred Movers",
    intro: "West Hartford is one of Connecticut's most sought-after communities  -  and Castle Express is one of its most trusted movers. From the Center to Bishops Corner, we handle every move with care and professionalism.",
    features: ["High volume of West Hartford moves  -  deep local experience", "Skilled with the area's older homes, tight streets, and walk-ups", "Princess Packing™ and full packing services available"],
    nearby: ["Bloomfield", "Newington", "Farmington", "Avon", "Wethersfield"],
  },
  "wethersfield-ct": {
    name: "Wethersfield", state: "CT", fullName: "Wethersfield, CT",
    hub: "Glastonbury, CT Hub",
    headline: "Moving Services in Wethersfield, CT",
    intro: "As one of Connecticut's oldest towns, Wethersfield has homes that require extra care  -  and Castle Express delivers. Our crews are experienced handling antiques, narrow doorways, and the unique character of historic properties.",
    features: ["Expertise with Wethersfield's historic Old Wethersfield homes", "Careful handling of antiques and delicate items", "Accurate estimates with no surprises"],
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
    intro: "Just across the Connecticut border, Agawam is a quick trip from our Enfield headquarters. Castle Express brings the same licensed, insured, professionally estimated moving service that Hartford County residents have trusted since 2013.",
    features: ["Just over the CT border  -  fast response from Enfield", "Licensed for interstate moves between CT and MA", "Serving Agawam, Feeding Hills, and surrounding areas"],
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
    a: "We recommend 2–3 weeks in advance, especially during busy seasons (May–September). Last-minute moves? Call us - we'll do our best to accommodate.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Castle Express is fully licensed (USDOT 2307446, CT Permit C-1768) and insured. We hold an A+ rating with the Better Business Bureau.",
  },
  {
    q: "Do I need to tip the movers?",
    a: "Tips are never required. But if you're happy with the service, we recommend $5–$10 per mover per billed hour.",
  },
  {
    q: "What if I need to change my move date?",
    a: "Contact us as soon as possible and we'll give you the next best date for your move. We're flexible and understand plans change.",
  },
  {
    q: "What areas does Castle Express serve?",
    a: "Castle Express serves all of Hartford County and Tolland County in Connecticut, plus Western Massachusetts including Springfield and Agawam. We dispatch from our Enfield, CT headquarters and cover 21+ cities.",
  },
  {
    q: "How much does it cost to hire movers in Connecticut?",
    a: "Castle Express charges hourly but provides detailed, accurate estimates based on a thorough inventory and move analysis  -  we aim to be within 10% of every estimate. No hidden fees, no fuel surcharges, no surprise charges. Contact us for a free estimate.",
  },
  {
    q: "What is Princess Packing?",
    a: "Princess Packing™ is Castle Express's boutique white-glove packing service. An experienced professional team packs your entire home before move day. All materials are included. Packages start at $595 for 25 boxes.",
  },
  {
    q: "Can Castle Express move a piano or gun safe?",
    a: "Yes. Castle Express has a specialty moving team equipped with piano boards, heavy-duty dollies, and stair climbers for safely moving pianos, gun safes, fire safes, and other heavy or oversized items.",
  },
  {
    q: "Does Castle Express offer storage?",
    a: "Yes. Castle Express operates a secure, climate-controlled storage facility in Enfield, CT with numbered wooden vault storage. Short-term and long-term options are available  -  ideal between closings or during renovations.",
  },
  {
    q: "What makes Castle Express different from other movers?",
    a: "Castle Express is family-owned by Joe Caronna since 2013, not a franchise or broker. We provide accurate, detailed estimates with no hidden fees, employ our own professional crews, and maintain a 4.9-star Google rating with over 200 reviews. We're A+ BBB rated and fully licensed.",
  },
  {
    q: "Do you offer commercial and office moving?",
    a: "Yes. Castle Express handles office relocations, retail moves, and commercial relocations with minimal downtime. We offer after-hours and weekend scheduling, IT equipment coordination, and custom move planning.",
  },
];

export const MOVE_SIZES = [
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4+ Bedrooms",
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
  
  middle: `After earning his bachelor's degree in business from Western New England University, Joe honed his skills at a high-end furniture store, where he discovered a passion for delivering not just products - but exceptional experiences. That passion became Castle Express Moving & Storage.`,
  
  growth: `Starting with labor-only jobs loading PODS, the company quickly evolved into a fully licensed, full-service moving operation. By 2023, Castle Express was operating a fleet of five trucks out of a 5,000 square-foot facility in Enfield, CT - a far cry from the storage yard where it all began.`,
  
  values: `As a dedicated father of three, Joe built Castle Express on strong family values and a commitment to community. His dedication to personal growth - through business coaching, coursework, and continuous self-development - shaped a company culture centered on improvement, teamwork, and genuine care. Today, Castle Express is more than a moving company. It's a trusted partner for local and long-distance moves, secure storage solutions, and white-glove delivery services.`,
  
  mission: `"To deliver professional, efficient, and stress-free moving and storage solutions - combining competitive pricing with a 5-star customer experience, one family at a time."`,
};
