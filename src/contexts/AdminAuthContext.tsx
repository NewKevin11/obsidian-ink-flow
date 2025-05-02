
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AdminAuthContextType = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  isAdmin: false,
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          toast.error('Authentication error');
          return;
        }
        
        if (data?.session) {
          setSession(data.session);
          // Check if user has admin role
          const { data: userData, error: userError } = await supabaseClient
            .from('admin_users')
            .select('*')
            .eq('user_id', data.session.user.id)
            .single();
            
          if (!userError && userData) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Session retrieval error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          const { data, error } = await supabaseClient
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          setIsAdmin(!error && !!data);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabaseClient
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user?.id)
        .single();

      if (adminError || !adminData) {
        toast.error('Not authorized as admin');
        await supabaseClient.auth.signOut();
        return;
      }

      toast.success('Signed in successfully');
      setIsAdmin(true);
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      await supabaseClient.auth.signOut();
      toast.success('Signed out successfully');
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        loading,
        signIn,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
