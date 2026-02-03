import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";

export default function DPA() {
  return (
    <LegalLayout 
      title="Data Processing Agreement" 
      lastUpdated="January 30, 2025"
      slug="dpa"
      description="Data Processing Agreement (DPA) for Klarvo. GDPR-compliant terms for processing personal data on behalf of customers."
    >
      <p className="lead">
        This Data Processing Agreement ("DPA") forms part of the agreement between Klarvo and Customer for the provision of the EU AI Act compliance platform services ("Services").
      </p>

      <h2>1. Definitions</h2>
      <p>In this DPA:</p>
      <ul>
        <li><strong>"Controller"</strong> means the Customer who determines the purposes and means of processing Personal Data.</li>
        <li><strong>"Processor"</strong> means Klarvo, which processes Personal Data on behalf of the Controller.</li>
        <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person.</li>
        <li><strong>"Processing"</strong> means any operation performed on Personal Data, including collection, storage, use, and deletion.</li>
        <li><strong>"Data Subject"</strong> means an identifiable natural person whose Personal Data is processed.</li>
        <li><strong>"GDPR"</strong> means Regulation (EU) 2016/679 (General Data Protection Regulation).</li>
      </ul>

      <h2>2. Roles and Responsibilities</h2>
      <h3>2.1 Customer as Controller</h3>
      <p>
        The Customer acts as the Controller for Personal Data processed through the Services. The Customer is responsible for:
      </p>
      <ul>
        <li>Ensuring lawful basis for processing</li>
        <li>Providing appropriate notices to Data Subjects</li>
        <li>Ensuring accuracy of Personal Data</li>
        <li>Responding to Data Subject requests</li>
      </ul>

      <h3>2.2 Klarvo as Processor</h3>
      <p>
        Klarvo acts as a Processor, processing Personal Data only on documented instructions from the Customer. Klarvo will:
      </p>
      <ul>
        <li>Process Personal Data only as instructed by the Customer</li>
        <li>Ensure personnel are bound by confidentiality obligations</li>
        <li>Implement appropriate technical and organizational measures</li>
        <li>Assist the Customer with Data Subject requests</li>
        <li>Delete or return Personal Data upon termination</li>
      </ul>

      <h2>3. Subject Matter and Details of Processing</h2>
      <h3>3.1 Subject Matter</h3>
      <p>
        The provision of the Klarvo EU AI Act compliance platform, including AI system inventory, classification, evidence management, and reporting features.
      </p>

      <h3>3.2 Duration</h3>
      <p>
        Processing will continue for the duration of the Services agreement and as required for data retention obligations.
      </p>

      <h3>3.3 Nature and Purpose</h3>
      <p>
        Processing is necessary to provide the Services, including storing and organizing compliance data, generating reports, and facilitating user access.
      </p>

      <h3>3.4 Types of Personal Data</h3>
      <ul>
        <li>User account data (name, email, job title)</li>
        <li>Usage data and access logs</li>
        <li>Any Personal Data included in Customer's compliance documentation</li>
      </ul>

      <h3>3.5 Categories of Data Subjects</h3>
      <ul>
        <li>Customer employees and authorized users</li>
        <li>Individuals referenced in Customer's compliance data</li>
      </ul>

      <h2>4. Security Measures</h2>
      <p>
        Klarvo implements appropriate technical and organizational measures including:
      </p>
      <ul>
        <li>Encryption of data at rest and in transit</li>
        <li>Access controls and authentication</li>
        <li>Regular security testing and monitoring</li>
        <li>Incident detection and response procedures</li>
        <li>Employee security training</li>
        <li>Physical security controls for data centers</li>
      </ul>
      <p>
        For details, see our <Link to="/security">Security page</Link>.
      </p>

      <h2>5. Sub-Processors</h2>
      <h3>5.1 Authorization</h3>
      <p>
        The Customer authorizes Klarvo to engage sub-processors for the provision of Services. Klarvo will:
      </p>
      <ul>
        <li>Maintain a list of current sub-processors</li>
        <li>Notify the Customer of changes to sub-processors</li>
        <li>Ensure sub-processors are bound by equivalent data protection obligations</li>
      </ul>

      <h3>5.2 Current Sub-Processors</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cloud Infrastructure Provider</td>
            <td>Hosting and infrastructure</td>
            <td>EU (Germany)</td>
          </tr>
          <tr>
            <td>Database Provider</td>
            <td>Database services</td>
            <td>EU (Germany)</td>
          </tr>
          <tr>
            <td>Email Provider</td>
            <td>Transactional email</td>
            <td>EU</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Data Subject Rights</h2>
      <p>
        Klarvo will assist the Customer in responding to Data Subject requests including:
      </p>
      <ul>
        <li>Access to Personal Data</li>
        <li>Rectification of inaccurate data</li>
        <li>Erasure ("right to be forgotten")</li>
        <li>Restriction of processing</li>
        <li>Data portability</li>
        <li>Objection to processing</li>
      </ul>

      <h2>7. Data Breach Notification</h2>
      <p>
        In the event of a Personal Data breach, Klarvo will:
      </p>
      <ul>
        <li>Notify the Customer without undue delay (and within 48 hours where feasible)</li>
        <li>Provide information about the nature and scope of the breach</li>
        <li>Describe measures taken to address the breach</li>
        <li>Assist the Customer with regulatory notifications</li>
      </ul>

      <h2>8. International Transfers</h2>
      <p>
        Klarvo primarily processes data within the European Economic Area. Where transfers outside the EEA are necessary:
      </p>
      <ul>
        <li>Transfers are made to countries with an adequacy decision</li>
        <li>Or subject to Standard Contractual Clauses (SCCs)</li>
        <li>Supplementary measures are applied where required</li>
      </ul>

      <h2>9. Audit Rights</h2>
      <p>
        Klarvo will make available information necessary to demonstrate compliance with this DPA. The Customer may:
      </p>
      <ul>
        <li>Request and review audit reports and certifications</li>
        <li>Conduct or mandate audits with reasonable notice</li>
      </ul>

      <h2>10. Data Deletion</h2>
      <p>
        Upon termination of Services, Klarvo will:
      </p>
      <ul>
        <li>Provide an option to export Customer data</li>
        <li>Delete all Personal Data within 30 days of termination</li>
        <li>Certify deletion upon request</li>
      </ul>
      <p>
        Data may be retained longer if required by applicable law.
      </p>

      <h2>11. Liability</h2>
      <p>
        Each party's liability under this DPA is subject to the limitations set forth in the main Services agreement.
      </p>

      <h2>12. Contact</h2>
      <p>
        For DPA inquiries:
      </p>
      <ul>
        <li><strong>Email:</strong> dpa@klarvo.com</li>
        <li><strong>DPO:</strong> dpo@klarvo.com</li>
      </ul>

      <h2>Related Documents</h2>
      <p>
        This DPA should be read alongside:
      </p>
      <ul>
        <li><Link to="/terms">Terms of Service</Link> — Main service agreement</li>
        <li><Link to="/privacy">Privacy Policy</Link> — How we handle personal data</li>
        <li><Link to="/security">Security</Link> — Technical and organizational measures</li>
        <li><Link to="/gdpr">GDPR Compliance</Link> — Our GDPR compliance approach</li>
        <li><Link to="/cookies">Cookie Policy</Link> — Use of cookies and tracking technologies</li>
      </ul>
    </LegalLayout>
  );
}
