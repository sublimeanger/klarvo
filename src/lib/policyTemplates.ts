/**
 * Pre-built EU AI Act Policy Templates
 * 
 * These templates provide SME-friendly, legally-informed starting points for key
 * governance documents required under the EU AI Act.
 */

export interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  policy_type: string;
  category: "governance" | "operational" | "transparency" | "vendor";
  content: string;
  estimatedTime: string;
  articleReference?: string;
}

export const POLICY_TEMPLATES: PolicyTemplate[] = [
  {
    id: "acceptable-use-policy",
    name: "AI Acceptable Use Policy",
    description: "Internal policy defining acceptable use of AI systems within your organization",
    policy_type: "acceptable_use",
    category: "governance",
    estimatedTime: "15 min to customize",
    articleReference: "Article 4 - AI Literacy",
    content: `# AI Acceptable Use Policy

## 1. Purpose

This policy establishes guidelines for the acceptable use of artificial intelligence (AI) systems within [Organization Name]. It ensures that AI is used responsibly, ethically, and in compliance with the EU AI Act and other applicable regulations.

## 2. Scope

This policy applies to:
- All employees, contractors, and third parties who use AI systems on behalf of the organization
- All AI systems deployed, developed, or procured by the organization
- Both internal tools and customer-facing AI applications

## 3. General Principles

### 3.1 Responsible Use
- AI systems shall only be used for their intended purposes as documented in the AI System Inventory
- Users must not attempt to circumvent safety measures or oversight controls
- Any unexpected or concerning AI behavior must be reported immediately

### 3.2 Human Oversight
- AI-generated outputs affecting significant decisions must be reviewed by qualified personnel
- Users must not blindly follow AI recommendations without applying professional judgment
- Override capabilities must be exercised when AI outputs appear incorrect or harmful

### 3.3 Data Protection
- Only authorized data may be input into AI systems
- Confidential, personal, or sensitive data must be handled according to data protection policies
- Users must not input data that could violate privacy regulations

## 4. Prohibited Uses

The following uses of AI are strictly prohibited:

1. **Manipulative or Deceptive Practices**: Using AI to deceive, manipulate, or mislead
2. **Discrimination**: Using AI in ways that discriminate based on protected characteristics
3. **Unauthorized Surveillance**: Using AI for employee monitoring without proper disclosure
4. **Circumventing Controls**: Attempting to bypass safety measures or access restrictions
5. **Prohibited AI Practices**: Any use that falls under Article 5 of the EU AI Act

## 5. Reporting Obligations

All users must report:
- Suspected malfunctions or errors in AI system outputs
- Potential bias or discriminatory outcomes
- Security incidents or unauthorized access attempts
- Any use that may conflict with this policy

Reports should be submitted to [Compliance Contact] within 24 hours.

## 6. Training Requirements

- All AI users must complete AI literacy training before using AI systems
- Role-specific training is required for high-risk AI system operators
- Annual refresher training is mandatory

## 7. Consequences of Violations

Violations of this policy may result in:
- Revocation of AI system access
- Disciplinary action up to and including termination
- Legal liability for damages caused

## 8. Review and Updates

This policy will be reviewed annually and updated as needed to reflect changes in regulations, technology, or organizational practices.

---

**Policy Owner**: [Name/Role]  
**Approved By**: [Name/Role]  
**Effective Date**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "human-oversight-plan",
    name: "Human Oversight Plan Template",
    description: "Framework for implementing human oversight of high-risk AI systems per Article 14",
    policy_type: "oversight",
    category: "operational",
    estimatedTime: "20 min to customize",
    articleReference: "Article 14 - Human Oversight",
    content: `# Human Oversight Plan

## AI System Information

| Field | Value |
|-------|-------|
| AI System Name | [System Name] |
| System ID | [Internal Reference] |
| Risk Classification | [High-Risk / Limited Risk] |
| Deployment Date | [Date] |

## 1. Oversight Model

**Selected Model**: [ ] Human-in-the-Loop (HITL) / [ ] Human-on-the-Loop (HOTL) / [ ] Human-out-of-the-Loop (HOOTL)

### 1.1 Oversight Description
[Describe how human oversight is implemented for this specific AI system]

### 1.2 Decision Points Requiring Human Review
- [Decision point 1]
- [Decision point 2]
- [Decision point 3]

## 2. Oversight Personnel

### 2.1 Primary Oversight Owner
| Field | Value |
|-------|-------|
| Name | [Name] |
| Role | [Role/Title] |
| Contact | [Email/Phone] |
| Authority Level | Full authority to suspend/override |

### 2.2 Backup Oversight Owner
| Field | Value |
|-------|-------|
| Name | [Name] |
| Role | [Role/Title] |
| Contact | [Email/Phone] |

## 3. Competence Requirements

### 3.1 Required Knowledge
- Understanding of the AI system's purpose and capabilities
- Knowledge of potential failure modes and limitations
- Familiarity with affected individuals/groups
- Understanding of relevant legal requirements

### 3.2 Required Training
- [ ] AI System-specific operational training
- [ ] EU AI Act awareness training
- [ ] Bias recognition and mitigation
- [ ] Incident response procedures

### 3.3 Training Verification
Training completion must be documented and verified before an individual can serve as oversight personnel.

## 4. Intervention Procedures

### 4.1 Override Authority
The oversight owner has full authority to:
- Pause AI system operation
- Override individual AI decisions
- Escalate concerns to senior management
- Trigger incident response procedures

### 4.2 Intervention Triggers
Intervention is required when:
- AI output contradicts known facts
- Output shows potential bias or discrimination
- System behaves unexpectedly
- User/affected party raises concerns
- Confidence thresholds are not met

### 4.3 Escalation Path
1. **Level 1**: Oversight owner reviews and decides
2. **Level 2**: Escalate to [Department Head]
3. **Level 3**: Escalate to [Compliance/Legal]
4. **Level 4**: System suspension pending review

## 5. Monitoring Requirements

### 5.1 Continuous Monitoring
| Metric | Frequency | Threshold |
|--------|-----------|-----------|
| Accuracy | [Daily/Weekly] | [Target %] |
| Bias indicators | [Weekly] | [Threshold] |
| User complaints | [Real-time] | [Number] |
| System uptime | [Real-time] | [%] |

### 5.2 Periodic Reviews
- **Weekly**: Review of flagged decisions
- **Monthly**: Performance trend analysis
- **Quarterly**: Comprehensive oversight review

## 6. Documentation Requirements

All oversight activities must be documented, including:
- Decisions reviewed and outcomes
- Interventions made and rationale
- Issues identified and resolutions
- Training completed

## 7. Review and Update

This plan will be reviewed:
- Annually at minimum
- After any significant system changes
- Following incidents or near-misses
- When regulatory requirements change

---

**Plan Owner**: [Name/Role]  
**Approved By**: [Name/Role]  
**Effective Date**: [Date]  
**Next Review Date**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "transparency-notice-customer",
    name: "Customer AI Transparency Notice",
    description: "Template for informing customers about AI system interactions per Article 50",
    policy_type: "transparency",
    category: "transparency",
    estimatedTime: "10 min to customize",
    articleReference: "Article 50 - Transparency Obligations",
    content: `# AI Transparency Notice

## About This Notice

This notice explains how [Organization Name] uses artificial intelligence (AI) in our products and services. We believe in being transparent about when and how AI is used, so you can make informed decisions.

## AI Systems We Use

### [AI System 1 - e.g., Customer Support Chatbot]

**What it does**: [Brief description of functionality]

**How it works**: [Simple explanation of the technology]

**What it affects**: [Decisions or outputs influenced by this AI]

**Human oversight**: [How humans review or can override AI decisions]

---

### [AI System 2 - e.g., Recommendation Engine]

**What it does**: [Brief description]

**How it works**: [Simple explanation]

**What it affects**: [Decisions or outputs]

**Human oversight**: [Human review process]

---

## Your Rights

When interacting with our AI systems, you have the right to:

1. **Know when you're interacting with AI**: We clearly indicate when an AI system is being used rather than a human
2. **Request human review**: For significant decisions, you can request that a human reviews the AI's output
3. **Provide feedback**: Report concerns about AI outputs to [Contact Information]
4. **Access information**: Request details about how our AI systems work

## AI-Generated Content

Some content you receive from us may be generated or assisted by AI. This includes:
- [Type of content 1]
- [Type of content 2]
- [Type of content 3]

AI-generated content is reviewed for accuracy before publication [where applicable].

## Synthetic Media Disclosure

If we use AI to generate, manipulate, or significantly alter images, audio, or video content, we will:
- Clearly label such content as AI-generated
- Use technical markers to identify synthetic content where technically feasible

## Data and Privacy

For information about how we handle your data in connection with AI systems, please see our [Privacy Policy].

## Changes to This Notice

We may update this notice as we adopt new AI systems or change how we use existing ones. Material changes will be communicated through [communication channels].

## Contact Us

If you have questions about our use of AI or wish to exercise your rights:

**Email**: [ai-transparency@company.com]  
**Phone**: [Phone number]  
**Address**: [Physical address]

---

**Last Updated**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "vendor-due-diligence",
    name: "AI Vendor Due Diligence Checklist",
    description: "Questionnaire for evaluating AI vendors and ensuring EU AI Act compliance",
    policy_type: "vendor_checklist",
    category: "vendor",
    estimatedTime: "5 min to customize",
    articleReference: "Article 25 - Distributors",
    content: `# AI Vendor Due Diligence Checklist

## Vendor Information

| Field | Response |
|-------|----------|
| Vendor Name | |
| Primary Contact | |
| Product/Service Name | |
| Contract Start Date | |
| Review Date | |
| Reviewed By | |

## 1. AI System Classification

### 1.1 System Definition
- [ ] Is the system an "AI system" under the EU AI Act definition?
- [ ] What is the vendor's risk classification for this system?
- [ ] Is the system on the High-Risk list (Annex III)?

**Notes**: 

### 1.2 Prohibited Practices (Article 5)
- [ ] Vendor confirms the system does not use subliminal or manipulative techniques
- [ ] Vendor confirms no exploitation of vulnerable groups
- [ ] Vendor confirms no social scoring capabilities
- [ ] Vendor confirms no prohibited biometric systems

**Notes**:

## 2. Transparency & Documentation

### 2.1 Instructions for Use
- [ ] Vendor provides clear instructions for intended use
- [ ] Limitations and constraints are documented
- [ ] Instructions are adequate for our compliance needs

**Notes**:

### 2.2 Technical Documentation
- [ ] System architecture documentation available
- [ ] Model training information provided (where relevant)
- [ ] Performance metrics documented

**Notes**:

### 2.3 Transparency Support
- [ ] Vendor supports our Article 50 disclosure requirements
- [ ] AI outputs can be clearly identified as AI-generated
- [ ] Labeling/marking capabilities are provided

**Notes**:

## 3. Data Governance

### 3.1 Data Handling
- [ ] Data processing agreements are in place
- [ ] Data retention practices are documented
- [ ] Data deletion procedures are clear

**Notes**:

### 3.2 Training Data
- [ ] Training data sources are documented
- [ ] Bias testing has been performed
- [ ] Data quality measures are in place

**Notes**:

## 4. Security & Access

### 4.1 Security Measures
- [ ] SOC 2 or equivalent certification
- [ ] Encryption in transit and at rest
- [ ] Access control mechanisms documented

**Notes**:

### 4.2 Incident Response
- [ ] Incident notification procedures defined
- [ ] SLA for incident communication
- [ ] Contact information for security team

**Notes**:

## 5. Logging & Auditability

### 5.1 Logging Capabilities
- [ ] System generates automatic logs
- [ ] Logs can be exported for our records
- [ ] Retention period meets our requirements (min 6 months for high-risk)

**Notes**:

### 5.2 Audit Support
- [ ] Vendor will cooperate with regulatory audits
- [ ] Documentation available for compliance demonstrations

**Notes**:

## 6. Ongoing Compliance

### 6.1 Updates & Changes
- [ ] Vendor will notify us of material changes
- [ ] Update process allows for re-assessment
- [ ] Version control is maintained

**Notes**:

### 6.2 Contractual Obligations
- [ ] EU AI Act compliance clause included in contract
- [ ] Indemnification provisions are adequate
- [ ] Termination rights preserved

**Notes**:

## 7. Overall Assessment

### Risk Rating
- [ ] Low Risk - Proceed with standard monitoring
- [ ] Medium Risk - Proceed with enhanced oversight
- [ ] High Risk - Additional safeguards required
- [ ] Unacceptable - Do not proceed

### Recommendation
[Provide recommendation with rationale]

### Required Actions Before Proceeding
1. [Action item]
2. [Action item]
3. [Action item]

---

**Assessor**: [Name/Role]  
**Date**: [Date]  
**Approved By**: [Name/Role]  
**Approval Date**: [Date]
`,
  },
  {
    id: "incident-response-playbook",
    name: "AI Incident Response Playbook",
    description: "Procedures for responding to AI-related incidents and serious incidents under Article 73",
    policy_type: "incident_response",
    category: "operational",
    estimatedTime: "15 min to customize",
    articleReference: "Article 73 - Serious Incidents",
    content: `# AI Incident Response Playbook

## 1. Purpose

This playbook establishes procedures for identifying, responding to, and reporting AI-related incidents, including serious incidents as defined under Article 73 of the EU AI Act.

## 2. Incident Classification

### 2.1 Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **Critical** | Serious incident causing or potentially causing death, serious harm, or fundamental rights violations | Immediate | Injury, discrimination affecting protected groups |
| **High** | Significant operational impact or compliance risk | Within 4 hours | System producing consistently wrong outputs, data breach |
| **Medium** | Moderate impact, contained issue | Within 24 hours | Performance degradation, isolated errors |
| **Low** | Minor issue, no immediate risk | Within 72 hours | Minor bugs, user complaints about quality |

### 2.2 Serious Incident Definition (Article 73)

A "serious incident" is any incident that directly or indirectly leads to:
- Death of a person
- Serious damage to a person's health
- Serious and irreversible disruption to critical infrastructure
- Serious harm to property or environment
- Serious violation of fundamental rights

## 3. Incident Response Team

| Role | Responsibilities | Contact |
|------|------------------|---------|
| **Incident Commander** | Overall coordination | [Contact] |
| **Technical Lead** | Investigation and remediation | [Contact] |
| **Compliance Officer** | Regulatory assessment and reporting | [Contact] |
| **Communications Lead** | Internal/external communications | [Contact] |
| **Legal Counsel** | Legal guidance and liability | [Contact] |

## 4. Response Procedures

### Phase 1: Detection & Initial Response (0-1 hour)

**Step 1.1: Identify and Document**
- [ ] Record date, time, and how incident was detected
- [ ] Document affected AI system(s)
- [ ] Identify affected parties
- [ ] Assign initial severity level

**Step 1.2: Immediate Containment**
- [ ] Assess if system should be paused/suspended
- [ ] Implement temporary safeguards
- [ ] Preserve logs and evidence

**Step 1.3: Activate Response Team**
- [ ] Notify Incident Commander
- [ ] Assemble relevant team members
- [ ] Establish communication channel

### Phase 2: Assessment & Investigation (1-24 hours)

**Step 2.1: Root Cause Analysis**
- [ ] Review system logs
- [ ] Analyze decision trail
- [ ] Interview relevant personnel
- [ ] Document findings

**Step 2.2: Impact Assessment**
- [ ] Identify all affected individuals/entities
- [ ] Assess extent of harm or risk
- [ ] Evaluate fundamental rights implications
- [ ] Determine if serious incident criteria are met

**Step 2.3: Regulatory Assessment**
- [ ] Determine reporting obligations
- [ ] Identify relevant authorities
- [ ] Prepare preliminary notification

### Phase 3: Remediation (Ongoing)

**Step 3.1: Technical Fixes**
- [ ] Develop remediation plan
- [ ] Test fixes before deployment
- [ ] Document all changes

**Step 3.2: Affected Party Support**
- [ ] Notify affected individuals as appropriate
- [ ] Provide support/remediation
- [ ] Document communications

### Phase 4: Reporting & Closure

**Step 4.1: External Reporting**
For serious incidents:
- [ ] Report to market surveillance authority within required timeframe
- [ ] Notify AI system provider (if we are deployer)
- [ ] Report to data protection authority if personal data involved

**Step 4.2: Internal Reporting**
- [ ] Brief senior leadership
- [ ] Document lessons learned
- [ ] Update incident register

**Step 4.3: Post-Incident Review**
- [ ] Conduct retrospective meeting
- [ ] Identify preventive measures
- [ ] Update policies/procedures as needed
- [ ] Close incident formally

## 5. Communication Templates

### Internal Alert Template
\`\`\`
SUBJECT: [SEVERITY] AI Incident - [System Name] - [Brief Description]

SUMMARY: [One paragraph summary]

AFFECTED SYSTEM: [System name and ID]
DETECTED: [Date/Time]
SEVERITY: [Level]
STATUS: [Under investigation / Contained / Resolved]

IMMEDIATE ACTIONS TAKEN:
- [Action 1]
- [Action 2]

NEXT STEPS:
- [Step 1]
- [Step 2]

CONTACT: [Incident Commander contact]
\`\`\`

### Affected Party Notification Template
\`\`\`
Dear [Name],

We are writing to inform you about an incident involving [AI System] that may have affected you.

WHAT HAPPENED: [Clear description]
WHEN: [Date/timeframe]
WHAT WE'RE DOING: [Actions taken]
WHAT YOU CAN DO: [Any actions for them]

We apologize for any inconvenience and are committed to preventing similar incidents.

Contact [email/phone] with questions.

[Signature]
\`\`\`

## 6. Record Keeping

All incidents must be documented in the AI Incident Register, including:
- Incident ID and date
- Affected system(s)
- Description and severity
- Root cause
- Actions taken
- Lessons learned
- Sign-off on closure

Records must be retained for minimum [5] years.

---

**Document Owner**: [Name/Role]  
**Approved By**: [Name/Role]  
**Effective Date**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "ai-governance-charter",
    name: "AI Governance Charter",
    description: "Establishes AI governance structure, roles, and accountability within the organization",
    policy_type: "governance",
    category: "governance",
    estimatedTime: "20 min to customize",
    articleReference: "Article 4 - AI Literacy",
    content: `# AI Governance Charter

## 1. Introduction

### 1.1 Purpose
This charter establishes the governance framework for artificial intelligence (AI) at [Organization Name]. It defines roles, responsibilities, and processes to ensure AI is developed, deployed, and used responsibly and in compliance with applicable regulations, including the EU AI Act.

### 1.2 Scope
This charter applies to:
- All AI systems owned, operated, developed, or procured by the organization
- All personnel involved in AI-related activities
- All third parties acting on behalf of the organization in AI matters

## 2. Governance Principles

Our AI governance is founded on:

1. **Accountability**: Clear ownership and responsibility for AI systems
2. **Transparency**: Open communication about AI use and decision-making
3. **Fairness**: Commitment to preventing bias and discrimination
4. **Safety**: Prioritizing safe AI development and deployment
5. **Privacy**: Respecting data protection and individual rights
6. **Compliance**: Adhering to all applicable laws and regulations

## 3. Governance Structure

### 3.1 AI Governance Board

**Composition**:
- Executive Sponsor (Chair)
- Chief Technology Officer
- Chief Compliance Officer / DPO
- Business Unit Representatives
- Legal Representative

**Responsibilities**:
- Set strategic direction for AI use
- Approve high-risk AI deployments
- Review governance effectiveness
- Allocate resources for AI compliance
- Report to Board of Directors on AI matters

**Meeting Cadence**: Quarterly (or as needed for urgent matters)

### 3.2 AI Compliance Owner

**Responsibilities**:
- Maintain the AI System Inventory
- Oversee classification and risk assessment
- Coordinate compliance activities
- Manage audit readiness
- Report to AI Governance Board

### 3.3 AI System Owners

**Responsibilities** (per system):
- Ensure proper classification and documentation
- Implement required controls
- Maintain oversight procedures
- Report incidents and changes
- Coordinate with vendors (if applicable)

### 3.4 Human Oversight Owners

**Responsibilities** (per high-risk system):
- Execute oversight procedures
- Review AI outputs as required
- Intervene when necessary
- Document oversight activities

## 4. Key Processes

### 4.1 AI System Lifecycle

| Phase | Key Activities | Approvals Required |
|-------|---------------|-------------------|
| **Ideation** | Use case definition, initial risk screening | Department head |
| **Development/Procurement** | Full assessment, vendor due diligence | AI Compliance Owner |
| **Deployment** | Testing, documentation, controls implementation | AI System Owner + Compliance |
| **Operation** | Monitoring, oversight, incident response | Ongoing |
| **Change** | Re-assessment, update documentation | AI Compliance Owner |
| **Retirement** | Data handling, archive documentation | AI System Owner |

### 4.2 Risk Assessment & Classification

All AI systems must be assessed for:
- Whether they qualify as an "AI system" under the EU AI Act
- Prohibited practices (Article 5)
- High-risk categorization (Annex III)
- Transparency obligations (Article 50)

Classification must be reviewed:
- Annually at minimum
- Upon material changes to the system
- When regulatory requirements change

### 4.3 Incident Management

AI-related incidents must be:
- Reported immediately to the AI Compliance Owner
- Classified by severity
- Investigated and documented
- Reported externally if qualifying as "serious incident"

## 5. Compliance Requirements

### 5.1 Documentation
Every AI system must have documented:
- Purpose and intended use
- Risk classification and rationale
- Applicable controls and implementation status
- Oversight procedures
- Evidence of compliance

### 5.2 Training
- All employees using AI systems must complete AI literacy training
- Specialized training for AI system owners and oversight personnel
- Annual refresher training

### 5.3 Auditing
- Internal audit of AI governance annually
- Documentation ready for regulatory inspection
- Regular review of control effectiveness

## 6. Reporting

### 6.1 Internal Reporting
- **Quarterly**: AI Governance Board receives summary report
- **Annually**: Board of Directors receives AI governance review

### 6.2 External Reporting
- Serious incidents reported per regulatory requirements
- Registration in EU database for applicable high-risk systems
- Response to regulatory inquiries

## 7. Review and Amendments

This charter will be:
- Reviewed annually by the AI Governance Board
- Updated to reflect regulatory changes
- Amended as organizational needs evolve

---

**Charter Owner**: [Name/Role]  
**Approved By**: AI Governance Board  
**Effective Date**: [Date]  
**Next Review Date**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "training-policy",
    name: "AI Literacy Training Policy",
    description: "Framework for ensuring staff AI competency as required by Article 4",
    policy_type: "training",
    category: "governance",
    estimatedTime: "10 min to customize",
    articleReference: "Article 4 - AI Literacy",
    content: `# AI Literacy Training Policy

## 1. Purpose

This policy establishes requirements for AI literacy training at [Organization Name] in compliance with Article 4 of the EU AI Act, which requires providers and deployers to ensure sufficient AI literacy among staff and others operating AI systems on their behalf.

## 2. Scope

This policy applies to:
- All employees who use AI systems in their work
- Contractors and third parties operating AI on our behalf
- Personnel with AI oversight responsibilities
- Management with AI governance duties

## 3. Training Levels

### Level 1: AI Awareness (All Staff)

**Who**: All employees using any AI system

**Content**:
- What is AI and how it works (basics)
- Overview of AI systems used in the organization
- EU AI Act basics and why it matters
- Recognizing AI limitations and risks
- Reporting concerns and incidents
- Acceptable use policies

**Duration**: 2 hours  
**Frequency**: Upon hire + annual refresher

### Level 2: AI Operator Training (System Users)

**Who**: Staff who regularly operate specific AI systems

**Content**:
- System-specific functionality and features
- Input data requirements and quality
- Output interpretation guidelines
- Override and escalation procedures
- Documentation requirements
- Role-specific risks and mitigations

**Duration**: 4 hours (per system)  
**Frequency**: Upon system access + when major changes occur

### Level 3: AI Oversight Training (Oversight Personnel)

**Who**: Human oversight owners and reviewers for high-risk systems

**Content**:
- Deep understanding of assigned AI system(s)
- Risk assessment and classification
- Oversight procedures and intervention
- Bias recognition and mitigation
- Regulatory requirements for high-risk AI
- Documentation and audit requirements

**Duration**: 8 hours  
**Frequency**: Upon assignment + annual refresher

### Level 4: AI Governance Training (Management)

**Who**: AI System Owners, Compliance team, Senior leadership

**Content**:
- EU AI Act comprehensive overview
- Governance framework and responsibilities
- Risk management and compliance
- Incident response and reporting obligations
- Vendor management for AI
- Board-level AI oversight

**Duration**: 6 hours  
**Frequency**: Upon role assignment + annual refresher

## 4. Training Delivery

### 4.1 Methods
- Online modules (self-paced)
- Live workshops (for Levels 3-4)
- System-specific hands-on training
- External courses (when appropriate)

### 4.2 Materials
All training materials must be:
- Reviewed and approved by AI Compliance Owner
- Updated at least annually
- Version controlled
- Accessible to all required personnel

## 5. Competency Assessment

### 5.1 Testing
- Level 1: Quiz with 80% pass requirement
- Level 2: Practical assessment + quiz
- Level 3: Scenario-based assessment
- Level 4: Oral examination or project

### 5.2 Certification
Upon successful completion:
- Training completion recorded in HR system
- Certificate issued (digital)
- Access to AI systems granted/confirmed

### 5.3 Remediation
If assessment not passed:
- Identify knowledge gaps
- Provide additional training
- Re-assessment within 30 days
- Escalate if repeated failure

## 6. Record Keeping

The following records must be maintained:
- Training completion dates and scores
- Certificates issued
- Training materials versions used
- Attendance records for live sessions
- Remediation actions

Records retained for minimum 5 years.

## 7. Roles and Responsibilities

| Role | Responsibilities |
|------|------------------|
| **HR/L&D** | Coordinate training delivery, track completion |
| **AI Compliance Owner** | Define requirements, approve content, audit compliance |
| **AI System Owners** | Ensure team members complete required training |
| **Managers** | Monitor team training status, support participation |
| **Employees** | Complete required training, apply knowledge |

## 8. Compliance Monitoring

- Training completion rates reviewed monthly
- Training effectiveness assessed annually
- Gap analysis performed quarterly
- Non-compliance escalated to management

## 9. Review

This policy will be reviewed:
- Annually at minimum
- When regulatory requirements change
- When significant new AI systems are deployed

---

**Policy Owner**: [Name/Role]  
**Approved By**: [Name/Role]  
**Effective Date**: [Date]  
**Version**: 1.0
`,
  },
  {
    id: "worker-notification",
    name: "Worker AI Notification Template",
    description: "Template for notifying employees about AI systems used in the workplace per Article 26",
    policy_type: "transparency",
    category: "transparency",
    estimatedTime: "10 min to customize",
    articleReference: "Article 26(7) - Deployer Obligations",
    content: `# Worker Notification: AI Systems in the Workplace

## Notice to Employees

Dear Colleagues,

In accordance with Article 26(7) of the EU AI Act, we are informing you about the artificial intelligence (AI) systems that are used in our workplace and may affect you in your role as an employee.

## AI Systems Currently in Use

### [System 1 Name]

**Purpose**: [What the system does]

**Scope**: [Where/when it's used - e.g., "Performance review support", "Shift scheduling"]

**What it analyzes**: [Types of data processed]

**How it affects you**: [Impact on work decisions]

**Human oversight**: [How managers review AI outputs]

---

### [System 2 Name]

**Purpose**: [What the system does]

**Scope**: [Where/when it's used]

**What it analyzes**: [Types of data processed]

**How it affects you**: [Impact on work decisions]

**Human oversight**: [How managers review AI outputs]

---

## Your Rights

As an employee, you have the right to:

1. **Be informed**: You are entitled to clear information about how AI systems affect your work, which this notice provides.

2. **Request information**: You may request additional details about how AI systems process information related to your work.

3. **Human review**: For significant decisions affecting your employment, you may request that a human reviews the AI's assessment.

4. **Raise concerns**: You may raise concerns about AI systems through [channel - e.g., HR, works council, compliance].

## Data Protection

All AI systems process data in accordance with our Privacy Policy and applicable data protection laws including GDPR. For information about your data protection rights, please refer to [Employee Privacy Notice/link].

## Questions and Concerns

If you have questions about our use of AI systems or wish to exercise any rights:

**Contact**: [HR Contact / Compliance Contact]  
**Email**: [email@company.com]  
**Works Council Representative**: [Name, if applicable]

## Updates

We will notify you of:
- Introduction of new AI systems affecting employees
- Significant changes to existing AI systems
- Changes to how AI systems affect employment decisions

This notice will be updated accordingly, and you will be informed of material changes.

---

**Issued By**: [HR Director / Management]  
**Date**: [Date]  
**Version**: 1.0

---

*This notice is provided in compliance with Article 26(7) of the EU AI Act, which requires employers to inform workers and their representatives before deploying a high-risk AI system in the workplace.*
`,
  },
];

export const TEMPLATE_CATEGORIES = [
  { id: "governance", label: "Governance", description: "Policies establishing AI governance structures" },
  { id: "operational", label: "Operational", description: "Day-to-day AI operations procedures" },
  { id: "transparency", label: "Transparency", description: "Disclosure and notification templates" },
  { id: "vendor", label: "Vendor Management", description: "Third-party AI vendor processes" },
];
