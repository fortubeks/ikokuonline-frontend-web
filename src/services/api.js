import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withXSRFToken: true,
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    // Access the Pinia store instance
    const authStore = useAuthStore();
    
    // Check if the response status is 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Clear the user's session from the frontend store
      authStore.clearAuth();
      
      // Redirect to the login page
      router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
      
      console.error('Session expired. Redirecting to login.');
    }
    
    // Reject the promise to let the component handle other errors
    return Promise.reject(error);
  }
);
// const token = localStorage.getItem('token');
// if (token) {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

export default api;
