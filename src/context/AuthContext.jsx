import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Default to guest (null)
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('codexa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('codexa_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin') || email === DEMO_ADMIN.email) {
      setUser(DEMO_ADMIN);
      return { success: true, user: DEMO_ADMIN };
    }
    const clientUser = {
      name: email.split('@')[0],
      email: email,
      role: 'client',
      avatar: DEMO_CLIENT.avatar
    };
    setUser(clientUser);
    return { success: true, user: clientUser };
  };

  const loginAsAdminDemo = () => {
    setUser(DEMO_ADMIN);
  };

  const loginAsClientDemo = () => {
    setUser(DEMO_CLIENT);
  };

  const register = (name, email, password) => {
    const newUser = {
      name,
      email,
      role: 'client',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
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
