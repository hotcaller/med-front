import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: number | null;
  
  login: (token: string, userId: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      userId: null,
      
      login: (token: string, userId: number) => set({
        isAuthenticated: true,
        accessToken: token,
        userId: userId,
      }),
      
      logout: () => set({
        isAuthenticated: false,
        accessToken: null,
        userId: null,
      }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        userId: state.userId,
      }),
    }
  )
);