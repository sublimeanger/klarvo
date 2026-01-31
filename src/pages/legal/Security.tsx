import { LegalLayout } from "@/components/marketing/LegalLayout";
import { Link } from "react-router-dom";
import { Shield, Lock, Server, Eye, Users, AlertTriangle } from "lucide-react";

export default function Security() {
  return (
    <LegalLayout 
      title="Security" 
      lastUpdated="January 30, 2025"
      slug="security"
      description="Security practices at Klarvo. Encryption, access controls, compliance certifications, and data protection for EU AI Act compliance."
    >
      <div className="not-prose mb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Lock, label: "Encryption at Rest & Transit" },
            { icon: Shield, label: "SOC 2 Type II (In Progress)" },
            { icon: Server, label: "EU Data Residency" },
            { icon: Eye, label: "Access Controls" },
            { icon: Users, label: "Employee Training" },
            { icon: AlertTriangle, label: "Incident Response" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>Our Commitment to Security</h2>
      <p>
        At Klarvo, security is fundamental to everything we do. As a platform handling sensitive compliance data, we implement industry-leading security practices to protect your information.
      </p>

      <h2>Infrastructure Security</h2>
      <h3>Data Encryption</h3>
      <p>
        All data is encrypted both in transit and at rest:
      </p>
      <ul>
        <li><strong>In Transit:</strong> TLS 1.3 encryption for all connections</li>
        <li><strong>At Rest:</strong> AES-256 encryption for stored data</li>
        <li><strong>Database:</strong> Encrypted database connections and backups</li>
      </ul>

      <h3>Hosting & Infrastructure</h3>
      <p>
        Our infrastructure is hosted on enterprise-grade cloud platforms with:
      </p>
      <ul>
        <li>EU-based data centers for data residency compliance</li>
        <li>Redundant systems and automatic failover</li>
        <li>Regular security patches and updates</li>
        <li>DDoS protection and Web Application Firewall (WAF)</li>
      </ul>

      <h2>Application Security</h2>
      <h3>Authentication & Access Control</h3>
      <ul>
        <li>Secure password hashing with industry-standard algorithms</li>
        <li>Multi-factor authentication (MFA) support</li>
        <li>Role-based access control (RBAC)</li>
        <li>Session management with secure tokens</li>
        <li>Automatic session timeout</li>
      </ul>

      <h3>Secure Development</h3>
      <ul>
        <li>Security-focused code reviews</li>
        <li>Dependency vulnerability scanning</li>
        <li>Static code analysis</li>
        <li>Regular penetration testing</li>
        <li>Bug bounty program (coming soon)</li>
      </ul>

      <h2>Organizational Security</h2>
      <h3>Employee Practices</h3>
      <ul>
        <li>Background checks for all employees</li>
        <li>Mandatory security awareness training</li>
        <li>Principle of least privilege access</li>
        <li>Secure workstation policies</li>
      </ul>

      <h3>Vendor Management</h3>
      <ul>
        <li>Security assessments for all vendors</li>
        <li>Data Processing Agreements (DPAs) with sub-processors</li>
        <li>Regular vendor security reviews</li>
      </ul>

      <h2>Compliance & Certifications</h2>
      <p>We are committed to meeting the highest compliance standards:</p>
      <ul>
        <li><strong>GDPR:</strong> Full compliance with EU data protection requirements</li>
        <li><strong>SOC 2 Type II:</strong> Audit in progress</li>
        <li><strong>ISO 27001:</strong> Roadmap planned</li>
      </ul>

      <h2>Incident Response</h2>
      <p>
        We maintain a comprehensive incident response plan that includes:
      </p>
      <ul>
        <li>24/7 monitoring and alerting</li>
        <li>Defined escalation procedures</li>
        <li>Customer notification within 72 hours of confirmed data breach</li>
        <li>Post-incident analysis and remediation</li>
      </ul>

      <h2>Data Protection</h2>
      <h3>Backups</h3>
      <ul>
        <li>Automated daily backups</li>
        <li>Encrypted backup storage</li>
        <li>Geo-redundant backup locations</li>
        <li>Regular backup restoration testing</li>
      </ul>

      <h3>Data Retention & Deletion</h3>
      <p>
        We retain data according to our <Link to="/privacy">Privacy Policy</Link> and contractual obligations. Upon account termination, data is securely deleted within 30 days unless legally required to retain it.
      </p>

      <h2>Responsible Disclosure</h2>
      <p>
        We welcome security researchers to help us keep our platform secure. If you discover a vulnerability:
      </p>
      <ul>
        <li>Email security@klarvo.com with details</li>
        <li>Allow reasonable time for remediation before disclosure</li>
        <li>Do not access or modify user data</li>
      </ul>
      <p>
        We commit to acknowledging reports within 48 hours and working collaboratively on fixes.
      </p>

      <h2>Contact</h2>
      <p>
        For security inquiries or to report a vulnerability:
      </p>
      <ul>
        <li><strong>Security Team:</strong> security@klarvo.com</li>
        <li><strong>Data Protection Officer:</strong> dpo@klarvo.com</li>
      </ul>
    </LegalLayout>
  );
}
