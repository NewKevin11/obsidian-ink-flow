import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      {/* Header Section */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-28 pb-16 min-h-screen">
        <h1 className="text-3xl font-semibold text-gradient mb-6">Contact Us</h1>
        <p className="text-white/70 mb-8 max-w-xl">
          Reach out for questions, collaboration, or feedback.<br />
          We'd love to hear from you!
        </p>

        {/* Contact Information */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Mail className="mr-3 text-blog-accent" />
            <span className="text-white/90">contact@obsidianinkflow.com</span>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="mr-3 text-blog-accent" />
            <span className="text-white/90">+1 (234) 567-8901</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="text-blog-accent hover:text-white transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="text-blog-accent hover:text-white transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-blog-accent hover:text-white transition" />
            </a>
          </div>
        </div>

        {/* Form Section */}
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
            className="w-full mb-4 px-4 py-2 rounded bg-gray-950 border border-white/10 text-white placeholder:text-white/40 resize-none"
            placeholder="Type your message here..."
            rows={5}
            required
          />
          <label className="block mb-2 text-white/80 font-medium" htmlFor="file">Attach File</label>
          <input
            type="file"
            id="file"
            className="w-full mb-6 px-4 py-2 rounded bg-gray-950 border border-white/10 text-white"
          />
          <button
            type="submit"
            className="bg-blog-accent hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded transition focus-visible:outline-none"
          >
            Send Message
          </button>
        </form>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gradient mb-4">Our Location</h2>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194154846818!3d37.77492977975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064df1c7e5b%3A0x4c8b8b8b8b8b8b8b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
            className="w-full h-64 rounded-lg border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </main>

      {/* Footer Section */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Contact;
