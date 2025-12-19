import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SessionRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  mentorImage: string;
  mentorSpecialty: string;
  menteeId: string;
  menteeName: string;
  menteeEmail: string;
  date: string;
  time: string;
  topic: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

interface SessionContextType {
  sessions: SessionRequest[];
  addSession: (session: Omit<SessionRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateSessionStatus: (sessionId: string, status: SessionRequest['status']) => void;
  getMenteeSessions: (menteeId: string) => SessionRequest[];
  getMentorSessions: (mentorName: string) => SessionRequest[];
  getPendingRequestsForMentor: (mentorName: string) => SessionRequest[];
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Demo data for initial state - linked to demo accounts
const demoSessions: SessionRequest[] = [
  // Sessions for approved mentee (mentee@demo.com - Sarah Johnson, id: 1001)
  {
    id: '1',
    mentorId: 'sarah-chen',
    mentorName: 'Sarah Chen',
    mentorRole: 'Product Lead',
    mentorCompany: 'Stripe',
    mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    mentorSpecialty: 'Product Management',
    menteeId: '1001',
    menteeName: 'Sarah Johnson',
    menteeEmail: 'mentee@demo.com',
    date: '2025-12-22',
    time: '10:00 AM',
    topic: 'Career Strategy Session',
    status: 'accepted',
    createdAt: '2025-12-15T10:00:00Z',
  },
  {
    id: '2',
    mentorId: 'marcus-johnson',
    mentorName: 'Marcus Johnson',
    mentorRole: 'Senior Engineer',
    mentorCompany: 'Google',
    mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    mentorSpecialty: 'Software Engineering',
    menteeId: '1001',
    menteeName: 'Sarah Johnson',
    menteeEmail: 'mentee@demo.com',
    date: '2025-12-15',
    time: '2:00 PM',
    topic: 'System Design Review',
    status: 'completed',
    createdAt: '2025-12-10T10:00:00Z',
  },
  {
    id: '3',
    mentorId: 'emma-wilson',
    mentorName: 'Emma Wilson',
    mentorRole: 'Engineering Manager',
    mentorCompany: 'Meta',
    mentorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    mentorSpecialty: 'Leadership',
    menteeId: '1001',
    menteeName: 'Sarah Johnson',
    menteeEmail: 'mentee@demo.com',
    date: '2025-12-28',
    time: '3:00 PM',
    topic: 'Leadership Development',
    message: 'Looking forward to discussing my career growth path',
    status: 'pending',
    createdAt: '2025-12-18T14:00:00Z',
  },
  // Sessions for approved mentor (mentor@demo.com - Dr. Michael Roberts, id: 2001)
  {
    id: '4',
    mentorId: '2001',
    mentorName: 'Dr. Michael Roberts',
    mentorRole: 'VP of Engineering',
    mentorCompany: 'TechCorp Inc.',
    mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    mentorSpecialty: 'Engineering Leadership',
    menteeId: '1001',
    menteeName: 'Sarah Johnson',
    menteeEmail: 'mentee@demo.com',
    date: '2025-12-25',
    time: '11:00 AM',
    topic: 'Technical Career Growth',
    message: 'Want to learn about transitioning to senior roles',
    status: 'pending',
    createdAt: '2025-12-17T09:00:00Z',
  },
  {
    id: '5',
    mentorId: '2001',
    mentorName: 'Dr. Michael Roberts',
    mentorRole: 'VP of Engineering',
    mentorCompany: 'TechCorp Inc.',
    mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    mentorSpecialty: 'Engineering Leadership',
    menteeId: 'another-mentee',
    menteeName: 'Jake Miller',
    menteeEmail: 'jake@example.com',
    date: '2025-12-20',
    time: '4:00 PM',
    topic: 'Interview Preparation',
    status: 'accepted',
    createdAt: '2025-12-12T11:00:00Z',
  },
  {
    id: '6',
    mentorId: '2001',
    mentorName: 'Dr. Michael Roberts',
    mentorRole: 'VP of Engineering',
    mentorCompany: 'TechCorp Inc.',
    mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    mentorSpecialty: 'Engineering Leadership',
    menteeId: 'past-mentee',
    menteeName: 'Emily Davis',
    menteeEmail: 'emily@example.com',
    date: '2025-12-10',
    time: '2:00 PM',
    topic: 'System Architecture Review',
    status: 'completed',
    createdAt: '2025-12-05T10:00:00Z',
  },
  {
    id: '7',
    mentorId: '2001',
    mentorName: 'Dr. Michael Roberts',
    mentorRole: 'VP of Engineering',
    mentorCompany: 'TechCorp Inc.',
    mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    mentorSpecialty: 'Engineering Leadership',
    menteeId: 'new-mentee',
    menteeName: 'Chris Park',
    menteeEmail: 'chris@example.com',
    date: '2025-12-26',
    time: '1:00 PM',
    topic: 'Code Review Best Practices',
    message: 'Would love to learn about establishing code review culture',
    status: 'pending',
    createdAt: '2025-12-18T16:00:00Z',
  },
];

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<SessionRequest[]>(demoSessions);

  const addSession = (sessionData: Omit<SessionRequest, 'id' | 'createdAt' | 'status'>) => {
    const newSession: SessionRequest = {
      ...sessionData,
      id: `session-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setSessions((prev) => [newSession, ...prev]);
  };

  const updateSessionStatus = (sessionId: string, status: SessionRequest['status']) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, status } : session
      )
    );
  };

  const getMenteeSessions = (menteeId: string) => {
    return sessions.filter((s) => s.menteeId === menteeId);
  };

  const getMentorSessions = (mentorName: string) => {
    return sessions.filter((s) => s.mentorName === mentorName);
  };

  const getPendingRequestsForMentor = (mentorName: string) => {
    return sessions.filter((s) => s.mentorName === mentorName && s.status === 'pending');
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        addSession,
        updateSessionStatus,
        getMenteeSessions,
        getMentorSessions,
        getPendingRequestsForMentor,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  return context;
};