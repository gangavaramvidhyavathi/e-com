import React from 'react';
import useAuthStore from '../store/authStore';
import '../styles/AccountPage.css';

const AccountPage = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="not-authenticated">
            <h2>Please log in to view your account</h2>
            <p>You need to be authenticated to access this page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <img src={user.avatar} alt={user.name} className="avatar-large" />
          <div className="user-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="account-sections">
          <section className="account-section">
            <h2>Profile Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name</label>
                <p>{user.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>User ID</label>
                <p>{user.id}</p>
              </div>
            </div>
          </section>

          <section className="account-section">
            <h2>Quick Links</h2>
            <div className="quick-links">
              <button className="link-btn">View Orders</button>
              <button className="link-btn">Saved Addresses</button>
              <button className="link-btn">Payment Methods</button>
              <button className="link-btn">Settings</button>
            </div>
          </section>

          <section className="account-section">
            <h2>Recent Activity</h2>
            <p className="placeholder-text">You haven't made any purchases yet.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
