import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  ArrowRight,
  MapPin,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (EU)",
    type: "Full-time"
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote (EU)",
    type: "Full-time"
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (EU)",
    type: "Full-time"
  },
  {
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote (EU)",
    type: "Full-time"
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Remote-First",
    description: "Work from anywhere in the EU. We believe great talent isn't limited by geography."
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness stipend."
  },
  {
    icon: BookOpen,
    title: "Learning Budget",
    description: "€1,500/year for courses, conferences, books, and professional development."
  },
  {
    icon: Coffee,
    title: "Flexible Hours",
    description: "We care about outcomes, not hours. Work when you're most productive."
  },
  {
    icon: Zap,
    title: "Latest Tools",
    description: "Best-in-class hardware and software. We invest in your productivity."
  },
  {
    icon: Briefcase,
    title: "Equity Options",
    description: "Share in the company's success with competitive equity packages."
  }
];

const values = [
  {
    title: "Impact Over Output",
    description: "We measure success by the problems we solve, not the hours we work."
  },
  {
    title: "Trust by Default",
    description: "We hire smart people and trust them to do great work autonomously."
  },
  {
    title: "Learn Publicly",
    description: "We share what we learn—with each other and with the world."
  },
  {
    title: "Customer Obsessed",
    description: "Every decision starts with 'How does this help our customers?'"
  }
];

export default function Careers() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Briefcase className="h-4 w-4" />
              We're Hiring
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Join the{" "}
              <span className="text-gradient">Klarvo Team</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Help us build the future of AI governance. We're looking for passionate 
              people who want to make AI compliance accessible to everyone.
            </p>
            
            <Button size="lg" asChild>
              <a href="#openings">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide how we work, make decisions, and treat each other.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't see a perfect fit? Send us your CV at careers@klarvo.io
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position, i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-all hover:border-primary/30">
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{position.department}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </Badge>
                      <Badge variant="outline">{position.type}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    Apply
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're always looking for talented people. Send us your CV and tell us 
            how you'd like to contribute.
          </p>
          <Button size="lg" variant="outline" asChild>
            <a href="mailto:careers@klarvo.io">
              Send Your CV
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}
