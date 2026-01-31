import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";

export default function GDPR() {
  return (
    <LegalLayout 
      title="GDPR Compliance" 
      lastUpdated="January 30, 2025"
      slug="gdpr"
      description="GDPR compliance at Klarvo. Learn how we protect your data and support your GDPR obligations for AI governance."
    >
      <h2>Our Commitment to GDPR</h2>
      <p>
        Klarvo is fully committed to compliance with the General Data Protection Regulation (GDPR). As a platform designed to help organizations manage EU AI Act compliance, we understand the importance of robust data protection practices.
      </p>

      <h2>How We Support Your GDPR Compliance</h2>
      <p>
        Beyond our own compliance, Klarvo is designed to help you meet your GDPR obligations:
      </p>
      <ul>
        <li><strong>Data Inventory:</strong> Track what data your AI systems process</li>
        <li><strong>DPIA Integration:</strong> Link AI assessments to existing DPIAs</li>
        <li><strong>Documentation:</strong> Maintain records of processing activities</li>
        <li><strong>Audit Trails:</strong> Complete logging for accountability</li>
      </ul>

      <h2>Your Rights as a Data Subject</h2>
      <p>
        Under GDPR, you have the following rights regarding your personal data:
      </p>

      <h3>Right of Access (Article 15)</h3>
      <p>
        You can request a copy of the personal data we hold about you. We will provide this within 30 days of your request.
      </p>

      <h3>Right to Rectification (Article 16)</h3>
      <p>
        If your personal data is inaccurate or incomplete, you can request that we correct or complete it.
      </p>

      <h3>Right to Erasure (Article 17)</h3>
      <p>
        You can request that we delete your personal data in certain circumstances, such as when the data is no longer necessary for its original purpose.
      </p>

      <h3>Right to Restriction (Article 18)</h3>
      <p>
        You can request that we restrict processing of your data in certain circumstances, such as when you contest its accuracy.
      </p>

      <h3>Right to Data Portability (Article 20)</h3>
      <p>
        You can request your data in a structured, commonly used, machine-readable format and have it transmitted to another controller.
      </p>

      <h3>Right to Object (Article 21)</h3>
      <p>
        You can object to processing based on legitimate interests or for direct marketing purposes.
      </p>

      <h3>Rights Related to Automated Decision-Making (Article 22)</h3>
      <p>
        You have the right not to be subject to decisions based solely on automated processing that significantly affect you.
      </p>

      <h2>How to Exercise Your Rights</h2>
      <p>
        To exercise any of these rights, please contact our Data Protection Officer:
      </p>
      <ul>
        <li><strong>Email:</strong> dpo@klarvo.com</li>
        <li><strong>Subject line:</strong> "GDPR Rights Request"</li>
      </ul>
      <p>
        We will respond to your request within 30 days. If we need more time (up to 60 additional days for complex requests), we will inform you.
      </p>

      <h2>Lawful Bases for Processing</h2>
      <p>We process personal data based on the following lawful bases:</p>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Lawful Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Providing the Service</td>
            <td>Contract Performance (Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td>Account security</td>
            <td>Legitimate Interest (Art. 6(1)(f))</td>
          </tr>
          <tr>
            <td>Service improvements</td>
            <td>Legitimate Interest (Art. 6(1)(f))</td>
          </tr>
          <tr>
            <td>Marketing communications</td>
            <td>Consent (Art. 6(1)(a))</td>
          </tr>
          <tr>
            <td>Legal compliance</td>
            <td>Legal Obligation (Art. 6(1)(c))</td>
          </tr>
        </tbody>
      </table>

      <h2>Data Protection Officer</h2>
      <p>
        We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and ensuring compliance with GDPR.
      </p>
      <ul>
        <li><strong>Email:</strong> dpo@klarvo.com</li>
      </ul>

      <h2>Data Processing Agreement</h2>
      <p>
        For customers who process personal data through our platform, we provide a <Link to="/dpa">Data Processing Agreement (DPA)</Link> that meets GDPR requirements for controller-processor relationships.
      </p>

      <h2>International Transfers</h2>
      <p>
        Your data is primarily stored within the European Economic Area. For any transfers outside the EEA, we use appropriate safeguards such as Standard Contractual Clauses approved by the European Commission.
      </p>

      <h2>Supervisory Authority</h2>
      <p>
        You have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal data violates GDPR. You can contact your local data protection authority or the authority where we are established.
      </p>

      <h2>Related Policies</h2>
      <ul>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/cookies">Cookie Policy</Link></li>
        <li><Link to="/dpa">Data Processing Agreement</Link></li>
        <li><Link to="/security">Security</Link></li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        For any GDPR-related questions or concerns:
      </p>
      <ul>
        <li><strong>Data Protection Officer:</strong> dpo@klarvo.com</li>
        <li><strong>General Privacy Inquiries:</strong> privacy@klarvo.com</li>
      </ul>
    </LegalLayout>
  );
}
