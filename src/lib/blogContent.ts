export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "february-2025-deadline",
    title: "February 2025 Deadline: What You Need to Know About Prohibited AI Practices",
    excerpt: "The first major EU AI Act deadline is approaching. Here's a comprehensive breakdown of prohibited AI practices and how to ensure your organization is compliant before February 2, 2025.",
    category: "Regulation",
    author: "Dr. Anna Müller",
    authorRole: "Head of Compliance",
    date: "January 20, 2025",
    readTime: "12 min read",
    featured: true,
    content: `
# February 2025 Deadline: What You Need to Know About Prohibited AI Practices

The EU AI Act's first major deadline is fast approaching. On **February 2, 2025**, the rules on prohibited AI practices come into force. This means organizations must stop using—or never start using—AI systems that fall into prohibited categories.

## What's Prohibited?

The EU AI Act bans AI systems that pose unacceptable risks to fundamental rights. Here are the main categories:

### 1. Subliminal Manipulation
AI systems that deploy subliminal techniques beyond a person's consciousness to materially distort behavior in a way that causes or is likely to cause physical or psychological harm.

### 2. Exploitation of Vulnerabilities
AI systems that exploit vulnerabilities of specific groups of persons due to their age, disability, or social or economic situation.

### 3. Social Scoring
AI systems used by public authorities for social scoring—evaluating or classifying people based on their social behavior or personality characteristics, where this leads to detrimental treatment.

### 4. Biometric Categorization
AI systems that categorize individuals based on biometric data to infer race, political opinions, trade union membership, religious beliefs, sex life, or sexual orientation.

### 5. Real-Time Remote Biometric Identification
The use of real-time remote biometric identification systems in publicly accessible spaces for law enforcement, with very limited exceptions.

### 6. Emotion Inference in Workplace/Education
AI systems that infer emotions of people in the workplace or education institutions, except for medical or safety reasons.

### 7. Untargeted Facial Image Scraping
Creating or expanding facial recognition databases through untargeted scraping of facial images from the internet or CCTV footage.

### 8. Criminal Risk Profiling
AI systems that assess the risk of a natural person committing criminal offenses based solely on profiling or personality traits.

## What Should You Do Now?

### Step 1: Inventory Your AI Systems
Document all AI systems in use across your organization. You can't assess risk without knowing what you're using.

### Step 2: Screen for Prohibited Practices
For each AI system, ask: does it fall into any of the prohibited categories above? If you're unsure, escalate to legal review.

### Step 3: Document Your Analysis
Even if a system is clearly not prohibited, document your reasoning. This creates an audit trail and demonstrates due diligence.

### Step 4: Stop or Modify
If you identify a prohibited practice, you must stop using that system or modify it to remove the prohibited functionality before February 2, 2025.

## Next Steps

Klarvo's [Prohibited Practices Screening tool](/tools/prohibited-practices-screening) can help you quickly assess your AI systems against the prohibited categories. Start your free trial today and ensure you're compliant before the deadline.

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "annex-iii-categories-explained",
    title: "Annex III High-Risk Categories: A Practical Guide for SMEs",
    excerpt: "Deep dive into each Annex III category with real-world examples. Understand if your AI systems qualify as high-risk and what obligations apply.",
    category: "Deep Dive",
    author: "James Robertson",
    date: "January 18, 2025",
    readTime: "15 min read",
    content: `
# Annex III High-Risk Categories: A Practical Guide for SMEs

Understanding whether your AI system is "high-risk" under the EU AI Act is crucial—it determines whether you face significant compliance obligations or relatively light-touch requirements.

## The High-Risk Categories

Annex III of the EU AI Act lists specific use cases that automatically qualify as high-risk. Let's break them down with practical examples.

### 1. Biometrics

**What's covered:** AI systems intended for biometric identification and categorization of natural persons, emotion recognition systems.

**Examples:**
- Facial recognition for access control
- Voice recognition for identity verification
- Emotion detection in customer service calls

**Not covered:** Simple photo tagging in consumer apps (though transparency obligations may apply).

### 2. Critical Infrastructure

**What's covered:** AI systems intended as safety components in the management and operation of critical infrastructure.

**Examples:**
- AI managing power grid distribution
- Traffic control systems
- Water treatment optimization

### 3. Education and Vocational Training

**What's covered:** AI systems determining access to education, assessing students, or detecting prohibited behavior.

