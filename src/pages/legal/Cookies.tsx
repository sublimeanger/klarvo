import { LegalLayout } from "@/components/marketing/LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="January 30, 2025">
      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>Klarvo uses cookies and similar technologies for the following purposes:</p>

      <h3>2.1 Essential Cookies</h3>
      <p>
        These cookies are necessary for the Service to function. They enable core functionality such as security, authentication, and session management. You cannot opt out of essential cookies.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>session_id</td>
            <td>Maintains your login session</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>csrf_token</td>
            <td>Prevents cross-site request forgery</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>auth_token</td>
            <td>Authenticates your requests</td>
            <td>7 days</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2 Functional Cookies</h3>
      <p>
        These cookies remember your preferences and settings to provide enhanced features. Disabling these may affect certain functionality.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>theme_preference</td>
            <td>Remembers your light/dark mode setting</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>sidebar_state</td>
            <td>Remembers sidebar collapsed/expanded state</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>

      <h3>2.3 Analytics Cookies</h3>
      <p>
        These cookies help us understand how visitors use the Service. The data collected is aggregated and anonymous.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_analytics_id</td>
            <td>Distinguishes unique visitors</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td>_analytics_session</td>
            <td>Groups pageviews into sessions</td>
            <td>30 minutes</td>
          </tr>
        </tbody>
      </table>

      <h3>2.4 Marketing Cookies</h3>
      <p>
        These cookies track your activity across websites to deliver relevant advertisements. We only use marketing cookies with your consent.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
      </p>
      <ul>
        <li><strong>Analytics provider:</strong> Aggregated usage analytics</li>
        <li><strong>Payment processor:</strong> Secure payment processing</li>
        <li><strong>Support tools:</strong> Customer support chat functionality</li>
      </ul>
      <p>
        These third parties have their own privacy policies governing how they use the data they collect.
      </p>

      <h2>4. Managing Cookies</h2>
      <h3>4.1 Cookie Preferences</h3>
      <p>
        You can manage your cookie preferences through our cookie consent banner when you first visit the site. You can change your preferences at any time in your browser settings.
      </p>

      <h3>4.2 Browser Settings</h3>
      <p>
        Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
      </ul>
      <p>
        Note: Blocking essential cookies may prevent you from using the Service properly.
      </p>

      <h2>5. Do Not Track</h2>
      <p>
        Some browsers have a "Do Not Track" feature that signals websites not to track your activity. We currently do not respond to DNT signals, but you can manage tracking through your cookie preferences.
      </p>

      <h2>6. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about our use of cookies, please contact us at privacy@klarvo.com.
      </p>
    </LegalLayout>
  );
}
