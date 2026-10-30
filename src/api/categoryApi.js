import apiClient from './axios';

// Default seeded categories and their IDs from Django backend
export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Sofa' },
  { id: 2, name: 'Office Chair' },
  { id: 3, name: 'Visitors Chair' },
  { id: 4, name: 'Plastic Chairs' },
  { id: 5, name: 'Cafe Chairs' },
  { id: 6, name: 'Normal Tables' },
  { id: 7, name: 'Tea Poy' },
  { id: 8, name: 'Executive Tables' },
  { id: 9, name: 'Wardrobes' },
  { id: 11, name: 'chairs' },
];

export const categoryApi = {
  /**
   * Fetches categories from the backend.
   *
   * Note on Django Backend behavior:
   * The backend's CategoryListAPIView currently runs:
   * `Category.objects.filter(products__is_active=True).distinct().order_by("name")`
   *
   * This means if a category (like newly added 'chairs') has 0 products assigned to it,
   * the backend API will NOT include it in `/api/categories/` until an active product is added.
   *
   * We merge the backend response with known categories so that all categories
   * can be selected when adding products.
   *
   * @returns {Promise<Array<{ id: number, name: string }>>}
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get('/api/categories/');
      const apiCategories = Array.isArray(response.data) ? response.data : [];

      const categoryMap = new Map();

      // Pre-fill with default categories
      DEFAULT_CATEGORIES.forEach((cat) => {
        categoryMap.set(cat.name.toLowerCase().trim(), cat);
      });

      // Merge backend categories (will include newly returned categories if any have products)
      apiCategories.forEach((cat) => {
        if (cat && cat.name) {
          categoryMap.set(cat.name.toLowerCase().trim(), cat);
        }
      });

      return Array.from(categoryMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } catch (error) {
      console.warn('Failed to fetch categories from API, using defaults:', error);
      return DEFAULT_CATEGORIES.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
};
