// Amharic drafts of the 5 services, in the same order as the English `includes` lists in seed.ts.
// Same review path as src/i18n/am.ts. Phase 3: these move into Payload's two-language fields.

import type { Service, ServiceSlug } from "@/lib/types";

export const servicesAm: Record<
  ServiceSlug,
  Pick<Service, "name" | "summary" | "includes" | "note">
> = {
  branding: {
    name: "ብራንዲንግ",
    summary:
      "የብራንድ ስትራቴጂ፣ የገበያ አቀማመጥ፣ የሎጎ ዲዛይን እና በሁሉም የብራንድ መገናኛዎች ወጥነትን የሚያረጋግጡ የመለያ መመሪያዎች።",
    includes: [],
  },
  "digital-marketing": {
    name: "የላቀ ዲጂታል ማርኬቲንግ",
    summary:
      "የብራንድ ዕውቅናን ለመገንባት፣ ዒላማ ተመልካቾችን ለመሳብ፣ ደንበኛ ሊሆኑ የሚችሉ ሰዎችን ለማፍራት እና ሊለካ የሚችል የንግድ እድገት ለማምጣት የተዘጋጀ የተቀናጀ የዲጂታል ማርኬቲንግ አገልግሎት።",
    includes: [
      "የዲጂታል ማርኬቲንግ ስትራቴጂ እና እቅድ",
      "የማኅበራዊ ሚዲያ አስተዳደር (SMM)",
      "የዘመቻ ዝግጅት እና አስተዳደር",
      "የሚከፈልበት ዲጂታል ማስታወቂያ",
      "የተመልካች ዒላማ እና ዳግም ዒላማ",
      "ደንበኛ ሊሆኑ የሚችሉ ሰዎችን ማፍራት እና የሽያጭ ሂደቶች",
      "የዲጂታል አፈጻጸም ክትትል እና ሪፖርት",
    ],
  },
  "market-analysis": {
    name: "የገበያ ትንተና",
    summary:
      "የገበያ አቀማመጥን፣ የማርኬቲንግ ውሳኔዎችን እና የዘመቻ ስትራቴጂን ለመምራት በደንበኛው ዘርፍ፣ በተፎካካሪዎች እና በዒላማ ተመልካቾች ላይ የሚደረግ ጥናት።",
    includes: [],
  },
  websites: {
    name: "የድረ-ገጽ ግንባታ እና አስተዳደር",
    summary:
      "የብራንድ ተዓማኒነትን የሚያጠናክሩ እና ደንበኛ ማፍራትን የሚደግፉ ሙያዊ ድረ-ገጾችን መንደፍ፣ መገንባት እና በቀጣይነት ማስተዳደር።",
    includes: [
      "የድረ-ገጽ ዲዛይን እና ግንባታ",
      "ለሞባይል ተስማሚ አቀማመጦች",
      "የድረ-ገጽ ይዘት ማስገባት",
      "የድረ-ገጽ ማሻሻያ እና ጥገና",
      "የአፈጻጸም ክትትል",
      "SEO፣ በተስማማንበት የሥራ ወሰን ውስጥ ከተካተተ",
    ],
  },
  "event-production": {
    name: "የሁነት ፕሮዳክሽን",
    summary: "ሙያዊ የሁነት ፎቶግራፍ፣ ቪዲዮ እና የቀጥታ ሽፋን።",
    includes: [],
    note: "ዋጋው እንደ ፕሮዳክሽን ፍላጎቱ ለብቻው ይሰጣል።",
  },
};
