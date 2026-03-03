import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { mockOAuthLogin } from '../services/oauthService';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock local authentication
    try {
      const { user, token } = mockOAuthLogin(email);
      login(user, token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleOAuthLogin = () => {
    try {
      const { user, token } = mockOAuthLogin('oauth.user@example.com');
      login(user, token);
      navigate('/');
    } catch (err) {
      setError('OAuth login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome to EcomHub</h1>
          <p>Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          <div className="divider">or</div>

          <button onClick={handleOAuthLogin} className="oauth-btn google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C15.503,1.235,13.927,0.5,12,0.5 c-6.563,0-11.868,5.305-11.868,11.868s5.305,11.868,11.868,11.868c6.844,0,12.645-5.74,12.645-12.501H12.545z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="signup-link">
            <p>Don't have an account? <a href="#signup">Sign up</a></p>
          </div>
        </div>

        <div className="login-benefits">
          <h2>Benefits of Signing In</h2>
          <ul>
            <li>✓ Save your wishlist</li>
            <li>✓ Quick checkout</li>
            <li>✓ Track your orders</li>
            <li>✓ Exclusive deals</li>
            <li>✓ Personalized recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
