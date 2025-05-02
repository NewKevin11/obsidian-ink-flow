
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Technology from "./pages/Technology";
import Programming from "./pages/Programming";
import Cybersecurity from "./pages/Cybersecurity";
import AI from "./pages/AI";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminCreatePost from "./pages/admin/AdminCreatePost";
import AdminLayout from "./components/admin/AdminLayout";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminAuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-main text-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/programming" element={<Programming />} />
              <Route path="/cybersecurity" element={<Cybersecurity />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:slug" element={<Post />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="posts/create" element={<AdminCreatePost />} />
                <Route path="posts/edit/:id" element={<AdminEditPost />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
