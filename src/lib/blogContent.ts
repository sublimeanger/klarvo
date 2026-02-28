import prohibitedPracticesImg from "@/assets/blog/prohibited-practices.jpg";
import highRiskCategoriesImg from "@/assets/blog/high-risk-categories.jpg";
import aiLiteracyImg from "@/assets/blog/ai-literacy.jpg";
import deployerObligationsImg from "@/assets/blog/deployer-obligations.jpg";
import friaAssessmentImg from "@/assets/blog/fria-assessment.jpg";
import aiInventoryImg from "@/assets/blog/ai-inventory.jpg";
import vendorDueDiligenceImg from "@/assets/blog/vendor-due-diligence.jpg";
import transparencyObligationsImg from "@/assets/blog/transparency-obligations.jpg";
import humanOversightImg from "@/assets/blog/human-oversight.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  featuredImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "february-2025-deadline",
    title: "February 2025 Deadline: What You Need to Know About Prohibited AI Practices",
    excerpt: "The first major EU AI Act deadline is approaching. Here's a comprehensive breakdown of prohibited AI practices and how to ensure your organization is compliant before February 2, 2025.",
    category: "Regulation",
    author: "Klarvo Staff",
    date: "January 20, 2025",
    readTime: "12 min read",
    featured: true,
    featuredImage: prohibitedPracticesImg,
    content: `
# February 2025 Deadline: What You Need to Know About Prohibited AI Practices

The EU AI Act's first major deadline arrived on **February 2, 2025**, when the rules on prohibited AI practices came into force. This means every organization operating in or serving the EU market must ensure none of its AI systems fall into the prohibited categories—or face severe consequences including fines of up to €35 million or 7% of global annual turnover, whichever is higher.

For many SMEs, this deadline felt sudden. But the reality is that understanding prohibited practices is the foundation of all EU AI Act compliance. If you haven't screened your AI systems yet, this guide will walk you through everything you need to know.

## Why Prohibited Practices Matter

The EU AI Act takes a risk-based approach to AI regulation. At the very top of the risk pyramid are AI systems that pose "unacceptable risks" to fundamental rights and values. These systems are outright banned—no exceptions, no mitigation measures, no compliance workarounds.

This is different from high-risk AI systems, which are allowed but heavily regulated. Prohibited means prohibited. Period.

The rationale is straightforward: some uses of AI are so fundamentally incompatible with EU values—human dignity, non-discrimination, democracy—that no amount of safeguards can make them acceptable.

## The Eight Prohibited Categories Explained

### 1. Subliminal Manipulation

AI systems that deploy subliminal techniques beyond a person's consciousness to materially distort their behavior in a way that causes or is likely to cause physical or psychological harm are banned.

**What this means in practice:** If your AI system uses techniques that people cannot perceive—hidden audio frequencies, imperceptible visual stimuli, or other subconscious manipulation methods—to influence their decisions in harmful ways, it's prohibited.

**SME example:** A marketing platform that uses AI to insert imperceptible persuasion cues into advertisements that bypass conscious decision-making. Note that standard A/B testing and recommendation algorithms are generally NOT prohibited—the key threshold is "beyond a person's consciousness" and "likely to cause harm."

### 2. Exploitation of Vulnerabilities

AI systems that exploit vulnerabilities of specific groups due to their age, disability, or social or economic situation to materially distort their behavior in a harmful way.

**What this means in practice:** If your AI targets vulnerable populations with manipulative techniques that exploit their specific vulnerabilities, it crosses the line.

**SME example:** An AI-powered lending product that specifically targets elderly users with confusing interfaces designed to get them to accept unfavorable terms. Or an AI system that identifies financially stressed individuals and pushes high-interest products on them.

### 3. Social Scoring by Public Authorities

AI systems used by or on behalf of public authorities for evaluating or classifying individuals based on their social behavior or known/inferred personality characteristics, where the resulting social score leads to detrimental or unfavorable treatment in unrelated contexts or that is disproportionate.

**What this means in practice:** Government-style social credit systems are banned in the EU. This includes any system that aggregates data about citizens' behavior across different life domains to assign a trustworthiness score.

**SME relevance:** While most SMEs aren't public authorities, if you provide technology to government clients, you must ensure your systems cannot be used for social scoring purposes.

### 4. Criminal Risk Profiling

AI systems that assess or predict the risk of a natural person committing criminal offenses based solely on profiling or personality traits assessments. This prohibition does not apply to AI systems used to support human assessment based on objective, verifiable facts directly linked to criminal activity.

**What this means in practice:** You cannot build or deploy AI that says "this person is likely to commit a crime" based purely on who they are rather than what they've done.

### 5. Untargeted Facial Image Scraping

Creating or expanding facial recognition databases through the untargeted scraping of facial images from the internet or CCTV footage.

**What this means in practice:** Services like Clearview AI's original model—scraping billions of photos from social media to build facial recognition databases—are explicitly prohibited.

**SME relevance:** If you use facial recognition services, verify that your vendor's training data was obtained lawfully and not through untargeted scraping.

### 6. Emotion Inference in Workplace and Education

AI systems that infer emotions of individuals in the workplace or education institutions, except where the AI system is intended to be put into service or placed on the market for medical or safety reasons.

**What this means in practice:** You cannot use AI to analyze whether your employees are happy, stressed, or engaged through facial expression analysis, voice tone detection, or similar emotion inference technologies—unless it's for genuine medical or safety reasons (e.g., detecting driver fatigue for safety).

**SME example:** An HR tool that monitors employee webcams during work to assess "engagement levels" through facial expression analysis. This is clearly prohibited. However, a safety system that detects if a forklift operator is showing signs of extreme fatigue may be permitted under the medical/safety exception.

### 7. Biometric Categorization for Sensitive Attributes

AI systems that categorize individuals based on their biometric data to deduce or infer their race, political opinions, trade union membership, religious or philosophical beliefs, sex life, or sexual orientation. This does not apply to lawful labeling or filtering of biometric data sets or categorization based on biometric data in law enforcement.

**What this means in practice:** Using AI to look at someone's face or body to guess their religion, political beliefs, or sexual orientation is prohibited.

### 8. Real-Time Remote Biometric Identification in Public Spaces

The use of real-time remote biometric identification systems in publicly accessible spaces for law enforcement, with very limited exceptions requiring prior judicial authorization and for specific serious crimes.

**SME relevance:** This primarily affects law enforcement technology providers, but if your business provides security or surveillance services, ensure your offerings don't cross this line.

## How to Screen Your AI Systems

### Step 1: Build Your AI System Inventory

You can't screen what you don't know about. Start by cataloging every AI system in use across your organization. This includes:

- SaaS tools with AI features (CRM, marketing, HR platforms)
- Custom-built AI models
- AI APIs you integrate with
- AI features embedded in products you sell
- Even tools like grammar checkers and spam filters

Use Klarvo's [AI System Intake Wizard](/ai-systems/wizard) to capture everything systematically in under 10 minutes per system.

### Step 2: Run the Prohibited Practices Screening

For each AI system, answer the eight screening questions. Be honest and thorough. If an answer is "unsure," flag it for legal review rather than assuming it's fine.

Our [Prohibited Practices Screening Tool](/tools/prohibited-practices-screening) guides you through each question with plain-language explanations and examples.

### Step 3: Document Everything

Whether a system passes or fails screening, document your reasoning. This creates an audit trail that demonstrates due diligence. For each system, record:

- The screening questions and your answers
- Your rationale for each answer
- Who conducted the screening and when
- Any external advice you sought
- The final conclusion

### Step 4: Act on Findings

If you identify a potential prohibited practice:

1. **Stop immediately.** Do not continue using the system while you investigate.
2. **Escalate to legal counsel.** Get qualified advice on whether it truly falls within the prohibition.
3. **Document the decision.** Record what you found, what advice you received, and what action you took.
4. **Modify or discontinue.** Either remove the prohibited functionality or stop using the system entirely.

## Common Misconceptions

**"We're too small to be affected."** Size doesn't matter. The EU AI Act applies to any organization deploying AI systems in the EU market, regardless of size. SMEs do get some accommodations for high-risk compliance, but prohibited practices are banned for everyone.

**"We don't build AI, so this doesn't apply to us."** Wrong. As a deployer, you're responsible for how AI is used under your authority. If your vendor's tool has prohibited functionality, you're liable for using it.

**"Our AI is just recommendations, not decisions."** The test isn't whether it makes decisions—it's whether it distorts behavior through prohibited means. An AI recommendation system that uses subliminal manipulation is still prohibited, even if a human makes the final call.

**"We only operate outside the EU."** If your AI system affects people within the EU—even if your company is based elsewhere—the EU AI Act applies to you.

## Penalties for Non-Compliance

Violations of the prohibited practices provisions carry the highest penalties under the EU AI Act:

- Up to **€35 million** or **7% of total worldwide annual turnover**, whichever is higher, for companies
- Up to **€7.5 million** for individual infringements by SMEs and startups

These are maximum penalties, but even a fraction of these amounts would be devastating for most SMEs.

## What to Do Next

1. **Screen your AI systems now** using Klarvo's [Prohibited Practices Screening Tool](/tools/prohibited-practices-screening)
2. **Build your AI inventory** if you haven't already—use our [guided wizard](/ai-systems/wizard) to get started in minutes
3. **Download our Article 5 screening checklist** from the [Templates library](/templates/article-26-checklist)
4. **Sign up for Klarvo** to manage your entire EU AI Act compliance journey from one platform

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "annex-iii-categories-explained",
    title: "Annex III High-Risk Categories: A Practical Guide for SMEs",
    excerpt: "Deep dive into each Annex III category with real-world examples. Understand if your AI systems qualify as high-risk and what obligations apply.",
    category: "Deep Dive",
    author: "Klarvo Staff",
    date: "January 18, 2025",
    readTime: "15 min read",
    featuredImage: highRiskCategoriesImg,
    content: `
