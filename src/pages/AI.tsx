
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AI = () => (
  <>
    <Navbar />
    <main className="container mx-auto pt-24 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gradient mb-6">Artificial Intelligence</h1>
      <p className="text-white/80 mb-8">
        Explore the world of AI, machine learning, deep learning, and more—see what's changing the future.
      </p>
      {/* Add more content or components here */}
    </main>
    <Footer />
  </>
);

export default AI;
