import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const productLinks = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Integrations", href: "/integrations" },
  { title: "Changelog", href: "/changelog" },
  { title: "Documentation", href: "/docs" },
];

const resourceLinks = [
  { title: "Resources", href: "/resources" },
  { title: "Blog", href: "/resources#blog" },
  { title: "EU AI Act Guide", href: "/resources#guide" },
  { title: "Webinars", href: "/resources#webinars" },
  { title: "Status", href: "/status" },
];

const companyLinks = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Partners", href: "/partners" },
  { title: "Press", href: "/press" },
  { title: "Contact", href: "/contact" },
];

const legalLinks = [
  { title: "Terms of Service", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Cookie Policy", href: "/cookies" },
  { title: "Security", href: "/security" },
  { title: "DPA", href: "/dpa" },
  { title: "GDPR", href: "/gdpr" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/klarvo", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/klarvo", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/klarvo", label: "GitHub" },
];

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-1 border-t">
      {/* Main Footer */}
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/favicon.png"
                alt="Klarvo"
                className="h-9 w-9 rounded-lg"
              />
              <span className="text-xl font-bold tracking-tight">Klarvo</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              The complete EU AI Act compliance platform for modern businesses. 
              Simple, evidence-based, and audit-ready.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Stay updated</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-[240px]"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Get EU AI Act updates. No spam.
              </p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} Klarvo. All rights reserved.</span>
              <span className="hidden md:inline">·</span>
              <div className="hidden md:flex items-center gap-1">
                <span className="inline-flex items-center gap-1">
                  🇪🇺 Made for EU compliance
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
