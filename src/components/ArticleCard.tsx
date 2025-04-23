
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug?: string;
}

const ArticleCard = ({
  title,
  excerpt,
  imageUrl,
  category,
  author,
  date,
  readTime,
  slug = "quantum-computing",
}: ArticleCardProps) => {
  return (
    <Link to={`/post/${slug}`} className="block">
      <div className="glass-panel overflow-hidden hover-lift group h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge 
            className="absolute top-3 left-3 bg-blog-accent text-white border-none"
          >
            {category}
          </Badge>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-medium text-gradient mb-2 line-clamp-2">{title}</h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/60">
              <span className="mr-3">{author}</span>
              <span className="mr-3">•</span>
              <span className="mr-3">{date}</span>
              <span className="mr-3">•</span>
              <span>{readTime}</span>
            </div>
            <ArrowRight size={16} className="text-blog-accent transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
