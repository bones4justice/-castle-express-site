// lib/serviceSubpages.js
// Service subpage data for top 5 towns x 3 services = 15 pages

export const SERVICE_SUBPAGES = {
  "residential-movers": {
    serviceTitle: "Residential Movers",
    serviceSlug: "residential-movers",
    sections: [
      { heading: "What's Included", items: [
        "Pre-move walkthrough and detailed estimate",
        "Professional loading with furniture pads, shrink wrap, and floor protection",
        "Safe transport in clean, well-maintained trucks",
        "Careful unloading and furniture placement at your new home",
        "Furniture disassembly and reassembly as needed",
      ]},
      { heading: "Types of Home Moves We Handle", items: [
        "Single-family homes, from starter homes to large estates",
        "Apartments and condos, including walk-ups and elevator buildings",
        "Townhouses and multi-level homes",
        "Senior relocations and downsizing with patient, respectful crews",
        "Double closings where we hold your belongings overnight",
        "Local moves within CT and MA, plus long-distance relocations",
      ]},
    ],
  },
  "commercial-movers": {
    serviceTitle: "Commercial Movers",
    serviceSlug: "commercial-movers",
    sections: [
      { heading: "Commercial Moving Services", items: [
        "Office relocations including desks, cubicles, and conference rooms",
        "Retail and storefront moves",
        "Medical and dental office relocations",
        "Warehouse and industrial moves",
        "IT equipment coordination for servers and networking gear",
        "After-hours and weekend scheduling available",
      ]},
      { heading: "Our Process", items: [
        "Initial walkthrough and space assessment with your team",
        "Custom move plan with timeline and crew assignments",
        "Labeling system for desks, departments, and floors",
        "Professional packing of office equipment and files",
        "Setup and placement at your new location",
        "Post-move walkthrough to confirm everything is in place",
      ]},
    ],
  },
  "packing-services": {
    serviceTitle: "Packing Services",
    serviceSlug: "packing-services",
    sections: [
      { heading: "What We Pack", items: [
        "Kitchen items including dishes, glassware, and appliances",
        "Bedroom furniture, clothing, and personal items",
        "Living room electronics, artwork, and decorative items",
        "Home office equipment, files, and books",
        "Garage and basement storage items",
        "Fragile and high-value pieces with extra protection",
      ]},
      { heading: "Packing Options", items: [
        "Full-service packing: we pack your entire home before move day",
        "Partial packing: we handle the fragile and difficult items, you do the rest",
        "Princess Packing™: our white-glove boutique service for a premium experience",
        "All packing materials included in every package",
        "Unpacking services available at your new home",
      ]},
    ],
  },
};

