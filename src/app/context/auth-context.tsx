import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Admin nếu email có "admin", còn lại là user
      const isAdmin = email.toLowerCase().includes('admin');

      const mockUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        role: isAdmin ? 'admin' : 'user',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, phone?: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Admin nếu email có "admin", còn lại là user
      const isAdmin = email.toLowerCase().includes('admin');

      const mockUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        phone,
        role: isAdmin ? 'admin' : 'user',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
