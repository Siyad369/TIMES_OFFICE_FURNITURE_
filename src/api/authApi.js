import apiClient from './axios';

export const authApi = {
  /**
   * Logs in an admin user using credentials
   * @param {{ username: string, password: string }} credentials
   * @returns {Promise<{ token: string, username: string, is_staff: boolean }>}
   */
  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/admin/login/', credentials);
    return response.data;
  },

  /**
   * Logs out the current authenticated admin user
   * @returns {Promise<{ message: string }>}
   */
  logout: async () => {
    const response = await apiClient.post('/api/auth/admin/logout/');
    return response.data;
  },
};

