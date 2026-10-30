import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Tag,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { productApi } from '../api/productApi';
import { formatPrice, mapStockStatus, getFallbackImage, formatDate } from '../utils/formatters';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { Alert } from '../components/common/Alert';
import './ProductDetailsPage.css';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productApi.getProductById(id);
        if (isMounted) {
          setProduct(data);
          setImageSrc(data.image || getFallbackImage());
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        if (isMounted) {
          if (err.response?.status === 404) {
            setError('This furniture product could not be found. It may have been removed or deactivated.');
          } else {
            setError('Failed to load product details. Please check your network and try again.');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const stock = mapStockStatus(product?.stock_status);

  if (isLoading) {
    return (
      <div className="product-details-page container">
        <div className="details-back-bar">
          <Skeleton width="140px" height="38px" borderRadius="var(--radius-md)" />
        </div>
        <div className="details-grid-loading">
          <Skeleton height="450px" borderRadius="var(--radius-xl)" />
          <div className="details-info-loading">
            <Skeleton width="30%" height="24px" />
            <Skeleton width="85%" height="42px" />
            <Skeleton width="40%" height="32px" />
            <Skeleton width="100%" height="120px" />
            <Skeleton width="100%" height="160px" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page container">
        <div className="details-error-card">
          <Alert type="danger" title="Product Unavailable">
            {error || 'Unable to display product.'}
          </Alert>
          <div className="error-actions">
            <Button
              variant="primary"
              icon={ArrowLeft}
              onClick={() => navigate('/catalog')}
            >
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page container">
      {/* Back button & Breadcrumb */}
      <div className="details-back-bar">
        <Link to="/catalog" className="back-link-btn">
          <ArrowLeft size={18} />
          <span>Back to Catalog</span>
        </Link>

        <div className="details-breadcrumb">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/catalog">Catalog</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{product.title}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="details-main-grid">
        {/* Left: Large Image */}
        <div className="details-visual-card">
          <div className="details-image-frame">
            <img
              src={imageSrc}
              alt={product.title}
              className="details-hero-img"
              onError={() => setImageSrc(getFallbackImage())}
            />
            <div className="details-stock-overlay">
              <Badge
                variant={stock.isAvailable ? 'success' : 'danger'}
                size="md"
                dot
              >
                {stock.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right: Product Specifications & Commercial Inquiries */}
        <div className="details-info-panel">
          {/* Category Tag */}
          {product.category?.name && (
            <div className="details-category-pill">
              <Tag size={14} />
              <span>{product.category.name}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="details-title">{product.title}</h1>

          {/* Price Block */}
          <div className="details-price-box">
            <span className="price-tagline">Showroom Catalog Price</span>
            <div className="price-number">{formatPrice(product.price)}</div>
            <span className="price-note">* Commercial pricing, taxes extra where applicable</span>
          </div>

          {/* Description */}
          <div className="details-section">
            <h3 className="section-subheading">Product Description</h3>
            <p className="details-description">
              {product.description || 'No detailed specifications have been added for this item yet. Please contact our showroom for full dimensions, material grades, and color availability.'}
            </p>
          </div>

          {/* Showroom Inquiries Card */}
          <div className="showroom-inquiry-box">
            <h4 className="inquiry-box-title">Showroom Purchase &amp; Inquiries</h4>
            <p className="inquiry-box-text">
              Times Office Furniture is a specialized physical &amp; institutional furniture catalog. To inquire about availability, bulk pricing, or place an order:
            </p>

            <div className="inquiry-contact-links">
              <a href="tel:+917902500494" className="inquiry-btn">
                <Phone size={16} />
                <span>Call Showroom (+91 7902500494)</span>
              </a>

              <a
                href={`https://wa.me/917902500494?text=${encodeURIComponent(`Hello, I am inquiring about: ${product.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inquiry-btn whatsapp"
              >
                <MessageCircle size={16} />
                <span>WhatsApp (+91 7902500494)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