// Unique intro paragraphs per town/service combination
export const TOWN_SERVICE_INTROS = {
  "movers-hartford-ct": {
    "residential-movers": "Hartford's neighborhoods range from the Victorian homes of the West End and Prospect Avenue to the apartment complexes in Asylum Hill and the triple-deckers of Frog Hollow. Each type of home presents different challenges on move day, and our crews have handled all of them. Street parking, tight elevator situations, and narrow staircases are part of the job here. We know how to position a truck on a busy Hartford street and get your move done efficiently without blocking traffic longer than necessary.",
    "commercial-movers": "Hartford is Connecticut's capital and one of the insurance industry's major hubs. Office relocations here often involve high-rise buildings downtown, the Colt Gateway complex, and commercial spaces along the I-84 corridor. Castle Express handles Hartford business moves with minimal downtime, working around your schedule to keep disruption low. We coordinate elevator access, loading dock reservations, and after-hours scheduling so your team can get back to work fast.",
    "packing-services": "Whether you're packing up a condo in the West End or a family home in Blue Hills, Hartford moves benefit from professional packing. Our crews bring all materials and handle everything from kitchen glassware to framed artwork. Hartford's older homes often have narrow doorways and steep staircases, which means items need to be packed tighter and protected better. We account for that in every Hartford packing job.",
  },
  "movers-springfield-ma": {
    "residential-movers": "Springfield's residential landscape covers a lot of ground. The Victorian homes of the McKnight Historic District, the tree-lined blocks of Forest Park, the mid-century ranches of Sixteen Acres near Western New England University, and the growing apartment developments downtown near the Basketball Hall of Fame and MGM Casino. We've moved families in and out of all these neighborhoods. Our Enfield base is just 18 to 20 minutes south on I-91, so we're in Springfield constantly.",
    "commercial-movers": "Springfield is the economic center of Western Massachusetts, with businesses ranging from downtown offices and medical practices to retail spaces along State Street and industrial operations near the Connecticut River. Castle Express handles Springfield commercial moves on your timeline, including after-hours and weekend scheduling. We're 18 to 20 minutes away on I-91 and can have a crew on-site quickly when your business needs to move.",
    "packing-services": "Springfield families often tell us that packing is the part of the move they dread most. Our packing team comes to your Springfield home with all the materials, wraps everything properly, and has your home ready for move day. For the Victorian homes in McKnight and Forest Park, where there's usually more furniture and more fragile items than a newer build, professional packing makes a real difference in protecting your belongings.",
  },
  "movers-enfield-ct": {
    "residential-movers": "This is our home town. From the colonials in Hazardville to the apartments at Bigelow Commons, from the neighborhoods along Enfield Street to the newer developments off Brainard Road, we've moved families on nearly every street in Enfield. Being headquartered right here means faster response times, no travel surcharges, and crews who know every shortcut and back road in town. When you hire Castle Express for an Enfield residential move, you're hiring your neighbors.",
    "commercial-movers": "Enfield's commercial landscape includes businesses along Route 5, the Enfield Square area, and the industrial parks off Palomba Drive and Moody Road. We've relocated offices, retail stores, and warehouse operations throughout town. Being based right here at 4 Niblick Rd means we can do a walkthrough the same day you call and schedule your commercial move around your business hours with zero commute time for our crew.",
    "packing-services": "Enfield residents get the fastest packing service response in our entire coverage area because we're based right here. Our packing team can be at your Enfield home same-day in most cases. We handle everything from a full-house pack for a 4-bedroom colonial to partial packing focused on your kitchen and fragile items. For Enfield moves, we often do the packing the day before and the move the next morning, keeping your downtime as short as possible.",
  },
  "movers-west-hartford-ct": {
    "residential-movers": "West Hartford is one of Connecticut's most desirable suburbs, and the housing stock reflects it. The established homes near the Center, the larger properties along North Main Street and Mountain Road, the split-levels and colonials in Bishops Corner, and the condos along Farmington Avenue all present different moving challenges. Our crews are experienced with West Hartford's older homes, tight streets, and walk-up situations. We handle these moves with the care this community expects.",
    "commercial-movers": "West Hartford's Blue Back Square, Bishops Corner, and Farmington Avenue corridor are home to hundreds of businesses from medical offices to retail stores to professional services. Castle Express handles West Hartford commercial relocations with careful planning and minimal disruption. We work around your hours, coordinate with building management, and make sure your business is up and running in the new space as quickly as possible.",
    "packing-services": "West Hartford homes tend to have more square footage and more belongings than the average move. The older homes near the Center and along Prospect Avenue often have antiques, fine art, and high-value furniture that need careful handling. Our packing team brings the right materials for every item, and our Princess Packing™ white-glove service is popular with West Hartford families who want the entire home packed professionally before move day.",
  },
  "movers-suffield-ct": {
    "residential-movers": "Suffield combines Suffield Academy's campus on North Main Street with genuine small-town New England neighborhoods. The tree-lined streets of Suffield Village, the newer developments in Suffield Meadows, and the homes along Route 75 each have their own character. We're just 12 to 15 minutes from our Enfield facility, which makes Suffield one of our fastest-response service areas. Our crews handle Suffield's mix of historic homes and newer construction with equal care.",
    "commercial-movers": "Suffield's commercial activity centers along Route 75 and Mountain Road, with businesses ranging from professional offices to agricultural operations to the commercial spaces near Suffield Academy. Castle Express provides Suffield commercial moves with the same attention to detail we bring to residential work. We're just 12 to 15 minutes away, so we can do a walkthrough quickly and build a move plan around your business schedule.",
    "packing-services": "Suffield's historic homes often contain antiques, family heirlooms, and delicate items that need special attention during packing. Our experienced packing team knows how to protect fine furniture, wrap artwork properly, and pack china and glassware so nothing shifts during transport. We're close enough to Suffield that we can do the packing one day and the move the next, keeping your disruption to a minimum.",
  },
};

// The 5 towns that get service subpages
export const SUBPAGE_TOWNS = [
  "movers-hartford-ct",
  "movers-springfield-ma",
  "movers-enfield-ct",
  "movers-west-hartford-ct",
  "movers-suffield-ct",
];

export const SUBPAGE_SERVICES = ["residential-movers", "commercial-movers", "packing-services"];