**Examples:**
- Automated exam grading
- Admission decision support systems
- Plagiarism detection with consequences
- Proctoring software

### 4. Employment, Workers Management, and Access to Self-Employment

**What's covered:** AI systems for recruitment, work-related decisions, monitoring, and performance evaluation.

**Examples:**
- CV screening tools
- Interview analysis software
- Performance prediction systems
- Automated scheduling based on productivity metrics

### 5. Access to Essential Services

**What's covered:** AI for credit scoring, insurance pricing, emergency services dispatch, and social benefits evaluation.

**Examples:**
- Credit decisioning algorithms
- Insurance risk assessment
- Emergency call prioritization

### 6. Law Enforcement

**What's covered:** Polygraphs, evidence evaluation, crime prediction, and profiling.

**Examples:**
- Predictive policing tools
- Evidence analysis systems

### 7. Migration, Asylum, and Border Control

**What's covered:** Risk assessment, document verification, and application processing.

### 8. Administration of Justice and Democratic Processes

**What's covered:** AI assisting judicial decisions or influencing election outcomes.

## What This Means for You

If your AI system falls into any of these categories, you'll need to:

1. **Register** in the EU database (in some cases)
2. **Implement** quality management systems
3. **Conduct** conformity assessments
4. **Maintain** human oversight
5. **Keep** detailed documentation

## Need Help Classifying?

Use Klarvo's [High-Risk Checker](/tools/high-risk-checker) to quickly assess your AI systems against Annex III categories.
    `
  },
  {
    slug: "ai-literacy-article-4",
    title: "Article 4 AI Literacy: Building Your Training Program",
    excerpt: "The EU AI Act requires 'sufficient AI literacy' for staff operating AI systems. Here's how to build a training program that meets the requirement.",
    category: "Training",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    content: `
# Article 4 AI Literacy: Building Your Training Program

Article 4 of the EU AI Act requires providers and deployers to take measures to ensure "sufficient AI literacy" of their staff and other persons dealing with the operation and use of AI systems on their behalf.

## What Does "AI Literacy" Mean?

AI literacy, as defined in the Act, means having skills, knowledge, and understanding that allows providers, deployers, and affected persons to:

- Make informed decisions regarding AI systems
- Be aware of opportunities and risks of AI
- Understand possible harms AI can cause

## Who Needs Training?

### For Deployers (Most SMEs)
- Anyone who operates AI systems day-to-day
- Managers overseeing AI-powered processes
- Staff affected by AI decisions
- Oversight personnel for high-risk systems

### For Providers
- Development teams
- Quality assurance staff
- Customer support teams
- Documentation writers

## Building Your Training Program

### Step 1: Assess Current Literacy Levels

Survey your team to understand:
- Current understanding of AI concepts
- Awareness of AI systems in use
- Knowledge of risks and limitations

### Step 2: Role-Based Training Tracks

**Track A: All Staff (Baseline)**
- What is AI? Basic concepts
- AI systems used in our organization
- Your rights and how to raise concerns
- Duration: 30-60 minutes

**Track B: AI Operators**
- How to use AI systems correctly
- Understanding outputs and limitations
- When to override or escalate
- Duration: 2-4 hours

**Track C: Oversight Personnel**
- Deep understanding of system capabilities
- Risk assessment and monitoring
- Incident response procedures
- Duration: 4-8 hours

### Step 3: Document Everything

Keep records of:
- Training materials and versions
- Attendance and completion
- Competency assessments
- Refresh schedules

## Practical Tips

1. **Make it relevant** - Use examples from your actual AI systems
2. **Keep it updated** - AI capabilities change; training should too
3. **Test understanding** - Simple quizzes ensure retention
4. **Plan for refresh** - Annual re-certification is a good practice

## Get Started

Klarvo's Training Tracker helps you manage AI literacy requirements across your organization. [Start your free trial](/auth/signup) to begin building your compliant training program.
    `
  },
  {
    slug: "deployer-obligations-checklist",
    title: "The Complete Deployer Obligations Checklist (Article 26)",
    excerpt: "Most SMEs are deployers, not providers. Here's your complete checklist for deployer obligations under the EU AI Act.",
    category: "Best Practices",
    author: "Dr. Anna Müller",
    date: "January 12, 2025",
    readTime: "10 min read",
    content: `
# The Complete Deployer Obligations Checklist (Article 26)

