
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <>
    <Navbar />
    <main className="container mx-auto pt-24 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gradient mb-6">About</h1>
      <p className="text-white/80 mb-8">
        Obsidian Ink Flow is your go-to tech blog for the latest on programming, AI, cybersecurity and more. Built for enthusiasts and professionals alike.
      </p>
      {/* Add more about section details here */}
    </main>
    <Footer />
  </>
);

export default About;
