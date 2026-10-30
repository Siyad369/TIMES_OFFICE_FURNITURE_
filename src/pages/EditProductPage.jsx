import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ProductForm } from '../components/admin/ProductForm';
import { Skeleton } from '../components/common/Skeleton';
import { Alert } from '../components/common/Alert';

export const EditProductPage = () => {
  const { id } = useParams();
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [prodData, catData] = await Promise.all([
          productApi.getProductById(id),
          categoryApi.getCategories(),
        ]);
        if (isMounted) {
          setProduct(prodData);
          setCategories(catData || []);
        }
      } catch (err) {
        console.error('Failed to load product for editing:', err);
        if (isMounted) {
          if (err.response?.status === 404) {
            navigate('/admin/products', { replace: true });
            return;
          }
          setError('Product not found or failed to load. Returning to products...');
          setTimeout(() => {
            navigate('/admin/products', { replace: true });
          }, 1500);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleUpdateProduct = async (formData) => {
    setIsSubmitting(true);
    try {
      await productApi.updateProduct(id, formData);
      navigate('/admin/products');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <AdminHeader
        title="Edit Product"
        subtitle={product ? `Editing: ${product.title}` : 'Update existing catalog item.'}
        onOpenSidebar={onOpenSidebar}
        showAddButton={false}
      />

      <div className="admin-content-inner">
        {error && (
          <Alert type="danger" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton height="350px" borderRadius="var(--radius-lg)" />
          </div>
        ) : product ? (
          <ProductForm
            initialData={product}
            categories={categories}
            onSubmit={handleUpdateProduct}
            isLoading={isSubmitting}
            isEdit={true}
          />
        ) : null}
      </div>
    </div>
  );
};

