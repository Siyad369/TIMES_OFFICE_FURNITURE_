import React from 'react';
import './Skeleton.css';

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-sm)',
  className = '',
}) => {
  return (
    <div
      className={`skeleton-pulse ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton height="220px" borderRadius="var(--radius-md) var(--radius-md) 0 0" />
      <div className="product-card-skeleton-content">
        <Skeleton width="40%" height="0.8rem" />
        <Skeleton width="80%" height="1.2rem" />
        <Skeleton width="60%" height="0.9rem" />
        <div className="product-card-skeleton-footer">
          <Skeleton width="35%" height="1.4rem" />
          <Skeleton width="30%" height="2rem" borderRadius="var(--radius-md)" />
        </div>
      </div>
    </div>
  );
};

