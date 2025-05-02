
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 min-h-[70vh] text-white">
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Contact Us
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-8">
            Have a question, feedback, or want to collaborate? Feel free to reach out to us using the form below.
          </p>
        </section>

        <div className="max-w-2xl mx-auto bg-blog-dark-1/50 backdrop-blur-md p-6 rounded-lg border border-white/10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-blog-dark-2 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-blog-dark-2 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
                className="bg-blog-dark-2 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Message</Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                className="w-full h-32 px-3 py-2 bg-blog-dark-2 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <section className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Other Ways to Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-white/80">hello@obsidianinkflow.com</p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
              <p className="text-white/80">Follow us on Twitter, LinkedIn, and GitHub</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
