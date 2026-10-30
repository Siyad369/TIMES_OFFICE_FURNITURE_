import React from 'react';
import { Menu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import './AdminHeader.css';

export const AdminHeader = ({
  title,
  subtitle,
  onOpenSidebar,
  showAddButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-sidebar-toggle"
          onClick={onOpenSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="admin-header-titles">
          <h1 className="admin-page-title">{title}</h1>
          {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="admin-header-right">
        {showAddButton && (
          <Button
            variant="accent"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/admin/products/new')}
          >
            Add Product
          </Button>
        )}
      </div>
    </header>
  );
};

