
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import FeaturedPost from "@/components/FeaturedPost";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Change page title
  useEffect(() => {
    document.title = "Obsidian Ink Flow | The Tech Blog";
  }, []);

  // Sample featured post data
  const featuredPost = {
    title: "The Evolution of Quantum Computing: From Theory to Reality",
    excerpt: "Exploring the latest advancements in quantum computing and how they're reshaping our technological landscape.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    category: "Quantum Computing",
    author: "Dr. Sarah Chen",
    date: "April 20, 2025",
    readTime: "8 min read"
  };

  // Sample articles data
  const articles = [
    {
      title: "The Rise of Rust: Why Developers Are Making the Switch",
      excerpt: "Discover why Rust continues to gain popularity and how it addresses memory safety issues that have plagued C and C++.",
      imageUrl: "https://images.unsplash.com/photo-1616469829581-73993eb86b02",
      category: "Programming",
      author: "Alex Johnson",
      date: "April 18, 2025",
      readTime: "6 min read"
    },
    {
      title: "AI Ethics: Navigating the Moral Complexities of Machine Learning",
      excerpt: "As AI systems become more powerful, the ethical challenges they present grow more complex. How do we ensure AI development remains beneficial?",
      imageUrl: "https://images.unsplash.com/photo-1677442135130-1ce979dd2c25",
      category: "AI",
      author: "Maya Williams",
      date: "April 15, 2025",
      readTime: "9 min read"
    },
    {
      title: "Web Assembly: The Future of Browser-Based Applications",
      excerpt: "WebAssembly is changing how we think about performance in the browser. Learn how this technology is enabling complex applications on the web.",
      imageUrl: "https://images.unsplash.com/photo-1617042375876-a13e36732a04",
      category: "Web Development",
      author: "Carlos Rodriguez",
      date: "April 12, 2025",
      readTime: "7 min read"
    },
    {
      title: "Zero-Day Exploits: How Companies Are Improving Response Times",
      excerpt: "Recent improvements in cybersecurity practices have dramatically reduced the impact of zero-day vulnerabilities. Here's how it's happening.",
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
      category: "Cybersecurity",
      author: "Elena Petrova",
      date: "April 10, 2025",
      readTime: "5 min read"
    },
    {
      title: "The Silent Revolution of Edge Computing",
      excerpt: "Edge computing is transforming how data is processed and delivered. Discover the real-world applications already in use today.",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
      category: "Technology",
      author: "James Wilson",
      date: "April 8, 2025",
      readTime: "6 min read"
    },
    {
      title: "Neural Networks Explained: A Deep Dive for Non-Experts",
      excerpt: "Breaking down the complexity of neural networks into understandable concepts for those without a technical background.",
      imageUrl: "https://images.unsplash.com/photo-1501526029524-a8ea952b15be",
      category: "AI",
      author: "Priya Sharma",
      date: "April 5, 2025",
      readTime: "10 min read"
    }
  ];

  // Popular categories
  const categories = [
    "Programming", "AI", "Cybersecurity", "Web Development", 
    "Data Science", "DevOps", "Cloud Computing", "Blockchain"
  ];

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <section className="mt-16 mb-20 animate-fade-in">
          <FeaturedPost {...featuredPost} />
        </section>

        {/* Latest Articles Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium text-gradient">Latest Articles</h2>
            <Button variant="link" className="text-blog-accent flex items-center">
              View All <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-20">
          <Newsletter />
        </section>

        {/* Categories Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-medium text-gradient mb-8">Popular Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <a 
                key={index} 
                href={`#${category.toLowerCase().replace(' ', '-')}`}
                className="glass-panel px-5 py-2 text-white/80 hover:text-white hover-lift"
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        {/* Trending Articles */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium text-gradient">Trending This Week</h2>
            <Button variant="link" className="text-blog-accent flex items-center">
              View All <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(3, 6).map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
