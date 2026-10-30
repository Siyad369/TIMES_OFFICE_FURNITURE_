import React from 'react';
import { Link } from 'react-router-dom';
import { Armchair, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand Col - Hidden on mobile */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="logo-icon-wrap">
              <Armchair className="logo-icon" size={24} />
            </div>
            <div className="brand-text">
              <span className="brand-name text-white">TIMES</span>
              <span className="brand-sub">OFFICE FURNITURE</span>
            </div>
          </div>
          <p className="footer-desc">
            Crafting ergonomic, modern, and high-durability furniture solutions for contemporary workspaces, executive suites, conference halls, and modern offices.
          </p>
          <div className="footer-badge">
            Official Commercial Catalog
          </div>
        </div>

        {/* Quick Links - Hidden on mobile */}
        <div className="footer-col nav-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/catalog">Browse Full Catalog</Link></li>
            <li><Link to="/catalog?stock_status=in_stock">In-Stock Selections</Link></li>
            <li><Link to="/admin/login">Admin Access Portal</Link></li>
          </ul>
        </div>

        {/* Categories - Hidden on mobile */}
        <div className="footer-col categories-col">
          <h4 className="footer-heading">Key Categories</h4>
          <ul className="footer-links">
            <li><Link to="/catalog">Executive &amp; Normal Tables</Link></li>
            <li><Link to="/catalog">Office &amp; Visitors Chairs</Link></li>
            <li><Link to="/catalog">Modern Sofas &amp; Lounges</Link></li>
            <li><Link to="/catalog">Cafe &amp; Plastic Chairs</Link></li>
            <li><Link to="/catalog">Wardrobes &amp; Storage</Link></li>
          </ul>
        </div>

        {/* Showroom & Inquiries - EXCLUSIVE on mobile */}
        <div className="footer-col contact-col">
          <div className="mobile-showroom-brand">
            <div className="logo-icon-wrap">
              <Armchair className="logo-icon" size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-name text-white">TIMES</span>
              <span className="brand-sub">OFFICE FURNITURE</span>
            </div>
          </div>

          <h4 className="footer-heading">Showroom &amp; Inquiries</h4>
          <p className="mobile-showroom-tagline">
            Visit our commercial display or contact our sales desk directly:
          </p>

          <ul className="contact-list">
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:+917902500494" className="contact-highlight-link">
                +91 7902500494
              </a>
            </li>
            <li>
              <MessageCircle size={18} className="contact-icon whatsapp-icon" />
              <a
                href="https://wa.me/917902500494?text=Hello%20Times%20Office%20Furniture,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="contact-highlight-link"
              >
                Chat on WhatsApp (+91 7902500494)
              </a>
            </li>
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Commercial Hub, Times Furniture District</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:inquiries@timesofficefurniture.com" style={{ color: 'inherit' }}>
                inquiries@timesofficefurniture.com
              </a>
            </li>
            <li>
              <Clock size={18} className="contact-icon" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Times Office Furniture. All rights reserved.
          </p>
          <div className="footer-disclaimer">
            <span>Official Showroom Catalog</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
