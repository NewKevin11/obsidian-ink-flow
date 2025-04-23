import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 - Page Not Found | Obsidian Ink Flow";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-panel p-10 text-center max-w-md mx-4">
          <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
          <div className="w-16 h-1 bg-blog-accent mx-auto mb-6"></div>
          <h2 className="text-xl text-white mb-6">Page Not Found</h2>
          <p className="text-white/70 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Button 
            asChild 
            className="bg-gradient-button hover:bg-blog-accent-hover text-white"
          >
            <a href="/">
              <Home className="mr-2" size={16} />
              Return to Homepage
            </a>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
