import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const { login, register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      if (isRegister) {
        if (!name || !email || !password) {
          return;
        }
        const result = await register(name, email, password);
        if (result.success) {
          // Auto login after registration
          await login(email, password);
          navigate('/');
        }
      } else {
        if (!email || !password) {
          return;
        }
        const result = await login(email, password);
        if (result.success) {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>{isRegister ? 'Create Account' : 'Welcome to EcomHub'}</h1>
          <p>{isRegister ? 'Sign up for an account' : 'Sign in to your account'}</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              {isRegister ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                onClick={() => {
                  setIsRegister(!isRegister);
                  clearError();
                }}
                className="toggle-btn"
              >
                {isRegister ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {!isRegister && (
            <div className="login-benefits">
              <h3>Benefits of Signing In</h3>
              <ul>
                <li>✓ Save your wishlist</li>
                <li>✓ Quick checkout</li>
                <li>✓ Track your orders</li>
                <li>✓ Exclusive deals</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
