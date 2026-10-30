/**
 * Formats a numeric price into a currency string
 * @param {number|string} price 
 * @param {string} currencySymbol 
 * @returns {string}
 */
export const formatPrice = (price, currencySymbol = '₹') => {
  if (price === null || price === undefined || price === '') return `${currencySymbol}0.00`;
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return `${currencySymbol}0.00`;
  return `${currencySymbol}${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formats an ISO date string to a localized readable format
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * Maps backend stock_status to UI labels and badge types
 * @param {string} status 
 * @returns {{ label: string, isAvailable: boolean, badgeClass: string }}
 */
export const mapStockStatus = (status) => {
  const isAvailable = status === 'in_stock';
  return {
    label: isAvailable ? 'In Stock' : 'Out of Stock',
    isAvailable,
    badgeClass: isAvailable ? 'badge-in-stock' : 'badge-out-of-stock',
  };
};

/**
 * Resolves product image URL safely
 * Returns original URL if valid, or a styled fallback SVG
 */
export const getFallbackImage = () => {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f1f5f9'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Cpath d='M140 180h120v15H140zm-15-50h150v40H125zm25-45h100v35H150z' fill='%2394a3b8' opacity='0.4'/%3E%3Ctext x='50%25' y='75%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%2394a3b8'%3ETimes Office Furniture%3C/text%3E%3C/svg%3E";
};

