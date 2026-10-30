import apiClient from './axios';

export const productApi = {
  /**
   * Fetches paginated products with optional filtering and ordering
   * @param {Object} params
   * @param {number|string} [params.category]
   * @param {string} [params.search]
   * @param {string} [params.stock_status]
   * @param {string} [params.ordering]
   * @param {number} [params.page]
   * @returns {Promise<{ count: number, next: string|null, previous: string|null, results: Array }>}
   */
  getProducts: async (params = {}) => {
    // Filter out undefined, null or empty string parameters
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val !== undefined && val !== null && val !== '') {
        cleanParams[key] = val;
      }
    });

    const response = await apiClient.get('/api/products/', { params: cleanParams });
    return response.data;
  },

  /**
   * Fetches product details by ID
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  getProductById: async (id) => {
    const response = await apiClient.get(`/api/products/${id}/`);
    return response.data;
  },

  /**
   * Creates a new product (Admin only)
   * Handles multipart/form-data automatically via FormData
   * @param {FormData|Object} productData
   * @returns {Promise<Object>}
   */
  createProduct: async (productData) => {
    const response = await apiClient.post('/api/products/', productData);
    return response.data;
  },

  /**
   * Updates an existing product (Admin only)
   * Uses PATCH for flexible partial updates and optional image changes
   * @param {number|string} id
   * @param {FormData|Object} productData
   * @returns {Promise<Object>}
   */
  updateProduct: async (id, productData) => {
    const response = await apiClient.patch(`/api/products/${id}/`, productData);
    return response.data;
  },

  /**
   * Deletes a product by ID (Admin only)
   * @param {number|string} id
   * @returns {Promise<{ message: string }>}
   */
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/api/products/${id}/`);
    return response.data;
  },
};

