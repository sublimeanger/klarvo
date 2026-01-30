import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Calendar,
  Play,
  CheckCircle2,
  Clock,
  Users,
  MessageSquare,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const demoHighlights = [
  {
    icon: Shield,
    title: "Complete Platform Walkthrough",
    description: "See every feature in action, from AI system inventory to export packs."
  },
  {
    icon: MessageSquare,
    title: "Q&A with Product Experts",
    description: "Get answers to your specific compliance questions and use cases."
  },
  {
    icon: Users,
    title: "Custom Implementation Plan",
    description: "Receive a tailored roadmap for your organization's compliance journey."
  }
];

const whatYouLearn = [
  "How to inventory all your AI systems in under an hour",
  "Automated risk classification with explainable results",
  "Generating audit-ready evidence packs in one click",
  "Setting up control libraries and tracking implementation",
  "Managing vendor attestations and due diligence",
  "Training your team on AI literacy requirements"
];

export default function Demo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    aiSystemCount: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Demo request received! We'll be in touch within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Play className="h-4 w-4" />
              Book a Demo
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              See Klarvo in{" "}
              <span className="text-gradient">Action</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get a personalized walkthrough of our EU AI Act compliance platform 
              and discover how Klarvo can streamline your compliance journey.
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                30 minutes
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                1-on-1 session
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Flexible scheduling
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {demoHighlights.map((highlight, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Request Your Demo</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll schedule a personalized demo session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Demo Requested!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for your interest. Our team will reach out within 24 hours 
                        to schedule your personalized demo.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/features">
                          Explore Features
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Smith"
                            required
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@company.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Acme Inc."
                            required
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role</Label>
                          <Input
                            id="role"
                            name="role"
                            placeholder="Compliance Manager"
                            value={formData.role}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="aiSystemCount">How many AI systems do you use?</Label>
                        <select
                          id="aiSystemCount"
                          name="aiSystemCount"
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          value={formData.aiSystemCount}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="1-5">1-5 systems</option>
                          <option value="6-15">6-15 systems</option>
                          <option value="16-50">16-50 systems</option>
                          <option value="50+">50+ systems</option>
                          <option value="unsure">Not sure yet</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">What would you like to learn? (Optional)</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your compliance goals or specific questions..."
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-2 h-4 w-4" />
                            Request Demo
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* What You'll Learn */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our product experts will show you exactly how Klarvo can help 
                  your organization achieve and maintain EU AI Act compliance.
                </p>
              </div>
              
              <div className="space-y-4">
                {whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              
              <Card className="bg-primary-50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Can't wait?</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Start your free trial now and explore the platform immediately.
                      </p>
                      <Button size="sm" asChild>
                        <Link to="/auth/signup">
                          Start Free Trial
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
