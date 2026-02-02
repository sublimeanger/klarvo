import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, ChevronRight, Boxes, Shield, FileCheck, Download, Settings, Briefcase, Building2, Heart, Laptop, GraduationCap, BookOpen, FileText, Wrench, BarChart3, HelpCircle, Users, Newspaper, MapPin, Phone, Activity } from "lucide-react";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.svg";

// Product mega menu - What We Do
const productFeatures = [
  {
    title: "AI System Inventory",
    description: "Track and manage all AI systems",
    href: "/ai-inventory-software",
    icon: Boxes,
  },
  {
    title: "Risk Classification",
    description: "Automated risk classification",
    href: "/eu-ai-act-compliance-software",
    icon: Shield,
  },
  {
    title: "Evidence Vault",
    description: "Store compliance documentation",
    href: "/evidence-vault-software",
    icon: FileCheck,
  },
  {
    title: "Export Packs",
    description: "Audit-ready PDF reports",
    href: "/samples",
    icon: Download,
  },
  {
    title: "Control Library",
    description: "Pre-built regulatory controls",
    href: "/features#controls",
    icon: Settings,
  },
];

// Product mega menu - Industries
const productIndustries = [
  { title: "HR & Recruitment", href: "/industries/hr-recruitment-ai-act", icon: Briefcase },
  { title: "Financial Services", href: "/industries/fintech-credit-ai-act", icon: Building2 },
  { title: "Healthcare", href: "/use-cases/healthcare", icon: Heart },
  { title: "SaaS Companies", href: "/industries/saas-ai-act", icon: Laptop },
  { title: "Education", href: "/industries/education-edtech-ai-act", icon: GraduationCap },
];

// Resources dropdown - Learn
const resourcesLearn = [
  { title: "Documentation", href: "/docs", icon: BookOpen },
  { title: "Regulation Guide", href: "/eu-ai-act", icon: FileText },
  { title: "Blog", href: "/blog", icon: Newspaper },
  { title: "FAQ", href: "/faq", icon: HelpCircle },
];

// Resources dropdown - Get Started
const resourcesGetStarted = [
  { title: "Templates", href: "/templates", icon: FileText },
  { title: "Free Tools", href: "/tools", icon: Wrench },
  { title: "Sample Reports", href: "/samples", icon: BarChart3 },
];

// Company dropdown
const companyLinks = [
  { title: "About Us", href: "/about", icon: Users },
  { title: "Careers", href: "/careers", icon: Briefcase },
  { title: "Contact", href: "/contact", icon: Phone },
  { title: "Partners", href: "/partners", icon: Building2 },
  { title: "Press", href: "/press", icon: Newspaper },
  { title: "Status", href: "/status", icon: Activity },
];

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  wide?: boolean;
}

