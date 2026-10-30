import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Alert } from '../common/Alert';
import { getFallbackImage } from '../../utils/formatters';
import './ProductForm.css';

export const ProductForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  isLoading = false,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    price: '',
    stock_status: 'in_stock',
    is_active: true,
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isManualCategory, setIsManualCategory] = useState(false);

  // Populate data in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category_id: initialData.category?.id || initialData.category_id || '',
        price: initialData.price || '',
        stock_status: initialData.stock_status || 'in_stock',
        is_active: initialData.is_active !== undefined ? initialData.is_active : true,
        description: initialData.description || '',
      });

      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please select a valid image file.' }));
        return;
      }
      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 5MB.' }));
        return;
      }

      setImageFile(file);
      setErrors((prev) => ({ ...prev, image: '' }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required.';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category.';
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Please enter a valid non-negative price.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    // Build FormData payload
    const data = new FormData();
    data.append('title', formData.title.trim());
    data.append('category_id', formData.category_id);
    data.append('price', parseFloat(formData.price).toFixed(2));
    data.append('stock_status', formData.stock_status);
    data.append('is_active', formData.is_active);
    data.append('description', formData.description.trim());

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await onSubmit(data);
    } catch (err) {
      console.error('Product form submission error:', err);
      if (err.response?.data) {
        const backendErrors = err.response.data;
        if (typeof backendErrors === 'object') {
          // Map backend field errors to state
          const mappedErrors = {};
          Object.keys(backendErrors).forEach((key) => {
            const val = backendErrors[key];
            mappedErrors[key] = Array.isArray(val) ? val.join(' ') : String(val);
          });
          setErrors(mappedErrors);
        } else {
          setServerError(String(backendErrors));
        }
      } else {
        setServerError('Failed to save product. Please check your network and try again.');
      }
    }
  };

  return (
    <form className="product-form-card" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <Alert type="danger" onClose={() => setServerError('')}>
          {serverError}
        </Alert>
      )}

      <div className="form-grid">
        {/* Title */}
        <div className="form-col-full">
          <Input
            label="Product Title"
            name="title"
            required
            placeholder="e.g. Ergonomic High-Back Executive Mesh Chair"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />
        </div>

        {/* Category */}
        <div className="form-col-half">
          <div className="form-field">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
              <label htmlFor="category_id" className="form-label" style={{ marginBottom: 0 }}>
                Category <span className="required-star">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsManualCategory(!isManualCategory)}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isManualCategory ? '← Choose from dropdown' : '+ Enter Category ID directly'}
              </button>
            </div>

            {isManualCategory ? (
              <input
                type="number"
                id="category_id"
                name="category_id"
                placeholder="Enter category ID from Django Admin (e.g. 11)"
                className={`form-input ${errors.category_id ? 'has-error' : ''}`}
                value={formData.category_id}
                onChange={handleChange}
              />
            ) : (
              <select
                id="category_id"
                name="category_id"
                className={`form-input form-select ${errors.category_id ? 'has-error' : ''}`}
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} (ID: {cat.id})
                  </option>
                ))}
              </select>
            )}
            {errors.category_id && <p className="form-error">{errors.category_id}</p>}
          </div>
        </div>

        {/* Price */}
        <div className="form-col-half">
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="e.g. 14500.00"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>

        {/* Stock Status */}
        <div className="form-col-half">
          <div className="form-field">
            <label htmlFor="stock_status" className="form-label">
              Stock Availability <span className="required-star">*</span>
            </label>
            <select
              id="stock_status"
              name="stock_status"
              className="form-input form-select"
              value={formData.stock_status}
              onChange={handleChange}
            >
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="form-col-half form-checkbox-container">
          <label className="checkbox-custom-label">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span className="checkbox-box" />
            <span className="checkbox-title">Product Active in Catalog</span>
          </label>
          <span className="checkbox-desc">
            If unchecked, this item will be hidden from guests in the public catalog.
          </span>
        </div>

        {/* Description */}
        <div className="form-col-full">
          <div className="form-field">
            <label htmlFor="description" className="form-label">
              Description & Specifications
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="form-input form-textarea"
              placeholder="Describe materials, dimensions, warranty, ergonomic features, and finishes..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-col-full">
          <div className="form-field">
            <label className="form-label">Product Image</label>
            <div className="image-upload-wrapper">
              <label htmlFor="image-file-input" className="image-dropzone">
                <UploadCloud size={32} className="dropzone-icon" />
                <span className="dropzone-title">Click to upload product image</span>
                <span className="dropzone-sub">PNG, JPG, WEBP up to 5MB (Stored in Cloudinary)</span>
                <input
                  id="image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>

              {imagePreview && (
                <div className="image-preview-box">
                  <span className="preview-label">Selected Preview</span>
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="preview-img"
                  />
                  {isEdit && !imageFile && (
                    <span className="existing-img-note">Current Cloudinary image</span>
                  )}
                </div>
              )}
            </div>
            {errors.image && <p className="form-error">{errors.image}</p>}
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-action-buttons">
        <Link to="/admin/products" className="btn btn-secondary">
          <ArrowLeft size={16} /> Cancel
        </Link>
        <Button
          type="submit"
          variant="accent"
          isLoading={isLoading}
        >
          {isEdit ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

