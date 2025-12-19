// Simple event emitter for user status updates
type StatusUpdateCallback = (userId: number, updates: { approvalStatus?: string; consultationDate?: string }) => void;

const subscribers: StatusUpdateCallback[] = [];

export const userStatusEvents = {
  subscribe: (callback: StatusUpdateCallback) => {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  },
  
  emit: (userId: number, updates: { approvalStatus?: string; consultationDate?: string }) => {
    subscribers.forEach(callback => callback(userId, updates));
  },
};
