import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RoleDashboard.css';

const StaffDashboard = () => {
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
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Staff Dashboard - {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="current-time">{currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="profile-card">
          <img src={user?.profileImage} alt={user?.name} />
          <h3>{user?.name}</h3>
          <p className="role-badge staff-badge">Staff</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <i className="fas fa-tasks" style={{ color: '#2196F3' }}></i>
          </div>
          <div className="stat-info">
            <h3>Tasks</h3>
            <p className="stat-number">12</p>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e5f5' }}>
            <i className="fas fa-calendar-check" style={{ color: '#9c27b0' }}></i>
          </div>
          <div className="stat-info">
            <h3>Attendance</h3>
            <p className="stat-number">95%</p>
            <span className="stat-label">This Month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>
            <i className="fas fa-clipboard-list" style={{ color: '#ff9800' }}></i>
          </div>
          <div className="stat-info">
            <h3>Reports</h3>
            <p className="stat-number">8</p>
            <span className="stat-label">Submitted</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <i className="fas fa-bell" style={{ color: '#4caf50' }}></i>
          </div>
          <div className="stat-info">
            <h3>Notifications</h3>
            <p className="stat-number">5</p>
            <span className="stat-label">Unread</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="content-card">
          <h2><i className="fas fa-tasks"></i> Recent Tasks</h2>
          <ul className="task-list">
            <li>
              <span className="task-title">Update student records</span>
              <span className="task-status pending">Pending</span>
            </li>
            <li>
              <span className="task-title">Prepare monthly report</span>
              <span className="task-status in-progress">In Progress</span>
            </li>
            <li>
              <span className="task-title">Schedule maintenance</span>
              <span className="task-status completed">Completed</span>
            </li>
          </ul>
        </div>

        <div className="content-card">
          <h2><i className="fas fa-bell"></i> Notifications</h2>
          <ul className="notification-list">
            <li>
              <div className="notification-icon">📢</div>
              <div className="notification-content">
                <p>Staff meeting scheduled for tomorrow</p>
                <span>2 hours ago</span>
              </div>
            </li>
            <li>
              <div className="notification-icon">📝</div>
              <div className="notification-content">
                <p>New policy document uploaded</p>
                <span>5 hours ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;