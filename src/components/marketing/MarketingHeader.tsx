import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const productLinks = [
  {
    title: "AI System Inventory",
    description: "Track and manage all your AI systems in one place",
    href: "/features#inventory",
  },
  {
    title: "Classification Engine",
    description: "Automated risk classification per EU AI Act",
    href: "/features#classification",
  },
  {
    title: "Evidence Vault",
    description: "Store and organize compliance documentation",
    href: "/features#evidence",
  },
  {
    title: "Control Library",
    description: "Pre-built controls mapped to regulations",
    href: "/features#controls",
  },
  {
    title: "Export Packs",
    description: "Generate audit-ready PDF reports",
    href: "/features#exports",
  },
];

const resourceLinks = [
  { title: "Documentation", href: "/docs" },
  { title: "EU AI Act Guide", href: "/eu-ai-act" },
  { title: "Templates", href: "/templates" },
  { title: "Resources", href: "/resources" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "API Reference", href: "/api" },
  { title: "Changelog", href: "/changelog" },
  { title: "Status", href: "/status" },
];

const solutionLinks = [
  { title: "For SMEs", description: "Enterprise compliance without the enterprise price", href: "/use-cases/sme" },
  { title: "For Enterprise", description: "Scale AI governance across your organization", href: "/use-cases/enterprise" },
  { title: "HR & Recruitment", description: "Comply with high-risk HR AI requirements", href: "/use-cases/hr" },
  { title: "Financial Services", description: "Credit scoring, insurance, and banking AI", href: "/use-cases/fintech" },
  { title: "Healthcare", description: "Medical device and clinical AI compliance", href: "/use-cases/healthcare" },
];

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Partners", href: "/partners" },
  { title: "Press", href: "/press" },
  { title: "Contact", href: "/contact" },
];

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function NavDropdown({ label, children, isOpen, onToggle, onClose }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors",
          isOpen
            ? "bg-muted text-foreground"
            : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}

export function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = () => setOpenDropdown(null);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background border-b border-border/50 shadow-sm py-2"
          : "bg-background/95 backdrop-blur-sm py-3"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/favicon.png"
              alt="Klarvo"
              className="h-9 w-9 rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight">Klarvo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Product Dropdown */}
            <NavDropdown
              label="Product"
              isOpen={openDropdown === "product"}
              onToggle={() => handleDropdownToggle("product")}
              onClose={closeDropdown}
            >
              <div className="w-[480px] rounded-xl border border-border bg-popover p-2 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {productLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={closeDropdown}
                      className="block rounded-lg p-3 hover:bg-muted transition-colors"
                    >
                      <div className="text-sm font-medium mb-1">{link.title}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </NavDropdown>

            {/* Features Link */}
            <Link
              to="/features"
              className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Features
            </Link>

            {/* Solutions Dropdown */}
            <NavDropdown
              label="Solutions"
              isOpen={openDropdown === "solutions"}
              onToggle={() => handleDropdownToggle("solutions")}
              onClose={closeDropdown}
            >
              <div className="w-[400px] rounded-xl border border-border bg-popover p-2 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {solutionLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={closeDropdown}
                      className="block rounded-lg p-3 hover:bg-muted transition-colors"
                    >
                      <div className="text-sm font-medium mb-1">{link.title}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </NavDropdown>

            {/* Pricing Link */}
            <Link
              to="/pricing"
              className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <NavDropdown
              label="Resources"
              isOpen={openDropdown === "resources"}
              onToggle={() => handleDropdownToggle("resources")}
              onClose={closeDropdown}
            >
              <div className="w-[200px] rounded-xl border border-border bg-popover p-2 shadow-xl">
                <div className="space-y-0.5">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={closeDropdown}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </NavDropdown>

            {/* Company Dropdown */}
            <NavDropdown
              label="Company"
              isOpen={openDropdown === "company"}
              onToggle={() => handleDropdownToggle("company")}
              onClose={closeDropdown}
            >
              <div className="w-[180px] rounded-xl border border-border bg-popover p-2 shadow-xl">
                <div className="space-y-0.5">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={closeDropdown}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </NavDropdown>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button variant="ghost" asChild className="h-9 px-4 text-sm font-medium">
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button asChild className="h-9 px-4 text-sm font-semibold rounded-lg">
              <Link to="/auth/signup">
                Start Free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200",
                  isMobileMenuOpen ? "top-2.5 rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-all duration-200",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200",
                  isMobileMenuOpen ? "top-2.5 -rotate-45" : "top-4"
                )}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-background z-40 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Product */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Product
              </h3>
              <div className="space-y-1">
                {productLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="block py-2.5 text-base font-medium hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Core Links */}
            <div className="flex flex-col gap-1">
              <Link
                to="/features"
                className="py-2.5 text-base font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="py-2.5 text-base font-medium hover:text-primary transition-colors"
              >
                Pricing
              </Link>
            </div>

            <div className="h-px bg-border" />

            {/* Solutions */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Solutions
              </h3>
              <div className="space-y-1">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="block py-2.5 text-base font-medium hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Resources & Company Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <div className="space-y-1">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Company
                </h3>
                <div className="space-y-1">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Mobile CTAs */}
            <div className="space-y-3 pt-2 pb-8">
              <Button asChild className="w-full h-12 text-base font-semibold" size="lg">
                <Link to="/auth/signup">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Link to="/auth/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
