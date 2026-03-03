import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('authToken') || null,

  login: (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true, token });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, token: null });
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ 
        user: JSON.parse(user), 
        isAuthenticated: true, 
        token 
      });
    }
  }
}));

export default useAuthStore;
