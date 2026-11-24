// Yellow line icons for the homepage service cards (Nov 2026 redesign).
// One stroke weight and grid for all four so they read as a set.
// Decorative: the card heading names the service.
const Svg = ({ children }) => (
  <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor"
    strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

// Residential moving: box truck with speed lines.
export const LineTruck = () => (
  <Svg>
    <path d="M14 13h19v20H14z" />
    <path d="M33 19h6.5l4.5 6v8h-11" />
    <path d="M36 19v6h8" />
    <circle cx="19" cy="35" r="3.5" />
    <circle cx="38" cy="35" r="3.5" />
    <path d="M3 18h7M5 24h5M3 30h7" />
  </Svg>
);

// Commercial & office moving: office building.
export const LineOffice = () => (
  <Svg>
    <path d="M10 42V8h20v34" />
    <path d="M30 18h9v24" />
    <path d="M6 42h36" />
    <path d="M16 14h2M22 14h2M16 21h2M22 21h2M16 28h2M22 28h2" />
    <path d="M18 42v-7h4v7" />
    <path d="M34 25h1M34 31h1" />
  </Svg>
);

// Packing: open moving box.
export const LineBox = () => (
  <Svg>
    <path d="M8 18l16-7 16 7-16 7z" />
    <path d="M8 18v16l16 7 16-7V18" />
    <path d="M24 25v16" />
    <path d="M8 18l-4 6 16 7 4-6M40 18l4 6-16 7-4-6" />
  </Svg>
);

// Climate-controlled storage: storage unit with roll-up door.
export const LineStorage = () => (
  <Svg>
    <path d="M5 18L24 7l19 11" />
    <path d="M9 16v26h30V16" />
    <path d="M15 42V24h18v18" />
    <path d="M15 29h18M15 34h18" />
    <path d="M21 38h6" />
  </Svg>
);
