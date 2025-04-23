
import { Youtube, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-gradient mb-4">Obsidian Ink Flow</h2>
            <p className="text-white/70 mb-4 max-w-md">
              Deep dive into the latest tech trends, programming insights, and digital innovation. 
              Expert analysis for developers and tech enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-white/70 hover:text-white transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://www.youtube.com" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured Posts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Programming</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-white/10 text-sm text-white/50 flex flex-col md:flex-row justify-between">
          <p>© 2025 Obsidian Ink Flow. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
