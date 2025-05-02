
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { FileText, Users, Clock, BarChart } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';

interface StatsOverviewProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  categories: number;
}

const StatsOverview = ({ totalPosts, publishedPosts, draftPosts, categories }: StatsOverviewProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Posts" 
        value={totalPosts} 
        icon={FileText}
        iconColor="text-cyan-400"
        iconBgColor="bg-cyan-400/20"
      />
      
      <StatsCard 
        title="Published" 
        value={publishedPosts} 
        icon={Clock}
        iconColor="text-green-400"
        iconBgColor="bg-green-400/20"
      />
      
      <StatsCard 
        title="Drafts" 
        value={draftPosts} 
        icon={Clock}
        iconColor="text-yellow-400"
        iconBgColor="bg-yellow-400/20"
      />
      
      <StatsCard 
        title="Categories" 
        value={categories} 
        icon={BarChart}
        iconColor="text-purple-400"
        iconBgColor="bg-purple-400/20"
      />
    </div>
  );
};

export default StatsOverview;
