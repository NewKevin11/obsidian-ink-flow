
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Eye, Clock, BarChart } from 'lucide-react';

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
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-cyan-400/20 p-3">
              <FileText className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Posts</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalPosts}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-green-400/20 p-3">
              <Eye className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Published</p>
              <h3 className="text-2xl font-bold text-white">{stats.publishedPosts}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-yellow-400/20 p-3">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Drafts</p>
              <h3 className="text-2xl font-bold text-white">{stats.draftPosts}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-purple-400/20 p-3">
              <BarChart className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Categories</p>
              <h3 className="text-2xl font-bold text-white">{stats.categories}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-semibold text-white">Recent Posts</h2>
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Title</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Category</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-400">Date</th>
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
                  </tr>
                ))}
                {recentPosts?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                      No posts found
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
