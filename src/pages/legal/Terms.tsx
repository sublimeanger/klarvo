import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      lastUpdated="January 30, 2025"
      slug="terms"
      description="Terms of Service for Klarvo EU AI Act compliance platform. Read our usage terms, account policies, and service agreements."
    >
      <h2>1. Introduction</h2>
      <p>
        Welcome to Klarvo ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our EU AI Act compliance platform, including our website, applications, and related services (collectively, the "Service").
      </p>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Klarvo provides a software-as-a-service platform designed to help organizations manage their compliance with the European Union Artificial Intelligence Act (EU AI Act). The Service includes:
      </p>
      <ul>
        <li>AI system inventory and documentation tools</li>
        <li>Risk classification and assessment features</li>
        <li>Evidence management and storage</li>
        <li>Compliance reporting and export functionality</li>
        <li>Training and policy management features</li>
      </ul>
      <p>
        The Service is intended as a compliance management tool and does not constitute legal advice. Users should consult qualified legal professionals for specific legal guidance.
      </p>

      <h2>3. Account Registration</h2>
      <h3>3.1 Eligibility</h3>
      <p>
        To use the Service, you must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or the organization you represent.
      </p>

      <h3>3.2 Account Security</h3>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
      </p>
      <ul>
        <li>Provide accurate and complete registration information</li>
        <li>Promptly update your information to keep it accurate</li>
        <li>Notify us immediately of any unauthorized use of your account</li>
        <li>Maintain strong passwords and enable two-factor authentication when available</li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>
        You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
      </p>
      <ul>
        <li>Violate any applicable laws or regulations</li>
        <li>Infringe upon the intellectual property rights of others</li>
        <li>Transmit any malicious code or interfere with the Service's operation</li>
        <li>Attempt to gain unauthorized access to any portion of the Service</li>
        <li>Use the Service to store or transmit content that is illegal, harmful, or violates third-party rights</li>
        <li>Resell, sublicense, or provide access to the Service to third parties without authorization</li>
      </ul>

      <h2>5. Subscription and Billing</h2>
      <h3>5.1 Pricing</h3>
      <p>
        The Service is offered under various subscription plans as described on our pricing page. Prices are subject to change with reasonable notice.
      </p>

      <h3>5.2 Payment Terms</h3>
      <p>
        Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable except as required by law or as otherwise specified in these Terms.
      </p>

      <h3>5.3 Cancellation</h3>
      <p>
        You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period. You will retain access to the Service until the end of your paid period.
      </p>

      <h2>6. Data and Privacy</h2>
      <p>
        Your use of the Service is also governed by our <Link to="/privacy">Privacy Policy</Link>, which describes how we collect, use, and protect your data. By using the Service, you consent to such processing.
      </p>
      <p>
        For customers subject to the GDPR, we offer a <Link to="/dpa">Data Processing Agreement</Link> that governs our processing of personal data on your behalf.
      </p>

      <h2>7. Intellectual Property</h2>
      <h3>7.1 Our Intellectual Property</h3>
      <p>
        The Service and its original content, features, and functionality are owned by Klarvo and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
      </p>

      <h3>7.2 Your Content</h3>
      <p>
        You retain ownership of any content you submit to the Service. By submitting content, you grant us a limited license to store, display, and process such content solely to provide the Service.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
      </p>
      <p>
        THE SERVICE IS A COMPLIANCE MANAGEMENT TOOL AND DOES NOT GUARANTEE REGULATORY COMPLIANCE. USERS ARE RESPONSIBLE FOR THEIR OWN COMPLIANCE DECISIONS.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, KLARVO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
      </p>
      <p>
        OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Klarvo and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.
      </p>

      <h2>11. Modifications to Terms</h2>
      <p>
        We may modify these Terms at any time. We will notify you of material changes by email or through the Service. Your continued use of the Service after such notification constitutes acceptance of the modified Terms.
      </p>

      <h2>12. Termination</h2>
      <p>
        We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the European Union and the applicable member state, without regard to conflict of law provisions.
      </p>

      <h2>14. Dispute Resolution</h2>
      <p>
        Any disputes arising from these Terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in accordance with applicable EU regulations.
      </p>

      <h2>15. Contact Information</h2>
      <p>
        For questions about these Terms, please contact us at:
      </p>
      <ul>
        <li>Email: legal@klarvo.com</li>
        <li>Address: [Company Address]</li>
      </ul>
    </LegalLayout>
  );
}
