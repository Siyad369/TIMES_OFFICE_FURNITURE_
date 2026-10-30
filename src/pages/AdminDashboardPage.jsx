import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Layers,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatCard } from '../components/admin/StatCard';
import { ProductTable } from '../components/admin/ProductTable';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import './AdminDashboardPage.css';

export const AdminDashboardPage = () => {
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    inStock: 0,
    outOfStock: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete state
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch categories
      const catData = await categoryApi.getCategories();
      setCategories(catData || []);

      // 2. Fetch all products (or first batch) to calculate accurate statistics
      // Note: We can fetch both in_stock and out_of_stock counts via DRF query parameters!
      const [allProductsRes, inStockRes, outOfStockRes] = await Promise.all([
        productApi.getProducts({ ordering: '-created_at' }),
        productApi.getProducts({ stock_status: 'in_stock' }),
        productApi.getProducts({ stock_status: 'out_of_stock' }),
      ]);

      setProducts(allProductsRes.results || []);
      setStats({
        totalProducts: allProductsRes.count || 0,
        totalCategories: catData ? catData.length : 0,
        inStock: inStockRes.count || 0,
        outOfStock: outOfStockRes.count || 0,
      });
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      setError('Unable to load dashboard data. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;
    setIsDeleting(true);
    try {
      await productApi.deleteProduct(deleteProduct.id);
      setFeedbackMessage(`Product "${deleteProduct.title}" was successfully deleted.`);
      setDeleteProduct(null);
      await loadDashboardData();
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <AdminHeader
        title="Catalog Overview"
        subtitle="Manage Times Office Furniture catalog inventory, categories and listings."
        onOpenSidebar={onOpenSidebar}
      />

      <div className="admin-content-inner">
        {feedbackMessage && (
          <Alert type="success" onClose={() => setFeedbackMessage('')}>
            {feedbackMessage}
          </Alert>
        )}

        {error && (
          <Alert type="danger" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Real-time stats grid */}
        <section className="dashboard-stats-grid">
          <StatCard
            title="Total Products"
            value={isLoading ? '—' : stats.totalProducts}
            icon={Package}
            variant="primary"
            helperText="Live items in database"
          />

          <StatCard
            title="Product Categories"
            value={isLoading ? '—' : stats.totalCategories}
            icon={Layers}
            variant="accent"
            helperText="Seeded active classifications"
          />

          <StatCard
            title="In Stock Items"
            value={isLoading ? '—' : stats.inStock}
            icon={CheckCircle}
            variant="success"
            helperText="Available for immediate dispatch"
          />

          <StatCard
            title="Out of Stock"
            value={isLoading ? '—' : stats.outOfStock}
            icon={XCircle}
            variant="danger"
            helperText="Items requiring manufacturing/restock"
          />
        </section>

        {/* Recent Products Section */}
        <section className="dashboard-recent-section">
          <div className="section-title-bar">
            <div>
              <h2 className="section-title">Recent Catalog Entries</h2>
              <p className="section-subtitle">Latest furniture items added to the catalog</p>
            </div>

            <div className="section-actions">
              <Link to="/admin/products" className="btn btn-secondary btn-sm">
                <span>View All Products</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <ProductTable
            products={products.slice(0, 5)}
            isLoading={isLoading}
            onDeleteClick={(prod) => setDeleteProduct(prod)}
          />
        </section>
      </div>

      {/* Delete confirmation modal */}
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

