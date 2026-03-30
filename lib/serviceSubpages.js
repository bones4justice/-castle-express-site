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
  "movers-thompsonville-ct": {
    "residential-movers": "Thompsonville is where Castle Express is based, so residential moves here are as local as it gets for us. The Victorian homes on Pearl Street, the apartments near Enfield Square Mall, and the neighborhoods along the Connecticut River all have different moving needs. We know the parking situation on every block, which streets are one-way, and where the tight turns are. When you hire us for a Thompsonville move, your crew is literally driving from down the road.",
    "commercial-movers": "Thompsonville's commercial corridor along Enfield Street and the Route 5 area includes retail stores, professional offices, and small businesses that occasionally need to relocate. Being headquartered right here means we can do a same-day walkthrough, plan around your business hours, and execute your commercial move with minimal disruption. No other moving company is closer to Thompsonville than we are.",
    "packing-services": "For Thompsonville residents, our packing team can often be at your door the same day you call. We handle everything from full-house packing for the larger homes near Pearl Street to partial packing focused on fragile kitchen items in the apartments near the mall. All materials are included, and we can pack one day and move the next to keep your timeline tight.",
  },
  "movers-hazardville-ct": {
    "residential-movers": "Hazardville's residential streets off Hazard Avenue include everything from single-family colonials to condos at The Laurels. Our crews handle the variety well, whether it's navigating the turns in the North Thompsonville area or managing a move from a larger home near Powder Hollow Park. We're based in Enfield and Hazardville is one of our most frequently served neighborhoods. Response times here are as fast as anywhere in our coverage area.",
    "commercial-movers": "Hazardville has a small but active commercial presence along Hazard Avenue, including offices, shops, and service businesses. Castle Express handles Hazardville commercial moves with the same professionalism we bring to our larger Hartford and Springfield jobs. Being right here in Enfield means we can plan your move quickly and execute it around your schedule.",
    "packing-services": "Hazardville homes range from newer condos to older single-family homes, and each requires a different packing approach. Our experienced packing team brings the right materials for every situation. For the condos at The Laurels, we focus on efficient, space-conscious packing. For the larger homes near Powder Hollow, we bring a bigger crew and more materials. Either way, we're minutes away.",
  },
  "movers-scitico-ct": {
    "residential-movers": "Scitico's suburban layout, with its winding roads and cul-de-sacs in areas like Green Manor, makes it a straightforward residential moving area. The homes here are well-maintained single-family properties, and the sidewalks and park give the neighborhood a family-oriented feel. We're based in Enfield and Scitico is on the eastern end of town, bordering Ellington and Somers. Our crews can be at your Scitico home in minutes.",
    "commercial-movers": "While Scitico is primarily residential, the nearby commercial areas along Route 5 and the Enfield business parks serve Scitico residents who run local businesses. Castle Express handles commercial relocations throughout Enfield, and our proximity to Scitico means we can coordinate your business move quickly and efficiently.",
    "packing-services": "Scitico's single-family homes often have finished basements and garages that add significant square footage to a move. Our packing team accounts for that in every estimate. We bring all materials, pack room by room, and label everything clearly so unpacking at your new home is organized. Being based in Enfield, we can often do the packing and the move on consecutive days.",
  },
  "movers-broad-brook-ct": {
    "residential-movers": "Broad Brook has a rural New England character with homes spread along Rye Street and the roads near Broad Brook Elementary School. The properties here tend to sit on larger lots with longer driveways, and some of the older homes near the village center have the kind of character that requires careful handling on move day. We're 15 minutes from our Enfield base and move Broad Brook families regularly.",
    "commercial-movers": "Broad Brook's commercial activity is modest, centered around the village area where the old Broad Brook Mill once stood. For businesses in this part of East Windsor that need to relocate, Castle Express brings the same professional service we provide for our larger commercial clients. We're close by in Enfield and can plan your move around your business needs.",
    "packing-services": "The homes in Broad Brook often have attics, basements, and outbuildings that accumulate decades of belongings. Our packing team handles full-house packs for properties like these, bringing all the materials and working room by room. For the older homes near the village center, we pay extra attention to fragile and antique items. We're just 15 minutes away in Enfield.",
  },
  "movers-warehouse-point-ct": {
    "residential-movers": "Warehouse Point's homes along the Connecticut River have character and history, and our crews treat them accordingly. The streets near the village center are walkable and well-kept, and the properties range from historic colonials to more modest single-family homes. We're 15 minutes from our Enfield base and know the layout of Warehouse Point well, including the tighter streets near the river that require careful truck positioning.",
    "commercial-movers": "Warehouse Point has a small commercial presence near the village center and along Route 5. For businesses here that need to relocate, Castle Express provides the same careful planning and execution we bring to our larger commercial jobs. We're just 15 minutes away in Enfield and can accommodate flexible scheduling.",
    "packing-services": "The historic homes in Warehouse Point often contain furniture, artwork, and family items that need careful packing. Our experienced team brings proper materials for protecting antiques, wrapping framed pieces, and securing fragile items. We handle everything from a full-house pack to just the delicate items you don't want to risk packing yourself.",
  },
  "movers-windsorville-ct": {
    "residential-movers": "Windsorville's rural character means homes on larger lots, longer driveways, and the kind of quiet streets where a moving truck is an event. Our crews are experienced with rural East Windsor properties and know how to handle the longer carry distances and occasional gravel driveways that come with the territory. We're 15 minutes from our Enfield facility and serve Windsorville families regularly.",
    "commercial-movers": "Windsorville is primarily residential, but the agricultural businesses and small enterprises in this part of East Windsor occasionally need moving services. Castle Express handles these moves with the same professionalism we bring to every job, adapting to the rural setting and working around your schedule.",
    "packing-services": "Windsorville homes often have generations of belongings, from farmhouse kitchens to filled attics. Our packing team works methodically through every room, bringing all materials and labeling boxes by room and contents. For properties out here with more square footage than a typical suburban home, we bring a larger crew to keep the timeline on track.",
  },
  "movers-melrose-ct": {
    "residential-movers": "Melrose is one of the most rural villages in East Windsor, centered at the crossroads of Broad Brook Road and Melrose Road. The properties here sit on larger lots, and the roads are narrow and wooded in places. Our crews are experienced with these kinds of moves, where the truck positioning and carry distance require planning. We're 15 minutes from our Enfield base and know the back roads through this part of East Windsor.",
    "commercial-movers": "Melrose's commercial presence is minimal, but the small businesses and home offices in this village occasionally need professional moving services. Castle Express treats every move with the same attention to detail, regardless of size. We're close by in Enfield and can adapt our services to fit your needs.",
    "packing-services": "The homes in Melrose tend to be older, with the kind of built-in storage spaces and attics that accumulate belongings over the years. Our packing crew handles these thoroughly, bringing all materials and working room by room. The historic one-room schoolhouse that serves as the Melrose Library is a reminder of the village's character, and we treat the homes here with the same respect.",
  },
  "movers-feeding-hills-ma": {
    "residential-movers": "Feeding Hills residents take pride in their neighborhood, and they expect movers who reflect that standard. The homes here are well-maintained, the streets are suburban and quiet, and the community has a strong Italian and Irish heritage identity. Our crews handle Feeding Hills residential moves with care, from the single-family homes along Springfield Street to the properties near the Southwick and Westfield borders. We're just across the CT line, about 18 to 20 minutes from our Enfield base.",
    "commercial-movers": "Feeding Hills has commercial activity along Springfield Street and the Route 57 corridor, including small businesses, offices, and retail. Castle Express handles Feeding Hills commercial moves with careful planning and flexible scheduling. We're just across the state line and can coordinate your business relocation around your hours.",
    "packing-services": "Feeding Hills families often have well-furnished homes with items that need careful packing. Our experienced team brings all materials and handles everything from kitchen china to basement storage. We're about 18 to 20 minutes from our Enfield facility, and we can do the packing one day and the move the next to keep things efficient.",
  },
  "movers-west-suffield-ct": {
    "residential-movers": "West Suffield's rural, wooded character means homes on larger lots with longer driveways and sometimes unpaved access roads. Congamond Lakes on the western border draws buyers who want waterfront living, and the properties around West Suffield Mountain offer privacy and views. Our crews handle the logistics of these moves carefully, planning truck routes in advance. We're 12 to 15 minutes from our Enfield facility.",
    "commercial-movers": "West Suffield is primarily residential, but the small businesses and agricultural operations in this part of Suffield occasionally need professional moving services. Castle Express brings the same careful approach to every commercial job, regardless of size. We're close by and can accommodate your schedule.",
    "packing-services": "The homes around Congamond Lakes and West Suffield Mountain often have more square footage than they appear from the road. Finished walkout basements, lake-facing decks with outdoor furniture, and garages full of seasonal equipment all add up. Our packing team accounts for all of it, bringing proper materials and working systematically through every room.",
  },
  "movers-somersville-ct": {
    "residential-movers": "Somersville's well-kept homes and quiet streets reflect the village's family-friendly reputation. With median home prices around $468K, the properties here are substantial, and our crews treat them accordingly. The rural roads require some planning for truck access, but we know this part of Somers well. We're about 20 minutes from our Enfield base and serve Somersville families with the same care we bring to every move.",
    "commercial-movers": "Somersville's commercial presence is modest, centered around the village area along the Scantic River. For businesses or home offices in this neighborhood that need to relocate, Castle Express provides professional moving services with flexible scheduling. We're about 20 minutes from our Enfield facility.",
    "packing-services": "Somersville homes tend to be well-furnished family homes with items that need careful packing. Our experienced team brings all materials and works room by room, paying attention to fragile items and family valuables. We can do the packing one day and the move the next, keeping your disruption to a minimum.",
  },
  "movers-crystal-lake-ct": {
    "residential-movers": "Crystal Lake's lakefront homes with docks and the residential streets near Sandy Beach present unique moving challenges. The roads around the lake can be tight, and some properties have steep driveways or limited turnaround space for a truck. Our crews have handled Crystal Lake moves before and plan the logistics in advance. We're about 18 minutes from our Enfield base and know the area well.",
    "commercial-movers": "Crystal Lake is primarily residential, but the seasonal businesses and small enterprises near the lake occasionally need moving services. Castle Express handles these with the same professionalism we bring to our larger commercial jobs. We're close by in Enfield and can work around your schedule.",
    "packing-services": "Lakefront homes at Crystal Lake often have seasonal items, outdoor furniture, and dock equipment alongside the usual household belongings. Our packing team handles all of it, bringing the right materials for protecting everything from kitchen glassware to fishing gear. We work systematically through every room and storage space.",
  },
  "movers-north-agawam-ma": {
    "residential-movers": "North Agawam's quieter residential streets, north of Agawam Center and bordering West Springfield, draw families who want easy access to Springfield without the busier feel of the town center. The homes here are well-maintained, and the Westfield River is nearby. Our crews handle North Agawam residential moves regularly, making the 18 to 20 minute trip from our Enfield facility across the CT line.",
    "commercial-movers": "North Agawam has commercial activity along the Route 57 corridor and near the West Springfield border. Castle Express handles commercial moves in this area with careful planning and flexible scheduling. We're just across the state line and can coordinate your business relocation efficiently.",
    "packing-services": "North Agawam families often have well-established homes with years of accumulated belongings. Our packing team comes with all materials and works room by room, from kitchen cabinets to basement storage. We're about 18 to 20 minutes from our Enfield base and can handle the packing and move on consecutive days.",
  },
  "movers-agawam-center-ma": {
    "residential-movers": "Agawam Center is the civic heart of town, with homes ranging from the established neighborhoods near Town Hall on Main Street to the residential streets along the Route 57 and Route 187 corridor. Castle Express serves Agawam Center families regularly, making the trip from our Enfield facility across the CT line in about 18 to 20 minutes. Our experienced crews handle everything from apartment moves to full-house relocations.",
    "commercial-movers": "Agawam Center's Main Street corridor and the areas near Route 57 include offices, retail stores, and service businesses. Castle Express handles Agawam Center commercial moves with professional planning and execution. We coordinate with building management, work around your business hours, and get your operation set up at the new location quickly.",
    "packing-services": "Whether you're in one of the older homes near Town Hall or a newer property along the 187 corridor, our packing team brings the right materials and approach. We handle full-house packing, partial packing for fragile items, and our Princess Packing™ white-glove service. We're just across the state line and can typically do the packing and move on back-to-back days.",
  },
};

// Towns that get service subpages (5 main + 13 villages = 18)
export const SUBPAGE_TOWNS = [
  "movers-hartford-ct",
  "movers-springfield-ma",
  "movers-enfield-ct",
  "movers-west-hartford-ct",
  "movers-suffield-ct",
  "movers-thompsonville-ct",
  "movers-hazardville-ct",
  "movers-scitico-ct",
  "movers-broad-brook-ct",
  "movers-warehouse-point-ct",
  "movers-windsorville-ct",
  "movers-melrose-ct",
  "movers-feeding-hills-ma",
  "movers-west-suffield-ct",
  "movers-somersville-ct",
  "movers-crystal-lake-ct",
  "movers-north-agawam-ma",
  "movers-agawam-center-ma",
];

export const SUBPAGE_SERVICES = ["residential-movers", "commercial-movers", "packing-services"];
