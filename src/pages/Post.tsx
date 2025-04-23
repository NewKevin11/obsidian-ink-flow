
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";

const Post = () => {
  const { slug } = useParams();

  useEffect(() => {
    document.title = "Reading Article | Obsidian Ink Flow";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <a href="/" className="text-white/60 hover:text-white flex items-center">
            <ChevronLeft size={16} className="mr-1" /> Back to Home
          </a>
        </div>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-blog-accent text-white border-none">Technology</Badge>
            <span className="text-white/60">April 20, 2025</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gradient mb-6">
            The Evolution of Quantum Computing: From Theory to Reality
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Dr. Sarah Chen</p>
                <p className="text-white/60 text-sm">Quantum Physics Researcher</p>
              </div>
            </div>
            
            <div className="flex items-center text-white/60">
              <Clock size={16} className="mr-1" />
              <span>8 min read</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="w-full h-[400px] md:h-[500px] mb-10 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
            alt="Quantum Computing" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 prose prose-invert max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Quantum computing stands at a pivotal moment in its development, transitioning from theoretical concepts to practical applications that could revolutionize how we process information and solve complex problems.
            </p>
            
            <h2>The Quantum Leap Forward</h2>
            <p>
              The year 2025 has witnessed remarkable advancements in quantum computing hardware. Researchers have successfully maintained quantum coherence for unprecedented periods, allowing for more complex calculations before decoherence disrupts the quantum state.
            </p>
            <p>
              Major tech companies and specialized quantum startups have been racing to increase the number of stable qubits in their systems. While classical computers process information in bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously thanks to the principles of superposition.
            </p>
            
            <h2>Practical Applications Emerging</h2>
            <p>
              While universal quantum computers capable of solving any problem remain years away, specialized quantum systems are already demonstrating value in specific domains:
            </p>
            <ul>
              <li>
                <strong>Cryptography:</strong> Quantum-resistant encryption algorithms are being developed as protection against future quantum computers that could break current encryption methods.
              </li>
              <li>
                <strong>Material Science:</strong> Researchers are using quantum computers to simulate molecular structures with unprecedented accuracy, potentially leading to breakthroughs in materials for batteries, solar cells, and pharmaceuticals.
              </li>
              <li>
                <strong>Optimization Problems:</strong> From supply chain management to financial portfolio optimization, quantum algorithms are showing promise for problems with vast solution spaces.
              </li>
            </ul>
            
            <h2>Challenges on the Quantum Frontier</h2>
            <p>
              Despite progress, significant challenges remain. Error correction continues to be a major hurdle, as quantum systems are inherently prone to noise and decoherence. Building quantum computers that can operate at scale requires maintaining quantum states in environments that are precisely controlled.
            </p>
            <p>
              The "quantum advantage" – the point at which quantum computers can solve problems that classical computers cannot – has been demonstrated only for highly specialized tasks. Expanding this advantage to more practical applications represents the next frontier.
            </p>
            
            <blockquote>
              "We're witnessing the transition from quantum computing as a laboratory curiosity to an emerging technology with real-world applications. The pace of advancement suggests we'll see quantum computing impact various industries within this decade."
              <cite>— Dr. Maria Rodriguez, Quantum Computing Researcher</cite>
            </blockquote>
            
            <h2>The Road Ahead</h2>
            <p>
              As quantum hardware continues to improve, the focus is increasingly shifting to developing quantum algorithms and software that can harness this computational power. A growing ecosystem of quantum programming languages, simulation tools, and cloud-based quantum computing services is making the technology more accessible to researchers and developers.
            </p>
            <p>
              Education and workforce development in quantum computing are also gaining attention, with universities and online platforms offering courses and degrees in quantum information science and engineering.
            </p>
            
            <h2>Conclusion</h2>
            <p>
              Quantum computing has moved beyond the realm of theoretical physics into engineering reality. While we're still in the early stages of this technological revolution, the trajectory is clear: quantum systems will eventually solve certain problems that have remained intractable for classical computers.
            </p>
            <p>
              For businesses and organizations, now is the time to begin understanding quantum computing's potential impact and to develop strategies that can leverage its capabilities as the technology matures. The quantum future isn't just coming—it's already beginning to take shape.
            </p>
          </div>
          
          <div className="lg:col-span-4">
            {/* Share and Save */}
            <div className="glass-panel p-6 mb-8">
              <h3 className="font-medium mb-4">Share this article</h3>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blog-dark-3 hover:bg-blog-dark-4 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blog-dark-3 hover:bg-blog-dark-4 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blog-dark-3 hover:bg-blog-dark-4 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blog-dark-3 hover:bg-blog-dark-4 transition-colors">
                  <Share2 size={18} />
                </a>
              </div>
              <button className="flex items-center text-white/80 hover:text-white">
                <Bookmark size={18} className="mr-2" />
                Save for later
              </button>
            </div>
            
            {/* Newsletter Signup */}
            <Newsletter />
            
            {/* Related Tags */}
            <div className="glass-panel p-6 mt-8">
              <h3 className="font-medium mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blog-dark-3 hover:bg-blog-dark-4 text-white/80">Quantum Computing</Badge>
                <Badge className="bg-blog-dark-3 hover:bg-blog-dark-4 text-white/80">Technology</Badge>
                <Badge className="bg-blog-dark-3 hover:bg-blog-dark-4 text-white/80">Computer Science</Badge>
                <Badge className="bg-blog-dark-3 hover:bg-blog-dark-4 text-white/80">Physics</Badge>
                <Badge className="bg-blog-dark-3 hover:bg-blog-dark-4 text-white/80">Future Tech</Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Post;
