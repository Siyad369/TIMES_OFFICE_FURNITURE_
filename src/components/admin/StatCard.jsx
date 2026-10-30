import React from 'react';
import './StatCard.css';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  helperText,
}) => {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon-wrap">
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {helperText && <div className="stat-card-helper">{helperText}</div>}
    </div>
  );
};

