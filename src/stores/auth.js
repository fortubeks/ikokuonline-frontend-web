import { defineStore } from 'pinia';
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    async logout() {
      try {
        await api.post('/api/auth/logout');
        this.user = null;
        localStorage.removeItem('user');
      } catch (error) {
        if (error.response?.status !== 401) {
            console.error('Logout failed', error.response?.data);
        }
      } finally {
        this.user = null;
        localStorage.removeItem('user');
      }
    },
    hydrate() {
      const saved = localStorage.getItem('user');
      if (saved) {
        this.user = JSON.parse(saved);
      }
    },
    async checkAuth() {
        try {
            const res = await api.get('/api/auth/user');
            this.setUser(res.data.user); 
        } catch (error) {
            this.logout();
        }
    }
  },
});
