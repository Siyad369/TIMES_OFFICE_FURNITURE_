import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Tag } from 'lucide-react';
import { formatPrice, mapStockStatus, getFallbackImage } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product?.image || getFallbackImage());
  const stock = mapStockStatus(product?.stock_status);

  const handleImageError = () => {
    setImgSrc(getFallbackImage());
  };

  return (
    <div className="product-card">
      {/* Card Image Container */}
      <div className="card-image-wrap">
        <img
          src={imgSrc}
          alt={product?.title || 'Office Furniture Item'}
          className="card-image"
          loading="lazy"
          onError={handleImageError}
        />
        
        {/* Floating Stock Badge */}
        <div className="card-stock-badge">
          <Badge
            variant={stock.isAvailable ? 'success' : 'danger'}
            size="sm"
            dot
          >
            {stock.label}
          </Badge>
        </div>

        {/* Quick View Overlay */}
        <Link to={`/catalog/${product?.id}`} className="card-image-overlay" aria-label={`View details of ${product?.title}`}>
          <span className="overlay-pill">
            <Eye size={16} /> View Details
          </span>
        </Link>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Category Tag */}
        {product?.category?.name && (
          <div className="card-category-tag">
            <Tag size={12} />
            <span>{product.category.name}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="card-title">
          <Link to={`/catalog/${product?.id}`} title={product?.title}>
            {product?.title}
          </Link>
        </h3>

        {/* Short Description */}
        {product?.description && (
          <p className="card-snippet">
            {product.description}
          </p>
        )}

        {/* Footer: Price & Action */}
        <div className="card-footer">
          <div className="card-price-wrap">
            <span className="price-label">Price</span>
            <span className="card-price">{formatPrice(product?.price)}</span>
          </div>

          <Link to={`/catalog/${product?.id}`} className="card-action-btn">
            <span>Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

