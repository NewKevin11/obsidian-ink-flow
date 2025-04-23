
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 pt-28 pb-16 min-h-screen">
      <h1 className="text-3xl font-semibold text-gradient mb-6">Contact Us</h1>
      <p className="text-white/70 mb-8 max-w-xl">
        Reach out for questions, collaboration, or feedback.<br />
        We'd love to hear from you!
      </p>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Mail className="mr-3 text-blog-accent" />
          <span className="text-white/90">contact@obsidianinkflow.com</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-3 text-blog-accent" />
          <span className="text-white/90">+1 (234) 567-8901</span>
        </div>
      </div>
      <form className="bg-gray-900 bg-opacity-30 rounded-xl p-8 max-w-lg shadow-lg glass-panel">
        <label className="block mb-2 text-white/80 font-medium" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="w-full mb-4 px-4 py-2 rounded bg-gray-950 border border-white/10 text-white placeholder:text-white/40"
          placeholder="Your name"
          required
        />
        <label className="block mb-2 text-white/80 font-medium" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="w-full mb-4 px-4 py-2 rounded bg-gray-950 border border-white/10 text-white placeholder:text-white/40"
          placeholder="your@email.com"
          required
        />
        <label className="block mb-2 text-white/80 font-medium" htmlFor="message">Message</label>
        <textarea
          id="message"
          className="w-full mb-6 px-4 py-2 rounded bg-gray-950 border border-white/10 text-white placeholder:text-white/40 resize-none"
          placeholder="Type your message here..."
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blog-accent hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded transition focus-visible:outline-none"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
