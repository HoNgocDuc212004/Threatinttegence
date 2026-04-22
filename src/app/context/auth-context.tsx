import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  role: 'admin' | 'user';
}

interface StoredUser {
  email: string;
  password: string;
  phone?: string;
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

// Tài khoản admin cố định
const ADMIN_ACCOUNT = {
  email: 'admin',
  password: '123234345',
  role: 'admin' as const,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getRegisteredUsers = (): StoredUser[] => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUsers = (users: StoredUser[]) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Kiểm tra admin
      if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
        const adminUser: User = {
          id: 'admin-001',
          email: ADMIN_ACCOUNT.email,
          role: 'admin',
        };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return;
      }

      // Kiểm tra user đã đăng ký
      const users = getRegisteredUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const loggedInUser: User = {
        id: Math.random().toString(36).substring(7),
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role,
      };

      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, phone?: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Kiểm tra email đã tồn tại
      const users = getRegisteredUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('Email đã được đăng ký');
      }

      // Tạo user mới với role = user
      const newUser: StoredUser = {
        email,
        password,
        phone,
        role: 'user',
      };

      // Lưu vào danh sách users
      users.push(newUser);
      saveRegisteredUsers(users);

      // Đăng nhập luôn
      const loggedInUser: User = {
        id: Math.random().toString(36).substring(7),
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      };

      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
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
