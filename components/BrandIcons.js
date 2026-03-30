// Brand-styled SVG icons for Castle Express
// Style: black outline, yellow speed stripes (upper right), yellow triangle (lower left)

const Stripes = () => (
  <g stroke="#FBCB0B" strokeWidth="3" strokeLinecap="round">
    <line x1="65" y1="20" x2="95" y2="20" />
    <line x1="71" y1="28" x2="95" y2="28" />
    <line x1="77" y1="36" x2="95" y2="36" />
  </g>
);

const Triangle = () => (
  <polygon points="0,100 28,100 0,72" fill="#FBCB0B" />
);

const Wrap = ({ children, size = 96, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...p}>
    <rect width="100" height="100" fill="white" />
    <Triangle />
    <Stripes />
    {children}
  </svg>
);

export const IconResidential = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Roof */}
      <polyline points="18,52 50,28 82,52" />
      {/* House body */}
      <rect x="24" y="52" width="52" height="32" />
      {/* Door */}
      <rect x="42" y="64" width="16" height="20" />
      {/* Chimney */}
      <rect x="30" y="34" width="10" height="18" />
    </g>
  </Wrap>
);

export const IconCommercial = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Building */}
      <rect x="22" y="24" width="40" height="60" />
      {/* Windows 3x4 grid */}
      {[0, 1, 2].map(col => [0, 1, 2, 3].map(row => (
        <rect key={`${col}-${row}`} x={28 + col * 12} y={30 + row * 13} width="6" height="6" strokeWidth="2" />
      )))}
    </g>
  </Wrap>
);

export const IconPacking = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Box front face */}
      <rect x="20" y="50" width="50" height="32" />
      {/* Box side face (slight angle) */}
      <polyline points="70,50 78,44 78,76 70,82" />
      {/* Box top edge */}
      <line x1="20" y1="50" x2="28" y2="44" />
      <line x1="28" y1="44" x2="78" y2="44" />
      {/* Open flaps */}
      <line x1="20" y1="50" x2="14" y2="40" />
      <line x1="44" y1="50" x2="38" y2="40" />
      <line x1="46" y1="50" x2="58" y2="40" />
      <line x1="70" y1="50" x2="82" y2="42" />
      {/* Crown above - smaller, centered */}
      <polyline points="30,28 35,18 40,24 45,12 50,24 55,18 60,28" strokeWidth="3" />
    </g>
  </Wrap>
);

export const IconStorage = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Vault door */}
      <rect x="20" y="26" width="52" height="56" rx="3" />
      {/* Inner border */}
      <rect x="28" y="34" width="36" height="40" rx="2" strokeWidth="2" />
      {/* Snowflake */}
      <line x1="46" y1="44" x2="46" y2="64" strokeWidth="2" />
      <line x1="36" y1="54" x2="56" y2="54" strokeWidth="2" />
      <line x1="39" y1="47" x2="53" y2="61" strokeWidth="2" />
      <line x1="53" y1="47" x2="39" y2="61" strokeWidth="2" />
      {/* Handle */}
      <circle cx="66" cy="54" r="5" strokeWidth="3" />
    </g>
  </Wrap>
);

export const IconBBB = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Circle badge */}
      <circle cx="46" cy="50" r="28" strokeWidth="4" />
      {/* A+ text */}
      <text x="46" y="56" textAnchor="middle" fill="#000" stroke="none" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22">A+</text>
      {/* Ribbon */}
      <polyline points="26,72 26,88 34,82 42,88 42,72" strokeWidth="3" fill="none" />
      <polyline points="50,72 50,88 58,82 66,88 66,72" strokeWidth="3" fill="none" />
    </g>
  </Wrap>
);

export const IconGoogle = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Five-pointed star */}
      <polygon points="46,22 52,40 72,40 56,52 62,70 46,58 30,70 36,52 20,40 40,40" />
    </g>
  </Wrap>
);

export const IconLicensed = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Shield */}
      <path d="M46,22 L72,34 L72,56 C72,70 46,84 46,84 C46,84 20,70 20,56 L20,34 Z" />
      {/* Checkmark */}
      <polyline points="32,54 42,64 60,42" strokeWidth="5" />
    </g>
  </Wrap>
);

export const IconLocation = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Map pin teardrop */}
      <path d="M46,82 C46,82 72,56 72,40 C72,25.6 60.4,14 46,14 C31.6,14 20,25.6 20,40 C20,56 46,82 46,82 Z" />
      {/* Circle cutout */}
      <circle cx="46" cy="40" r="10" />
    </g>
  </Wrap>
);

export const IconPhone = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Phone handset */}
      <path d="M62,74 C56,80 44,78 32,66 C20,54 18,42 24,36 L32,28 L42,42 L36,48 C36,48 42,58 50,62 L56,56 L70,66 Z" />
    </g>
  </Wrap>
);

export const IconFacebook = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Bold f */}
      <path d="M54,84 L54,54 L64,54 L66,44 L54,44 L54,38 C54,34 56,32 60,32 L66,32 L66,22 L58,22 C48,22 44,28 44,38 L44,44 L36,44 L36,54 L44,54 L44,84 Z" />
    </g>
  </Wrap>
);

