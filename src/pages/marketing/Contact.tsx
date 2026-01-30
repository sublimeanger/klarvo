import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MessageSquare, 
  Building2,
  Clock,
  CheckCircle2,
  Send,
  Headphones,
  FileQuestion,
  Handshake,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const contactOptions = [
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Get help with your account or technical issues",
    action: "support@klarvo.io",
  },
  {
    icon: Handshake,
    title: "Sales Inquiries",
    description: "Learn about pricing and enterprise plans",
    action: "sales@klarvo.io",
  },
  {
    icon: FileQuestion,
    title: "Partnership Opportunities",
    description: "Explore integration and reseller partnerships",
    action: "partners@klarvo.io",
  }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <HeroSection
        badge="Get in Touch"
        title={
          <>
            <span className="text-foreground">We're Here to</span>{" "}
            <span className="text-gradient-hero">Help</span>
          </>
        }
        subtitle="Have questions about EU AI Act compliance or our platform? Our team typically responds within 24 hours."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Contact Options */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                      <option.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    <a 
                      href={`mailto:${option.action}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group/link"
                    >
                      {option.action}
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <Card className="border-border/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle2 className="h-10 w-10 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll be in touch within 24 hours.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", company: "", subject: "", message: "" });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            className="bg-background"
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
                            className="bg-background"
                          />
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Acme Inc."
                            value={formData.company}
                            onChange={handleChange}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="General Inquiry"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="bg-background"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help..."
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-background resize-none"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full btn-premium" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Why Contact Us?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have questions about the EU AI Act, need help getting 
                  started with Klarvo, or want to discuss enterprise requirements—we're 
                  here to help you navigate AI compliance with confidence.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "Response Time", desc: "We aim to respond to all inquiries within 24 business hours." },
                  { icon: Building2, title: "Office Hours", desc: "Monday - Friday, 9:00 AM - 6:00 PM CET" },
                  { icon: Mail, title: "General Inquiries", desc: "hello@klarvo.io", isLink: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.isLink ? (
                        <a href={`mailto:${item.desc}`} className="text-primary hover:underline text-sm">
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Looking for a Demo?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        See Klarvo in action with a personalized walkthrough from our team.
                      </p>
                      <Button size="sm" asChild>
                        <Link to="/demo">
                          Book a Demo
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
