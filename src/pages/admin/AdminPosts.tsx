
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { Skeleton } from '@/components/ui/skeleton';

type Post = {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  author: string;
};

const AdminPosts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting post: ${error.message}`);
    }
  });

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePost = () => {
    if (deletePostId) {
      deletePostMutation.mutate(deletePostId);
      setDeletePostId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeletePostId(id);
  };

  const closeDeleteDialog = () => {
    setDeletePostId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
            <p className="text-sm text-gray-400">Manage all your blog posts</p>
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        <Skeleton className="h-12 w-full max-w-sm mb-6" />

        <div className="rounded-md border border-gray-700 bg-gray-800">
          <div className="p-4">
            <div className="grid gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-sm text-gray-400">Manage all your blog posts</p>
        </div>
        
        <Button 
          onClick={() => navigate('/admin/posts/create')}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <div className="rounded-md border border-gray-700 bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800 border-gray-700">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Author</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-gray-700/50 border-gray-700">
                  <TableCell className="font-medium text-white">{post.title}</TableCell>
                  <TableCell className="text-gray-300">{post.category}</TableCell>
                  <TableCell className="text-gray-300">{post.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      post.status === 'published' 
                        ? 'bg-green-400/10 text-green-400' 
                        : 'bg-yellow-400/10 text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        <Link to={`/post/${post.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-destructive hover:bg-gray-700"
                        onClick={() => openDeleteDialog(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                  {searchTerm ? 'No matching posts found' : 'No posts found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmationDialog
        open={!!deletePostId}
        onOpenChange={() => closeDeleteDialog()}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the post."
        onConfirm={handleDeletePost}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default AdminPosts;
