
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatsOverview from '@/components/admin/StatsOverview';
import AdminSkeleton from '@/components/admin/AdminSkeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    categories: 0
  });

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: recentPosts, isLoading: recentPostsLoading } = useQuery({
    queryKey: ['recent-posts'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  useEffect(() => {
    if (postsData) {
      setStats({
        totalPosts: postsData.length,
        publishedPosts: postsData.filter(post => post.status === 'published').length,
        draftPosts: postsData.filter(post => post.status === 'draft').length,
        categories: categoriesData?.length || 0
      });
    }
  }, [postsData, categoriesData]);

  const isLoading = postsLoading || categoriesLoading || recentPostsLoading;

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <AdminSkeleton type="dashboard" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <StatsOverview 
        totalPosts={stats.totalPosts} 
        publishedPosts={stats.publishedPosts}
        draftPosts={stats.draftPosts}
        categories={stats.categories}
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
          <Button variant="ghost" asChild>
            <Link to="/admin/posts" className="text-gray-300 hover:text-white">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Title</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Category</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Date</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentPosts?.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-white">{post.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{post.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        post.status === 'published' 
                          ? 'bg-green-400/10 text-green-400' 
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          asChild
                          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <Link to={`/post/${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          asChild
                          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <Link to={`/admin/posts/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!recentPosts || recentPosts.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                      No posts found. <Link to="/admin/posts/create" className="text-blue-400 hover:underline">Create your first post</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
