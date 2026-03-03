import { create } from 'zustand';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../services/oauthService';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('jwtToken') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await loginUser(email, password);
      set({ user, isAuthenticated: true, token, loading: false });
      return { success: true };
    } catch (error) {
      const errorMsg = error.message || 'Login failed';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await registerUser(name, email, password);
      set({ user, loading: false });
      return { success: true };
    } catch (error) {
      const errorMsg = error.message || 'Registration failed';
      set({ error: errorMsg, loading: false });
      return { success: false, error: errorMsg };
    }
  },

  logout: () => {
    logoutUser();
    set({ user: null, isAuthenticated: false, token: null });
  },

  initializeAuth: async () => {
    const token = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        set({ loading: true });
        const user = await getCurrentUser(token);
        set({ user, isAuthenticated: true, token, loading: false });
      } catch (error) {
        // Token invalid or expired
        logoutUser();
        set({ user: null, isAuthenticated: false, token: null, loading: false });
      }
    } else {
      set({ loading: false });
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

export default useAuthStore;
