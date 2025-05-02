
import { useState } from "react";
import { Menu, X, Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "/technology" },
    { name: "Programming", href: "/programming" },
    { name: "Cybersecurity", href: "/cybersecurity" },
    { name: "AI", href: "/ai" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-blog-dark-1/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gradient">the Glitch report</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
              <Moon size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/80 hover:text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blog-dark-2 border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
