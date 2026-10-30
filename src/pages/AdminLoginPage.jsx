import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Armchair, Lock, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import './AdminLoginPage.css';

export const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(username.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error('Admin login error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('Invalid admin credentials. Please verify your username and password.');
      } else {
        setError('Unable to authenticate at this time. Please check your backend connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        {/* Top back link */}
        <Link to="/" className="login-back-link">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Brand header */}
        <div className="login-header">
          <div className="login-logo-wrap">
            <Armchair size={28} className="login-logo-icon" />
          </div>
          <h1 className="login-title">Admin Management</h1>
          <p className="login-subtitle">
            Sign in to access product catalog controls, stock status updates, and product management.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <Alert type="danger" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <Input
            label="Admin Username"
            name="username"
            type="text"
            icon={User}
            placeholder="Enter admin username"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            placeholder="Enter admin password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={ShieldCheck}
            isLoading={isLoading}
            className="login-submit-btn"
          >
            Sign In to Dashboard
          </Button>
        </form>

        <div className="login-card-footer">
          <p className="login-footer-text">
            Protected area for authorized Times Office Furniture staff.
          </p>
        </div>
      </div>
    </div>
  );
};

