import React from 'react';
import { Link } from 'react-router-dom';
import { Armchair, MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand Col */}
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

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/catalog">Browse Full Catalog</Link></li>
            <li><Link to="/catalog?stock_status=in_stock">In-Stock Selections</Link></li>
            <li><Link to="/admin/login">Admin Access Portal</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Key Categories</h4>
          <ul className="footer-links">
            <li><Link to="/catalog">Executive & Normal Tables</Link></li>
            <li><Link to="/catalog">Office & Visitors Chairs</Link></li>
            <li><Link to="/catalog">Modern Sofas & Lounges</Link></li>
            <li><Link to="/catalog">Cafe & Plastic Chairs</Link></li>
            <li><Link to="/catalog">Wardrobes & Storage</Link></li>
          </ul>
        </div>

        {/* Showroom & Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Showroom & Inquiries</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Commercial Hub, Times Furniture District</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:+917902500494" style={{ color: 'inherit' }}>+91 7902500494</a>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>inquiries@timesofficefurniture.com</span>
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
            &copy; {new Date().getFullYear()} Times Office Furniture. All rights reserved. Catalog only &mdash; no online checkout.
          </p>
          <div className="footer-disclaimer">
            <span>Powered by Django REST Framework &amp; React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