# Annex III High-Risk Categories: A Practical Guide for SMEs

Understanding whether your AI system is "high-risk" under the EU AI Act is one of the most consequential determinations you'll make. A high-risk classification triggers extensive obligations—quality management systems, conformity assessments, human oversight requirements, logging, monitoring, and more. Getting the classification wrong in either direction is costly: over-classifying wastes resources on unnecessary compliance, while under-classifying exposes you to enforcement action and fines of up to €15 million or 3% of global turnover.

This guide breaks down each Annex III category with real-world examples relevant to SMEs, helping you make accurate, defensible classification decisions.

## How Annex III Works

The EU AI Act identifies high-risk AI systems in two ways:

1. **AI used as a safety component of a regulated product** (or AI that is itself a regulated product) covered by EU product legislation listed in Annex I—such as medical devices, machinery, vehicles, and toys.

2. **AI systems in specific use-case categories listed in Annex III.** These are the focus of this guide.

Importantly, even if your AI system falls into an Annex III category, there is an exception: if the system does not pose a significant risk of harm to health, safety, or fundamental rights, it may not be considered high-risk. However, you must document this assessment carefully.

## The Eight Annex III Categories

### 1. Biometrics

**What's covered:** AI systems intended for:
- Remote biometric identification (not real-time, which is separately regulated/prohibited)
- Biometric categorization based on sensitive or protected attributes
- Emotion recognition systems

**Real-world SME examples:**
- A security company using facial recognition for building access control
- A retail analytics platform using face detection to estimate customer demographics (age, gender)
- A call center platform that analyzes voice patterns to detect customer emotions
- Video interview platforms that score candidates partly on facial expression analysis

**Not typically high-risk:** Simple photo tagging in consumer apps, basic face unlock on personal devices (these have transparency obligations instead).

**Key question to ask:** Does our AI system identify, categorize, or make inferences about people based on their biometric data (face, voice, fingerprint, gait)?

### 2. Critical Infrastructure

**What's covered:** AI systems intended as safety components in the management and operation of:
- Road traffic and transport systems
- Supply of water, gas, heating, and electricity
- Digital infrastructure

**Real-world SME examples:**
- An AI system that optimizes energy grid load balancing
- Traffic signal optimization algorithms
- AI monitoring water treatment plant parameters
- Network security AI protecting critical digital infrastructure

**Key question to ask:** If our AI system fails or makes an error, could it directly affect the safety or continuity of critical infrastructure?

### 3. Education and Vocational Training

**What's covered:** AI systems used to:
- Determine access to or admission into educational institutions
- Evaluate learning outcomes
- Assess appropriate educational levels
- Monitor and detect prohibited behavior during tests

**Real-world SME examples:**
- An EdTech platform that uses AI to grade essays or exams
- University admission systems that rank or filter applicants
- AI proctoring software that monitors students during online exams
- Adaptive learning systems that determine student progression paths
- AI-based plagiarism detection that triggers academic consequences

**Not typically high-risk:** AI tutoring assistants that provide suggestions without determining grades or access decisions.

**Key question to ask:** Does our AI system influence decisions about access to education, academic assessment, or progression?

### 4. Employment, Workers Management, and Access to Self-Employment

This is one of the most relevant categories for SMEs, as many use AI in HR and workforce management.

**What's covered:** AI systems used for:
- Recruiting and candidate selection (CV screening, interview analysis)
- Decisions affecting employment relationships (promotion, termination, task allocation)
- Monitoring and evaluating worker performance
- Decisions about access to self-employment opportunities

**Real-world SME examples:**
- AI-powered applicant tracking systems (ATS) that rank or filter CVs
- Video interview platforms that score candidates using AI
- Employee performance prediction tools
- AI scheduling systems that allocate shifts based on productivity metrics
- Platform economy algorithms that assign gigs to self-employed workers
- AI tools that monitor employee keystrokes, screen activity, or communication patterns

**Key question to ask:** Does our AI system influence hiring, firing, performance evaluation, promotion, task allocation, or workforce monitoring decisions?

### 5. Access to and Enjoyment of Essential Private and Public Services

**What's covered:** AI systems used for:
- Evaluating creditworthiness or establishing credit scores
- Risk assessment and pricing in life and health insurance
- Evaluating eligibility for public assistance benefits and services
- Emergency services dispatch and prioritization
- Evaluating and classifying emergency calls

**Real-world SME examples:**
- Fintech lending platforms with AI credit scoring
- InsurTech platforms using AI for risk assessment
- AI-powered triage systems in healthcare
- Government benefit eligibility assessment tools
- Fraud detection systems that can result in service denial

**Key question to ask:** Does our AI system affect someone's access to financial services, insurance, healthcare, emergency services, or public benefits?

### 6. Law Enforcement

**What's covered:** AI systems used by law enforcement for:
- Individual risk assessment (risk of offending, re-offending, or being a victim)
- Polygraphs and similar tools
- Evaluation of evidence reliability
- Predicting crime occurrence or recurrence
- Profiling of natural persons

**SME relevance:** Primarily affects technology vendors selling to law enforcement agencies. If you provide any technology to police, border agencies, or justice systems, review this category carefully.

### 7. Migration, Asylum, and Border Control Management

**What's covered:** AI systems used for:
- Risk assessments related to irregular migration
- Examination of visa and asylum applications
- Detection, recognition, and identification of individuals in border contexts

**SME relevance:** Relevant if you provide technology to immigration authorities or border management agencies.

### 8. Administration of Justice and Democratic Processes

**What's covered:** AI systems used for:
- Researching, interpreting, and applying law to facts
- Assisting judicial bodies in dispute resolution
- Influencing the outcome of elections or referendums

**SME relevance:** Relevant for LegalTech companies providing AI-assisted legal research, case analysis, or prediction tools to courts and legal professionals.

## What High-Risk Classification Means for You

If your AI system is classified as high-risk, your obligations as a deployer include:

1. **Use according to instructions** — Follow the provider's instructions for use precisely
2. **Assign competent human oversight** — Designate trained individuals with authority to intervene
3. **Manage input data quality** — Ensure data fed to the system is relevant and representative (where you control inputs)
4. **Monitor operation** — Continuously monitor for proper functioning and report issues
5. **Keep logs** — Retain automatically generated logs for at least 6 months
6. **Inform workers** — Notify employees and their representatives before deploying high-risk AI in the workplace
7. **Conduct FRIA** — Perform a Fundamental Rights Impact Assessment if you're a public body or providing public services
8. **Register in EU database** — Some deployers must register high-risk system use

## Practical Classification Tips for SMEs

**Tip 1: Focus on purpose, not technology.** The classification is about what the AI does, not how it works. A simple logistic regression used for credit scoring is just as high-risk as a deep learning model used for the same purpose.

**Tip 2: Consider the actual deployment context.** An AI system that could be high-risk in one context might not be in another. A general-purpose chatbot is not high-risk. The same chatbot deployed as the primary interface for emergency services dispatch could be.

**Tip 3: Document your reasoning.** Whether you classify a system as high-risk or not, write down why. This is your defense in case of an audit or enforcement action.

**Tip 4: When in doubt, treat it as high-risk.** It's better to over-comply than under-comply. You can always downgrade later if your analysis supports it.

**Tip 5: Re-assess when things change.** If you change how an AI system is used, its classification may change too.

## What to Do Next

1. Use Klarvo's [High-Risk Checker](/tools/high-risk-checker) to quickly screen your AI systems against all Annex III categories
2. For each system flagged as potentially high-risk, review the detailed deployer obligations in our [Article 26 Checklist](/templates/article-26-checklist)
3. Build your complete [AI System Inventory](/ai-systems/wizard) to ensure nothing is missed
4. [Sign up for Klarvo](/auth/signup) to manage classification, controls, and evidence in one platform
    `
  },
  {
    slug: "ai-literacy-article-4",
    title: "Article 4 AI Literacy: Building Your Training Program",
    excerpt: "The EU AI Act requires 'sufficient AI literacy' for staff operating AI systems. Here's how to build a training program that meets the requirement.",
    category: "Training",
    author: "Klarvo Staff",
    date: "January 15, 2025",
    readTime: "8 min read",
    featuredImage: aiLiteracyImg,
    content: `
# Article 4 AI Literacy: Building Your Training Program

Article 4 of the EU AI Act requires providers and deployers to take measures to ensure "sufficient AI literacy" of their staff and other persons dealing with the operation and use of AI systems on their behalf. This obligation applies from **February 2, 2025**—making it one of the very first requirements to take effect.

Despite its early effective date, AI literacy is one of the most underestimated obligations in the Act. Many organizations focus on high-risk classification and prohibited practices screening while neglecting the training programs needed to demonstrate compliance with Article 4. This is a mistake. AI literacy is not optional, it's not a nice-to-have, and it applies to every organization that provides or deploys AI systems—regardless of risk level.

## What Does "AI Literacy" Actually Mean?

The EU AI Act defines AI literacy as having "skills, knowledge, and understanding that allows providers, deployers, and affected persons, taking into account their respective rights and obligations in the context of this Regulation, to make an informed deployment of AI systems."

In practical terms, this means your staff need to understand:

- **What AI is and isn't** — Basic concepts of how AI systems work, their capabilities, and their limitations
- **What AI systems your organization uses** — Awareness of specific tools and their purposes
- **How AI decisions are made** — Understanding that AI outputs are probabilistic, not deterministic
- **What the risks are** — Knowledge of potential harms including bias, inaccuracy, and privacy implications
- **What their responsibilities are** — Clear understanding of their role in oversight, escalation, and proper use
- **How to raise concerns** — Knowing when and how to flag issues with AI systems

The Act explicitly states that AI literacy measures should take into account the technical knowledge, experience, education, and training of the relevant staff, as well as the context in which the AI systems are to be used and the persons or groups on which the AI systems are to be used.

