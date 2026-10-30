import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://times-office-furniture.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor to attach Django DRF Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('times_admin_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling & 401 clearing
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if this was an authenticated request failure (not the login endpoint itself)
      if (!error.config?.url?.includes('/auth/admin/login/')) {
        localStorage.removeItem('times_admin_token');
        localStorage.removeItem('times_admin_user');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

