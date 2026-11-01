import type { Dictionary } from "./en";

// All Amharic wording on the site, mirroring en.ts key for key (the build fails on a missing key).
// DRAFT: written by Claude, for Jacob to review and Meliel to sign off. See docs/06-amharic-review.md
// (regenerate with `pnpm amharic`). Flip `amharicApproved` in config.ts once it is signed off.
export const am: Dictionary = {
  copy: {
    nameMeaning: {
      // On /am this column carries only the section heading: English pages show Meliel's Amharic
      // here, but on /am that same text is the main body below.
      amharic: {
        title: "የስሙ ትርጉም",
        paragraphs: [],
      },
      // Meliel's own Amharic, verbatim and in order, split so the layout matches English: the first
      // sentence is the page intro and the last sentence is set large.
      english: {
        title: "መልዕል — ወደ ከፍታ የሚያደርስ መወጣጫ",
        paragraphs: [
          "መልዕል ማለት መወጣጫ፣ ከፍ ከፍ ማድረጊያ ማለት ነው።",
          "ሰውን ከአንድ ደረጃ ወደ ተሻለ ደረጃ የሚያደርስ መንገድ ነው። ለእኛ መልዕል ከስም በላይ ትርጉም አለው። የእድገት፣ የእድል እና ወደ ከፍታ የመድረስ ምልክት ነው።",
          "እኛ የምናደርገውም ይህንኑ ነው፤ ድርጅቶች እና ብራንዶች ያላቸውን አቅም እንዲያሳዩ፣ ከብዙዎች መካከል ጎልተው እንዲታዩ፣ ትኩረትን ከመሳብ አልፈው ወደ እውነተኛ ውጤት እንዲሸጋገሩ መንገድ እንከፍታለን።",
          "መልዕል ማለት ብራንዶችን ከያሉበት ደረጃ ወደ ሚገባቸው ከፍታ የሚያደርስ ኃይል ማለት ነው።",
        ],
      },
    },
    mission:
      "ብራንዶች እና ተቋማት ተዓማኒ መለያ እንዲገነቡ፣ ትክክለኛውን ተመልካች እንዲደርሱ እና ዲጂታል እድሎችን በስትራቴጂያዊ ማርኬቲንግ፣ በፈጠራ አፈጻጸም እና በመረጃ በተደገፉ መፍትሔዎች ወደ ሚለካ የንግድ እድገት እንዲቀይሩ ማገዝ።",
    vision:
      "ንግዶች እና ተቋማት በፈጠራ በታገዙ ስትራቴጂዎች፣ ትርጉም ባለው የደንበኛ ግንኙነት እና ሊለካ በሚችል የረጅም ጊዜ ውጤት ይበልጥ ዲጂታል በሆነ ዓለም ውስጥ በልበ ሙሉነት እንዲወዳደሩ የሚያበቃ፣ በኢትዮጵያ እጅግ ታማኝ የዲጂታል እድገት አጋር መሆን።",
    values: [
      {
        title: "ተዓማኒነት ይቀድማል",
        text: "ትክክለኛ መረጃ በማቅረብ፣ ግልጽ በሆነ ግንኙነት፣ ኃላፊነት በተሞላበት ማርኬቲንግ እና ልንፈጽማቸው በምንችል ቃሎች እምነት እንገነባለን።",
      },
      {
        title: "ከአፈጻጸም በፊት ስትራቴጂ",
        text: "እያንዳንዱ ዘመቻ፣ ዲዛይን እና የማርኬቲንግ ሥራ የሚጀምረው ግልጽ በሆነ ዓላማ፣ በተለየ ተመልካች እና ለመኖሩ በቂ ምክንያት ነው።",
      },
      {
        title: "በጥራት አንደራደርም",
        text: "ከብራንድ መለያ እስከ ቪዲዮ ፕሮዳክሽን እና የዘመቻ አፈጻጸም ድረስ፣ ደንበኛ በሚያገኘን በእያንዳንዱ አጋጣሚ ከፍተኛ ደረጃን እንጠብቃለን።",
      },
      {
        title: "ሊለካ የሚችል ውጤት",
        text: "ስኬትን የምንመዝነው በታይታ ብቻ ሳይሆን እንደ ጥራት ያላቸው ጥያቄዎች፣ አዳዲስ ደንበኞች፣ ቦታ ማስያዣዎች እና ከማርኬቲንግ ወጪ የሚገኝ ተመላሽ ባሉ ትርጉም ያላቸው ውጤቶች ነው።",
      },
      {
        title: "ዓላማ ያለው ፈጠራ",
        text: "አዳዲስ ሐሳቦችን፣ ልብ የሚስብ ታሪክ አቀራረብን እና ሙያዊ ፕሮዳክሽንን አጣምረን እሴትን እናስተላልፋለን፤ ተግባርንም እናነሳሳለን።",
      },
      {
        title: "አጋርነት እና ተጠያቂነት",
        text: "ከደንበኞቻችን ጎን ሆነን እንሠራለን፣ በግልጽ እንነጋገራለን፣ ለሥራችን ጥራት፣ አቅጣጫ እና ቀጣይነት ያለው መሻሻል ኃላፊነት እንወስዳለን።",
      },
    ],
    differentiator:
      "መልዕል የብራንድ ተዓማኒነትን ከደንበኛ ማፍራት ጋር ያገናኛል። ከማርኬቲንግ ጀርባ ያለውን አስተሳሰብ፣ መልዕክቱን የሚያስተላልፈውን የፈጠራ ሥራ እና ፍላጎትን ወደ ተግባር የሚቀይሩ ሥርዓቶችን በአንድ ላይ ያመጣል።",
    differentiatorLead: "መልዕል የብራንድ ተዓማኒነትን ከደንበኛ ማፍራት ጋር ያገናኛል።",
    differentiatorDetail:
      "ከማርኬቲንግ ጀርባ ያለውን አስተሳሰብ፣ መልዕክቱን የሚያስተላልፈውን የፈጠራ ሥራ እና ፍላጎትን ወደ ተግባር የሚቀይሩ ሥርዓቶችን በአንድ ላይ ያመጣል።",
    processSteps: [
      {
        title: "ስትራቴጂ እና እቅድ",
        text: "ግቦችን፣ ተመልካቾችን እና የማርኬቲንግ አቅጣጫን እንወስናለን።",
      },
      {
        title: "ጥናት እና ገበያ አቀማመጥ",
        text: "የገበያ እድሎችን እንለያለን፤ የብራንዱን አቀማመጥ ግልጽ እናደርጋለን።",
      },
      {
        title: "የፈጠራ ፕሮዳክሽን",
        text: "ሙያዊ እና ከብራንዱ ጋር የሚስማሙ የማርኬቲንግ ሥራዎችን እናዘጋጃለን።",
      },
      {
        title: "አፈጻጸም እና ስርጭት",
        text: "ዘመቻዎችን አግባብ ባላቸው ዲጂታል መድረኮች ላይ እናስጀምራለን።",
      },
      {
        title: "ክትትል እና ሪፖርት",
        text: "አፈጻጸምን እንለካለን፤ ትርጉም ያላቸውን ውጤቶች ሪፖርት እናደርጋለን።",
      },
      {
        title: "ማሻሻል እና እድገት",
        text: "በመረጃ እና በውጤት ላይ ተመሥርተን ስትራቴጂዎችን እናሻሽላለን።",
      },
    ],
    brandLine: "መልዕል ማለት ብራንዶችን ከያሉበት ደረጃ ወደ ሚገባቸው ከፍታ የሚያደርስ ኃይል ማለት ነው።",
    heroHeadline: {
      before: "ብራንዶችን ከያሉበት ደረጃ ወደ ሚገባቸው ",
      highlight: "ከፍታ",
      after: " እናደርሳለን።",
    },
    valueStatement:
      "ድርጅቶች እና ብራንዶች እሴታቸውን እንዲያስተላልፉ፣ በተፎካካሪ ገበያ ውስጥ ጎልተው እንዲታዩ፣ ከትክክለኛው ተመልካች ጋር እንዲገናኙ እና እድሎችን ወደ ሚለካ እድገት እንዲቀይሩ እናግዛለን።",
    meaningShort: "መልዕል ማለት መወጣጫ፣ ከፍ ከፍ ማድረጊያ ማለት ነው።",
    pathwaysStatement:
      "በስትራቴጂ፣ በፈጠራ ፕሮዳክሽን እና በተቀናጀ ዲጂታል ማርኬቲንግ ብራንዶች ዛሬ ካሉበት አልፈው ወደሚመኙት ደረጃ የሚደርሱበትን መንገድ እንፈጥራለን።",
  },

  common: {
    skipToContent: "ወደ ዋናው ይዘት ይለፉ",
    home: "፣ መነሻ ገጽ",
    startProject: "ፕሮጀክት ይጀምሩ",
    getQuote: "ዋጋ ይጠይቁ",
    seeOurWork: "ሥራዎቻችንን ይመልከቱ",
    contactUs: "ያግኙን",
    backToHome: "ወደ መነሻ ገጽ ይመለሱ",
    services: "አገልግሎቶች",
    meliel: "መልዕል",
    digitalMarketing: "ዲጂታል ማርኬቲንግ",
  },

  meta: {
    siteName: "መልዕል ዲጂታል ማርኬቲንግ",
    homeTitle: "መልዕል ዲጂታል ማርኬቲንግ | አዲስ አበባ",
    aboutTitle: "ስለ እኛ",
    servicesTitle: "አገልግሎቶች",
    workTitle: "ሥራዎቻችን",
    workDescription: "የመልዕል ዲጂታል ማርኬቲንግ ሥራዎችን በአገልግሎት ወይም በዘርፍ መርጠው ይመልከቱ።",
    quoteTitle: "ዋጋ ይጠይቁ",
    quoteDescription:
      "ከመልዕል ዲጂታል ማርኬቲንግ የሚፈልጓቸውን አገልግሎቶች ይምረጡ፣ በጀትዎን እና የጊዜ ሰሌዳዎን ያጋሩ፣ ዋጋም ይጠይቁ።",
    contactTitle: "ያግኙን",
    contactDescription:
      "አዲስ አበባ የሚገኘውን መልዕል ዲጂታል ማርኬቲንግን በቅጽ፣ በስልክ፣ በኢሜይል፣ በWhatsApp ወይም በTelegram ያግኙ።",
    privacyTitle: "የግላዊነት ፖሊሲ",
    privacyDescription:
      "መልዕል ዲጂታል ማርኬቲንግ በዚህ ድረ-ገጽ በኩል የሚያጋሩትን መረጃ እንዴት እንደሚሰበስብ፣ እንደሚጠቀም እና እንደሚጠብቅ ይወቁ።",
    thankYouTitle: "እናመሰግናለን",
    notFoundTitle: "ገጹ አልተገኘም",
  },

  nav: {
    main: "ዋና ማውጫ",
    footer: "የግርጌ ማውጫ",
    work: "ሥራዎች",
    services: "አገልግሎቶች",
    about: "ስለ እኛ",
    contact: "ያግኙን",
    home: "መነሻ ገጽ",
    ourWork: "ሥራዎቻችን",
    aboutUs: "ስለ እኛ",
    getQuote: "ዋጋ ይጠይቁ",
    openMenu: "ማውጫውን ይክፈቱ",
    closeMenu: "ማውጫውን ይዝጉ",
    switchLanguage: "ወደ እንግሊዝኛ ይቀይሩ",
    lightTheme: "ወደ ብርሃን ገጽታ ይቀይሩ",
    darkTheme: "ወደ ጨለማ ገጽታ ይቀይሩ",
  },

  footer: {
    explore: "ይጎብኙ",
    contact: "አድራሻ",
    legalName: "መልዕል ዲጂታል ማርኬቲንግ ኃ.የተ.የግ.ማ.",
    rights: "መብቱ በሕግ የተጠበቀ ነው።",
    privacy: "የግላዊነት ፖሊሲ",
    socialMedia: "ማኅበራዊ ሚዲያ",
    onPlatform: "መልዕል በ{platform} (በአዲስ ትር ይከፈታል)",
    linkPending: "{platform} (ሊንኩ ገና አልተሰጠም)",
  },

  floating: {
    quickContact: "ፈጣን ግንኙነት",
    chat: "ከመልዕል ጋር በ{platform} ይጻጻፉ (በአዲስ ትር ይከፈታል)",
    notSetUp: "{platform} (ገና አልተዘጋጀም)",
  },

  preview: {
    notice: "የድረ-ገጹ ማሳሰቢያ",
    banner:
      "ለመልዕል ዲጂታል ማርኬቲንግ የተዘጋጀ የዲዛይን ቅድመ-ዕይታ። “PLACEHOLDER” የሚል ምልክት ያላቸው ሳጥኖች የእርስዎን ይዘት እየጠበቁ ነው።",
    formsOff: "የዲዛይን ቅድመ-ዕይታ፦ ቅጾቹ ገና ምንም አይልኩም።",
    draftTranslation: "ረቂቅ ትርጉም፦ ይህ የአማርኛ ጽሑፍ ገና አልተገመገመም።",
  },

  notFound: {
    eyebrow: "ስህተት 404",
    title: "ይህ ደረጃ ጠፍቷል።",
    text: "የሚፈልጉት ገጽ የለም ወይም ተዛውሯል። ወደ ትክክለኛው መንገድ የሚመልሱዎት ጥቂት አማራጮች እነሆ።",
    lookingFor: "የተለየ ነገር እየፈለጉ ነው?",
  },

  cta: {
    title: "ብራንድዎን ወደሚገባው ከፍታ ለማድረስ ዝግጁ ነዎት?",
    text: "ብራንድዎ ዛሬ የት እንዳለ እና ወዴት መሄድ እንደሚፈልግ ይንገሩን። የሚፈልጓቸውን አገልግሎቶች ይምረጡ፤ እኛም ዋጋ ይዘን እንመለሳለን።",
    projectTitle: "እንዲህ ያለ ውጤት ይፈልጋሉ?",
  },

  home: {
    eyebrow: "ዲጂታል ማርኬቲንግ · አዲስ አበባ",
    clients: "አብረናቸው የሠራናቸው ብራንዶች",
    resultsEyebrow: "ውጤቶች",
    servicesEyebrow: "አገልግሎቶች",
    servicesTitle: "የምንሠራው",
    allServices: "ሁሉም አገልግሎቶች",
    learnMore: "ተጨማሪ ይወቁ",
    workEyebrow: "ሥራዎቻችን",
    workTitle: "ተመራጭ ሥራዎች",
    seeAllWork: "ሁሉንም ሥራዎች ይመልከቱ",
    testimonialsEyebrow: "ምስክርነቶች",
    testimonialsTitle: "ደንበኞቻችን የሚሉት",
  },

  process: {
    eyebrow: "አሠራራችን",
    title: "እያንዳንዱ በቀዳሚው ላይ የሚገነባ ስድስት ደረጃዎች",
    step: "ደረጃ",
  },

  services: {
    title: "የምንሠራው",
    onThisPage: "በዚህ ገጽ ያሉ አገልግሎቶች",
    includes: "የሚያካትተው",
    relatedWork: "ተዛማጅ ሥራዎችን ይመልከቱ",
  },

  about: {
    eyebrow: "ስለ እኛ",
    storyEyebrow: "ታሪካችን",
    storyTitle: "እንዴት እንደተጀመረ",
    founded: "የተመሠረተበት ዓመት፦",
    missionVision: "ተልዕኮ እና ራዕይ",
    mission: "ተልዕኮ",
    vision: "ራዕይ",
    valuesEyebrow: "እሴቶች",
    valuesTitle: "የምንቆምለት",
    differentEyebrow: "መልዕልን ልዩ የሚያደርገው",
    teamEyebrow: "ቡድናችን",
    teamTitle: "ከሥራው ጀርባ ያለው ቡድን",
  },

  work: {
    eyebrow: "ሥራዎቻችን",
    title: "ብራንዶችን ወደፊት የሚያራምዱ ሥራዎች",
    intro: "የሠራናቸውን ሥራዎች በሚፈልጉት አገልግሎት ወይም ዘርፍ መርጠው ይመልከቱ።",
    projects: "ፕሮጀክቶች",
    filter: "ፕሮጀክቶችን ይለዩ",
    service: "አገልግሎት",
    industry: "ዘርፍ",
    allServices: "ሁሉም አገልግሎቶች",
    allIndustries: "ሁሉም ዘርፎች",
    oneProject: "ፕሮጀክት",
    manyProjects: "ፕሮጀክቶች",
    emptyTitle: "ከእነዚህ መለያዎች ጋር የሚዛመድ ፕሮጀክት የለም",
    emptyText: "ሌላ አገልግሎት ወይም ዘርፍ ይሞክሩ፣ ወይም ሁሉንም ይመልከቱ።",
    clearFilters: "መለያዎቹን ያጽዱ",
    allWork: "ሁሉም ሥራዎች",
    details: "የፕሮጀክቱ ዝርዝር",
    glance: "ውጤቶች በአጭሩ",
    theProject: "ፕሮጀክቱ",
    challenge: "ተግዳሮቱ",
    delivered: "ያከናወንነው",
    gallery: "ሥራው",
    video: "ቪዲዮ",
    videos: "ቪዲዮዎች",
    results: "ውጤቶቹ",
    resultsLabel: "ውጤቶች",
    more: "ተጨማሪ ፕሮጀክቶች",
    previous: "ያለፈው ፕሮጀክት",
    next: "ቀጣዩ ፕሮጀክት",
    viewImage: "ምስል {n} ከ{total} በሙሉ ስክሪን ይመልከቱ",
    images: "የፕሮጀክቱ ምስሎች",
    close: "ዝጋ",
    previousImage: "ያለፈው ምስል",
    nextImage: "ቀጣዩ ምስል",
    playVideo: "ቪዲዮውን ያጫውቱ፦ {title}",
  },

  form: {
    optional: "(አማራጭ)",
    errorOne: "እባክዎ ይህን መስክ ያረጋግጡ",
    errorMany: "እባክዎ እነዚህን {count} መስኮች ያረጋግጡ",
    name: "ስም",
    company: "ድርጅት",
    email: "ኢሜይል",
    phone: "ስልክ",
    budget: "የበጀት መጠን",
    timeline: "የጊዜ ሰሌዳ",
    chooseRange: "የበጀት መጠን ይምረጡ",
    chooseTimeline: "የጊዜ ሰሌዳ ይምረጡ",
    notSure: "ገና አልወሰንኩም",
    quoteOnRequest: "ዋጋው በጥያቄ ይሰጣል፦ የሁነት ፕሮዳክሽን ዋጋ በፍላጎትዎ መሠረት ይወሰናል።",
    honeypot: "ድረ-ገጽ",
  },

  errors: {
    name: "እባክዎ ስምዎን ያስገቡ።",
    tooLong: "እባክዎ ከ{max} ፊደላት አይብለጥ።",
    email: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ፤ ለምሳሌ name@company.com።",
    phone: "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ፣ ወይም ባዶ ይተዉት።",
    services: "እባክዎ ቢያንስ አንድ አገልግሎት ይምረጡ።",
    timeline: "እባክዎ የጊዜ ሰሌዳ ይምረጡ።",
    budget: "እባክዎ የበጀት መጠን ይምረጡ።",
    service: "እባክዎ አገልግሎት ይምረጡ፣ ወይም “ገና አልወሰንኩም” የሚለውን ይምረጡ።",
    message: "እባክዎ ስለሚፈልጉት ነገር ጥቂት ይንገሩን።",
  },

  quote: {
    eyebrow: "ዋጋ ይጠይቁ",
    title: "የሚፈልጉትን ይንገሩን",
    intro: "የሚፈልጓቸውን አገልግሎቶች ይምረጡ፣ በጀትዎን እና የጊዜ ሰሌዳዎን ያጋሩ፤ እኛም ዋጋ ይዘን እንመለሳለን።",
    stepOf: "ደረጃ {step} ከ3",
    step1: "የትኞቹን አገልግሎቶች ይፈልጋሉ?",
    step1Hint: "አንድ ወይም ከዚያ በላይ ይምረጡ።",
    anythingSpecific: "የተለየ የሚፈልጉት አለ?",
    step2: "በጀት እና የጊዜ ሰሌዳ",
    step3: "የእርስዎ መረጃ",
    project: "ስለ ፕሮጀክትዎ ይንገሩን",
    submit: "ዋጋ ይጠይቁ",
    privacyBefore: "መረጃዎን የምንጠቀመው ለዚህ ጥያቄ መልስ ለመስጠት ብቻ ነው። ይመልከቱ፦",
    privacyLink: "የግላዊነት ፖሊሲ",
    selection: "የመረጡት",
    noSelection: "ገና ምንም አገልግሎት አልተመረጠም።",
    oneItem: "{count} የተለየ ንጥል",
    manyItems: "{count} የተለዩ ንጥሎች",
    talkFirst: "መጀመሪያ መነጋገር ይመርጣሉ?",
    oneSelected: "{count} አገልግሎት ተመርጧል · ይቀጥሉ",
    manySelected: "{count} አገልግሎቶች ተመርጠዋል · ይቀጥሉ",
  },

  contact: {
    eyebrow: "ያግኙን",
    title: "እንነጋገር",
    intro: "መልዕክት ይላኩልን ወይም በቀጥታ ያግኙን፤ ለእርስዎ በሚመች መንገድ።",
    region: "መልዕልን ያግኙ",
    location: "የቢሮ አድራሻ",
    quoteLink: "የሚፈልጓቸውን አገልግሎቶች ያውቃሉ? ዋጋ ይጠይቁ",
    service: "የሚፈልጉት አገልግሎት",
    chooseService: "አገልግሎት ይምረጡ",
    help: "እንዴት ልንረዳዎ እንችላለን?",
    send: "መልዕክት ይላኩ",
    direct: "በቀጥታ ያግኙን",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    phone: "ስልክ",
    email: "ኢሜይል",
    office: "ቢሮ",
    hours: "የሥራ ሰዓት",
    follow: "ይከተሉን",
    showMap: "ካርታውን አሳይ",
    mapTitle: "የመልዕል ዲጂታል ማርኬቲንግ ቢሮ አድራሻ በGoogle Maps",
  },

  thankYou: {
    quoteEyebrow: "የዋጋ ጥያቄዎ ደርሶናል",
    messageEyebrow: "መልዕክትዎ ደርሶናል",
    title: "እናመሰግናለን።",
    quoteText: "ጥያቄዎ ደርሶናል፤ ዋጋ ይዘን እንመለሳለን።",
    messageText: "መልዕክትዎ ደርሶናል፤ በቅርቡ እንመለስልዎታለን።",
  },

  privacy: {
    eyebrow: "ሕጋዊ",
    title: "የግላዊነት ፖሊሲ",
    effective: "ተግባራዊ የሚሆንበት ቀን፦",
    // {entity}, {address}, {retention} and {contact} become the client's details.
    blocks: [
      {
        title: "እኛ ማን ነን",
        paragraphs: [
          "ይህ ድረ-ገጽ የሚተዳደረው በ{entity}፣ {address} (“መልዕል”፣ “እኛ”) ነው። ይህ ፖሊሲ በዚህ ድረ-ገጽ በኩል ምን መረጃ እንደምንሰበስብ እና እንዴት እንደምንጠቀምበት ያብራራል።",
        ],
      },
      {
        title: "የምንሰበስበው መረጃ",
        paragraphs: [
          "ጥያቄ ሲልኩልን ወይም ዋጋ ሲጠይቁ ያስገቡትን መረጃ እንሰበስባለን፦ ስምዎን፣ ድርጅትዎን፣ የኢሜይል አድራሻዎን፣ ስልክ ቁጥርዎን፣ የሚፈልጓቸውን አገልግሎቶች፣ የበጀት መጠንዎን እና የጊዜ ሰሌዳዎን እንዲሁም መልዕክትዎን።",
          "እንዲሁም የአጠቃቀም መረጃ እንሰበስባለን፤ ለምሳሌ የታዩ ገጾችን፣ የጎብኝዎችን ብዛት እና ጎብኝዎች ድረ-ገጹን እንዴት እንዳገኙት።",
        ],
      },
      {
        title: "እንዴት እንጠቀምበታለን",
        paragraphs: [
          "መረጃዎን ለጥያቄዎ መልስ ለመስጠት፣ ዋጋ ለማዘጋጀት እና ከእርስዎ ጋር ያለንን ግንኙነት ለማስተዳደር እንጠቀምበታለን። የአጠቃቀም መረጃን ደግሞ ድረ-ገጹን ለመረዳት እና ለማሻሻል እንጠቀምበታለን።",
        ],
      },
      {
        title: "ለማን እናጋራለን",
        paragraphs: [
          "ይህን ድረ-ገጽ ለማስኬድ የታመኑ አገልግሎት ሰጪዎችን እንጠቀማለን፤ ከእነዚህም መካከል የድረ-ገጽ ማስተናገጃ፣ የኢሜይል መላኪያ እና Google Analytics ይገኙበታል። እነዚህ አገልግሎት ሰጪዎች መረጃውን በእኛ ምትክ ያስኬዳሉ። የግል መረጃዎን አንሸጥም።",
          "ቪዲዮዎች እና ካርታዎች ከYouTube፣ ከVimeo እና ከGoogle ይመጣሉ። የሚጫኑት ቪዲዮ ለማጫወት ወይም ካርታውን ለማሳየት ሲመርጡ ብቻ ነው፤ በዚያን ጊዜ የእነዚያ ኩባንያዎች የግላዊነት ፖሊሲዎች ተግባራዊ ይሆናሉ።",
        ],
      },
      {
        title: "ኩኪዎች እና የአጠቃቀም ልኬት",
        paragraphs: [
          "ድረ-ገጹ እንዴት ጥቅም ላይ እንደሚውል ለመለካት ኩኪዎችን የሚጠቀመውን Google Analytics እንጠቀማለን። በአሳሽዎ ቅንብሮች ኩኪዎችን ማገድ ወይም መሰረዝ ይችላሉ።",
        ],
      },
      {
        title: "ለምን ያህል ጊዜ እናቆየዋለን",
        paragraphs: [
          "ለፕሮጀክት ወይም ለሕጋዊ ግዴታ ከዚያ በላይ ካላስፈለገን በስተቀር የጥያቄ መረጃን ለ{retention} እናቆያለን።",
        ],
      },
      {
        title: "የእርስዎ ምርጫዎች",
        paragraphs: [
          "ስለ እርስዎ የያዝነውን የግል መረጃ እንድናሳይዎ፣ እንድናስተካክል ወይም እንድንሰርዝ መጠየቅ ይችላሉ። በ{contact} ያግኙን።",
        ],
      },
      {
        title: "በዚህ ፖሊሲ ላይ የሚደረጉ ለውጦች",
        paragraphs: [
          "ይህን ፖሊሲ አልፎ አልፎ ልናሻሽለው እንችላለን። የቅርብ ጊዜው ስሪት ሁልጊዜ በዚህ ገጽ ላይ ይገኛል።",
        ],
      },
    ],
  },
};
