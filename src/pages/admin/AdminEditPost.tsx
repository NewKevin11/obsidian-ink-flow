
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@/lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import PostEditor from '@/components/admin/PostEditor';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  status: z.string().min(1, 'Status is required'),
  readTime: z.string().min(1, 'Read time is required'),
});

type PostFormValues = z.infer<typeof postSchema>;

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      category: '',
      author: '',
      status: '',
      readTime: '',
    },
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl,
        category: post.category,
        author: post.author,
        status: post.status,
        readTime: post.readTime,
      });
    }
  }, [post, form]);

  const updatePostMutation = useMutation({
    mutationFn: async (values: PostFormValues) => {
      if (!id) throw new Error('Post ID is required');
      
      const { error } = await supabaseClient
        .from('posts')
        .update({
          ...values,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
    onError: (error) => {
      toast.error(`Error updating post: ${error.message}`);
    },
  });

  const onSubmit = (values: PostFormValues) => {
    updatePostMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/posts')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Button>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Post</h1>
        <p className="text-sm text-gray-400">Update your blog post information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Post title" 
                      className="bg-gray-700 border-gray-600 text-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories?.map(category => (
                        <SelectItem 
                          key={category.id} 
                          value={category.name}
                          className="text-white hover:bg-gray-700"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Author</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Author name" 
                      className="bg-gray-700 border-gray-600 text-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="published" className="text-white hover:bg-gray-700">Published</SelectItem>
                      <SelectItem value="draft" className="text-white hover:bg-gray-700">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      className="bg-gray-700 border-gray-600 text-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Read Time</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="5 min read" 
                      className="bg-gray-700 border-gray-600 text-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the post" 
                    className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Content</FormLabel>
                <FormControl>
                  <PostEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              onClick={() => navigate('/admin/posts')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              disabled={updatePostMutation.isPending}
            >
              {updatePostMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminEditPost;
