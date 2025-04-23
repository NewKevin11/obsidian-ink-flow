
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cybersecurity = () => (
  <>
    <Navbar />
    <main className="container mx-auto pt-24 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gradient mb-6">Cybersecurity</h1>
      <p className="text-white/80 mb-8">
        Stay updated on cybersecurity news, threats, tips, and best practices to keep you and your data safe.
      </p>
      {/* Add more content or components here */}
    </main>
    <Footer />
  </>
);

export default Cybersecurity;
