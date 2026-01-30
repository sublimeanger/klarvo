import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, ArrowRight, Mail, Shield, CheckCircle2 } from "lucide-react";

const productLinks = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Integrations", href: "/integrations" },
  { title: "Templates", href: "/templates" },
  { title: "API Reference", href: "/api" },
  { title: "Changelog", href: "/changelog" },
];

const resourceLinks = [
  { title: "Documentation", href: "/docs" },
  { title: "EU AI Act Guide", href: "/eu-ai-act" },
  { title: "Resources", href: "/resources" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "Status", href: "/status" },
];

const solutionLinks = [
  { title: "For SMEs", href: "/use-cases/sme" },
  { title: "For Enterprise", href: "/use-cases/enterprise" },
  { title: "HR & Recruitment", href: "/use-cases/hr" },
  { title: "Financial Services", href: "/use-cases/fintech" },
  { title: "Healthcare", href: "/use-cases/healthcare" },
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
    <footer className="relative bg-surface-1 border-t overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>
      
      {/* Main Footer */}
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <img
                  src="/favicon.png"
                  alt="Klarvo"
                  className="h-10 w-10 rounded-xl"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Klarvo</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              The complete EU AI Act compliance platform for modern businesses. 
              Simple, evidence-based, and audit-ready.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Stay updated on EU AI Act</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1 max-w-[280px]">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-11 rounded-xl border-2 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="h-11 px-5 rounded-xl font-semibold group">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Get compliance updates. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-5">Product</h3>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-5">Resources</h3>
            <ul className="space-y-3.5">
              {resourceLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-5">Solutions</h3>
            <ul className="space-y-3.5">
              {solutionLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-5">Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5">Legal</h3>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">🇪🇺</span>
              <span className="font-medium">EU Data Residency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background/50">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} Klarvo. All rights reserved.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
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
