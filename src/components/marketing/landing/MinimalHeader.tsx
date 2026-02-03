import { Link } from "react-router-dom";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.svg";

export const MinimalHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <img
            src={klarvoLogo}
            alt="Klarvo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  );
};
