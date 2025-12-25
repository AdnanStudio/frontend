import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RoleDashboard.css';

const AccountantDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="role-dashboard">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome, {user?.name}! 💰</h1>
          <p>Accountant Dashboard - {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="current-time">{currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="profile-card">
          <img src={user?.profileImage} alt={user?.name} />
          <h3>{user?.name}</h3>
          <p className="role-badge accountant-badge">Accountant</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <i className="fas fa-dollar-sign" style={{ color: '#4caf50' }}></i>
          </div>
          <div className="stat-info">
            <h3>Revenue</h3>
            <p className="stat-number">$45,280</p>
            <span className="stat-label">This Month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>
            <i className="fas fa-money-bill-wave" style={{ color: '#ff9800' }}></i>
</div>
<div className="stat-info">
<h3>Expenses</h3>
<p className="stat-number">$12,540</p>
<span className="stat-label">This Month</span>
</div>
</div>
    <div className="stat-card">
      <div className="stat-icon" style={{ background: '#e3f2fd' }}>
        <i className="fas fa-receipt" style={{ color: '#2196F3' }}></i>
      </div>
      <div className="stat-info">
        <h3>Pending Fees</h3>
        <p className="stat-number">68</p>
        <span className="stat-label">Students</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon" style={{ background: '#f3e5f5' }}>
        <i className="fas fa-file-invoice" style={{ color: '#9c27b0' }}></i>
      </div>
      <div className="stat-info">
        <h3>Invoices</h3>
        <p className="stat-number">24</p>
        <span className="stat-label">Processed Today</span>
      </div>
    </div>
  </div>

  <div className="dashboard-content-grid">
    <div className="content-card">
      <h2><i className="fas fa-exclamation-circle"></i> Pending Payments</h2>
      <ul className="payment-list">
        <li>
          <span className="payment-title">John Doe - Tuition Fee</span>
          <span className="payment-amount">$500</span>
        </li>
        <li>
          <span className="payment-title">Jane Smith - Library Fine</span>
          <span className="payment-amount">$25</span>
        </li>
        <li>
          <span className="payment-title">Mike Johnson - Lab Fee</span>
          <span className="payment-amount">$150</span>
        </li>
      </ul>
    </div>

    <div className="content-card">
      <h2><i className="fas fa-chart-line"></i> Recent Transactions</h2>
      <ul className="notification-list">
        <li>
          <div className="notification-icon">💳</div>
          <div className="notification-content">
            <p>Payment received from Alice Brown</p>
            <span>$800 - 2 hours ago</span>
          </div>
        </li>
        <li>
          <div className="notification-icon">📝</div>
          <div className="notification-content">
            <p>Invoice generated for Class 10A</p>
            <span>4 hours ago</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
);
};
export default AccountantDashboard;