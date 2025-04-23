
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Programming = () => (
  <>
    <Navbar />
    <main className="container mx-auto pt-24 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gradient mb-6">Programming</h1>
      <p className="text-white/80 mb-8">
        Dive into Programming tutorials, tips, and discussions covering all your favorite languages and frameworks.
      </p>
      {/* Add more content or components here */}
    </main>
    <Footer />
  </>
);

export default Programming;
