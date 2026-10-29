// Meliel's own page copy, verbatim from docs/02-meliel-content.md (received 2026-10-26).
// Page copy lives in code (not the CMS). Do not reword without Jacob's confirmation;
// any small fix must be listed in the step summary. Missing copy is in seed.ts, not here.

export const nameMeaning = {
  amharic: {
    title: "መልዕል — ወደ ከፍታ የሚያደርስ መወጣጫ",
    paragraphs: [
      "መልዕል ማለት መወጣጫ፣ ከፍ ከፍ ማድረጊያ ማለት ነው። ሰውን ከአንድ ደረጃ ወደ ተሻለ ደረጃ የሚያደርስ መንገድ ነው። ለእኛ መልዕል ከስም በላይ ትርጉም አለው። የእድገት፣ የእድል እና ወደ ከፍታ የመድረስ ምልክት ነው።",
      "እኛ የምናደርገውም ይህንኑ ነው፤ ድርጅቶች እና ብራንዶች ያላቸውን አቅም እንዲያሳዩ፣ ከብዙዎች መካከል ጎልተው እንዲታዩ፣ ትኩረትን ከመሳብ አልፈው ወደ እውነተኛ ውጤት እንዲሸጋገሩ መንገድ እንከፍታለን። መልዕል ማለት ብራንዶችን ከያሉበት ደረጃ ወደ ሚገባቸው ከፍታ የሚያደርስ ኃይል ማለት ነው።",
    ],
  },
  english: {
    title: "Meliel: A Pathway to Greater Heights",
    paragraphs: [
      "Meliel means a way to rise, advance, and reach a higher level.",
      "To us, Meliel represents more than a name. It represents growth, opportunity, and the journey toward greater potential.",
      "This meaning lies at the heart of what we do. We help businesses and brands communicate their value, stand out in competitive markets, connect with the right audiences, and turn opportunities into measurable growth.",
      "Through strategy, creative production, and integrated digital marketing, we create pathways for brands to move beyond where they are today and toward where they aspire to be.",
      "To us, Meliel means helping brands rise from where they are to where they have the potential to be.",
    ],
  },
} as const;

export const mission =
  "To help brands and institutions build credible identities, reach the right audiences, and turn digital opportunities into measurable business growth through strategic marketing, creative execution, and data-driven solutions.";

export const vision =
  "To become Ethiopia's most trusted digital growth partner, empowering businesses and institutions to compete confidently in an increasingly digital world through innovative strategies, meaningful customer connections, and measurable long-term results.";

export const values = [
  {
    title: "Credibility first.",
    text: "We build trust through accurate information, transparent communication, responsible marketing, and promises we can stand behind.",
  },
  {
    title: "Strategy before execution.",
    text: "Every campaign, design, and marketing activity begins with a clear objective, a defined audience, and a reason for existing.",
  },
  {
    title: "Quality without compromise.",
    text: "From brand identity to video production and campaign delivery, we maintain high standards at every customer touchpoint.",
  },
  {
    title: "Measurable impact.",
    // Client wrote "enquiries"; normalized to American spelling per CLAUDE.md.
    text: "We evaluate success through meaningful outcomes such as qualified inquiries, customer acquisition, bookings, and return on marketing investment, not visibility alone.",
  },
  {
    title: "Purposeful creativity.",
    text: "We combine fresh ideas, compelling storytelling, and professional production to communicate value and inspire action.",
  },
  {
    title: "Partnership and accountability.",
    text: "We work alongside our clients, communicate openly, and take responsibility for the quality, direction, and continuous improvement of our work.",
  },
] as const;

export const differentiator =
  "Meliel connects brand credibility to customer acquisition. It brings together the thinking behind the marketing, the creative work that communicates it, and the systems that help convert interest into action.";

/** "How Meliel works": shown as a rising ladder, step 1 at the bottom. */
export const processSteps = [
  {
    title: "Strategy & Planning.",
    text: "We define goals, audiences, and marketing direction.",
  },
  {
    title: "Research & Positioning.",
    text: "We identify market opportunities and clarify brand positioning.",
  },
  {
    title: "Creative Production.",
    text: "We develop professional, brand-aligned marketing materials.",
  },
  {
    title: "Execution & Distribution.",
    text: "We launch campaigns across relevant digital channels.",
  },
  {
    title: "Tracking & Reporting.",
    text: "We measure performance and report meaningful results.",
  },
  {
    title: "Optimization & Growth.",
    text: "We refine strategies based on data and results.",
  },
] as const;

/** The brand line the hero is built on (last sentence of the English meaning). */
export const brandLine =
  "To us, Meliel means helping brands rise from where they are to where they have the potential to be.";
