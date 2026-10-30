import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw, PackageX, Layers, Search, Filter } from 'lucide-react';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { useDebounce } from '../hooks/useDebounce';
import { ProductCard } from '../components/catalog/ProductCard';
import { ProductFilter } from '../components/catalog/ProductFilter';
import { SearchBar } from '../components/catalog/SearchBar';
import { Pagination } from '../components/catalog/Pagination';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import './CatalogPage.css';

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialStock = searchParams.get('stock_status') || '';
  const initialOrdering = searchParams.get('ordering') || '-created_at';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStock, setSelectedStock] = useState(initialStock);
  const [selectedOrdering, setSelectedOrdering] = useState(initialOrdering);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Debounced search query
  const debouncedSearch = useDebounce(searchInput, 400);

  // Sync state to URL search parameters
  const updateUrlParams = useCallback((params) => {
    const newParams = new URLSearchParams();
    if (params.category) newParams.set('category', params.category);
    if (params.search) newParams.set('search', params.search);
    if (params.stock_status) newParams.set('stock_status', params.stock_status);
    if (params.ordering && params.ordering !== '-created_at') newParams.set('ordering', params.ordering);
    if (params.page && params.page > 1) newParams.set('page', String(params.page));
    setSearchParams(newParams, { replace: true });
  }, [setSearchParams]);

  // Fetch categories once on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getCategories();
        if (isMounted) setCategories(data || []);
      } catch (err) {
        console.warn('Failed to fetch categories list:', err);
      }
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products whenever filters or pagination change
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        category: selectedCategory || undefined,
        search: debouncedSearch || undefined,
        stock_status: selectedStock || undefined,
        ordering: selectedOrdering || undefined,
        page: currentPage > 1 ? currentPage : undefined,
      };

      updateUrlParams({
        category: selectedCategory,
        search: debouncedSearch,
        stock_status: selectedStock,
        ordering: selectedOrdering,
        page: currentPage,
      });

      const response = await productApi.getProducts(params);
      
      // Django DRF paginated response contains: count, next, previous, results
      setProducts(response.results || []);
      setTotalCount(response.count || 0);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Unable to load furniture products at this time. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, debouncedSearch, selectedStock, selectedOrdering, currentPage, updateUrlParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset page to 1 when filters change
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  const handleStockChange = (stock) => {
    setSelectedStock(stock);
    setCurrentPage(1);
  };

  const handleOrderingChange = (order) => {
    setSelectedOrdering(order);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchInput(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCategory('');
    setSelectedStock('');
    setSelectedOrdering('-created_at');
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  const hasActiveFilters = Boolean(
    searchInput || selectedCategory || selectedStock || selectedOrdering !== '-created_at'
  );

  return (
    <div className="catalog-page">
      {/* Top Banner */}
      <section className="catalog-hero-bar">
        <div className="container hero-bar-inner">
          <div>
            <span className="hero-bar-label">Product Directory</span>
            <h1 className="hero-bar-title">Furniture Catalog</h1>
            <p className="hero-bar-desc">
              Browse our complete range of premium office tables, ergonomic chairs, and modern commercial storage.
            </p>
          </div>

          <div className="catalog-search-wrap">
            <SearchBar
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by title, chair, desk, sofa..."
            />
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="container catalog-layout">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-bar">
          <Button
            variant="secondary"
            size="sm"
            icon={Filter}
            onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          >
            {isMobileFilterOpen ? 'Hide Filters' : 'Filter Products'}
          </Button>

          <span className="catalog-results-counter">
            {isLoading ? 'Loading...' : `${totalCount} item${totalCount === 1 ? '' : 's'}`}
          </span>
        </div>

        {/* Sidebar Filters */}
        <div className={`catalog-sidebar-col ${isMobileFilterOpen ? 'mobile-visible' : ''}`}>
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            selectedStock={selectedStock}
            onSelectStock={handleStockChange}
            selectedOrdering={selectedOrdering}
            onSelectOrdering={handleOrderingChange}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Products Grid Content Area */}
        <main className="catalog-main-content">
          {/* Top Results Bar */}
          <div className="catalog-status-header">
            <span className="desktop-results-count">
              Showing <strong>{products.length}</strong> of <strong>{totalCount}</strong> products
              {selectedCategory && (
                <span className="active-cat-label">
                  &bull; in category <strong>{categories.find((c) => String(c.id) === String(selectedCategory))?.name || 'Selected'}</strong>
                </span>
              )}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                className="clear-all-text-btn"
                onClick={handleResetFilters}
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Error Message with Retry */}
          {error && (
            <div className="catalog-error-box">
              <Alert type="danger" title="Connection Error">
                {error}
              </Alert>
              <Button
                variant="primary"
                size="sm"
                icon={RefreshCw}
                onClick={fetchProducts}
                className="retry-btn"
              >
                Retry Request
              </Button>
            </div>
          )}

          {/* Loading Skeletons */}
          {isLoading && !error && (
            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <ProductCardSkeleton key={n} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <div className="catalog-empty-state">
              <div className="empty-icon-wrap">
                <PackageX size={48} />
              </div>
              <h3 className="empty-title">No furniture products found</h3>
              <p className="empty-desc">
                We couldn't find any products matching your current search or filter criteria. Try adjusting your search term or category.
              </p>
              {hasActiveFilters && (
                <Button variant="accent" size="md" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={12}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

