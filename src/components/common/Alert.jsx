import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import './Alert.css';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  danger: XCircle,
};

export const Alert = ({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const Icon = iconMap[type] || Info;

  return (
    <div className={`alert-box alert-${type} ${className}`} role="alert">
      <Icon className="alert-icon" size={20} />
      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        <div className="alert-message">{children}</div>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

