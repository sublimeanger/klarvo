// SEO Keyword clusters for Klarvo pages
// Organized by funnel stage and intent

export const keywordClusters = {
  // BOFU - Bottom of funnel (ready to buy)
  bofu: {
    complianceSoftware: [
      "EU AI Act compliance software",
      "AI governance software",
      "AI compliance tool",
      "EU AI Act software",
      "AI regulation software",
    ],
    inventorySoftware: [
      "AI inventory software",
      "AI register software",
      "AI system inventory tool",
      "AI asset management software",
    ],
    evidencePacks: [
      "AI governance evidence pack",
      "AI compliance documentation",
      "AI audit evidence",
      "compliance evidence management",
    ],
    friaSoftware: [
      "FRIA software",
      "fundamental rights impact assessment tool",
      "Article 27 FRIA software",
      "FRIA automation",
    ],
    trainingTracker: [
      "AI literacy training tracker",
      "Article 4 training software",
      "AI training compliance",
    ],
  },

  // MOFU - Middle of funnel (evaluating options)
  mofu: {
    templates: {
      inventory: [
        "AI inventory template",
        "AI register template",
        "AI system register template",
        "EU AI Act inventory template",
      ],
      fria: [
        "FRIA template",
        "fundamental rights impact assessment template",
        "Article 27 template",
      ],
      article26: [
        "Article 26 checklist",
        "deployer obligations checklist",
        "high-risk AI checklist",
      ],
      article50: [
        "Article 50 disclosure template",
        "AI transparency notice template",
        "AI interaction disclosure",
      ],
      policy: [
        "AI acceptable use policy template",
        "AI governance policy template",
        "AI policy template",
      ],
      oversight: [
        "human oversight plan template",
        "AI oversight template",
        "Article 14 oversight plan",
      ],
      vendor: [
        "AI vendor due diligence questionnaire",
        "AI vendor assessment template",
        "supplier AI governance",
      ],
      incident: [
        "AI incident register template",
        "AI incident response template",
        "AI incident log",
      ],
    },
    tools: {
      definition: [
        "AI system definition checker",
        "is this an AI system",
        "AI system definition EU AI Act",
      ],
      highRisk: [
        "Annex III high-risk checker",
        "high-risk AI checker",
        "AI risk classification tool",
      ],
      transparency: [
        "Article 50 transparency checker",
        "AI transparency obligations checker",
      ],
      prohibited: [
        "prohibited AI practices checker",
        "Article 5 screening tool",
        "banned AI checker",
      ],
    },
    comparison: [
      "AI inventory spreadsheet vs software",
      "Klarvo vs spreadsheets",
      "AI compliance software comparison",
      "GRC vs AI compliance tool",
    ],
  },

  // TOFU - Top of funnel (learning)
  tofu: {
    guides: {
      sme: [
        "EU AI Act for SMEs",
        "EU AI Act small business",
        "AI Act compliance guide SME",
      ],
      definition: [
        "AI system definition EU AI Act",
        "what is an AI system EU AI Act",
        "AI system scope",
      ],
      prohibited: [
        "prohibited AI practices",
        "Article 5 EU AI Act",
        "banned AI practices",
      ],
      highRisk: [
        "high-risk AI Annex III",
        "high-risk AI categories",
        "Annex III EU AI Act",
      ],
      article26: [
        "Article 26 deployer obligations",
        "deployer duties EU AI Act",
        "AI deployer requirements",
      ],
      article50: [
        "Article 50 transparency obligations",
        "AI transparency requirements",
        "AI disclosure requirements",
      ],
      literacy: [
        "AI literacy EU AI Act",
        "Article 4 AI literacy",
        "AI training requirements",
      ],
      fria: [
        "FRIA EU AI Act",
        "Article 27 FRIA",
        "fundamental rights impact assessment",
      ],
      dueDiligence: [
        "AI governance due diligence",
        "AI procurement compliance",
        "AI vendor due diligence",
      ],
    },
    industries: {
      hr: [
        "AI Act HR compliance",
        "AI recruitment high-risk",
        "HR AI compliance",
      ],
      fintech: [
        "AI Act credit scoring",
        "fintech AI compliance",
        "credit AI high-risk",
      ],
      saas: [
        "EU AI Act SaaS",
        "SaaS AI compliance",
        "B2B SaaS EU AI Act",
      ],
    },
  },
};

// Helper to get primary keyword for a page
export function getPrimaryKeyword(cluster: string[]): string {
  return cluster[0] || "";
}

// Helper to get all keywords for a page (for meta tags)
export function getAllKeywords(clusters: string[][]): string[] {
  return clusters.flat();
}
