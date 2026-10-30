import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, Filter } from 'lucide-react';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { useDebounce } from '../hooks/useDebounce';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ProductTable } from '../components/admin/ProductTable';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { SearchBar } from '../components/catalog/SearchBar';
import { Pagination } from '../components/catalog/Pagination';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import './AdminProductsPage.css';

export const AdminProductsPage = () => {
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Filters
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal state
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);

  // Fetch categories
  useEffect(() => {
    categoryApi.getCategories().then((data) => {
      setCategories(data || []);
    }).catch(console.error);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: debouncedSearch || undefined,
        category: selectedCategory || undefined,
        stock_status: selectedStock || undefined,
        ordering: '-created_at',
        page: currentPage > 1 ? currentPage : undefined,
      };

      const response = await productApi.getProducts(params);
      setProducts(response.results || []);
      setTotalCount(response.count || 0);
    } catch (err) {
      console.error('Failed to load products list:', err);
      setError('Failed to load products. Please check backend availability.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, selectedCategory, selectedStock, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;
    setIsDeleting(true);
    try {
      await productApi.deleteProduct(deleteProduct.id);
      setFeedback(`Product "${deleteProduct.title}" was successfully deleted.`);
      setDeleteProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Unable to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <AdminHeader
        title="Product Management"
        subtitle="Search, filter, edit, or remove catalog items."
        onOpenSidebar={onOpenSidebar}
      />

      <div className="admin-content-inner">
        {feedback && (
          <Alert type="success" onClose={() => setFeedback('')}>
            {feedback}
          </Alert>
        )}

        {error && (
          <Alert type="danger" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Toolbar & Filter Bar */}
        <div className="admin-toolbar-card">
          <div className="toolbar-search">
            <SearchBar
              value={searchInput}
              onChange={(val) => {
                setSearchInput(val);
                setCurrentPage(1);
              }}
              placeholder="Search by title or description..."
            />
          </div>

          <div className="toolbar-filters">
            <select
              className="toolbar-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              className="toolbar-select"
              value={selectedStock}
              onChange={(e) => {
                setSelectedStock(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Stock Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={fetchProducts}
              title="Refresh list"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <ProductTable
          products={products}
          isLoading={isLoading}
          onDeleteClick={(p) => setDeleteProduct(p)}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={12}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteProduct)}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteConfirm}
        productTitle={deleteProduct?.title || ''}
        isLoading={isDeleting}
      />
    </div>
  );
};

