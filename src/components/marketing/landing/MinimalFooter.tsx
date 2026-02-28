import { Link } from "react-router-dom";

export const MinimalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Open Digital WEB LTD trading as Klarvo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
