export type Locale = "en" | "ro";

export type NavLink = {
  label: string;
  href: string;
};

export type SetupPreset = {
  title: string;
  details: string;
  switchType: string;
  featured?: boolean;
};

export type StoreModule = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Sensor" | "Switch" | "Shell";
  specs: string[];
};

export type BaseKit = {
  name: string;
  price: number;
  description: string;
  includes: string[];
};

export type HubSetup = {
  id: string;
  title: string;
  featured?: boolean;
  moduleIds: string[];
  settings: Array<{
    label: string;
    value: string;
  }>;
};

type LocaleCopy = {
  brandName: string;
  nav: NavLink[];
  footerLinks: NavLink[];
  legalCopy: string;
  waitlist: {
    title: string;
    subtitle: string;
  };
};

const copyByLocale: Record<Locale, LocaleCopy> = {
  en: {
    brandName: "KOVA",
    nav: [
      { label: "Store", href: "/store" },
      { label: "Modules", href: "/modules" },
      { label: "KOVA Hub", href: "/hub" },
      { label: "Mouse Web", href: "/mouse-web" },
    ],
    footerLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Support", href: "/support" },
      { label: "Twitter", href: "https://x.com" },
    ],
    legalCopy: "© 2026 KOVA KINETIC. ALL RIGHTS RESERVED.",
    waitlist: {
      title: "Secure your Modular Alpha Kit",
      subtitle:
        "Get launch updates, manufacturing milestones, and early-access drops before public release.",
    },
  },
  ro: {
    brandName: "KOVA",
    nav: [
      { label: "Store", href: "/store" },
      { label: "Module", href: "/modules" },
      { label: "KOVA Hub", href: "/hub" },
      { label: "Mouse Web", href: "/mouse-web" },
    ],
    footerLinks: [
      { label: "Confidențialitate", href: "/privacy" },
      { label: "Termeni", href: "/terms" },
      { label: "Suport", href: "/support" },
      { label: "Twitter", href: "https://x.com" },
    ],
    legalCopy: "© 2026 KOVA KINETIC. TOATE DREPTURILE REZERVATE.",
    waitlist: {
      title: "Asigură-ți Modular Alpha Kit",
      subtitle:
        "Primești noutăți de lansare, milestone-uri de producție și acces prioritar înainte de release.",
    },
  },
};

export const legacyPainPoints = [
  "Fixed Sensor Tech",
  "Soldered Switches",
  "Landfill Waste",
];

export const kovaAdvantages = [
  "Snap-on Optical Sensors",
  "Toolless Hot-Swaps",
  "Carbon Neutral Cycle",
];

export const setupPresets: SetupPreset[] = [
  { title: "CS2 Pro Setup", details: "SENSOR: CORE-X 30K", switchType: "SWITCH: OPTIC-7", featured: true },
  {
    title: "Valorant Aim",
    details: "SENSOR: CORE-X 30K",
    switchType: "SWITCH: SILENT-X",
  },
  {
    title: "Apex Legends",
    details: "SENSOR: FLOW-S",
    switchType: "SWITCH: TACTILE-3",
  },
  { title: "Rainbow 6 Edge", details: "MODULE: 12-BUTTON", switchType: "SWITCH: SOFT-V" },
];

export const baseKits = [
  {
    id: "kit-kova",
    name: "KOVA Kit",
    price: 80,
    description: "The essential modular chassis with a reliable sensor and microcontroller. A solid foundation you can upgrade anytime.",
    includes: ["Magnetic modular chassis", "Standard sensor & MCU", "Toolless lock system"],
  },
  {
    id: "kit-kova-pro",
    name: "KOVA Pro Kit",
    price: 130,
    description: "Built around a higher-performance sensor and a faster microcontroller for lower latency and higher polling rates.",
    includes: ["Magnetic modular chassis", "High-performance sensor & MCU", "Toolless lock system"],
  }
];

export const buttonModules: StoreModule[] = [
  {
    id: "btn-omron",
    name: "Omron Optical",
    price: 15,
    description: "Zero double-click guarantee with light actuation.",
    category: "Switch",
    specs: ["Optical actuation", "Light force"],
  },
  {
    id: "btn-huano",
    name: "Huano Blue Shell Pink Dot",
    price: 18,
    description: "Crisp and tactile feedback for precise tapping.",
    category: "Switch",
    specs: ["Mechanical", "Heavy tactile force"],
  }
];

export const shellModules: StoreModule[] = [
  {
    id: "shell-solid",
    name: "Solid Matte Shell",
    price: 20,
    description: "Classic smooth texture with maximum grip coverage.",
    category: "Shell",
    specs: ["Solid ABS", "Matte coating"],
  },
  {
    id: "shell-honeycomb",
    name: "Honeycomb SLA Grip",
    price: 30,
    description: "Ultra-lightweight community design.",
    category: "Shell",
    specs: ["SLA print", "Breathable grip"],
  }
];

export const extraModules: StoreModule[] = [
  {
    id: "wheel-metal",
    name: "Titanium Scroll Wheel",
    price: 22,
    description: "Machined from solid titanium for infinite scrolling momentum.",
    category: "Switch",
    specs: ["Titanium alloy", "Ceramic bearing"],
  },
  {
    id: "battery-endurance",
    name: "Endurance Battery Pack",
    price: 15,
    description: "Double the battery life span for multi-day tournaments.",
    category: "Switch",
    specs: ["800mAh", "Fast charge"],
  }
];

export const hubSetups: HubSetup[] = [
  {
    id: "cs2-pro",
    title: "CS2 Pro Setup",
    featured: true,
    moduleIds: ["btn-omron", "shell-honeycomb"],
    settings: [
      { label: "DPI", value: "800" },
      { label: "Polling Rate", value: "4000Hz" },
      { label: "LOD", value: "1.0mm" },
      { label: "Debounce", value: "1ms" },
    ],
  },
  {
    id: "valorant-aim",
    title: "Valorant Aim",
    moduleIds: ["btn-omron"],
    settings: [
      { label: "DPI", value: "1600" },
      { label: "Polling Rate", value: "2000Hz" },
      { label: "LOD", value: "1.2mm" },
      { label: "Angle Snapping", value: "Off" },
    ],
  },
  {
    id: "apex-legends",
    title: "Apex Legends",
    moduleIds: ["shell-honeycomb"],
    settings: [
      { label: "DPI", value: "1200" },
      { label: "Polling Rate", value: "4000Hz" },
      { label: "LOD", value: "1.0mm" },
      { label: "Lift Cutoff", value: "Aggressive" },
    ],
  },
  {
    id: "rainbow-6-edge",
    title: "Rainbow 6 Edge",
    moduleIds: ["btn-omron", "shell-honeycomb"],
    settings: [
      { label: "DPI", value: "1000" },
      { label: "Polling Rate", value: "1000Hz" },
      { label: "Macro Profile", value: "12-Key MMO" },
      { label: "Click Force", value: "Medium" },
    ],
  },
];

export function getSiteCopy(locale: Locale = "en") {
  return copyByLocale[locale];
}
