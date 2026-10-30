import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Armchair, Menu, X, Shield, LayoutDashboard, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrap">
            <Armchair className="logo-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">TIMES</span>
            <span className="brand-sub">OFFICE FURNITURE</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Furniture Catalog
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              icon={LayoutDashboard}
              onClick={() => navigate('/admin/dashboard')}
            >
              Dashboard ({user?.username || 'Admin'})
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              icon={Shield}
              onClick={() => navigate('/admin/login')}
            >
              Admin Portal
            </Button>
          )}

          <Button
            variant="accent"
            size="sm"
            icon={Compass}
            onClick={() => navigate('/catalog')}
            className="browse-catalog-btn"
          >
            Browse Catalog
          </Button>

          {/* Mobile Menu Trigger */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Furniture Catalog
            </NavLink>

            <div className="mobile-drawer-divider" />

            {isAuthenticated ? (
              <Button
                variant="primary"
                icon={LayoutDashboard}
                onClick={() => {
                  closeMobileMenu();
                  navigate('/admin/dashboard');
                }}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button
                variant="outline"
                icon={Shield}
                onClick={() => {
                  closeMobileMenu();
                  navigate('/admin/login');
                }}
              >
                Admin Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