function NavDropdown({ label, children, isOpen, onToggle, onClose, wide }: DropdownProps) {
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
        <div 
          className={cn(
            "absolute top-full mt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150",
            wide ? "left-1/2 -translate-x-1/2" : "left-0"
          )}
        >
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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
    setMobileExpanded(null);
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

  const toggleMobileSection = (section: string) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background border-b border-border/50 shadow-sm py-2"
          : "bg-background py-3"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="relative z-10 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={klarvoLogo}
              alt="Klarvo"
              className="h-8 transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - 4 items only */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Product Mega Menu */}
            <NavDropdown
              label="Product"
              isOpen={openDropdown === "product"}
              onToggle={() => handleDropdownToggle("product")}
              onClose={closeDropdown}
              wide
            >
              <div className="w-[600px] rounded-xl border border-border bg-popover p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-8">
                  {/* What We Do */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      What We Do
                    </h4>
                    <div className="space-y-1">
                      {productFeatures.map((link) => (
                        <Link
                          key={link.title}
                          to={link.href}
                          onClick={closeDropdown}
                          className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <link.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium group-hover:text-primary transition-colors">{link.title}</div>
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/features"
                      onClick={closeDropdown}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-4 pl-2.5"
                    >
                      See All Features
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* For Your Industry */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      For Your Industry
                    </h4>
                    <div className="space-y-1">
                      {productIndustries.map((link) => (
                        <Link
                          key={link.title}
                          to={link.href}
                          onClick={closeDropdown}
                          className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-muted transition-colors group"
                        >
                          <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/industries"
                      onClick={closeDropdown}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-4 pl-2.5"
                    >
                      See All Industries
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </NavDropdown>

            {/* Pricing - Direct Link */}
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
              <div className="w-[380px] rounded-xl border border-border bg-popover p-5 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  {/* Learn */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Learn
                    </h4>
                    <div className="space-y-1">
                      {resourcesLearn.map((link) => (
                        <Link
                          key={link.title}
                          to={link.href}
                          onClick={closeDropdown}
                          className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted transition-colors group"
                        >
                          <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="group-hover:text-primary transition-colors">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Get Started */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Get Started
                    </h4>
                    <div className="space-y-1">
                      {resourcesGetStarted.map((link) => (
                        <Link
                          key={link.title}
                          to={link.href}
                          onClick={closeDropdown}
                          className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted transition-colors group"
                        >
                          <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="group-hover:text-primary transition-colors">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    to="/resources"
                    onClick={closeDropdown}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    See All Resources
                    <ChevronRight className="h-4 w-4" />
                  </Link>
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
              <div className="w-[200px] rounded-xl border border-border bg-popover p-2 shadow-xl">
                <div className="space-y-0.5">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={closeDropdown}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors group"
                    >
                      <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="group-hover:text-primary transition-colors">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </NavDropdown>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              to="/auth/login"
              className="inline-flex h-9 items-center px-4 text-sm font-medium rounded-md text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/auth/signup"
              className="inline-flex h-9 items-center gap-1.5 px-4 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-2 -mr-2 rounded-md hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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

      {/* Mobile Menu Overlay - Premium Bottom Sheet Style */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-background z-40 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          {/* Swipe indicator */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
          </div>
          
          <div className="container mx-auto px-4 py-2 safe-bottom">
            {/* Product Accordion */}
            <div className="border-b border-border">
              <button
                onClick={() => toggleMobileSection("product")}
                className="flex items-center justify-between w-full py-4 text-base font-semibold tap-target"
              >
                Product
                <ChevronDown className={cn("h-5 w-5 transition-transform", mobileExpanded === "product" && "rotate-180")} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200",
                mobileExpanded === "product" ? "max-h-[600px] pb-4" : "max-h-0"
              )}>
                <div className="pl-2 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">What We Do</p>
                    {productFeatures.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 py-3 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-lg transition-colors tap-target"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <link.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">{link.title}</span>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                      </Link>
                    ))}
                    <Link 
                      to="/features" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(false);
                      }} 
                      className="flex items-center gap-1 py-3 px-2 text-sm font-medium text-primary tap-target"
                    >
                      See All Features <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Industries</p>
                    {productIndustries.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 py-3 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-lg transition-colors tap-target"
                      >
                        <link.icon className="h-4 w-4 text-muted-foreground" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing - Direct Link with touch target */}
            <Link
              to="/pricing"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full py-4 text-base font-semibold border-b border-border tap-target"
            >
              Pricing
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            {/* Resources Accordion */}
            <div className="border-b border-border">
              <button
                onClick={() => toggleMobileSection("resources")}
                className="flex items-center justify-between w-full py-4 text-base font-semibold tap-target"
              >
                Resources
                <ChevronDown className={cn("h-5 w-5 transition-transform", mobileExpanded === "resources" && "rotate-180")} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200",
                mobileExpanded === "resources" ? "max-h-[400px] pb-4" : "max-h-0"
              )}>
                <div className="pl-2 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Learn</p>
                    {resourcesLearn.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 py-3 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-lg transition-colors tap-target"
                      >
                        <link.icon className="h-4 w-4 text-muted-foreground" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Get Started</p>
                    {resourcesGetStarted.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 py-3 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-lg transition-colors tap-target"
                      >
                        <link.icon className="h-4 w-4 text-muted-foreground" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Accordion */}
            <div className="border-b border-border">
              <button
                onClick={() => toggleMobileSection("company")}
                className="flex items-center justify-between w-full py-4 text-base font-semibold tap-target"
              >
                Company
                <ChevronDown className={cn("h-5 w-5 transition-transform", mobileExpanded === "company" && "rotate-180")} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200",
                mobileExpanded === "company" ? "max-h-[300px] pb-4" : "max-h-0"
              )}>
                <div className="pl-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-3 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-lg transition-colors tap-target"
                    >
                      <link.icon className="h-4 w-4 text-muted-foreground" />
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile CTAs - Fixed at bottom style, larger touch targets */}
            <div className="space-y-3 pt-6 pb-8">
              <Link
                to="/auth/signup"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full h-14 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tap-target"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/auth/login"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full h-14 text-base font-semibold rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors tap-target"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
