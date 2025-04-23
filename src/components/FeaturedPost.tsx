
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug?: string;
}

const FeaturedPost = ({
  title,
  excerpt,
  imageUrl,
  category,
  author,
  date,
  readTime,
  slug = "quantum-computing",
}: FeaturedPostProps) => {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
        <Badge className="bg-blog-accent text-white border-none mb-4">
          {category}
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-shadow mb-4 max-w-2xl">
          {title}
        </h1>
        <p className="text-white/80 text-lg mb-6 max-w-2xl">
          {excerpt}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button className="bg-gradient-button hover:bg-blog-accent-hover text-white w-fit" asChild>
            <Link to={`/post/${slug}`}>Read Article</Link>
          </Button>
          
          <div className="flex items-center space-x-6 text-white/70">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="text-sm">{author}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{readTime}</span>
            </div>
            <div>
              <span className="text-sm">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