If you use AI systems developed by others—whether SaaS tools, APIs, or embedded AI—you're likely a **deployer** under the EU AI Act. This article provides a complete checklist of your obligations under Article 26.

## Who is a Deployer?

A deployer is any natural or legal person that uses an AI system under their authority, except where the AI system is used in the course of a personal non-professional activity.

Most SMEs fall into this category. You didn't build the AI, but you're responsible for how it's used.

## The Complete Deployer Checklist

### ✅ Use According to Instructions
- Obtain and retain the provider's instructions for use
- Use the AI system only as intended by the provider
- Don't modify the system beyond what's allowed

### ✅ Assign Human Oversight
- Designate competent individuals for oversight
- Ensure they have appropriate training
- Give them authority to intervene or stop the system

### ✅ Manage Input Data
- Ensure input data is relevant and representative
- Control data quality where you have control
- Document your data management practices

### ✅ Monitor Operation
- Monitor the AI system during operation
- Watch for risks or incidents
- Review performance regularly

### ✅ Keep Logs
- Retain logs generated by the AI system
- Keep them for at least 6 months (or as required)
- Ensure logs are accessible for audits

### ✅ Inform Affected Parties
- Tell workers when AI is used in the workplace (high-risk)
- Provide transparency notices to affected persons
- Handle subject access requests appropriately

### ✅ Report Issues
- Inform the provider of any risks you identify
- Suspend use if you suspect non-compliance
- Report serious incidents to authorities

### ✅ Conduct Impact Assessments (if required)
- Complete FRIA for high-risk public sector deployments
- Link to existing DPIAs where relevant

## Download the Full Checklist

Get our [Article 26 Deployer Checklist](/templates/article-26-checklist) as a downloadable template you can use to track your compliance.
    `
  },
  {
    slug: "fria-step-by-step",
    title: "Step-by-Step: Conducting Your First FRIA",
    excerpt: "A practical walkthrough of the Fundamental Rights Impact Assessment process, with templates and examples.",
    category: "How-To",
    author: "James Robertson",
    date: "January 10, 2025",
    readTime: "14 min read",
    content: `
# Step-by-Step: Conducting Your First FRIA

A Fundamental Rights Impact Assessment (FRIA) is required for certain deployers of high-risk AI systems. This guide walks you through the process step by step.

## When is FRIA Required?

You must conduct a FRIA if you are:
- A public authority deploying high-risk AI
- A private entity providing public services using high-risk AI
- Deploying certain Annex III high-risk systems

## The FRIA Process

### Step 1: Preparation

**Gather your team:**
- System owner
- Legal/compliance representative
- Data protection officer
- Subject matter experts for affected groups

**Collect documentation:**
- Provider's instructions for use
- Technical documentation
- Data flow diagrams
- Existing impact assessments

### Step 2: Describe the Process

Document:
- Your organization's process where AI is used
- The AI system's role in that process
- Decisions influenced by the AI
- Human oversight arrangements

### Step 3: Identify Affected Persons

Consider:
- Who is directly affected by AI outputs?
- Are there vulnerable groups?
- How many people are affected?
- What's the frequency of impact?

### Step 4: Assess Risks to Fundamental Rights

Evaluate risks across categories:
- Non-discrimination and equality
- Privacy and data protection
- Freedom of expression
- Access to services
- Due process and contestability

For each risk:
- Assess likelihood (Low/Medium/High)
- Assess severity (Low/Medium/High)
- Document your reasoning

### Step 5: Define Mitigations

For each identified risk:
- What controls reduce the risk?
- Who is responsible for each control?
- How will effectiveness be measured?

### Step 6: Document Oversight Measures

Describe:
- Who provides oversight
- Their competencies and training
- Their authority to intervene
- Escalation procedures

### Step 7: Approval and Notification

Complete:
- Internal approval workflow
- Document approvers and dates
- Notify market surveillance authority (if required)

## Get the Template

Download our [FRIA Template](/templates/fria-template) to structure your assessment.
    `
  },
  {
    slug: "ai-inventory-mistakes",
    title: "5 Common Mistakes When Building Your AI System Inventory",
    excerpt: "Avoid these pitfalls when documenting your AI systems. Learn from organizations that got it wrong—and how to get it right.",
    category: "Best Practices",
    author: "Sarah Chen",
    date: "January 8, 2025",
    readTime: "7 min read",
    content: `
# 5 Common Mistakes When Building Your AI System Inventory

