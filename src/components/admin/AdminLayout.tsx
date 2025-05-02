
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const { isAdmin, loading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-cyan-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Blog Posts', path: '/admin/posts', icon: <FileText size={20} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentPath = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h2 className="text-xl font-bold text-cyan-400">Admin Dashboard</h2>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentPath(item.path)
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
                {currentPath(item.path) && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-700 p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-300 hover:text-white"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content header */}
        <header className="bg-gray-800 shadow-md">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-white">
                {location.pathname === '/admin' && 'Dashboard'}
                {location.pathname.startsWith('/admin/posts') && 'Blog Posts Management'}
              </h1>
            </div>
          </div>
        </header>

        {/* Main content body */}
        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
