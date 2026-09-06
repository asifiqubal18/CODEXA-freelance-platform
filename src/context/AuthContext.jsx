import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

export const DEMO_ADMIN = {
  name: 'Asif Iqubal (Admin)',
  email: 'admin@codexa.io',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

export const DEMO_CLIENT = {
  name: 'Sarah Connor (Client)',
  email: 'client@example.com',
  role: 'client',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('codexa_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync Supabase Auth Listener if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Check current session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchUserProfile(session.user);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          fetchUserProfile(session.user);
        } else {
          // If signed out from Supabase but not in demo mode
          if (user && !user.isDemo) {
            setUser(null);
          }
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchUserProfile = async (sbUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sbUser.id)
        .single();

      if (!error && data) {
        const uObj = {
          id: sbUser.id,
          name: data.name || sbUser.email.split('@')[0],
          email: sbUser.email,
          role: data.role || 'client',
          avatar: data.avatar || DEMO_CLIENT.avatar,
          isDemo: false
        };
        setUser(uObj);
      } else {
        const fallback = {
          id: sbUser.id,
          name: sbUser.email.split('@')[0],
          email: sbUser.email,
          role: sbUser.email.includes('admin') ? 'admin' : 'client',
          avatar: DEMO_CLIENT.avatar,
          isDemo: false
        };
        setUser(fallback);
      }
    } catch (e) {
      console.error('Error fetching Supabase profile:', e);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('codexa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('codexa_user');
    }
  }, [user]);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Fallback demo check if Supabase login fails or for local demo credentials
        if (email.toLowerCase().includes('admin') || email === DEMO_ADMIN.email) {
          setUser({ ...DEMO_ADMIN, isDemo: true });
          return { success: true, user: DEMO_ADMIN };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchUserProfile(data.user);
        return { success: true, user: data.user };
      }
    }

    // Default Fallback Login
    if (email.toLowerCase().includes('admin') || email === DEMO_ADMIN.email) {
      const adminUser = { ...DEMO_ADMIN, isDemo: true };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }

    const clientUser = {
      name: email.split('@')[0],
      email: email,
      role: 'client',
      avatar: DEMO_CLIENT.avatar,
      isDemo: true
    };
    setUser(clientUser);
    return { success: true, user: clientUser };
  };

  const loginAsAdminDemo = () => {
    setUser({ ...DEMO_ADMIN, isDemo: true });
  };

  const loginAsClientDemo = () => {
    setUser({ ...DEMO_CLIENT, isDemo: true });
  };

  const register = async (name, email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: 'client' }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const newUser = {
        name,
        email,
        role: 'client',
        avatar: DEMO_CLIENT.avatar,
        isDemo: false
      };
      setUser(newUser);
      return { success: true, user: newUser };
    }

    const newUser = {
      name,
      email,
      role: 'client',
      avatar: DEMO_CLIENT.avatar,
      isDemo: true
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase && !user?.isDemo) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isClient,
        isSupabaseConfigured,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        loginAsAdminDemo,
        loginAsClientDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
