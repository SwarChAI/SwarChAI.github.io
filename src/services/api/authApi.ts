import { API_CONFIG } from './config';
import { validateDemoLogin } from '@/data/demoAccounts';

export type UserRole = 'mentor' | 'mentee' | 'admin';
export type ApprovalStatus = 'pending' | 'consultation_scheduled' | 'approved' | 'rejected';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  userRole: UserRole;
  approvalStatus: ApprovalStatus;
  provider?: 'email' | 'google' | 'linkedin';
  profileComplete?: boolean;
  consultationDate?: string;
  linkedIn?: string;
  currentRole?: string;
  targetRole?: string;
  industry?: string;
  experience?: string;
  goals?: string[];
  bio?: string;
  company?: string;
  expertise?: string;
  motivation?: string;
  availability?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// WordPress JWT Authentication
// Requires JWT Authentication for WP REST API plugin
export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    // Check for demo account first
    const demoAccount = validateDemoLogin(email, password);
    if (demoAccount) {
      const token = `demo_${demoAccount.user.userRole}_${Date.now()}`;
      return {
        success: true,
        user: demoAccount.user,
        token,
      };
    }

    try {
      const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Login failed',
        };
      }

      const user: User = {
        id: data.user_id,
        email: data.user_email,
        name: data.user_display_name,
        avatar: data.user_avatar,
        userRole: data.user_role || 'mentee',
        approvalStatus: data.approval_status || 'pending',
      };

      return {
        success: true,
        user,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }
  },

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      // WordPress user registration endpoint
      // Requires custom endpoint or plugin like WP REST User
      const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username: email,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Registration failed',
        };
      }

      // Auto-login after registration
      return await authApi.login(email, password);
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }
  },

  async validateToken(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/jwt-auth/v1/token/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return { success: false, error: 'Invalid token' };
      }

      // Fetch user data
      const userResponse = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/wp/v2/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        return { success: false, error: 'Failed to fetch user' };
      }

      const userData = await userResponse.json();

      return {
        success: true,
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar_urls?.['96'],
          userRole: userData.user_role || 'mentee',
          approvalStatus: userData.approval_status || 'pending',
        },
        token,
      };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  getStoredAuth(): { token: string | null; user: User | null } {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  },

  storeAuth(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  // Social login - for WordPress, use plugins like Nextend Social Login
  async socialLogin(
    provider: 'google' | 'linkedin',
    userData: { email: string; name: string; avatar?: string }
  ): Promise<AuthResponse> {
    try {
      // In production, this would call your WordPress social auth endpoint
      // For demo, we'll simulate a successful social login
      const user: User = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        provider,
        profileComplete: false,
        userRole: 'mentee', // Default, will be set during signup flow
        approvalStatus: 'pending',
      };

      // Generate a demo token
      const token = `social_${provider}_${Date.now()}`;

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Social authentication failed',
      };
    }
  },

  // Update user profile after social signup
  updateUserProfile(user: User, profileData: Partial<User>): User {
    const updatedUser = { ...user, ...profileData, profileComplete: true };
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.storeAuth(token, updatedUser);
    }
    return updatedUser;
  },
};
