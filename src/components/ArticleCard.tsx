
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
    <Link to={`/post/${slug}`} className="block group">
      <div
        className="glass-panel overflow-hidden hover-lift h-full relative
        transition-all duration-300
        before:pointer-events-none
        before:absolute before:inset-0 before:rounded-xl
        before:opacity-0
        before:transition-all before:duration-300
        before:z-10
        group-hover:before:opacity-100
        group-hover:before:ring-2
        before:ring-0
        group-hover:before:ring-4
        before:ring-transparent
        group-hover:before:ring-transparent
        group-hover:before:border-gradient-orange"
        style={{
          // The before pseudo-element doesn't support gradients fully in Tailwind, so we use a background-image hack.
          // But since we use Tailwind for everything else, we inject this here for the orange gradient effect.
        }}
      >
        <style>
          {`
          .group:hover .border-gradient-orange::before {
            background: linear-gradient(90deg, #FEC6A1 0%, #F97316 100%);
            opacity: 1;
            box-shadow: 0 0 0 4px #f9731680, 0 2px 20px 0 #f9731620;
            transition: opacity 0.3s, box-shadow 0.3s;
          }
          .border-gradient-orange::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 0.75rem;
            pointer-events: none;
            background: linear-gradient(90deg, #FEC6A1 0%, #F97316 100%);
            opacity: 0;
            transition: opacity 0.3s, box-shadow 0.3s;
            z-index: 10;
          }
          `}
        </style>
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
