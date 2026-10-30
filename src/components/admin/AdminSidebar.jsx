import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Armchair,
  LayoutDashboard,
  Package,
  PlusCircle,
  ExternalLink,
  LogOut,
  X,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand header */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="logo-icon-wrap">
              <Armchair className="logo-icon" size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-name text-white">TIMES</span>
              <span className="brand-sub">ADMIN PORTAL</span>
            </div>
          </Link>

          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* User preview */}
        <div className="sidebar-user-card">
          <div className="user-avatar-circle">
            <UserCheck size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.username || 'Administrator'}</span>
            <span className="user-role">Staff Member</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          <div className="nav-group-label">Management</div>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Package size={20} />
            <span>All Products</span>
          </NavLink>

          <NavLink
            to="/admin/products/new"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <PlusCircle size={20} />
            <span>Add New Product</span>
          </NavLink>

          <div className="nav-group-label" style={{ marginTop: '1.5rem' }}>External</div>
          <Link to="/catalog" className="sidebar-link external-link" target="_blank" rel="noreferrer">
            <ExternalLink size={20} />
            <span>View Live Catalog</span>
          </Link>
        </nav>

        {/* Footer logout */}
        <div className="sidebar-footer">
          <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

