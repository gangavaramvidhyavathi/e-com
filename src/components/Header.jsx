import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import '../styles/Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛍️ EcomHub</h1>
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            <AiOutlineHome size={24} />
            <span>Home</span>
          </Link>

          <Link to="/wishlist" className="nav-item">
            <AiOutlineHeart size={24} />
            <span>Wishlist</span>
          </Link>

          <Link to="/cart" className="nav-item cart-link">
            <AiOutlineShoppingCart size={24} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <div className="nav-item account-menu">
            <AiOutlineUser size={24} />
            {isAuthenticated ? (
              <div className="dropdown">
                <button className="dropdown-btn">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                  {user.name}
                </button>
                <div className="dropdown-content">
                  <Link to="/account">My Account</Link>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
