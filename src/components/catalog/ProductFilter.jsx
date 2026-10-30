import React from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import './ProductFilter.css';

export const ProductFilter = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  selectedStock,
  onSelectStock,
  selectedOrdering,
  onSelectOrdering,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <aside className="catalog-filters">
      <div className="filters-header">
        <div className="filters-title-wrap">
          <SlidersHorizontal size={18} className="filters-header-icon" />
          <h3 className="filters-heading">Filter & Refine</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
            title="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Categories</h4>
        <div className="category-pills">
          <button
            type="button"
            className={`category-pill ${!selectedCategory ? 'active' : ''}`}
            onClick={() => onSelectCategory('')}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${String(selectedCategory) === String(cat.id) ? 'active' : ''}`}
              onClick={() => onSelectCategory(String(cat.id))}
            >
              <span>{cat.name}</span>
              {String(selectedCategory) === String(cat.id) && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Availability</h4>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="stock_status"
              value=""
              checked={!selectedStock}
              onChange={() => onSelectStock('')}
            />
            <span className="radio-custom" />
            <span className="radio-text">All Items</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="stock_status"
              value="in_stock"
              checked={selectedStock === 'in_stock'}
              onChange={() => onSelectStock('in_stock')}
            />
            <span className="radio-custom" />
            <span className="radio-text">In Stock Only</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="stock_status"
              value="out_of_stock"
              checked={selectedStock === 'out_of_stock'}
              onChange={() => onSelectStock('out_of_stock')}
            />
            <span className="radio-custom" />
            <span className="radio-text">Out of Stock</span>
          </label>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Sort By</h4>
        <div className="select-wrap">
          <select
            className="filter-select"
            value={selectedOrdering}
            onChange={(e) => onSelectOrdering(e.target.value)}
          >
            <option value="-created_at">Newest Arrivals</option>
            <option value="created_at">Oldest Additions</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

