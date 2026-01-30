import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 30, 2025">
      <h2>1. Introduction</h2>
      <p>
        Klarvo ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our EU AI Act compliance platform and related services (the "Service").
      </p>
      <p>
        This policy applies to all users of the Service, including visitors to our website, registered users, and customers.
      </p>

      <h2>2. Information We Collect</h2>
      
      <h3>2.1 Information You Provide</h3>
      <p>We collect information that you voluntarily provide when using the Service, including:</p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, company name, job title, and password when you register.</li>
        <li><strong>Profile Information:</strong> Additional details you add to your profile.</li>
        <li><strong>Compliance Data:</strong> Information about your AI systems, vendors, policies, and evidence that you enter into the platform.</li>
        <li><strong>Communications:</strong> Messages you send to us for support or feedback.</li>
        <li><strong>Payment Information:</strong> Billing details and payment information (processed by our payment provider).</li>
      </ul>

      <h3>2.2 Information Collected Automatically</h3>
      <p>When you access the Service, we automatically collect:</p>
      <ul>
        <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
        <li><strong>Usage Data:</strong> Pages visited, features used, time spent, and interaction patterns.</li>
        <li><strong>Log Data:</strong> IP address, access times, and referring URLs.</li>
        <li><strong>Cookies:</strong> As described in our <Link to="/cookies">Cookie Policy</Link>.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li><strong>Service Delivery:</strong> To provide, maintain, and improve the Service.</li>
        <li><strong>Account Management:</strong> To create and manage your account.</li>
        <li><strong>Communications:</strong> To send service-related notifications, updates, and support responses.</li>
        <li><strong>Analytics:</strong> To understand usage patterns and improve user experience.</li>
        <li><strong>Security:</strong> To detect, prevent, and address security threats.</li>
        <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations.</li>
        <li><strong>Marketing:</strong> With your consent, to send promotional communications.</li>
      </ul>

      <h2>4. Legal Basis for Processing (GDPR)</h2>
      <p>Under the General Data Protection Regulation (GDPR), we process personal data based on:</p>
      <ul>
        <li><strong>Contract Performance:</strong> Processing necessary to provide the Service you requested.</li>
        <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests, such as improving the Service.</li>
        <li><strong>Legal Obligation:</strong> Processing required by law.</li>
        <li><strong>Consent:</strong> Processing based on your explicit consent (e.g., marketing emails).</li>
      </ul>

      <h2>5. Data Sharing and Disclosure</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Service (hosting, analytics, payment processing).</li>
        <li><strong>Business Partners:</strong> With your consent, for joint offerings or integrations.</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
        <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property.</li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal data for as long as your account is active or as needed to provide the Service. We may retain certain information longer as required by law or for legitimate business purposes (e.g., audit trails, legal claims).
      </p>
      <p>
        Compliance data that you enter into the platform is retained according to your subscription terms and the regulatory requirements for EU AI Act compliance documentation.
      </p>

      <h2>7. Your Rights (GDPR)</h2>
      <p>If you are located in the European Economic Area, you have the following rights:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of your personal data.</li>
        <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
        <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten").</li>
        <li><strong>Restriction:</strong> Request restriction of processing.</li>
        <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
        <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
        <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent).</li>
      </ul>
      <p>To exercise these rights, contact us at privacy@klarvo.com.</p>

      <h2>8. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries outside your country of residence. When we transfer data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
      </p>

      <h2>9. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data, including:
      </p>
      <ul>
        <li>Encryption in transit (TLS) and at rest</li>
        <li>Access controls and authentication</li>
        <li>Regular security assessments</li>
        <li>Employee training on data protection</li>
      </ul>
      <p>
        For more details on our security practices, see our <Link to="/security">Security page</Link>.
      </p>

      <h2>10. Children's Privacy</h2>
      <p>
        The Service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes by email or through the Service. Your continued use after such notification constitutes acceptance.
      </p>

      <h2>12. Contact Us</h2>
      <p>For questions about this Privacy Policy or to exercise your rights:</p>
      <ul>
        <li><strong>Email:</strong> privacy@klarvo.com</li>
        <li><strong>Data Protection Officer:</strong> dpo@klarvo.com</li>
        <li><strong>Address:</strong> [Company Address]</li>
      </ul>
      <p>
        You also have the right to lodge a complaint with your local data protection authority.
      </p>
    </LegalLayout>
  );
}
