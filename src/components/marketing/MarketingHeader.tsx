import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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
  { title: "Resources", href: "/resources" },
  { title: "Changelog", href: "/changelog" },
  { title: "Status", href: "/status" },
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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/favicon.png"
              alt="Klarvo"
              className="h-9 w-9 rounded-lg transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight">Klarvo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {productLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    Features
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/pricing"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {resourceLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
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
                  <NavigationMenuTrigger className="bg-transparent">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {companyLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
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
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button asChild className="shadow-soft hover:shadow-glow transition-shadow">
              <Link to="/auth/signup">Start Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 bg-background/98 backdrop-blur-xl transition-all duration-300 overflow-y-auto",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container-wide py-6 space-y-6">
          {/* Product Section */}
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

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Resources
              </h3>
              <div className="space-y-1">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="block py-2 text-base font-medium hover:text-primary transition-colors"
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
                    className="block py-2 text-base font-medium hover:text-primary transition-colors"
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
            <Button asChild className="w-full h-12 text-base" size="lg">
              <Link to="/auth/signup">Start Free</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 text-base" size="lg">
              <Link to="/auth/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
