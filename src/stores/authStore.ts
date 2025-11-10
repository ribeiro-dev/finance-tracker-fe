import { create } from 'zustand';
import { api } from "@/lib/api";


interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  isLoading: true,

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    set({ accessToken, isLoading: false });

    try {
      console.log('[Auth] Fetching user data');
      set({ isLoading: false });

    } catch (error) {
      console.error('[Auth] Failed to fetch user:', error);
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}))