## Who Needs AI Literacy Training?

### For Deployers (Most SMEs)

**Tier 1: All staff who use AI tools in their daily work**
This is broader than most organizations expect. If your team uses AI-powered features in your CRM, marketing platform, customer support tools, or even grammar-checking software, they need baseline AI literacy.

**Tier 2: AI system operators and power users**
People who directly configure, manage, or make decisions based on AI outputs need deeper training. This includes data analysts using AI models, HR teams using AI screening tools, and marketing teams using AI content generation.

**Tier 3: Human oversight personnel**
For high-risk AI systems, oversight staff need the most comprehensive training—they must understand the system's capabilities, limitations, and failure modes well enough to intervene effectively.

**Tier 4: Management and leadership**
Leaders making decisions about AI adoption, governance, and risk need strategic literacy about AI's implications, including regulatory obligations and reputational risks.

### For Providers (If You Build AI)

Development teams, quality assurance staff, product managers, customer support teams, and documentation writers all need role-appropriate AI literacy that includes understanding of EU AI Act obligations specific to providers.

## Building Your Training Program: A Step-by-Step Guide

### Step 1: Assess Current Literacy Levels

Before building training, understand your starting point:

- **Survey your team** to gauge current AI understanding across different roles
- **Identify knowledge gaps** between what staff know and what they need to know
- **Map AI usage** to understand which teams interact with which AI systems
- **Assess risk exposure** to prioritize training for teams working with higher-risk applications

A simple self-assessment questionnaire can reveal surprising gaps. Many people use AI tools daily without understanding that they are AI-powered, let alone understanding their limitations.

### Step 2: Design Role-Based Training Tracks

One-size-fits-all training doesn't work. Design tracks matched to each role's actual interaction with AI:

**Track A: All Staff Baseline (30-60 minutes)**
- What is AI? Core concepts without jargon
- AI systems used in our organization (specific to your context)
- Your rights when AI is used in decisions about you
- How to identify and report concerns
- Key EU AI Act concepts (risk-based approach, transparency, human oversight)

**Track B: AI Operators (2-4 hours)**
- How to use specific AI systems correctly, following provider instructions
- Understanding AI outputs: confidence levels, limitations, edge cases
- When to trust, question, or override AI recommendations
- Data quality and its impact on AI performance
- Incident recognition and reporting procedures
- Bias awareness and mitigation in daily workflows

**Track C: Oversight Personnel (4-8 hours)**
- Deep technical understanding of assigned AI systems
- Risk assessment frameworks and methodologies
- Monitoring techniques and anomaly detection
- Intervention procedures and escalation paths
- Documentation and evidence requirements
- Regulatory context and deployer obligations

**Track D: Leadership (2-3 hours)**
- Strategic AI governance fundamentals
- EU AI Act overview and organizational obligations
- Risk, liability, and reputational considerations
- Decision frameworks for AI adoption
- Board and leadership accountability requirements

### Step 3: Create Engaging Content

Training is only effective if people actually engage with it:

- **Use your own AI systems as examples** — Abstract training about "AI in general" is far less effective than training about "the specific AI tool you use every day to score customer leads"
- **Include real scenarios** — "What would you do if the AI screening tool flagged a candidate as 'low match' but their CV looks strong?"
- **Keep it practical** — Focus on actions, not theory. "Here's how to check if the AI output seems reasonable" vs. "Neural networks use backpropagation to adjust weights"
- **Make it interactive** — Quizzes, scenario exercises, and discussion sessions improve retention

### Step 4: Implement and Track

- **Launch by role priority** — Start with oversight personnel and operators for high-risk systems
- **Set completion deadlines** — Give staff reasonable time but make completion mandatory
- **Send reminders** — Automated nudges for incomplete training significantly boost completion rates
- **Track everything** — Record who completed what, when, with what assessment scores

### Step 5: Test Understanding

Don't just track completion—verify comprehension:

- **Short quizzes** after each module (5-10 questions)
- **Scenario-based assessments** where staff describe how they'd handle specific situations
- **Practical exercises** where staff demonstrate proper use of AI tools
- **Minimum pass thresholds** with re-training for those who don't meet them

### Step 6: Plan for Refresh and Continuous Learning

AI literacy isn't a one-time exercise:

- **Annual re-certification** for all staff (abbreviated version focusing on updates)
- **Triggered re-training** when new AI systems are deployed or existing ones change significantly
- **Ongoing awareness** through internal newsletters, lunch-and-learn sessions, or knowledge base articles
- **Update training content** as the regulatory landscape evolves (e.g., when new guidance is published)

## Common Mistakes to Avoid

**Mistake 1: Treating it as a checkbox exercise.** Generic "AI awareness" videos won't cut it. Training must be relevant to your specific AI systems and roles.

**Mistake 2: Forgetting contractors and temporary staff.** Article 4 refers to "other persons dealing with the operation and use of AI systems on their behalf"—this includes contractors, consultants, and temporary workers.

**Mistake 3: No evidence trail.** You need to prove you've taken measures to ensure AI literacy. Maintain records of training materials, completion rates, assessment results, and refresh schedules.

**Mistake 4: One-time training only.** AI literacy is an ongoing obligation. As AI systems change and the regulatory landscape evolves, training must be updated.

**Mistake 5: Ignoring leadership.** If leadership doesn't understand AI obligations, they'll under-resource compliance efforts. Include management in your training program.

## Measuring AI Literacy Program Effectiveness

Track these metrics to demonstrate compliance and program value:

- **Completion rates** by role and department (target: >95%)
- **Assessment scores** and pass rates
- **Time to completion** (are people rushing through or engaging?)
- **Incident correlation** (do trained teams report fewer AI-related issues?)
- **Refresh completion rates** (is the program sustainable?)
- **Staff feedback scores** (is the training perceived as useful?)

## What to Do Next

1. **Map your AI systems and affected staff** using Klarvo's [AI System Inventory](/ai-systems/wizard)
2. **Set up your training program** with Klarvo's Training Tracker to manage courses, assignments, and completion
3. **Download role-based training templates** from our [Templates library](/templates)
4. **Start tracking completions** immediately—even basic awareness training counts
5. [Sign up for Klarvo](/auth/signup) to manage AI literacy compliance alongside all your other EU AI Act obligations
    `
  },
  {
    slug: "deployer-obligations-checklist",
    title: "The Complete Deployer Obligations Checklist (Article 26)",
    excerpt: "Most SMEs are deployers, not providers. Here's your complete checklist for deployer obligations under the EU AI Act.",
    category: "Best Practices",
    author: "Klarvo Staff",
    date: "January 12, 2025",
    readTime: "10 min read",
    featuredImage: deployerObligationsImg,
    content: `
# The Complete Deployer Obligations Checklist (Article 26)

If you use AI systems developed by others—whether SaaS tools, APIs, or embedded AI—you're likely a **deployer** under the EU AI Act. This is the most common role for SMEs: you didn't build the AI, but you're responsible for how it's used within your organization.

Article 26 of the EU AI Act is the cornerstone provision for deployers. It lays out specific obligations that apply when you deploy high-risk AI systems. Understanding and implementing these obligations is essential—failures carry penalties of up to €15 million or 3% of global annual turnover.

This guide provides a complete, actionable checklist based on Article 26, with practical guidance for each obligation.

## First: Are You a Deployer?

A deployer is defined as any natural or legal person, public authority, agency, or other body using an AI system under its authority, except where the AI system is used in the course of a personal non-professional activity.

**You are a deployer if you:**
- Use AI-powered SaaS tools (CRM with AI features, AI customer support, AI analytics)
- Integrate AI APIs into your products or workflows
- Use AI tools for HR processes (recruitment, performance monitoring)
- Deploy AI for customer-facing applications (chatbots, recommendation engines)
- Use AI for business operations (forecasting, fraud detection, content generation)

