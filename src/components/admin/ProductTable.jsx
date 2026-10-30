import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { formatPrice, mapStockStatus, getFallbackImage } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import './ProductTable.css';

export const ProductTable = ({
  products = [],
  isLoading = false,
  onDeleteClick,
}) => {
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return (
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="table-row-skeleton">
                <td colSpan="6">
                  <div className="skeleton-row-loader" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="table-empty-state">
        <ImageIcon size={48} className="empty-state-icon" />
        <h4 className="empty-state-title">No products found</h4>
        <p className="empty-state-text">
          No matching furniture items were found. Try modifying your search or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Details</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const stock = mapStockStatus(product.stock_status);
            const isBroken = brokenImages[product.id];
            const imgSrc = isBroken || !product.image ? getFallbackImage() : product.image;

            return (
              <tr key={product.id}>
                {/* Thumbnail */}
                <td className="table-img-col">
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className="product-table-thumb"
                    onError={() => handleImageError(product.id)}
                  />
                </td>

                {/* Details */}
                <td className="table-detail-col">
                  <span className="table-product-title">{product.title}</span>
                  {product.description && (
                    <span className="table-product-desc">{product.description}</span>
                  )}
                </td>

                {/* Category */}
                <td>
                  <Badge variant="primary" size="sm">
                    {product.category?.name || 'Uncategorized'}
                  </Badge>
                </td>

                {/* Price */}
                <td className="table-price-cell">
                  {formatPrice(product.price)}
                </td>

                {/* Stock Status */}
                <td>
                  <Badge
                    variant={stock.isAvailable ? 'success' : 'danger'}
                    size="sm"
                    dot
                  >
                    {stock.label}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="table-actions-wrap">
                    <Link
                      to={`/catalog/${product.id}`}
                      className="table-action-btn view"
                      title="View Public Details"
                      target="_blank"
                    >
                      <ExternalLink size={16} />
                    </Link>

                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="table-action-btn edit"
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </Link>

                    <button
                      type="button"
                      className="table-action-btn delete"
                      title="Delete Product"
                      onClick={() => onDeleteClick(product)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

