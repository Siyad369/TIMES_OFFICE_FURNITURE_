import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Armchair,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Clock,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import './WelcomePage.css';

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="welcome-hero">
        <div className="container hero-grid">
          {/* Left Text */}
          <div className="hero-text-content">
            <div className="hero-tag">
              <Sparkles size={16} className="hero-tag-icon" />
              <span>Premium Office &amp; Commercial Furniture</span>
            </div>

            <h1 className="hero-title">
              Crafting Workspaces of <span className="highlight-text">Distinction</span> &amp; Comfort.
            </h1>

            <p className="hero-subtitle">
              Welcome to <strong>Times Office Furniture</strong>. Explore our curated catalog of executive tables, ergonomic chairs, luxury lounge sofas, and modern conference suites designed to elevate professional productivity.
            </p>

            {/* Main Action Buttons */}
            <div className="hero-action-buttons">
              <Button
                variant="accent"
                size="lg"
                icon={Compass}
                onClick={() => navigate('/catalog')}
                className="hero-guest-btn"
              >
                Continue as Guest
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={ShieldCheck}
                onClick={() => navigate('/admin/login')}
                className="hero-admin-btn"
              >
                Login as Admin
              </Button>
            </div>

            {/* Quick Guarantees */}
            <div className="hero-guarantees">
              <div className="guarantee-item">
                <CheckCircle2 size={16} className="guarantee-icon" />
                <span>Commercial Grade Durability</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} className="guarantee-icon" />
                <span>Ergonomically Certified</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} className="guarantee-icon" />
                <span>Direct Showroom Inquiries</span>
              </div>
            </div>
          </div>

          {/* Right Visual Imagery Showcase */}
          <div className="hero-visual-card">
            <div className="visual-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Times Office Furniture Modern Executive Workspace"
                className="hero-primary-img"
              />
              <div className="hero-floating-badge top-badge">
                <Award size={18} className="badge-icon" />
                <div>
                  <span className="badge-title">9 Exclusive Categories</span>
                  <span className="badge-sub">Chairs, Sofas, Tables &amp; Wardrobes</span>
                </div>
              </div>

              <div className="hero-floating-badge bottom-badge">
                <Clock size={18} className="badge-icon" />
                <div>
                  <span className="badge-title">Real-Time Stock Status</span>
                  <span className="badge-sub">Updated live from backend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="welcome-features">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-label">Why Choose Times Office Furniture</span>
            <h2 className="section-heading">Designed for Every Modern Office Environment</h2>
            <p className="section-desc">
              Whether you are furnishing a high-growth startup, an executive boardroom, or a commercial institution, our catalog offers reliable, high-end furniture.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Armchair size={26} />
              </div>
              <h3 className="feature-title">Ergonomic Seating</h3>
              <p className="feature-text">
                High-back mesh chairs, lumbar-supporting task chairs, and comfortable visitors seating engineered for long working hours.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Layers size={26} />
              </div>
              <h3 className="feature-title">Executive &amp; Normal Tables</h3>
              <p className="feature-text">
                Sturdy workstations, expansive manager desks, and modular meeting tables with clean cable management channels.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Award size={26} />
              </div>
              <h3 className="feature-title">Commercial Quality</h3>
              <p className="feature-text">
                Heavy-duty mechanisms, high-density foam cushions, premium upholstery, and reinforced steel-frame structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="welcome-cta">
        <div className="container">
          <div className="cta-banner-box">
            <div className="cta-text">
              <h2 className="cta-title">Ready to explore our full furniture collection?</h2>
              <p className="cta-sub">
                Browse our live digital catalog as a guest with instant category filtering and real-time stock details.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/catalog" className="btn btn-accent btn-lg">
                <span>Browse Catalog</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

