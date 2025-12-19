import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, ApprovalStatus } from '@/services/api/authApi';
import { demoAccounts } from '@/data/demoAccounts';
import { useAuth } from './AuthContext';
import { userStatusEvents } from '@/lib/userStatusEvents';

interface UsersContextType {
  users: User[];
  updateUserStatus: (userId: number, status: ApprovalStatus, consultationDate?: string) => void;
  getUserById: (userId: number) => User | undefined;
  getMentees: () => User[];
  getMentors: () => User[];
  getPendingUsers: () => User[];
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with all demo account users
  const [users, setUsers] = useState<User[]>(() => 
    demoAccounts.map(account => ({ ...account.user }))
  );

  const { user: currentUser } = useAuth();

  // Sync the current user's status with the users list
  useEffect(() => {
    if (currentUser) {
      const userInList = users.find(u => u.id === currentUser.id);
      if (userInList && userInList.approvalStatus !== currentUser.approvalStatus) {
        // Update the user in the list to match the current user
        setUsers(prev => 
          prev.map(u => u.id === currentUser.id ? { ...u, ...currentUser } : u)
        );
      }
    }
  }, [currentUser]);

  const updateUserStatus = (userId: number, status: ApprovalStatus, consultationDate?: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { 
              ...user, 
              approvalStatus: status,
              consultationDate: consultationDate || user.consultationDate,
            }
          : user
      )
    );
    
    // Emit event to sync with logged-in user's session
    userStatusEvents.emit(userId, { 
      approvalStatus: status, 
      consultationDate 
    });
  };

  const getUserById = (userId: number) => {
    return users.find(u => u.id === userId);
  };

  const getMentees = () => {
    return users.filter(u => u.userRole === 'mentee');
  };

  const getMentors = () => {
    return users.filter(u => u.userRole === 'mentor');
  };

  const getPendingUsers = () => {
    return users.filter(u => u.approvalStatus === 'pending' || u.approvalStatus === 'consultation_scheduled');
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        updateUserStatus,
        getUserById,
        getMentees,
        getMentors,
        getPendingUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
