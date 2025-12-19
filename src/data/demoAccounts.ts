import { User, UserRole, ApprovalStatus } from '@/services/api/authApi';

export interface DemoAccount {
  email: string;
  password: string;
  user: User;
  description: string;
  category: 'mentee' | 'mentor' | 'admin';
}

// Demo accounts for testing different user states
export const demoAccounts: DemoAccount[] = [
  // Admin Account
  {
    email: 'admin@demo.com',
    password: 'demo123',
    description: 'Platform administrator with full access',
    category: 'admin',
    user: {
      id: 9001,
      email: 'admin@demo.com',
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
      userRole: 'admin',
      approvalStatus: 'approved',
      profileComplete: true,
    },
  },
  // Approved Mentee - Full Access
  {
    email: 'mentee@demo.com',
    password: 'demo123',
    description: 'Approved mentee with full dashboard access',
    category: 'mentee',
    user: {
      id: 1001,
      email: 'mentee@demo.com',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      userRole: 'mentee',
      approvalStatus: 'approved',
      profileComplete: true,
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      currentRole: 'Junior Software Engineer',
      targetRole: 'Senior Software Engineer',
      industry: 'Technology',
      experience: '1-3',
      goals: ['Skill development', 'Career transition', 'Networking'],
      bio: 'Passionate about learning and growing in tech.',
    },
  },
  // Pending Mentee - Awaiting Consultation
  {
    email: 'pending.mentee@demo.com',
    password: 'demo123',
    description: 'New mentee awaiting consultation scheduling',
    category: 'mentee',
    user: {
      id: 1002,
      email: 'pending.mentee@demo.com',
      name: 'Alex Chen',
      userRole: 'mentee',
      approvalStatus: 'pending',
      profileComplete: true,
      currentRole: 'Marketing Associate',
      targetRole: 'Product Manager',
      industry: 'Technology',
      experience: '3-5',
      goals: ['Career transition', 'Interview preparation'],
    },
  },
  // Consultation Scheduled Mentee
  {
    email: 'scheduled.mentee@demo.com',
    password: 'demo123',
    description: 'Mentee with consultation scheduled',
    category: 'mentee',
    user: {
      id: 1003,
      email: 'scheduled.mentee@demo.com',
      name: 'Jordan Smith',
      userRole: 'mentee',
      approvalStatus: 'consultation_scheduled',
      profileComplete: true,
      consultationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      currentRole: 'Data Analyst',
      targetRole: 'Data Scientist',
      industry: 'Finance',
      experience: '1-3',
      goals: ['Skill development', 'Leadership growth'],
    },
  },
  // Approved Mentor - Full Access
  {
    email: 'mentor@demo.com',
    password: 'demo123',
    description: 'Approved mentor with full dashboard access',
    category: 'mentor',
    user: {
      id: 2001,
      email: 'mentor@demo.com',
      name: 'Dr. Michael Roberts',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      userRole: 'mentor',
      approvalStatus: 'approved',
      profileComplete: true,
      linkedIn: 'https://linkedin.com/in/michaelroberts',
      currentRole: 'VP of Engineering',
      company: 'TechCorp Inc.',
      industry: 'Software Engineering',
      experience: '15+',
      expertise: 'System design, leadership, career transitions',
      motivation: 'Helping the next generation of tech leaders',
      availability: '4-6 hours per month',
    },
  },
  // Pending Mentor - Awaiting Interview
  {
    email: 'pending.mentor@demo.com',
    password: 'demo123',
    description: 'New mentor awaiting interview scheduling',
    category: 'mentor',
    user: {
      id: 2002,
      email: 'pending.mentor@demo.com',
      name: 'Emily Watson',
      userRole: 'mentor',
      approvalStatus: 'pending',
      profileComplete: true,
      currentRole: 'Senior Product Manager',
      company: 'StartupXYZ',
      industry: 'Product Management',
      experience: '10-15',
      expertise: 'Product strategy, user research, roadmap planning',
      motivation: 'Giving back to the PM community',
      availability: '2-4 hours per month',
    },
  },
  // Interview Scheduled Mentor
  {
    email: 'scheduled.mentor@demo.com',
    password: 'demo123',
    description: 'Mentor with interview scheduled',
    category: 'mentor',
    user: {
      id: 2003,
      email: 'scheduled.mentor@demo.com',
      name: 'David Kim',
      userRole: 'mentor',
      approvalStatus: 'consultation_scheduled',
      profileComplete: true,
      consultationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      currentRole: 'Director of UX',
      company: 'DesignStudio',
      industry: 'UX/UI Design',
      experience: '10-15',
      expertise: 'Design systems, user research, team building',
      motivation: 'Mentoring designers to reach their potential',
      availability: '3-5 hours per month',
    },
  },
];

// Get demo account by email
export const getDemoAccount = (email: string): DemoAccount | undefined => {
  return demoAccounts.find(account => account.email.toLowerCase() === email.toLowerCase());
};

// Validate demo login
export const validateDemoLogin = (email: string, password: string): DemoAccount | null => {
  const account = getDemoAccount(email);
  if (account && account.password === password) {
    return account;
  }
  return null;
};