export const IconInstagram = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Rounded square */}
      <rect x="20" y="20" width="52" height="52" rx="14" />
      {/* Circle inside */}
      <circle cx="46" cy="46" r="14" />
      {/* Dot upper right */}
      <circle cx="62" cy="30" r="3" fill="#000" stroke="none" />
    </g>
  </Wrap>
);

export const IconTruck = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Cargo box */}
      <rect x="34" y="32" width="46" height="38" />
      {/* Roll-up door lines */}
      <line x1="60" y1="42" x2="76" y2="42" strokeWidth="2" />
      <line x1="60" y1="50" x2="76" y2="50" strokeWidth="2" />
      <line x1="60" y1="58" x2="76" y2="58" strokeWidth="2" />
      {/* Mom's attic */}
      <path d="M34,32 L22,32 L22,42 L34,42" strokeWidth="3" />
      {/* Cab */}
      <path d="M22,42 L10,42 L10,70 L22,70" />
      {/* Windshield */}
      <line x1="10" y1="42" x2="10" y2="56" strokeWidth="2" />
      <line x1="10" y1="56" x2="22" y2="56" strokeWidth="2" />
      {/* Mirror */}
      <line x1="8" y1="48" x2="8" y2="54" strokeWidth="2" />
      {/* Undercarriage */}
      <line x1="10" y1="70" x2="80" y2="70" />
      {/* Front wheel */}
      <circle cx="18" cy="74" r="6" strokeWidth="3" />
      <circle cx="18" cy="74" r="2" strokeWidth="1.5" />
      {/* Rear wheel */}
      <circle cx="68" cy="74" r="6" strokeWidth="3" />
      <circle cx="68" cy="74" r="2" strokeWidth="1.5" />
    </g>
  </Wrap>
);

export const IconCalendar = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Calendar body */}
      <rect x="18" y="30" width="56" height="50" rx="3" />
      {/* Tab clips */}
      <line x1="34" y1="24" x2="34" y2="36" />
      <line x1="58" y1="24" x2="58" y2="36" />
      {/* Header bar */}
      <line x1="18" y1="44" x2="74" y2="44" />
      {/* Day grid 4x3 */}
      {[0, 1, 2, 3].map(col => [0, 1, 2].map(row => (
        <rect key={`${col}-${row}`} x={24 + col * 13} y={50 + row * 9} width="7" height="5" strokeWidth="1.5" rx="1" />
      )))}
    </g>
  </Wrap>
);

export const IconPiano = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Grand piano body curve */}
      <path d="M20,72 L20,44 C20,34 30,28 44,28 C58,28 72,34 72,44 L72,72" />
      {/* Open lid */}
      <path d="M20,44 C20,34 30,28 44,28 C58,28 72,34 72,44" strokeWidth="2" />
      <line x1="72" y1="44" x2="76" y2="32" strokeWidth="2.5" />
      {/* Keyboard */}
      <rect x="20" y="64" width="52" height="8" />
      {/* Black keys */}
      <line x1="30" y1="64" x2="30" y2="69" strokeWidth="2" />
      <line x1="38" y1="64" x2="38" y2="69" strokeWidth="2" />
      <line x1="50" y1="64" x2="50" y2="69" strokeWidth="2" />
      <line x1="58" y1="64" x2="58" y2="69" strokeWidth="2" />
      {/* Legs */}
      <line x1="24" y1="72" x2="22" y2="82" strokeWidth="3" />
      <line x1="46" y1="72" x2="46" y2="82" strokeWidth="3" />
      <line x1="68" y1="72" x2="70" y2="82" strokeWidth="3" />
    </g>
  </Wrap>
);

export const IconLongDistance = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Left house */}
      <polyline points="10,52 22,42 34,52" />
      <rect x="14" y="52" width="16" height="14" />
      {/* Right house */}
      <polyline points="58,52 70,42 82,52" />
      <rect x="62" y="52" width="16" height="14" />
      {/* Arrow connecting */}
      <line x1="36" y1="50" x2="56" y2="50" strokeWidth="4" />
      <polyline points="50,44 56,50 50,56" strokeWidth="4" />
      {/* Road lines below */}
      <line x1="14" y1="74" x2="82" y2="74" strokeWidth="3" />
      <line x1="30" y1="80" x2="44" y2="80" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="52" y1="80" x2="66" y2="80" strokeWidth="2" strokeDasharray="4 4" />
    </g>
  </Wrap>
);

export const IconTikTok = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    {/* Solid filled TikTok note shape */}
    <g fill="#000" stroke="none">
      {/* Stem + rectangular flag at top */}
      <path d="M40,72 L40,22 L68,22 L68,38 L52,38 L52,72 Z" />
      {/* Note head */}
      <circle cx="32" cy="72" r="13" />
    </g>
  </Wrap>
);

export const IconLinkedIn = ({ size = 96, ...p }) => (
  <Wrap size={size} {...p}>
    <g fill="#000" stroke="none">
      {/* Letter i dot */}
      <circle cx="28" cy="32" r="5" />
      {/* Letter i stem */}
      <rect x="24" y="42" width="8" height="30" rx="1" />
      {/* Letter n */}
      <path d="M40,72 L40,42 L48,42 L48,46 C50,42 54,40 60,40 C68,40 72,46 72,54 L72,72 L64,72 L64,56 C64,50 62,48 58,48 C54,48 50,50 48,54 L48,72 Z" />
    </g>
  </Wrap>
);