Your AI system inventory is the foundation of EU AI Act compliance. Get it wrong, and everything built on top—classification, controls, evidence—will be flawed.

Here are the five most common mistakes we see, and how to avoid them.

## Mistake #1: Only Counting "Obvious" AI

**The problem:** Organizations inventory chatbots and recommendation engines but miss AI embedded in other tools—spam filters, grammar checkers, scheduling optimizers.

**The fix:** Survey every department. Ask "what tools make predictions, recommendations, or automate decisions?" You'll be surprised what surfaces.

## Mistake #2: Incomplete Vendor Documentation

**The problem:** Recording "We use Vendor X" without capturing which specific AI features, what data is processed, or what the vendor claims about compliance.

**The fix:** For each vendor-supplied AI:
- Get their AI documentation
- Understand which features use AI
- Document data flows
- Store their compliance statements

## Mistake #3: No Clear Ownership

**The problem:** AI systems listed without named owners. When it's nobody's system, nobody manages compliance.

**The fix:** Every AI system needs:
- A primary owner (accountable)
- A backup owner (continuity)
- Clear escalation paths

## Mistake #4: One-Time Exercise

**The problem:** Building an inventory once and never updating it. AI usage changes; your inventory becomes stale.

**The fix:** 
- Review quarterly at minimum
- Trigger reviews when tools change
- Include inventory updates in procurement processes

## Mistake #5: Missing the "Why"

**The problem:** Documenting what the AI does but not why it's used or what decisions it influences.

**The fix:** For each system, capture:
- Business purpose
- Decisions influenced
- Who is affected
- Why AI is used (vs. alternatives)

## Build a Better Inventory

Klarvo's guided wizard ensures you capture everything needed—and reminds you to review. [Start your inventory](/auth/signup) today.
    `
  },
  {
    slug: "vendor-due-diligence-ai",
    title: "Vendor Due Diligence for AI Systems: What to Ask",
    excerpt: "Your AI vendors need to support your compliance. Here's a comprehensive due diligence questionnaire for AI vendors.",
    category: "Vendor Management",
    author: "Dr. Anna Müller",
    date: "January 5, 2025",
    readTime: "9 min read",
    content: `
# Vendor Due Diligence for AI Systems: What to Ask

When you deploy AI systems from third-party vendors, you inherit compliance responsibilities. Your vendors need to support—not hinder—your EU AI Act compliance.

## The Vendor Compliance Questions

### AI System Documentation

1. Can you provide technical documentation of your AI system?
2. What is the intended purpose and scope of use?
3. What are the known limitations of the system?
4. Do you provide instructions for use?

### Risk Classification

5. Have you classified your AI system under the EU AI Act?
6. What is the classification result?
7. Can you share your classification reasoning?
8. Do you have prohibited practices screening results?

### High-Risk Obligations (if applicable)

9. Is the system registered in the EU database?
10. Do you have a conformity assessment?
11. What quality management system is in place?
12. Can you provide the CE marking documentation?

### Data and Privacy

13. What data does the AI system process?
14. Where is data stored and processed?
15. What data retention policies apply?
16. Do you have a DPA that covers AI processing?

### Transparency

17. What transparency notices should we provide to users?
18. Are outputs marked as AI-generated (if applicable)?
19. What information should we disclose to affected persons?

### Logging and Monitoring

20. What logs does the system generate?
21. How long are logs retained?
22. Can we export logs on demand?
23. What monitoring capabilities are available?

### Incident Response

24. What is your incident response process?
25. How will you notify us of issues?
26. What is your SLA for critical issues?
27. How do we report concerns to you?

### Ongoing Compliance

28. How do you stay current with EU AI Act requirements?
29. Will you provide compliance updates?
30. What happens if the system needs modification for compliance?

## Get the Full Questionnaire

Download our [Vendor Due Diligence Questionnaire](/templates/vendor-due-diligence) to use in your procurement process.
    `
  },
  {
    slug: "transparency-obligations-guide",
    title: "Transparency Obligations: When and How to Disclose AI Use",
    excerpt: "From chatbots to deepfakes to emotion recognition—understand your transparency obligations under Article 50.",
    category: "Regulation",
    author: "James Robertson",
    date: "January 3, 2025",
    readTime: "11 min read",
    content: `
# Transparency Obligations: When and How to Disclose AI Use

Article 50 of the EU AI Act establishes transparency obligations that apply regardless of risk classification. If your AI interacts with people, generates content, or makes inferences about emotions, you likely have disclosure requirements.

