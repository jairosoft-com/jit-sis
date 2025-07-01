'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'Administrator' | 'Admissions Officer' | 'Data Entry Clerk' | 'Teacher' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the session/token with your backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would make an API call to your backend
      // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // const userData = await response.json();
      
      // Mock login for demonstration - in a real app, this would come from your API
      let mockUser: User;
      
      // Different mock users for testing different roles
      if (email === 'admin@jit.edu.ph' && password === 'admin') {
        mockUser = {
          id: '1',
          name: 'Admin User',
          email,
          role: 'Administrator',
          avatar: '/avatars/admin.png'
        };
      } else if (email === 'officer@jit.edu.ph' && password === 'officer') {
        mockUser = {
          id: '2',
          name: 'Admissions Officer',
          email,
          role: 'Admissions Officer',
          avatar: '/avatars/officer.png'
        };
      } else if (email === 'clerk@jit.edu.ph' && password === 'clerk') {
        mockUser = {
          id: '3',
          name: 'Data Entry Clerk',
          email,
          role: 'Data Entry Clerk',
          avatar: '/avatars/clerk.png'
        };
      } else {
        throw new Error('Invalid email or password');
      }

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Always redirect to dashboard after successful login
      router.push('/dashboard');
      router.refresh(); // Ensure the page updates with the new auth state
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
    router.refresh(); // Ensure the page updates with the new auth state
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
