import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ProductForm } from '../components/admin/ProductForm';

export const AddProductPage = () => {
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    categoryApi.getCategories().then((data) => {
      setCategories(data || []);
    }).catch(console.error);
  }, []);

  const handleCreateProduct = async (formData) => {
    setIsSubmitting(true);
    try {
      await productApi.createProduct(formData);
      navigate('/admin/products');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <AdminHeader
        title="Add New Furniture Product"
        subtitle="Create a new catalog entry with image and specifications."
        onOpenSidebar={onOpenSidebar}
        showAddButton={false}
      />

      <div className="admin-content-inner">
        <ProductForm
          categories={categories}
          onSubmit={handleCreateProduct}
          isLoading={isSubmitting}
          isEdit={false}
        />
      </div>
    </div>
  );
};

