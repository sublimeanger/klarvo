import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

export function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-soft py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
              <img
                src="/favicon.png"
                alt="Klarvo"
                className="h-10 w-10 rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">Klarvo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent h-10 px-4 font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[550px] gap-2 p-4 md:grid-cols-2">
                      {productLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:shadow-soft group"
                            >
                              <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                                {link.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/features"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="link-underline">Features</span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent h-10 px-4 font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[450px] gap-2 p-4 md:grid-cols-2">
                      {solutionLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:shadow-soft group"
                            >
                              <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                                {link.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/pricing"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="link-underline">Pricing</span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent h-10 px-4 font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 p-3">
                      {resourceLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-lg px-4 py-2.5 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-primary"
                            >
                              {link.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent h-10 px-4 font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 p-3">
                      {companyLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-lg px-4 py-2.5 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-primary"
                            >
                              {link.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild className="h-10 px-5 font-medium">
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button asChild className="h-10 px-6 font-semibold rounded-xl shadow-colored-primary hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 group">
              <Link to="/auth/signup">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <span className={cn(
                "absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300",
                isMobileMenuOpen ? "top-3 rotate-45" : "top-1"
              )} />
              <span className={cn(
                "absolute left-0 top-3 block h-0.5 w-6 bg-current transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
              )} />
              <span className={cn(
                "absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300",
                isMobileMenuOpen ? "top-3 -rotate-45" : "top-5"
              )} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background/98 backdrop-blur-xl transition-all duration-500 z-40",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container-wide pt-24 pb-8 h-full overflow-y-auto">
          <div className="space-y-8">
            {/* Product Section */}
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Product
              </h3>
              <div className="space-y-1">
                {productLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="block py-3 text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Solutions */}
            <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Solutions
              </h3>
              <div className="space-y-1">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="block py-3 text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <div className="space-y-1">
                  {resourceLinks.map((link) => (
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
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Company
                </h3>
                <div className="space-y-1">
                  {companyLinks.map((link) => (
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
            </div>

            <div className="h-px bg-border" />

            {/* Mobile CTAs */}
            <div className="space-y-3 pt-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Button asChild className="w-full h-14 text-base font-semibold rounded-2xl shadow-colored-primary" size="lg">
                <Link to="/auth/signup">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-14 text-base font-semibold rounded-2xl" size="lg">
                <Link to="/auth/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