**You are NOT a deployer if:**
- You use AI only for personal, non-professional purposes
- You built the AI system yourself (you're likely a provider, with different obligations)

Most SMEs are deployers of multiple AI systems simultaneously. Each high-risk system requires individual compliance assessment.

## The Complete Article 26 Deployer Checklist

### ✅ Obligation 1: Use According to Instructions

**What it requires:** Take appropriate technical and organizational measures to ensure you use the high-risk AI system in accordance with the instructions for use accompanying it.

**Practical steps:**
- Obtain the provider's instructions for use document for each high-risk AI system
- Store instructions in an accessible, version-controlled location
- Ensure all operators have read and understood the instructions
- Create internal SOPs that operationalize the provider's instructions within your workflow
- Don't use the system for purposes not covered by the instructions
- Review instructions when the provider updates them

**Evidence needed:** Stored instructions document, internal SOPs, operator acknowledgments, version tracking log.

### ✅ Obligation 2: Assign Competent Human Oversight

**What it requires:** Assign human oversight to natural persons who have the necessary competence, training, and authority, as well as the necessary support.

**Practical steps:**
- Designate a named oversight person for each high-risk AI system
- Verify they have relevant competence (domain expertise + AI understanding)
- Provide specific training on the system's capabilities, limitations, and failure modes
- Document their training and competency assessment
- Ensure they have adequate time to perform oversight (not just a nominal title)
- Designate a backup for continuity

**Evidence needed:** Oversight role assignment document, training records, competency assessments, time allocation documentation.

### ✅ Obligation 3: Authority to Intervene

**What it requires:** Ensure oversight persons have the authority to decide not to use the high-risk AI system, to override or reverse the output, or to interrupt the system.

**Practical steps:**
- Explicitly grant override authority in writing (job description, policy document, or SOP)
- Ensure the technical capability exists to pause, stop, or override the system
- Create escalation procedures for when override is necessary
- Foster psychological safety—staff must feel comfortable overriding AI decisions
- Test the override capability periodically

**Evidence needed:** Authority delegation document, override capability test records, escalation procedure documentation.

### ✅ Obligation 4: Manage Input Data Quality

**What it requires:** Ensure that input data is relevant and sufficiently representative in view of the intended purpose, to the extent that the deployer exercises control over the input data.

**Practical steps:**
- Identify what input data you control vs. what the provider manages
- For data you control, establish quality checks before feeding it to the AI system
- Monitor for data drift—changes in your data patterns that could degrade AI performance
- Document your data management practices and quality standards
- Address any representativeness concerns (e.g., if your training data skews toward certain demographics)

**Evidence needed:** Data quality procedures, sampling reports, representativeness assessments, data flow documentation.

### ✅ Obligation 5: Monitor Operation

**What it requires:** Monitor the operation of the high-risk AI system on the basis of the instructions for use and inform the provider or distributor when you have reasons to consider that the use may present a risk.

**Practical steps:**
- Establish monitoring metrics aligned with the provider's instructions
- Set up regular review cadences (daily, weekly, monthly depending on system criticality)
- Define what "normal" looks like so you can detect anomalies
- Create alert thresholds for performance degradation or unexpected behavior
- Document monitoring activities and findings

**Evidence needed:** Monitoring plan, monitoring reports, alert logs, anomaly investigation records.

### ✅ Obligation 6: Suspend Use When Necessary

**What it requires:** Suspend the use of the AI system when you consider that the system presents a risk, and inform the provider or distributor without undue delay.

**Practical steps:**
- Define criteria for when suspension is warranted
- Ensure the technical capability to suspend quickly exists
- Create a suspension procedure with clear roles and communication steps
- Identify fallback processes for when the AI system is suspended
- Document any suspension events and their resolution

**Evidence needed:** Suspension criteria document, suspension SOP, fallback process documentation, suspension event logs.

### ✅ Obligation 7: Keep Logs

**What it requires:** Keep the logs automatically generated by the high-risk AI system that are under your control for a period appropriate to the intended purpose, and for at least six months.

**Practical steps:**
- Identify what logs the AI system generates
- Determine which logs are under your control (vs. retained by the provider)
- Configure log retention for at least 6 months
- Ensure logs are stored securely and access-controlled
- Verify you can export logs on demand for audit purposes
- Test log retrieval procedures periodically

**Evidence needed:** Log retention policy, system configuration screenshots, access control documentation, sample log export.

### ✅ Obligation 8: Inform Workers

**What it requires:** If you are an employer deploying high-risk AI in the workplace, inform workers' representatives and affected workers that they will be subject to the use of the high-risk AI system.

**Practical steps:**
- Identify all high-risk AI systems used in the workplace context
- Prepare clear, plain-language worker notifications
- Notify workers' representatives (unions, works councils) before deployment
- Notify individual affected workers
- Document when, how, and to whom notifications were sent
- Update notifications when systems change

**Evidence needed:** Worker notification template, delivery records, acknowledgment receipts, works council consultation records.

### ✅ Obligation 9: Conduct FRIA (When Required)

**What it requires:** Deployers who are public authorities or private entities providing public services must carry out a Fundamental Rights Impact Assessment before deploying certain high-risk AI systems.

**Practical steps:**
- Determine if FRIA is required (public authority? providing public services?)
- Follow the FRIA process outlined in Article 27
- Document the assessment comprehensively
- Notify the market surveillance authority of results
- Update the FRIA when significant changes occur

**Evidence needed:** FRIA report, notification records, update logs. See our [FRIA guide](/blog/fria-step-by-step) for the full process.

### ✅ Obligation 10: Serious Incident Reporting

**What it requires:** Report any serious incident to the relevant market surveillance authority without undue delay after becoming aware of it.

**Practical steps:**
- Define what constitutes a "serious incident" for your AI systems
- Create a reporting procedure with timelines and responsibilities
- Identify the relevant market surveillance authority in your jurisdiction
- Maintain incident records and follow up on reports

**Evidence needed:** Incident response procedure, incident log, reporting records.

## Building Your Compliance Program

Rather than treating each obligation in isolation, build an integrated compliance program:

1. **Start with inventory** — Use Klarvo's [AI System Intake Wizard](/ai-systems/wizard) to catalog all your AI systems
2. **Classify risk** — Identify which systems are high-risk using our [High-Risk Checker](/tools/high-risk-checker)
3. **Map obligations** — For each high-risk system, map the applicable deployer obligations
4. **Assign owners** — Every obligation needs a named owner with accountability
5. **Gather evidence** — Systematically collect and organize evidence for each obligation
6. **Review regularly** — Set quarterly review cadences to keep everything current

## What to Do Next

1. Download our [Article 26 Deployer Checklist](/templates/article-26-checklist) as a working template
2. [Sign up for Klarvo](/auth/signup) to manage your deployer obligations with automated controls, evidence tracking, and gap analysis
3. Read our companion guides on [FRIA](/blog/fria-step-by-step), [Human Oversight](/blog/building-oversight-culture), and [Vendor Due Diligence](/blog/vendor-due-diligence-ai)

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "fria-step-by-step",
    title: "Step-by-Step: Conducting Your First FRIA",
    excerpt: "A practical walkthrough of the Fundamental Rights Impact Assessment process, with templates and examples.",
    category: "How-To",
    author: "Klarvo Staff",
    date: "January 10, 2025",
    readTime: "14 min read",
    featuredImage: friaAssessmentImg,
    content: `
# Step-by-Step: Conducting Your First FRIA

A Fundamental Rights Impact Assessment (FRIA) is one of the most important—and most misunderstood—requirements in the EU AI Act. Under Article 27, certain deployers of high-risk AI systems must perform a FRIA before putting the system into use for the first time. The FRIA must be updated whenever relevant factors change significantly.

This guide walks you through the complete FRIA process, from determining whether you need one to producing a final report suitable for regulatory notification.

## When Is a FRIA Required?

A FRIA is required when you are a deployer of a high-risk AI system AND you are:

- A **public authority** (government body, public agency)
- A **private entity providing public services** (e.g., private healthcare provider under public contract, private utility company)
- A deployer of high-risk AI systems in certain Annex III categories including credit scoring (point 5a), life and health insurance risk assessment (point 5b), certain emergency services applications, and others

The FRIA must be completed **prior to first use** of the high-risk AI system and must be updated when you consider that any of the elements assessed have changed.

If you've already conducted a Data Protection Impact Assessment (DPIA) under the GDPR, you can use that as a starting point—but the FRIA goes beyond privacy to cover broader fundamental rights.

## What the FRIA Must Include

Article 27 specifies that the FRIA must contain the following elements. Each element becomes a section in your FRIA report:

**(a)** A description of the deployer's processes in which the high-risk AI system will be used in line with its intended purpose

**(b)** A description of the period of time within which, and the frequency with which, each high-risk AI system is intended to be used

**(c)** The categories of natural persons and groups likely to be affected by its use in the specific context

**(d)** The specific risks of harm likely to affect the categories of persons or groups identified, taking into account the information provided by the provider

**(e)** A description of the implementation of human oversight measures, according to the instructions for use

**(f)** The measures to be taken in the case of the materialization of those risks, including the arrangements for internal governance and complaint mechanisms

## The FRIA Process: Step by Step

### Step 1: Preparation (1-2 Days)

**Assemble your FRIA team:**
- **Assessment owner** — The person leading and accountable for the FRIA (typically compliance lead or system owner)
- **Legal/compliance representative** — For regulatory interpretation
- **Data Protection Officer** — For linkage to GDPR considerations
- **System operator(s)** — People who will actually use the AI system daily
- **Subject matter experts** — People who understand the affected groups (e.g., HR for employment systems, social workers for benefits systems)

**Gather key documentation:**
- The provider's instructions for use and technical documentation
- Any existing impact assessments (DPIA, equality impact assessment, etc.)
- Data flow diagrams for the AI system
- The provider's conformity assessment or declaration (if available)
- Internal policy documents relevant to the system's use

**Set your timeline:**
A first FRIA typically takes 2-4 weeks for an SME, depending on the complexity of the system and the number of stakeholders involved. Plan accordingly.

### Step 2: Describe the Process — Element (a)

This is the foundation of your FRIA. Describe in detail:

- **Your organization's process** where the AI system will be used (e.g., "The credit application review process")
- **The AI system's specific role** within that process (e.g., "The AI system generates a risk score from 1-100 for each applicant based on submitted financial data and credit bureau information")
- **Decision points** where AI outputs influence human decisions (e.g., "Applications with scores below 30 are automatically declined; scores 30-60 are reviewed by a senior analyst; scores above 60 proceed to standard underwriting")
- **Human oversight arrangements** within the process (e.g., "A senior credit analyst reviews all automated decisions weekly and can override any individual decision")

**Tip:** Use process flow diagrams. A visual representation of the workflow with the AI system's role highlighted is enormously helpful for both the assessment team and any future auditor.

### Step 3: Define Time Period and Frequency — Element (b)

Document:

- **Expected deployment duration** (e.g., "Ongoing, with annual contract renewal")
- **Frequency of use** (e.g., "Continuous during business hours, processing approximately 200 applications per day")
- **Scale of impact** (e.g., "Approximately 4,000-5,000 individuals per month will have a credit score generated by this system")
- **Any seasonal or cyclical variations** in usage

This section seems simple but is important—the scale and frequency of use directly affect the magnitude of potential harm.

### Step 4: Identify Affected Persons and Groups — Element (c)

Think broadly about who is affected:

- **Direct subjects** — People about whom the AI makes predictions or decisions (e.g., credit applicants)
- **Indirect subjects** — People affected by consequences of AI decisions (e.g., family members of a person denied credit)
- **Vulnerable groups** — Consider whether any affected groups are particularly vulnerable (elderly, minors, people with disabilities, linguistic minorities, economically disadvantaged)
- **Scale** — How many people in each category are affected?

**Important:** Consider intersectional vulnerabilities. A person may not be vulnerable in one dimension but may be at heightened risk due to a combination of factors.

### Step 5: Assess Risks to Fundamental Rights — Element (d)

This is the core of the FRIA. For each affected group, assess risks across fundamental rights categories:

**Non-discrimination and equality**
- Could the AI system produce discriminatory outcomes based on protected characteristics?
- Is there evidence of bias in the system's outputs?
- Are certain demographic groups disproportionately affected?

**Privacy and data protection**
- What personal data is processed and is it proportionate?
- Are data subjects informed about AI processing?
- Can individuals exercise their GDPR rights effectively?

**Freedom of expression and information**
- Could the AI system chill free expression or limit access to information?

**Worker rights** (if workplace deployment)
- Are workers' rights to fair working conditions affected?
- Is the AI system used for surveillance that undermines worker autonomy?

**Due process and contestability**
- Can affected individuals understand and challenge AI decisions?
- Is there an effective appeal or redress mechanism?

**Access to essential services**
- Could the AI system unfairly restrict access to necessary services?

For each identified risk, assess:
- **Likelihood** (Low / Medium / High)
- **Severity** (Low / Medium / High)
- **Combined risk rating** (use a risk matrix)
- **Supporting evidence** for your assessment

### Step 6: Document Oversight Measures — Element (e)

Describe the human oversight arrangements in detail:

- **Oversight model** (human-in-the-loop, human-on-the-loop)
- **Who provides oversight** (named roles, not just generic titles)
- **Their competence and training** for this specific system
- **Their authority** to intervene, override, or stop the system
- **Resources allocated** for oversight (time, tools, support)
- **Escalation procedures** when issues are identified

### Step 7: Define Mitigation and Governance Measures — Element (f)

For each key risk identified in Step 5:

- **Specific mitigation measures** (what controls reduce this risk?)
- **Who is responsible** for each mitigation measure
- **How effectiveness will be measured**
- **Governance arrangements** (who reviews, how often, what triggers escalation)
- **Complaint mechanism** — How can affected individuals raise concerns? Include:
  - How to submit a complaint
  - Expected response times
  - The review and resolution process
  - Appeal options
- **Monitoring plan** — How will you detect if risks materialize?
- **Reassessment triggers** — What events trigger a FRIA update? (e.g., model updates, significant changes in affected populations, complaints exceeding a threshold)

### Step 8: Review, Approve, and Notify

**Internal review and approval:**
- Have the FRIA reviewed by someone not involved in its creation
- Obtain formal approval from appropriate authority (senior leadership, board, compliance committee)
- Record approver names, roles, and dates

**Regulatory notification:**
- Notify the relevant market surveillance authority of the FRIA results
- Use the official template if one is provided
- Retain proof of notification
- Note: Some exemptions exist from the notification requirement—check whether they apply to your situation

## FRIA Report Structure

Your final FRIA document should include:

1. **Cover page** — System name, organization, assessment date, classification
2. **Executive summary** — 1-page overview of findings and conclusion
3. **Process description** — Element (a)
4. **Time period and frequency** — Element (b)
5. **Affected persons and groups** — Element (c)
6. **Risk assessment** — Element (d), organized by rights category
7. **Human oversight measures** — Element (e)
8. **Mitigation, governance, and complaints** — Element (f)
9. **Conclusion and recommendation** — Approve / Approve with mitigations / Do not deploy
10. **Approval signatures** — Names, roles, dates
11. **Annexes** — Supporting documents, data, references

## What to Do Next

1. Determine if FRIA is required for your AI systems using Klarvo's [FRIA trigger assessment](/ai-systems/wizard)
2. Download our [FRIA Template](/templates/fria-template) to structure your assessment
3. Use Klarvo's FRIA Wizard to complete the assessment with guided steps and auto-generated reports
4. [Sign up for Klarvo](/auth/signup) to manage your complete EU AI Act compliance journey

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "ai-inventory-mistakes",
    title: "5 Common Mistakes When Building Your AI System Inventory",
    excerpt: "Avoid these pitfalls when documenting your AI systems. Learn from organizations that got it wrong—and how to get it right.",
    category: "Best Practices",
    author: "Klarvo Staff",
    date: "January 8, 2025",
    readTime: "7 min read",
    featuredImage: aiInventoryImg,
    content: `
# 5 Common Mistakes When Building Your AI System Inventory

Your AI system inventory is the foundation of EU AI Act compliance. Every subsequent step—risk classification, controls mapping, evidence gathering, and export pack generation—depends on having an accurate, complete, and well-maintained inventory. Get it wrong, and everything built on top will be flawed, leaving you exposed to regulatory risk and wasting resources on compliance activities that miss the mark.

After working with hundreds of organizations on their EU AI Act compliance journeys, we've identified the five most common and costly mistakes in AI inventory building. Here's what they are and exactly how to avoid them.

## Mistake #1: Only Counting "Obvious" AI

**The problem:** When asked to list their AI systems, most organizations immediately think of chatbots, recommendation engines, and machine learning models they've deliberately built or purchased. They miss the vast majority of AI embedded in everyday tools.

**Why it matters:** The EU AI Act's definition of an "AI system" is broad. It covers any machine-based system that, for explicit or implicit objectives, infers from input how to generate outputs such as predictions, content, recommendations, or decisions. This means many tools you use daily contain AI systems that need to be inventoried.

**Commonly missed AI systems:**
- **Email and communication tools** — Spam filters, smart compose, priority inbox sorting, meeting transcription
- **Marketing platforms** — Audience targeting algorithms, content optimization, send-time optimization, predictive analytics
- **HR and recruitment tools** — Resume parsing, candidate matching, skills assessment tools, employee engagement surveys with sentiment analysis
- **Finance and accounting** — Fraud detection, expense categorization, cash flow forecasting, invoice processing
- **Customer support** — Ticket routing, suggested responses, sentiment analysis, chatbot triage
- **Productivity tools** — Grammar and writing assistants, auto-complete features, document summarization
- **Security tools** — Threat detection, anomaly identification, behavioral analytics
- **Sales tools** — Lead scoring, deal probability prediction, conversation intelligence

**The fix:** Don't start with "what AI do we use?" Start with a broader question: "What tools make predictions, recommendations, classifications, or automate decisions?" Survey every department using this framing. Additionally:

- Review your SaaS subscription list and check each vendor's product documentation for AI features
- Ask procurement about any tools with "AI," "ML," "intelligent," "smart," or "automated" in their descriptions
- Check with IT about any API integrations that involve AI services
- Consider embedded AI in platforms (e.g., Salesforce Einstein, Microsoft Copilot features, Google Workspace AI)

## Mistake #2: Incomplete Vendor Documentation

**The problem:** Recording "We use Vendor X's AI tool" without capturing the detail needed for classification and compliance. A name and a vague description aren't enough.

**Why it matters:** For deployer obligations, you need to understand specifically what each AI system does, what data it processes, what decisions it influences, and what the vendor's own compliance posture is. Without this, you can't classify risk accurately, map controls, or gather meaningful evidence.

**What's commonly missing:**
- Which specific AI features within a platform you're actually using (many SaaS tools have dozens of AI features—you might use only three)
- What data the AI system ingests, processes, and outputs
- Whether the vendor has classified their system under the EU AI Act
- The vendor's instructions for use (required for high-risk systems)
- The vendor's data processing locations and practices
- Whether the AI model adapts or learns from your data
- The vendor's incident reporting and communication procedures

**The fix:** For each vendor-supplied AI system, create a structured vendor profile that captures:

1. **Vendor identity** — Company name, contact details, contract reference
2. **System description** — What specifically the AI does in your workflow
3. **AI features in use** — Which AI capabilities you've actually activated/configured
4. **Data documentation** — What data flows to/from the AI, where it's processed, retention periods
5. **Compliance posture** — Has the vendor self-classified? Do they provide EU AI Act documentation?
6. **Instructions for use** — Obtain and store the provider's usage instructions
7. **Support for your compliance** — Can they provide logs? Do they mark AI-generated content? What's their incident process?

Use our [Vendor Due Diligence Questionnaire](/templates/vendor-due-diligence) to systematically gather this information.

## Mistake #3: No Clear Ownership

**The problem:** AI systems listed in the inventory without named, accountable owners. When a system belongs to nobody, nobody manages its compliance. Obligations fall through the cracks, evidence doesn't get collected, reviews don't happen, and incidents go unreported.

**Why it matters:** The EU AI Act requires specific human oversight for high-risk systems and accountability for all systems. An inventory without owners is just a list—it doesn't enable compliance.

**Common ownership failures:**
- "The IT department owns it" — Too vague. Which person in IT?
- Ownership assigned to someone who left the company six months ago
- The procurement team bought it, but the business team uses it, and no one claims compliance responsibility
- Multiple teams use the same tool but no one coordinates

**The fix:** Every AI system needs at minimum:

- **Primary owner** — A named individual (not a department) who is accountable for the system's compliance. This is typically the business owner who benefits most from the system.
- **Backup owner** — A named individual who can step in if the primary owner is unavailable
- **Oversight owner** — For high-risk systems, the person responsible for human oversight (may be the same as primary owner for smaller organizations)
- **Clear escalation paths** — Who does the owner escalate to when issues arise?

Ownership should be assigned during intake and reviewed quarterly. When someone leaves or changes roles, ownership must be reassigned immediately.

## Mistake #4: Treating Inventory as a One-Time Exercise

**The problem:** Building an inventory once—usually when first learning about the EU AI Act—and never updating it. AI usage in organizations is dynamic. New tools are adopted, existing tools add AI features, usage patterns change, and systems are retired.

**Why it matters:** A stale inventory creates a false sense of compliance. You might have five new AI systems deployed since your last inventory that haven't been classified or assessed. Or you might be maintaining compliance artifacts for systems you no longer use, wasting resources.

**Common triggers that make inventories stale:**
- A team adopts a new AI-powered tool without informing compliance
- A vendor adds AI features in a product update (increasingly common)
- A tool moves from pilot to production without inventory update
- An AI system is deprecated but stays in the inventory
- Business processes change, altering how an AI system is used (potentially changing its risk classification)

**The fix:** Build inventory maintenance into your organizational rhythm:

- **Quarterly review** — Review the complete inventory at least quarterly. Are entries still accurate? Are any systems missing?
- **Procurement trigger** — Add an "AI assessment" step to your procurement process. Before any new tool is purchased, ask: does it use AI?
- **Change management integration** — When business processes change, check if AI usage is affected
- **Shadow AI discovery** — Periodically survey teams about tools they've adopted independently
- **Vendor monitoring** — Track vendor product updates for new AI features
- **Retirement process** — When an AI system is discontinued, update the inventory and archive compliance artifacts

Set a recurring calendar invite for quarterly reviews and assign someone to own the process.

## Mistake #5: Missing the "Why" and the "Who"

**The problem:** Documenting what the AI system does technically without capturing why it's used, what decisions it influences, and who is affected. This information is critical for risk classification but frequently overlooked.

**Why it matters:** Risk classification under the EU AI Act depends heavily on context. The same AI technology can be minimal risk in one application and high-risk in another. Without understanding purpose and impact, you can't classify accurately.

**What's commonly missing:**
- The business purpose (why do we use AI here instead of manual processes?)
- The specific decisions or actions influenced by AI outputs
- Who is affected by those decisions (customers, employees, candidates, the public)
- Whether affected individuals include vulnerable groups
- The scale of impact (how many people are affected, how often)
- What happens if the AI is wrong (consequences of errors)

**The fix:** For every AI system, capture:

1. **Business purpose** — Why does this AI exist in your workflow? What problem does it solve?
2. **Decision influence** — What specific decisions or actions does it inform or automate?
3. **Output type** — Does it recommend, decide, classify, predict, or generate content?
4. **Affected persons** — Who is directly or indirectly affected by its outputs?
5. **Impact scale** — How many people are affected per month/year?
6. **Consequence of error** — What happens if the AI produces a wrong output?
7. **Human involvement** — Is there human review before outputs take effect?

This context is what enables accurate risk classification and proportionate compliance measures.

## Building a Better Inventory with Klarvo

Klarvo's [AI System Intake Wizard](/ai-systems/wizard) is designed to prevent all five of these mistakes:

- **Guided intake** covers all necessary fields, including commonly missed ones
- **Vendor documentation** is structured and linked to each system
- **Ownership** is mandatory and includes primary, backup, and oversight owners
- **Review schedules** are automatically set and tracked
- **Context capture** includes purpose, decisions, affected persons, and impact scale
- **Completeness scoring** shows exactly what's missing from each record

[Start your inventory today](/auth/signup) and build a foundation that supports your entire EU AI Act compliance journey.
    `
  },
  {
    slug: "vendor-due-diligence-ai",
    title: "Vendor Due Diligence for AI Systems: What to Ask",
    excerpt: "Your AI vendors need to support your compliance. Here's a comprehensive due diligence questionnaire for AI vendors.",
    category: "Vendor Management",
    author: "Klarvo Staff",
    date: "January 5, 2025",
    readTime: "9 min read",
    featuredImage: vendorDueDiligenceImg,
    content: `
# Vendor Due Diligence for AI Systems: What to Ask

When you deploy AI systems from third-party vendors, you inherit compliance responsibilities. The EU AI Act doesn't let you outsource accountability—as a deployer, you're responsible for how AI is used under your authority, even if someone else built it. Your vendors need to support, not hinder, your compliance obligations.

Effective vendor due diligence for AI systems goes far beyond traditional procurement checks. You need to assess not just the vendor's financial stability and security posture, but their AI-specific compliance readiness, their ability to support your deployer obligations, and their commitment to responsible AI practices.

This guide provides a comprehensive due diligence framework with specific questions to ask before, during, and after procuring AI systems from third-party vendors.

## Why AI-Specific Vendor Due Diligence Matters

Traditional vendor due diligence typically covers areas like financial health, information security (SOC 2, ISO 27001), data protection (GDPR, DPA), and business continuity. These remain important, but for AI systems, you need an additional layer of assessment.

Here's why:

**You can't comply alone.** Many deployer obligations require information or capabilities from the provider. For example, you need the provider's instructions for use, their system documentation, and their logging capabilities to fulfill your own duties.

**Risk classification requires vendor input.** To classify an AI system's risk level accurately, you need to understand what the AI actually does, how it was trained, what its known limitations are, and whether the vendor has performed their own classification.

**Evidence depends on vendor cooperation.** Your EU AI Act evidence pack will require vendor documentation—system descriptions, compliance statements, transparency support documentation, and incident communication records.

**Vendor changes affect your compliance.** When a vendor updates their AI model, changes data processing practices, or adds new AI features, your risk classification and compliance posture may change. You need to know about these changes in advance.

## The Comprehensive AI Vendor Due Diligence Framework

### Section 1: AI System Identity and Documentation

These questions establish a baseline understanding of what you're deploying.

1. **Can you provide comprehensive technical documentation of your AI system?** Look for: system architecture, training methodology, performance benchmarks, known limitations.

2. **What is the intended purpose and defined scope of use?** The vendor should clearly articulate what the system is designed to do and, equally importantly, what it is NOT designed to do.

3. **What are the known limitations and failure modes?** Every AI system has limitations. A vendor who claims none is either uninformed or dishonest.

4. **Do you provide detailed instructions for use?** For high-risk systems, the provider must provide instructions for use. Even for non-high-risk systems, clear usage guidance is essential.

5. **What version are we deploying, and what is your update/release cadence?** Understanding the release cycle helps you plan for change management and reassessment.

### Section 2: EU AI Act Classification and Compliance

These questions assess the vendor's own regulatory awareness and preparedness.

6. **Have you classified your AI system under the EU AI Act?** If yes, ask for the classification result and rationale. If no, ask why not and when they plan to.

7. **What risk level has been assigned, and what is the classification reasoning?** Don't just accept "it's minimal risk"—ask for the analysis.

8. **Have you conducted a prohibited practices screening?** Can they confirm their system doesn't fall into any prohibited category?

9. **If classified as high-risk, have you completed a conformity assessment?** High-risk system providers must conduct conformity assessments. Ask for evidence.

10. **Is the system registered in the EU database (if required)?** Some high-risk AI systems must be registered.

11. **Can you provide your EU Declaration of Conformity (if applicable)?** Providers of high-risk AI systems must draw up this document.

12. **What quality management system do you have in place for this AI system?** Providers of high-risk systems must implement and maintain a QMS.

### Section 3: Data Handling and Privacy

13. **What data does the AI system process, and how is it processed?** Map the data lifecycle: collection, processing, storage, deletion.

14. **Where is data stored and processed geographically?** Important for GDPR compliance and data sovereignty considerations.

15. **Does the AI model train, fine-tune, or adapt based on our data?** If yes, understand the implications for data protection and model behavior.

16. **What data retention policies apply to inputs, outputs, and logs?** Ensure alignment with your own retention requirements.

17. **Do you have a Data Processing Agreement (DPA) that covers AI-specific processing?** Standard DPAs may not adequately cover AI processing scenarios.

18. **How do you handle data subject access requests related to AI processing?** Individuals have the right to understand how AI processes their data.

### Section 4: Transparency Support

19. **What transparency notices should we (as deployers) provide to our users?** The vendor should help you meet your transparency obligations under Article 50.

20. **Are AI-generated outputs marked as such (where applicable)?** Providers of generative AI must ensure outputs are machine-readably marked.

21. **What information should we disclose to persons affected by the AI system?** Particularly relevant for direct interaction AI and emotion recognition systems.

22. **Do you provide transparency documentation we can share with affected individuals?** Ready-to-use disclosure templates reduce your compliance burden.

### Section 5: Logging, Monitoring, and Oversight Support

23. **What logs does the system automatically generate?** Understand what's logged: inputs, outputs, confidence scores, errors, anomalies.

24. **What is the log retention period, and can we configure it?** You need at least 6 months for high-risk systems.

25. **Can we export logs on demand in standard formats?** Essential for audits and incident investigations.

26. **What monitoring capabilities and dashboards are available?** You need to monitor the system's operation per your deployer obligations.

27. **Can we override, pause, or stop the AI system's operation?** Essential for human oversight and incident response.

28. **Do you provide performance metrics and drift detection?** Degrading performance affects your compliance posture.

### Section 6: Incident Response and Communication

29. **What is your incident response process for AI-related issues?** Understand their internal process and how quickly they can respond.

30. **How and when will you notify us of AI-related incidents?** You need timely notification to fulfill your own reporting obligations.

31. **What is your SLA for critical AI issues?** Ensure it's compatible with your regulatory reporting timelines.

32. **Do you have a dedicated contact for AI compliance matters?** Generic support channels are inadequate for compliance-sensitive issues.

33. **Have you experienced any AI-related incidents in the past 12 months?** Past incidents indicate both risk awareness and response capability.

### Section 7: Ongoing Compliance and Change Management

34. **How do you stay current with evolving EU AI Act requirements?** Look for evidence of regulatory monitoring and proactive compliance.

35. **Will you provide advance notice of model updates or changes that affect system behavior?** Changes to the AI model may trigger your obligation to reassess risk classification.

36. **What happens if the system needs modification for compliance?** Understand whether the vendor will adapt their system to meet regulatory requirements.

37. **Do you have a regulatory change management process?** How do they translate new regulations or guidance into product changes?

38. **What is your long-term AI governance roadmap?** Assess whether the vendor is investing in compliance maturity.

## Evaluating Vendor Responses

### Green Flags
- Detailed, specific answers with supporting documentation
- Proactive EU AI Act compliance program with named responsible person
- Willingness to share classification results, risk assessments, and compliance evidence
- Clear incident communication procedures with defined SLAs
- Regular compliance updates and advance notice of changes

### Red Flags
- Vague or dismissive responses ("we're compliant with all applicable laws")
- No awareness of the EU AI Act or refusal to discuss it
- Unable to provide instructions for use or system documentation
- No incident response process or unwillingness to define SLAs
- Refusal to disclose training data sources or model information
- "Our system is low-risk" without any supporting analysis

### Yellow Flags (Needs Follow-up)
- Working toward compliance but not yet complete
- Limited documentation available today but committed to providing more
- EU AI Act classification underway but not finalized
- Incident process exists but SLAs not yet defined for AI-specific scenarios

## Integrating Due Diligence into Your Procurement Process

1. **Pre-procurement screening** — Before entering negotiations, send the core due diligence questions. Eliminate vendors who can't meet minimum requirements.
2. **Detailed assessment** — During procurement, conduct the full due diligence questionnaire and evaluate responses.
3. **Contractual requirements** — Include AI compliance obligations in your contract: notification of changes, log access, incident reporting SLAs, cooperation with your compliance activities.
4. **Ongoing monitoring** — Schedule annual vendor compliance reviews. Track vendor changes and reassess when significant updates occur.
5. **Renewal trigger** — Before contract renewal, repeat the due diligence assessment. Requirements evolve; ensure the vendor keeps pace.

## What to Do Next

1. Download our [Vendor Due Diligence Questionnaire](/templates/vendor-due-diligence) as a ready-to-use template
2. Review your current AI vendors against this framework
3. Add AI due diligence requirements to your procurement process
4. [Sign up for Klarvo](/auth/signup) to track vendor compliance alongside your full AI system inventory

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "transparency-obligations-guide",
    title: "Transparency Obligations: When and How to Disclose AI Use",
    excerpt: "From chatbots to deepfakes to emotion recognition—understand your transparency obligations under Article 50.",
    category: "Regulation",
    author: "Klarvo Staff",
    date: "January 3, 2025",
    readTime: "11 min read",
    featuredImage: transparencyObligationsImg,
    content: `
# Transparency Obligations: When and How to Disclose AI Use

Article 50 of the EU AI Act establishes transparency obligations that apply regardless of whether your AI system is classified as high-risk. If your AI interacts with people, generates synthetic content, infers emotions, or creates deepfakes, you have specific disclosure requirements. These obligations ensure that individuals can make informed decisions about their interactions with AI systems.

Unlike high-risk obligations, which only apply to a subset of AI systems, transparency obligations apply broadly across all risk levels. Many SMEs who conclude "our AI isn't high-risk" mistakenly assume they have no compliance obligations at all. Transparency requirements under Article 50 may still apply—and violations carry penalties of up to €15 million or 3% of global annual turnover.

This guide explains each transparency scenario, provides practical implementation guidance, and includes ready-to-use disclosure examples.

## Understanding the Transparency Framework

The EU AI Act's transparency requirements serve a core principle: people have the right to know when they're interacting with AI and when AI-generated content is influencing them. This isn't about bureaucratic box-ticking—it's about informed consent, autonomy, and trust.

The transparency obligations are divided between **providers** (who build AI systems) and **deployers** (who use them). As an SME, you may have obligations in either or both roles, depending on your situation.

## The Five Transparency Scenarios

### Scenario 1: AI Systems Interacting Directly with People

**When it applies:** Any AI system designed to directly interact with natural persons—chatbots, virtual assistants, AI-powered customer service, interactive AI in apps, etc.

**What you must do:** Inform individuals that they are interacting with an AI system in a clear and timely manner, unless this is obvious from the circumstances and context of use.

**The "obvious" exception:** If a reasonable, well-informed person would clearly understand they're interacting with AI, explicit disclosure may not be required. For example, a clearly labeled chatbot widget with a robot icon and the title "AI Assistant" might meet this threshold. However, a voice-based AI that sounds natural and human-like almost certainly requires explicit disclosure.

**Implementation guidance:**

For **chatbots and text-based AI:**
- Place a persistent notice at the start of every conversation: "You are chatting with an AI assistant. A human agent is available if you prefer."
- Include visual cues: AI avatar, distinct styling, or bot icon
- If the conversation transfers to a human, clearly indicate the transition

For **voice-based AI (phone systems, voice assistants):**
- Begin with a clear verbal disclosure: "You will be speaking with our AI assistant today."
- Offer a human alternative: "Press 0 at any time to speak with a person."
- Do not attempt to make the AI sound indistinguishable from a human

For **embedded AI in applications:**
- When AI generates suggestions, recommendations, or auto-completions, indicate the AI source
- Use labels like "AI-suggested," "Generated by AI," or similar markers

**Example notices:**
- "This conversation is powered by AI. For complex queries, we can connect you with our team."
- "Our AI assistant is here to help. Everything you see is generated by artificial intelligence."
- "You're interacting with an AI system. Your feedback helps us improve."

### Scenario 2: AI-Generated Synthetic Content

**When it applies:** AI systems that generate synthetic audio, image, video, or text content.

**Provider obligations:** Providers of AI systems that generate synthetic content must ensure that the outputs are marked in a machine-readable format as artificially generated or manipulated. This is a technical requirement (metadata, watermarking, or similar).

**Deployer obligations:** Deployers must disclose that the content has been artificially generated or manipulated. This applies regardless of whether the provider has implemented machine-readable marking.

**Implementation guidance:**

For **AI-generated images:**
- Label with "Generated by AI" or "AI-created image"
- Include in image metadata (EXIF data or embedded watermarks)
- If used in marketing, add visible attribution

For **AI-generated text:**
- When publishing AI-generated articles, blog posts, or marketing copy, disclose AI involvement
- Note: the obligation specifically applies to content published to inform the public on matters of public interest, with an exception where there is human editorial control

For **AI-generated audio/video:**
- Label audio files as AI-generated
- Include visible disclosure in video content
- Maintain metadata indicating AI generation

**Important nuance for text:** Article 50(4) contains a special provision for AI-generated or manipulated text published to inform the public on matters of public interest. In such cases, the AI-generated nature must be disclosed. However, where there is human review and editorial responsibility, and a person or legal entity holds editorial responsibility, this may reduce the disclosure burden. This doesn't eliminate the obligation entirely—it provides context for how to apply it.

### Scenario 3: Emotion Recognition Systems

**When it applies:** AI systems that perform emotion recognition (analyzing facial expressions, voice patterns, body language, or other biometric signals to infer emotional states) where individuals are exposed to the system.

**What you must do:** Inform the individuals exposed to the system about its operation and process their personal data in accordance with applicable data protection law.

**Implementation guidance:**

- Provide clear notice before emotion recognition begins (not after the fact)
- Explain what is being analyzed and for what purpose
- Obtain consent where required by GDPR
- Offer opt-out mechanisms where feasible
- Remember: emotion inference in workplace and education contexts is generally prohibited—this scenario applies to permitted uses only (medical, safety, or other lawful contexts)

**Example notice:** "This system analyzes voice patterns to assess customer sentiment for quality improvement. Your participation is voluntary."

### Scenario 4: Biometric Categorization Systems

**When it applies:** AI systems that perform biometric categorization (using biometric data to assign individuals to specific categories). Note: categorization to infer sensitive attributes like race, political opinions, religion, sexual orientation, etc. is prohibited—this applies to permitted forms of biometric categorization.

**What you must do:** Inform the individuals exposed to the system about its operation.

**Implementation guidance:**

- Provide notice before biometric categorization occurs
- Explain what categorization is being performed and its purpose
- Ensure compliance with biometric data processing requirements under GDPR
- Document the notice and its delivery

### Scenario 5: Deep Fake Content

**When it applies:** AI systems that generate or manipulate image, audio, or video content that appreciably resembles existing persons, objects, places, or other entities or events and would falsely appear to a person to be authentic or truthful—commonly known as "deep fakes."

**What you must do:** Disclose that the content has been artificially generated or manipulated.

**Exceptions:** Artistic, satirical, or fictional works (with appropriate safeguards to protect third-party rights), and certain law enforcement applications.

**Implementation guidance:**

- Include clear, visible labeling on all deep fake content: "This content has been AI-generated/manipulated"
- Place the disclosure where it cannot be easily missed (not buried in fine print)
- For video content, include disclosure at the beginning and in the description
- For audio content, include verbal disclosure and metadata labeling
- Maintain records of all deep fake content generated and where it's distributed

## Building Your Transparency Compliance Program

### Step 1: Screen All AI Systems

For each AI system in your inventory, answer:
- Does it interact directly with natural persons? → Scenario 1
- Does it generate synthetic audio, image, video, or text content? → Scenario 2
- Does it perform emotion recognition? → Scenario 3
- Does it perform biometric categorization? → Scenario 4
- Does it generate or manipulate content resembling real people/events? → Scenario 5

Use Klarvo's [Transparency Checker](/tools/transparency-checker) to systematically assess each system.

### Step 2: Design Appropriate Disclosures

For each "yes" answer, design disclosures that are:
- **Clear** — Plain language that a reasonable person would understand
- **Timely** — Before or at the point of AI interaction, not after
- **Accessible** — Meeting accessibility standards (WCAG) and available in relevant languages
- **Persistent** — Not easily missed or dismissed
- **Proportionate** — Appropriate to the context and the level of impact

### Step 3: Implement and Document

- Implement disclosure mechanisms in your products, websites, and communications
- Take screenshots and keep copies of all transparency notices
- Document where, when, and how disclosures are presented
- Version-control your notices so you can demonstrate compliance at any point in time

### Step 4: Review and Update

- Review disclosures when AI systems change (new features, updated models)
- Update notices when UI/UX changes might affect visibility
- Refresh evidence periodically (new screenshots showing current state)
- Monitor regulatory guidance for updated expectations

## What to Do Next

1. Screen your AI systems using Klarvo's [Transparency Checker](/tools/transparency-checker)
2. Download our [Article 50 Disclosure Templates](/templates/article-50-disclosure) for ready-to-use transparency notices
3. Build your AI system inventory with Klarvo's [guided wizard](/ai-systems/wizard) to ensure all transparency-relevant systems are captured
4. [Sign up for Klarvo](/auth/signup) to manage transparency obligations alongside your complete EU AI Act compliance program

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
    `
  },
  {
    slug: "building-oversight-culture",
    title: "Building a Human Oversight Culture for AI",
    excerpt: "Human oversight isn't just about having someone review outputs. It's about building processes that actually work.",
    category: "Best Practices",
    author: "Klarvo Staff",
    date: "December 28, 2024",
    readTime: "8 min read",
    featuredImage: humanOversightImg,
    content: `
# Building a Human Oversight Culture for AI

The EU AI Act requires human oversight for high-risk AI systems. But compliance with the letter of the law—designating someone as an "oversight person" and documenting the arrangement—is only half the battle. The real challenge is building an organizational culture where human oversight is meaningful, effective, and sustainable.

Too many organizations treat oversight as a compliance checkbox: assign a name, write a document, move on. The result is "oversight theatre"—the appearance of human control without the substance. When something goes wrong, the oversight person either didn't know, didn't understand, didn't have time, or didn't feel empowered to intervene. That's not oversight. That's liability with a human face.

This guide is about building oversight that actually works—oversight that catches problems, prevents harm, and creates genuine accountability. It covers the cultural, organizational, and practical elements that separate real oversight from compliance theatre.

## What Meaningful Oversight Looks Like

### What It Is NOT:
- ❌ Rubber-stamping AI decisions because "the system is usually right"
- ❌ Sampling 1% of outputs for review and assuming the rest are fine
- ❌ Assigning oversight to someone's job description without giving them time, training, or authority
- ❌ Having a "human in the loop" who doesn't understand what the AI does or how to evaluate its outputs
- ❌ Oversight that only happens after the damage is done
- ❌ A culture where questioning AI outputs is seen as "slowing things down"

### What It IS:
- ✅ People who deeply understand the AI system they oversee—its capabilities, limitations, typical failure modes, and edge cases
- ✅ Active, systematic monitoring with defined review frequencies and evaluation criteria
- ✅ Real authority to override, pause, or stop the AI system, with organizational backing to use that authority
- ✅ Specific training on the AI system, updated when the system changes
- ✅ Adequate time and resources dedicated to oversight activities—not squeezed in between other responsibilities
- ✅ Psychological safety to challenge AI outputs, even when it slows processes or contradicts algorithmic recommendations
- ✅ Continuous improvement through learning from interventions, near-misses, and incidents

## The Three Oversight Models

The EU AI Act and industry practice recognize three models of human oversight. The appropriate model depends on the risk level, decision stakes, and operational context.

### Human-in-the-Loop (HITL)
A human must review and approve each AI output before any action is taken. The AI recommends; the human decides.

**Best for:** High-stakes individual decisions where errors have significant consequences.

**Examples:**
- Final hiring decisions where AI provides candidate rankings but a hiring manager makes the selection
- Medical diagnosis support where AI flags potential conditions but a clinician confirms
- Credit decisions where AI generates a risk score but a human analyst approves or denies

**Practical requirements:**
- Reviewer must understand the AI's recommendation and rationale
- Reviewer must have independent judgment capability (not just "agree/disagree" with no context)
- Review must be timely enough to be meaningful
- Override decisions must be documented with reasoning

**Key risk:** "Automation bias"—the tendency for humans to uncritically accept AI recommendations, especially under time pressure or when the AI has a good track record. Combat this by requiring reviewers to articulate their independent assessment before seeing the AI's recommendation, or by regularly including calibration exercises with known edge cases.

### Human-on-the-Loop (HOTL)
The AI system operates with some autonomy, but a human monitors its operation and can intervene when necessary.

**Best for:** High-volume decisions where individual review is impractical but systemic monitoring catches issues.

**Examples:**
- Content moderation where AI handles most decisions but human moderators review flagged cases and sample random decisions
- Fraud detection where AI flags suspicious transactions but humans investigate alerts and review automated blocks
- Customer support routing where AI assigns tickets but a supervisor monitors satisfaction metrics and escalations

**Practical requirements:**
- Clear monitoring metrics and dashboards
- Defined alert thresholds that trigger human intervention
- Regular sampling of AI decisions for quality review
- Authority and capability to stop the system if systemic problems emerge

**Key risk:** "Alert fatigue"—when too many alerts or too many flagged items overwhelm the human monitor, leading to superficial review. Address this by tuning alert thresholds carefully, rotating monitoring duties, and tracking reviewer accuracy.

### Human-out-of-the-Loop (HOOTL)
The AI system operates fully autonomously with no human review of individual decisions. Human involvement is limited to periodic system-level review.

**Best for:** Minimal-risk applications where the consequences of errors are low.

**Examples:**
- Spam email filtering
- Automated image tagging for non-consequential purposes
- Predictive text suggestions

**Important:** HOOTL is generally NOT appropriate for high-risk AI systems under the EU AI Act. If your high-risk system operates with no human oversight of individual decisions, you need to reconsider your oversight model.

## Building Oversight into Your Culture: A Practical Framework

### 1. Leadership Commitment and Resource Allocation

Oversight costs time and money. Without leadership commitment, it will be under-resourced and ineffective.

**Actions:**
- Include AI oversight in leadership KPIs and governance reporting
- Budget explicit time for oversight activities (don't expect people to "fit it in")
- Include oversight effectiveness in performance reviews for designated oversight persons
- Report oversight metrics to the board or leadership team quarterly
- Frame oversight as risk management and quality assurance, not as bureaucratic overhead

**Metric:** Calculate the cost of oversight as a percentage of the value the AI system delivers. If oversight consumes 5-10% of the value generated, that's a reasonable investment in risk management.

### 2. Clear Accountability and Role Definition

Ambiguity kills oversight. Every AI system needs explicit, documented accountability.

**Actions:**
- Assign a named individual (not a team or department) as the oversight owner for each AI system
- Define what "oversight" means operationally for each system—specific activities, frequencies, and evaluation criteria
- Establish RACI (Responsible, Accountable, Consulted, Informed) matrices for oversight activities
- Define escalation paths: what happens when the oversight person identifies a problem?
- Create backup arrangements for when the primary oversight person is unavailable

### 3. Competence and Training

Oversight without understanding is meaningless. Oversight persons need deep, specific training on the AI systems they oversee.

**Training should cover:**
- How the specific AI system works (inputs, processing, outputs)
- Known limitations and typical failure modes
- What "normal" performance looks like (baseline metrics)
- How to detect anomalies, drift, and degradation
- How to investigate concerns and document findings
- The technical capability to intervene (pause, stop, override)
- Regulatory obligations and evidence requirements

**Actions:**
- Develop system-specific training for each high-risk AI system
- Require training completion before oversight duties begin
- Refresh training when the AI system is updated or changed
- Test competency through scenario exercises and practical assessments
- Document all training activities for evidence

### 4. Adequate Time and Workload Management

The most common oversight failure is giving the right person the right authority and the right training—but not enough time.

**Actions:**
- Calculate realistic time requirements for oversight activities
- Protect oversight time in schedules—don't let it be squeezed by "higher priority" tasks
- If oversight is part of someone's job, adjust their other responsibilities accordingly
- Monitor workload: if an oversight person is reviewing 500 AI decisions per hour, they're not really reviewing them
- Consider rotating oversight responsibilities to prevent burnout and maintain fresh perspective

### 5. Psychological Safety and Empowerment

Staff must feel safe to challenge AI outputs, override algorithmic recommendations, and report concerns—even when it slows things down or contradicts the "efficiency" narrative.

**Actions:**
- Explicitly communicate that overriding AI is acceptable and expected when warranted
- Celebrate catches—when someone identifies an AI error, recognize it positively
- Never punish staff for overriding AI that turns out to have been correct—the goal is vigilance, not perfection
- Create anonymous reporting channels for AI concerns
- Include override rates in performance discussions (too few overrides may indicate rubber-stamping)

### 6. Continuous Improvement and Learning

Oversight should get better over time through systematic learning.

**Actions:**
- Track intervention frequency, types, and outcomes
- Conduct post-incident reviews for all significant AI errors
- Share learnings across the organization (anonymized if needed)
- Update oversight procedures based on experience
- Benchmark oversight effectiveness and set improvement targets
- Review oversight arrangements when AI systems change

## Documenting Your Oversight for Compliance

Beyond building effective oversight, you need to document it for regulatory compliance. Your evidence should include:

- **Oversight assignment documents** — Who is responsible, for what, with what authority
- **Training records** — What training was provided, when, to whom, with what results
- **Monitoring logs** — What was reviewed, when, with what findings
- **Intervention records** — When was AI overridden or stopped, why, with what outcome
- **Review meeting minutes** — Regular governance reviews discussing AI oversight
- **Incident records** — Any issues identified, investigated, and resolved
- **Process improvement logs** — How oversight has evolved based on experience

Use Klarvo's controls and evidence management to track all of these systematically.

## What to Do Next

1. Assess your current oversight arrangements using the framework above
2. Use our [Human Oversight Plan Template](/templates/human-oversight-plan) to document oversight for each high-risk AI system
3. Build your complete [AI System Inventory](/ai-systems/wizard) to identify all systems requiring oversight
4. [Sign up for Klarvo](/auth/signup) to manage oversight documentation, controls, and evidence in one platform

---

*This article is for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for specific guidance on your situation.*
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