## The Four Transparency Scenarios

### 1. AI Interaction Disclosure

**When it applies:** AI systems designed to interact directly with natural persons.

**What to do:** Inform persons that they are interacting with an AI system, unless this is obvious from the circumstances.

**Example notices:**
- "You're chatting with our AI assistant"
- "This response was generated by artificial intelligence"

**Exceptions:** If a reasonable person would obviously know it's AI (e.g., clearly labeled chatbot interface).

### 2. Synthetic Content Marking

**When it applies:** AI systems that generate synthetic audio, image, video, or text content.

**What to do:** 
- Providers must ensure outputs are marked as artificially generated (machine-readable)
- Deployers must disclose that content is AI-generated

**Example:** AI-generated marketing images should be labeled "Created with AI"

### 3. Emotion Recognition / Biometric Categorization

**When it applies:** AI systems that do emotion recognition or biometric categorization.

**What to do:** Inform exposed persons that the system is in operation.

**Example:** "This call may be analyzed to detect customer sentiment"

### 4. Deep Fake Disclosure

**When it applies:** AI systems that generate or manipulate image, audio, or video content constituting a deep fake.

**What to do:** Disclose that the content has been artificially generated or manipulated.

**Exceptions:** 
- Artistic, satirical, or fictional works (with appropriate safeguards)
- Law enforcement purposes in specific circumstances

## Implementation Checklist

For each AI system:
- [ ] Does it interact directly with people?
- [ ] Does it generate synthetic content?
- [ ] Does it recognize emotions or categorize biometrics?
- [ ] Does it create deep fakes?

For each "yes":
- [ ] Design appropriate disclosure
- [ ] Implement disclosure mechanism
- [ ] Document evidence of disclosure
- [ ] Review accessibility of notices

## Sample Transparency Notices

Get our [Transparency Notice Pack](/templates/article-50-disclosure) with ready-to-use disclosure templates for each scenario.
    `
  },
  {
    slug: "building-oversight-culture",
    title: "Building a Human Oversight Culture for AI",
    excerpt: "Human oversight isn't just about having someone review outputs. It's about building processes that actually work.",
    category: "Best Practices",
    author: "Sarah Chen",
    date: "December 28, 2024",
    readTime: "8 min read",
    content: `
# Building a Human Oversight Culture for AI

The EU AI Act requires human oversight for high-risk AI systems. But ticking a box that says "human reviews outputs" isn't enough. You need a culture and processes that make oversight meaningful.

## What Meaningful Oversight Looks Like

### It's Not:
- ❌ Rubber-stamping AI decisions
- ❌ Reviewing 1% of outputs
- ❌ Someone who "could theoretically" intervene
- ❌ Oversight by untrained staff

### It Is:
- ✅ Understanding what the AI does and why
- ✅ Active monitoring for anomalies
- ✅ Real authority to override or stop
- ✅ Training specific to the AI system
- ✅ Time and resources to actually oversee

## The Three Oversight Models

### Human-in-the-Loop (HITL)
Human must approve before action is taken.
- Best for: High-stakes individual decisions
- Example: Final hiring decisions with AI recommendations

### Human-on-the-Loop (HOTL)
Human monitors and can intervene.
- Best for: High-volume, lower-stakes decisions
- Example: Content moderation with escalation paths

### Human-out-of-the-Loop (HOOTL)
Fully automated (rare for high-risk).
- Best for: Minimal-risk applications only
- Example: Spam filtering (not high-risk)

## Building Oversight into Your Culture

### 1. Leadership Commitment
Oversight needs resources. Leaders must prioritize it.

### 2. Clear Accountabilities
Who is responsible for oversight of each AI system? Document it.

### 3. Training and Competence
Oversight staff need:
- Understanding of AI capabilities and limitations
- Knowledge of what "normal" looks like
- Skills to investigate anomalies
- Authority and confidence to intervene

### 4. Adequate Time
If reviewers are overloaded, oversight becomes rubber-stamping. Budget realistic review time.

### 5. Psychological Safety
Staff must feel safe to question AI outputs, even when it slows things down.

### 6. Continuous Improvement
Review oversight effectiveness regularly. What are you catching? What are you missing?

## Document Your Oversight

Use our [Human Oversight Plan Template](/templates/human-oversight-plan) to document your oversight arrangements for each high-risk AI system.
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(post => post.featured);
}
