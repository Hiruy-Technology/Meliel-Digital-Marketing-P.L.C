// Real content from Meliel's company profile (PDF, received 2026-11-04), word for word.
// Used two ways: src/content/seed.ts shows it on dev and preview builds, and scripts/import-profile.ts
// (pnpm import:profile) loads it into the database for production.
//
// Amharic (`…Am`) are DRAFTS by Claude for Jacob's review and Meliel's sign-off, like src/i18n/am.ts.
// Client and personal names stay as Meliel wrote them. Assumptions are marked "ASSUMED" and listed
// in docs/07-content-request.md for Meliel to confirm.

import type { ServiceSlug } from "@/lib/types";

export const contact = {
  phones: ["0923 150 109", "0936 976 251"],
  email: "amikalkebede@gmail.com",
  address: "Summit Giorgis, Addis Ababa",
  /** DRAFT spelling, for Meliel to confirm. */
  addressAm: "ሰሚት ጊዮርጊስ፣ አዲስ አበባ",
  legalName: "Meliel Digital Marketing P.L.C.",
};

/** "Sectors we have grown", in the profile's order. */
export const sectors = [
  { slug: "healthcare", name: "Healthcare", nameAm: "ጤና አጠባበቅ" },
  { slug: "hospitality", name: "Hospitality", nameAm: "መስተንግዶ" },
  { slug: "travel", name: "Travel", nameAm: "ጉዞ" },
  { slug: "consultancy", name: "Consultancy", nameAm: "ማማከር" },
  {
    slug: "faith-based-education",
    name: "Faith-based education",
    nameAm: "የእምነት ትምህርት",
  },
] as const;

export type SectorSlug = (typeof sectors)[number]["slug"];

/** Team, leaders first. No bios or usable photos in the profile. */
export const team = [
  { name: "Eyasu Mesfin", role: "General Manager", roleAm: "ዋና ሥራ አስኪያጅ" },
  {
    name: "Yeaymrokal Kebede",
    role: "Production Manager",
    roleAm: "የፕሮዳክሽን ሥራ አስኪያጅ",
  },
  {
    name: "Kiya Habtamu",
    role: "Creative and Digital Operations Manager",
    roleAm: "የፈጠራ እና የዲጂታል ኦፕሬሽንስ ሥራ አስኪያጅ",
  },
  {
    name: "Dr. Yadeni Gedefa",
    role: "Medical Lead and Digital Strategist",
    roleAm: "የሕክምና ዘርፍ መሪ እና የዲጂታል ስትራቴጂስት",
  },
  { name: "Leul Merid", role: "Cinematographer", roleAm: "ሲኒማቶግራፈር" },
  { name: "Abhem Welde", role: "Cinematographer", roleAm: "ሲኒማቶግራፈር" },
  {
    name: "Bisrat Mebratu",
    role: "Creative and Graphics Designer",
    roleAm: "የፈጠራ እና የግራፊክስ ዲዛይነር",
  },
  {
    name: "Selome Tesfaye",
    role: "Creative and Graphics Designer",
    roleAm: "የፈጠራ እና የግራፊክስ ዲዛይነር",
  },
  { name: "Eleni Abera", role: "Video Editor", roleAm: "የቪዲዮ ኤዲተር" },
  { name: "Kaleab Abayneh", role: "Video Editor", roleAm: "የቪዲዮ ኤዲተር" },
];

const followers = { label: "followers", labelAm: "ተከታዮች" };
const likes = { label: "likes", labelAm: "መውደዶች" };
const views = { label: "views", labelAm: "እይታዎች" };

export type CaseStudy = {
  slug: string;
  client: string;
  /** ASSUMED except for the two hospitals, which the profile labels Healthcare. */
  sector: SectorSlug;
  /** ASSUMED: the profile shows social media results, so Advanced Digital Marketing. */
  services: ServiceSlug[];
  highlights: { value: string; label: string; labelAm: string }[];
  results: string[];
  resultsAm: string[];
  featured: boolean;
};

