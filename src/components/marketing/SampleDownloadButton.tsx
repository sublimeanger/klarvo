import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, CheckCircle2, Loader2, Mail, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { generateSampleClassificationMemoPDF } from "@/components/exports/SampleClassificationMemoPDF";
import { generateSampleFRIAReportPDF } from "@/components/exports/SampleFRIAReportPDF";
import { generateSampleEvidencePackZIP } from "@/components/exports/SampleEvidencePackGenerator";

const emailSchema = z.string().email("Please enter a valid email address");
const STORAGE_KEY = "klarvo_download_email";

type SampleType = "classification-memo" | "fria-report" | "evidence-pack";

interface SampleDownloadButtonProps {
  sampleType: SampleType;
  templateName: string;
  buttonText?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const fileNames: Record<SampleType, string> = {
  "classification-memo": "Klarvo_Sample_Classification_Memo.pdf",
  "fria-report": "Klarvo_Sample_FRIA_Report.pdf",
  "evidence-pack": "Klarvo_Sample_Evidence_Pack.zip",
};

export function SampleDownloadButton({
  sampleType,
  templateName,
  buttonText = "Download",
  buttonSize = "default",
  className = "",
}: SampleDownloadButtonProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check for previously captured email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ 
          email: email.trim().toLowerCase(), 
          source: `sample-${sampleType}` 
        });

      if (error && error.code !== "23505") {
        throw error;
      }

      // Save email to localStorage for future downloads
      localStorage.setItem(STORAGE_KEY, email.trim().toLowerCase());
      
      setIsUnlocked(true);
      toast.success("Access granted! Generating your download...");
      
      // Generate and trigger download
      setTimeout(() => {
        triggerDownload();
      }, 500);
    } catch (error) {
      logger.error("Sample gate error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerDownload = async () => {
    setIsGenerating(true);
    
    try {
      let blob: Blob;
      
      switch (sampleType) {
        case "classification-memo":
          blob = await generateSampleClassificationMemoPDF();
          break;
        case "fria-report":
          blob = await generateSampleFRIAReportPDF();
          break;
        case "evidence-pack":
          blob = await generateSampleEvidencePackZIP();
          break;
        default:
          throw new Error("Unknown sample type");
      }
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileNames[sampleType];
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Download started!");
      
      // Close dialog after download
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      logger.error("Generation error:", error);
      toast.error("Failed to generate document. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // If already unlocked (returning visitor), trigger download directly
  const handleButtonClick = () => {
    if (isUnlocked) {
      triggerDownload();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size={buttonSize} 
          className={`btn-premium ${className}`}
          onClick={handleButtonClick}
        >
          <Download className="mr-1.5 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Download {templateName}</DialogTitle>
          <DialogDescription className="text-base">
            Enter your email to unlock instant access. We'll also send you EU AI Act compliance updates.
          </DialogDescription>
        </DialogHeader>
        
        {isUnlocked ? (
          <div className="py-8 text-center">
            {isGenerating ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Generating Document...</h3>
                <p className="text-muted-foreground text-sm">
                  Please wait while we create your {templateName}
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Download Complete!</h3>
                <p className="text-muted-foreground text-sm">
                  Check your downloads folder for {fileNames[sampleType]}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={triggerDownload}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  Download Again
                </Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11"
                disabled={isLoading}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-premium h-11" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Get Free Download
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No spam, unsubscribe anytime. By downloading, you agree to receive occasional updates.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
