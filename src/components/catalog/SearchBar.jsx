import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search desks, chairs, sofas, tables...',
  className = '',
}) => {
  return (
    <div className={`search-bar-wrap ${className}`}>
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search furniture catalog"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

