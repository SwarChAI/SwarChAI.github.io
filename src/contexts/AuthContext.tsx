import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, UserRole, ApprovalStatus } from '@/services/api/authApi';
import { userStatusEvents } from '@/lib/userStatusEvents';

interface RegisterOptions {
  userRole: UserRole;
  profileData?: Partial<User>;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, options: RegisterOptions) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (provider: 'google' | 'linkedin', userData: { email: string; name: string; avatar?: string }, userRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (profileData: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { token, user: storedUser } = authApi.getStoredAuth();
      
      if (token && storedUser) {
        const result = await authApi.validateToken(token);
        if (result.success && result.user) {
          setUser(result.user);
        } else {
          authApi.logout();
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Subscribe to user status updates from admin actions
  useEffect(() => {
    const unsubscribe = userStatusEvents.subscribe((userId, updates) => {
      if (user && user.id === userId) {
        const updatedUser: User = {
          ...user,
          approvalStatus: (updates.approvalStatus as ApprovalStatus) || user.approvalStatus,
          consultationDate: updates.consultationDate || user.consultationDate,
        };
        setUser(updatedUser);
        // Also update stored auth
        const token = localStorage.getItem('auth_token');
        if (token) {
          authApi.storeAuth(token, updatedUser);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  const login = async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    
    if (result.success && result.user && result.token) {
      authApi.storeAuth(result.token, result.user);
      setUser(result.user);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  const register = async (email: string, password: string, name: string, options: RegisterOptions) => {
    const result = await authApi.register(email, password, name);
    
    if (result.success && result.user && result.token) {
      // Set role and approval status
      const userWithRole: User = {
        ...result.user,
        userRole: options.userRole,
        approvalStatus: 'pending',
        ...options.profileData,
      };
      authApi.storeAuth(result.token, userWithRole);
      setUser(userWithRole);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  const socialLoginHandler = async (
    provider: 'google' | 'linkedin',
    userData: { email: string; name: string; avatar?: string },
    userRole: UserRole = 'mentee'
  ) => {
    const result = await authApi.socialLogin(provider, userData);
    
    if (result.success && result.user && result.token) {
      // Set role and keep pending status
      const userWithRole: User = {
        ...result.user,
        userRole,
        approvalStatus: 'pending',
      };
      authApi.storeAuth(result.token, userWithRole);
      setUser(userWithRole);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = authApi.updateUserProfile(user, profileData);
      setUser(updatedUser);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        socialLogin: socialLoginHandler,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
