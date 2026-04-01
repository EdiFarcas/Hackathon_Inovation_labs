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

export const baseKit: BaseKit = {
  name: "KOVA Base Kit",
  price: 80,
  description:
    "The core magnetic chassis + standard PCB. This is your foundation for every future module upgrade.",
  includes: [
    "Magnetic modular chassis",
    "Standard PCB",
    "Firmware-ready base controller",
    "Toolless lock system",
  ],
};

export const storeModules: StoreModule[] = [
  {
    id: "paw3395",
    name: "PixArt PAW3395 Sensor Module",
    price: 25,
    description: "Upgrade to 4000Hz polling rate.",
    category: "Sensor",
    specs: ["PAW3395 optical core", "Up to 4000Hz polling", "Low-latency tracking"],
  },
  {
    id: "omron-optical",
    name: "Omron Optical Switch Pack",
    price: 15,
    description: "Zero double-click guarantee.",
    category: "Switch",
    specs: ["Optical actuation", "Debounce-free clicks", "Esports durability"],
  },
  {
    id: "honeycomb-shell",
    name: "Honeycomb SLA Grip Shell",
    price: 30,
    description: "Ultra-lightweight community design.",
    category: "Shell",
    specs: ["SLA precision print", "Ultra-light geometry", "High-grip texture"],
  },
];

export const hubSetups: HubSetup[] = [
  {
    id: "cs2-pro",
    title: "CS2 Pro Setup",
    featured: true,
    moduleIds: ["paw3395", "omron-optical", "honeycomb-shell"],
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
    moduleIds: ["paw3395", "omron-optical"],
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
    moduleIds: ["paw3395", "honeycomb-shell"],
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
    moduleIds: ["omron-optical", "honeycomb-shell"],
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
