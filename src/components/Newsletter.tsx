
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      // In a real app, you'd handle the newsletter signup here
    }
  };

  return (
    <div className="glass-panel p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-medium text-gradient mb-3">
        Subscribe to our Newsletter
      </h3>
      <p className="text-white/70 mb-6">
        Get the latest tech insights delivered straight to your inbox. No spam, unsubscribe anytime.
      </p>

      {isSubmitted ? (
        <div className="flex items-center justify-center space-x-2 py-4 text-blog-accent">
          <CheckCircle size={20} />
          <span>Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-blog-dark-3 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-blog-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit"
            className="bg-gradient-button hover:bg-blog-accent-hover text-white"
          >
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
