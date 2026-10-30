import React, { forwardRef } from 'react';
import './Input.css';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`input-wrapper ${Icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {Icon && <Icon className="input-icon" size={18} />}
        <input
          ref={ref}
          id={inputId}
          className="form-input"
          {...props}
        />
      </div>

      {error ? (
        <p className="form-error">{error}</p>
      ) : helperText ? (
        <p className="form-helper">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

