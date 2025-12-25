import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RoleDashboard.css';

const LibrarianDashboard = () => {
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
          <h1>Welcome, {user?.name}! 📚</h1>
          <p>Librarian Dashboard - {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="current-time">{currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="profile-card">
          <img src={user?.profileImage} alt={user?.name} />
          <h3>{user?.name}</h3>
          <p className="role-badge librarian-badge">Librarian</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <i className="fas fa-book" style={{ color: '#2196F3' }}></i>
          </div>
          <div className="stat-info">
            <h3>Total Books</h3>
            <p className="stat-number">2,450</p>
            <span className="stat-label">In Library</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>
            <i className="fas fa-book-open" style={{ color: '#ff9800' }}></i>
          </div>
          <div className="stat-info">
            <h3>Issued Books</h3>
            <p className="stat-number">340</p>
            <span className="stat-label">Currently Out</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffebee' }}>
            <i className="fas fa-exclamation-triangle" style={{ color: '#f44336' }}></i>
          </div>
          <div className="stat-info">
            <h3>Overdue</h3>
            <p className="stat-number">15</p>
            <span className="stat-label">Books</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <i className="fas fa-undo" style={{ color: '#4caf50' }}></i>
          </div>
          <div className="stat-info">
            <h3>Returns</h3>
            <p className="stat-number">28</p>
            <span className="stat-label">Today</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="content-card">
          <h2><i className="fas fa-clock"></i> Overdue Books</h2>
          <ul className="book-list">
            <li>
              <span className="book-title">The Great Gatsby</span>
              <span className="book-status overdue">5 days overdue</span>
            </li>
            <li>
              <span className="book-title">To Kill a Mockingbird</span>
              <span className="book-status overdue">2 days overdue</span>
            </li>
            <li>
              <span className="book-title">1984</span>
              <span className="book-status overdue">8 days overdue</span>
            </li>
          </ul>
        </div>

        <div className="content-card">
          <h2><i className="fas fa-list"></i> Recent Activities</h2>
          <ul className="notification-list">
            <li>
              <div className="notification-icon">📖</div>
              <div className="notification-content">
                <p>New book added to collection</p>
                <span>1 hour ago</span>
              </div>
            </li>
            <li>
              <div className="notification-icon">✅</div>
              <div className="notification-content">
                <p>Book returned by John Doe</p>
                <span>3 hours ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;