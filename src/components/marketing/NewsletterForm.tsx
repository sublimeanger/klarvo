import { useState, forwardRef } from "react";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterFormProps {
  source: string;
  variant?: "inline" | "stacked" | "compact";
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export const NewsletterForm = forwardRef<HTMLFormElement, NewsletterFormProps>(
  function NewsletterForm(
    {
      source,
      variant = "inline",
      placeholder = "Enter your email",
      buttonText = "Subscribe",
      className = "",
    },
    ref
  ) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate email
      const result = emailSchema.safeParse(email);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      setIsLoading(true);

      try {
        const { error } = await supabase
          .from("newsletter_subscribers")
          .insert({ email: email.trim().toLowerCase(), source });

        if (error) {
          if (error.code === "23505") {
            // Unique constraint violation - already subscribed
            toast.info("You're already subscribed!");
            setIsSuccess(true);
          } else {
            throw error;
          }
        } else {
          toast.success("Thanks for subscribing!");
          setIsSuccess(true);
          setEmail("");
        }
      } catch (error) {
        logger.error("Newsletter signup error:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isSuccess) {
      return (
        <div className={`flex items-center gap-2 text-success ${className}`}>
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">You're subscribed!</span>
        </div>
      );
    }

    if (variant === "stacked") {
      return (
        <form ref={ref} onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-11 bg-background"
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full btn-premium" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      );
    }

    if (variant === "compact") {
      return (
        <form ref={ref} onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 text-sm bg-background"
            disabled={isLoading}
            required
          />
          <Button type="submit" size="sm" className="btn-premium shrink-0" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
          </Button>
        </form>
      );
    }

    // Default: inline variant
    return (
      <form ref={ref} onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1 sm:max-w-[280px]">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 rounded-xl border-2 focus:border-primary bg-background"
            disabled={isLoading}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="h-11 px-5 rounded-xl font-semibold group" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>
    );
  }
);
