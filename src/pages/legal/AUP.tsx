import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";

export default function AUP() {
  return (
    <LegalLayout title="Acceptable Use Policy" lastUpdated="January 30, 2025">
      <h2>1. Introduction</h2>
      <p>
        This Acceptable Use Policy ("AUP") sets forth the rules and guidelines for using Klarvo's EU AI Act compliance platform (the "Service"). This policy is part of our <Link to="/terms">Terms of Service</Link>.
      </p>
      <p>
        By using the Service, you agree to comply with this AUP. We may update this policy from time to time, and your continued use constitutes acceptance of any changes.
      </p>

      <h2>2. Permitted Uses</h2>
      <p>The Service is designed for legitimate business purposes including:</p>
      <ul>
        <li>Managing AI system inventories and compliance documentation</li>
        <li>Conducting risk classifications and assessments</li>
        <li>Storing and organizing compliance evidence</li>
        <li>Generating reports for internal use, audits, and regulatory purposes</li>
        <li>Training tracking and policy management</li>
        <li>Collaborating with team members on compliance activities</li>
      </ul>

      <h2>3. Prohibited Activities</h2>
      <p>You may not use the Service to:</p>

      <h3>3.1 Illegal Activities</h3>
      <ul>
        <li>Violate any applicable laws, regulations, or third-party rights</li>
        <li>Store or transmit content that is illegal in your jurisdiction</li>
        <li>Facilitate any illegal activities or transactions</li>
        <li>Evade or circumvent regulatory requirements</li>
      </ul>

      <h3>3.2 Harmful Content</h3>
      <ul>
        <li>Upload, store, or transmit viruses, malware, or other malicious code</li>
        <li>Store content that is defamatory, obscene, or harmful</li>
        <li>Upload content that infringes intellectual property rights</li>
        <li>Store personal data without proper legal basis</li>
      </ul>

      <h3>3.3 Security Violations</h3>
      <ul>
        <li>Attempt to gain unauthorized access to any system or data</li>
        <li>Interfere with or disrupt the Service or servers</li>
        <li>Probe, scan, or test vulnerabilities without authorization</li>
        <li>Bypass any security measures or access controls</li>
        <li>Share account credentials with unauthorized parties</li>
      </ul>

      <h3>3.4 Misuse of Service</h3>
      <ul>
        <li>Use the Service for purposes other than compliance management</li>
        <li>Resell, sublicense, or provide access to third parties without authorization</li>
        <li>Use automated systems to access the Service excessively</li>
        <li>Intentionally overload or abuse Service resources</li>
        <li>Scrape, copy, or extract data for unauthorized purposes</li>
      </ul>

      <h3>3.5 Fraud and Misrepresentation</h3>
      <ul>
        <li>Provide false information in your account or compliance data</li>
        <li>Impersonate others or misrepresent your affiliation</li>
        <li>Create fake compliance documentation</li>
        <li>Use the Service to deceive auditors or regulators</li>
      </ul>

      <h2>4. Data Responsibilities</h2>
      <p>When using the Service, you are responsible for:</p>
      <ul>
        <li>Ensuring you have the right to upload and store any content</li>
        <li>Maintaining accurate and up-to-date information</li>
        <li>Complying with data protection laws for any personal data you process</li>
        <li>Securing access to your account and any shared workspaces</li>
      </ul>

      <h2>5. Reporting Violations</h2>
      <p>
        If you become aware of any violation of this AUP, please report it to:
      </p>
      <ul>
        <li><strong>Email:</strong> abuse@klarvo.com</li>
      </ul>
      <p>
        Please include as much detail as possible, including screenshots or examples where relevant.
      </p>

      <h2>6. Enforcement</h2>
      <p>
        We reserve the right to investigate and take appropriate action against violations of this AUP, including:
      </p>
      <ul>
        <li>Warning the user of the violation</li>
        <li>Removing or disabling access to violating content</li>
        <li>Suspending or terminating the user's account</li>
        <li>Reporting violations to law enforcement</li>
        <li>Taking legal action where appropriate</li>
      </ul>
      <p>
        We may take these actions without prior notice when we believe it is necessary to protect the Service, our users, or third parties.
      </p>

      <h2>7. Cooperation</h2>
      <p>
        You agree to cooperate with us in investigating any suspected violations of this AUP. This may include providing information about your use of the Service.
      </p>

      <h2>8. Questions</h2>
      <p>
        If you have questions about this AUP or are unsure whether a specific use is permitted, please contact us at:
      </p>
      <ul>
        <li><strong>Email:</strong> legal@klarvo.com</li>
      </ul>
    </LegalLayout>
  );
}
