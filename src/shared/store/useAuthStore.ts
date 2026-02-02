import {create} from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  username: '',
  login: (username, password) => {
    if (username === 'admin' && password === 'admin') {
      set({ isAuthenticated: true, isAdmin: true, username });
    } else if (username !== 'admin' && password !== 'admin') {
      set({ isAuthenticated: true, isAdmin: false, username });
    }
  },
  logout: () => set({ isAuthenticated: false, isAdmin: false, username: '' }),
}));