/** The "Proven Results" pages, in the profile's order. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "tzna-general-hospital",
    client: "TZNA General Hospital",
    sector: "healthcare",
    services: ["digital-marketing"],
    highlights: [
      { value: "32K+", ...followers },
      { value: "140K+", ...likes },
      { value: "6M+", ...views },
    ],
    results: [
      "Started from zero and reached these numbers in just 5 months.",
      "Generated 35+ walk-in paying patients monthly through digital campaigns.",
      "Established a structured, long-term digital growth framework.",
    ],
    resultsAm: [
      "ከዜሮ ጀምሮ በ5 ወራት ብቻ እነዚህ ቁጥሮች ላይ ደርሷል።",
      "በዲጂታል ዘመቻዎች በየወሩ ከ35 በላይ በአካል የሚመጡ ክፍያ የሚፈጽሙ ታካሚዎችን አምጥቷል።",
      "የተደራጀ የረጅም ጊዜ የዲጂታል እድገት ማዕቀፍ ተዘርግቷል።",
    ],
    featured: true,
  },
  {
    slug: "tuari-home-based-healthcare-service",
    client: "Tuari Home Based Healthcare Service",
    sector: "healthcare",
    services: ["digital-marketing"],
    highlights: [
      { value: "43K+", ...followers },
      { value: "190K+", ...likes },
      { value: "6.5M+", ...views },
    ],
    results: [
      "Built a complete digital ecosystem from scratch.",
      "Generated 15+ paying clients monthly via social media and reached over 180 clients within one year.",
    ],
    resultsAm: [
      "የተሟላ የዲጂታል ሥርዓት ከመሠረቱ ተገንብቷል።",
      "በማኅበራዊ ሚዲያ በየወሩ ከ15 በላይ ክፍያ የሚፈጽሙ ደንበኞችን አምጥቷል፤ በአንድ ዓመት ውስጥም ከ180 በላይ ደንበኞች ላይ ደርሷል።",
    ],
    featured: true,
  },
  {
    slug: "mael-medcontour-clinic",
    client: "Mael Medcontour Clinic",
    sector: "healthcare",
    services: ["digital-marketing"],
    highlights: [
      { value: "5K+", ...followers },
      { value: "370K+", ...views },
      { value: "14K+", ...likes },
    ],
    results: ["35+ walk-in paying patients monthly"],
    resultsAm: ["በየወሩ ከ35 በላይ በአካል የሚመጡ ክፍያ የሚፈጽሙ ታካሚዎች"],
    featured: true,
  },
  {
    slug: "dr-nejat-dental-clinic",
    client: "Dr. Nejat Dental Clinic",
    sector: "healthcare",
    services: ["digital-marketing"],
    highlights: [
      { value: "1.5K+", ...followers },
      { value: "40K+", ...views },
      { value: "3.6K+", ...likes },
    ],
    results: ["10+ walk-in paying patients monthly"],
    resultsAm: ["በየወሩ ከ10 በላይ በአካል የሚመጡ ክፍያ የሚፈጽሙ ታካሚዎች"],
    featured: false,
  },
  {
    slug: "sosida-gelateria-restaurant",
    client: "SoSIDa Gelateria & Restaurant",
    sector: "hospitality",
    services: ["digital-marketing", "branding"],
    highlights: [
      { value: "3K+", ...followers },
      { value: "200K+", ...views },
      { value: "24K+", ...likes },
    ],
    results: ["Premium identity and viral gelato content"],
    resultsAm: ["ደረጃውን የጠበቀ መለያ እና በሰፊው የተሰራጨ የጄላቶ ይዘት"],
    featured: false,
  },
  {
    slug: "ahaty-tour-and-travel",
    client: "Ahaty Tour and Travel",
    sector: "travel",
    services: ["digital-marketing"],
    highlights: [
      { value: "4.7K+", ...followers },
      { value: "100K+", label: "organic views", labelAm: "ተፈጥሯዊ እይታዎች" },
    ],
    results: ["A digital gateway to Ethiopia's hidden gems"],
    resultsAm: ["ወደ ኢትዮጵያ የተደበቁ ውበቶች የሚያደርስ ዲጂታል መግቢያ"],
    featured: false,
  },
  {
    slug: "maraki-consultancy",
    client: "Maraki Consultancy",
    sector: "consultancy",
    services: ["digital-marketing"],
    highlights: [
      { value: "100K+", ...followers },
      { value: "1.6M+", ...views },
      { value: "420K+", ...likes },
    ],
    results: ["Market-leading digital framework for consultancy"],
    resultsAm: ["ለማማከር ዘርፍ ገበያውን የሚመራ የዲጂታል ማዕቀፍ"],
    featured: false,
  },
  {
    slug: "merahut",
    client: "Merahut",
    sector: "faith-based-education",
    services: ["digital-marketing"],
    highlights: [
      { value: "211K+", ...followers },
      { value: "30M+", ...views },
      { value: "3.4M+", ...likes },
    ],
    results: ["Organic growth through storytelling"],
    resultsAm: ["በታሪክ አቀራረብ የተገኘ ተፈጥሯዊ እድገት"],
    featured: false,
  },
];

/** "Our Clients" in the profile, plus the case-study clients. Logo files still needed. */
export const clientNames = [
  ...caseStudies.map((c) => c.client),
  "Mayfair Dermatology",
  "Eastgate Import and Export",
  "Dejochesh Ayzegu Media",
  "Mado Real Estate",
  "Betedokimas Event Planners",
  "Ermiyas Mosaic Art",
];
