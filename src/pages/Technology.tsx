
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Technology = () => (
  <>
    <Navbar />
    <main className="container mx-auto pt-24 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gradient mb-6">Technology</h1>
      <p className="text-white/80 mb-8">
        Welcome to the Technology section. Here you'll find the latest updates and insights on modern tech trends, gadgets, and breakthroughs.
      </p>
      {/* Add more content or components here */}
    </main>
    <Footer />
  </>
);

export default Technology;
