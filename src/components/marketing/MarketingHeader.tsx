import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
          <div className="hidden lg:block">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="gap-0">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2">
                      {productLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            >
                              <div className="text-sm font-medium leading-none mb-1">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-muted"
                  >
                    Features
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:grid-cols-2">
                      {solutionLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            >
                              <div className="text-sm font-medium leading-none mb-1">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-muted"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[180px] gap-0.5 p-2">
                      {resourceLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
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
                  <NavigationMenuTrigger className="h-9 px-3 bg-transparent text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[160px] gap-0.5 p-2">
                      {companyLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
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
              <span className={cn(
                "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200",
                isMobileMenuOpen ? "top-2.5 rotate-45" : "top-1"
              )} />
              <span className={cn(
                "absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-all duration-200",
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )} />
              <span className={cn(
                "absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200",
                isMobileMenuOpen ? "top-2.5 -rotate-45" : "top-4"
              )} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-background z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-6">
              {/* Product */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Product
                </h3>
                <div className="space-y-0.5">
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

              {/* Solutions */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Solutions
                </h3>
                <div className="space-y-0.5">
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

              {/* Resources & Company */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Resources
                  </h3>
                  <div className="space-y-0.5">
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
                  <div className="space-y-0.5">
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
              <div className="space-y-3 pt-2">
                <Button asChild className="w-full h-12 text-base font-semibold" size="lg">
                  <Link to="/auth/signup">
                    Start Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 text-base font-semibold" size="lg">
                  <Link to="/auth/login">Log in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
