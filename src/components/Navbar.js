import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import notificationService from '../services/notificationService';
import { Bell, LogOut, ArrowLeft } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  // Check if we're on dashboard home
  const isDashboardHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const data = await notificationService.getNotifications();
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        {/* Left Section - Back Button */}
        <div className="navbar-left">
          {!isDashboardHome && (
            <button style={{marginTop: 20, marginLeft: 10}} className="navbar-btn back-btn" onClick={handleBack} title="Back to Dashboard">
              <ArrowLeft size={20} />
              <span className="back-text">Back</span>
            </button>
          )}
        </div>

        {/* Center Logo Section */}
        <div className="navbar-center">
          <div className="school-logo" onClick={handleLogoClick}>
            <div className="logo-circle">
              <img
                src="/logo.png"
                alt="M"
                style={{
                height: '50px',
                width: '50px',
                objectFit: 'contain'
        }}
      />
            </div>
            <div className="logo-text">
              <h4>MALKHANAGAR COLLEGE</h4>
              {/* <p>School Management</p> */}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Notification Button */}
          <button
            className="navbar-btn notification-btn"
            onClick={() => navigate('/dashboard/notifications')}
            title="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* User Profile */}
          <div className="user-profile-section">
            <img
              src={user?.profileImage || 'https://via.placeholder.com/40'}
              alt={user?.name}
            />
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button className="navbar-btn logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={20} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { logout } from '../redux/slices/authSlice';
// import notificationService from '../services/notificationService';
// import { Menu, Bell, LogOut, ArrowLeft } from 'lucide-react';
// import './Navbar.css';

// const Navbar = ({ toggleSidebar }) => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Check if we're on dashboard home
//   const isDashboardHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

//   useEffect(() => {
//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchUnreadCount = async () => {
//     try {
//       const data = await notificationService.getNotifications();
//       setUnreadCount(data.unreadCount);
//     } catch (error) {
//       console.error('Failed to fetch notifications');
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const handleBack = () => {
//     navigate('/dashboard');
//   };

//   const handleLogoClick = () => {
//     navigate('/');
//   };

//   return (
//     <nav className="modern-navbar">
//       <div className="navbar-container">
//         {/* Left Section */}
//         <div className="navbar-left">
//           <div className="school-logo" onClick={handleLogoClick}>
//             <div className="logo-circle">
//               <span>MC</span>
//             </div>
//             <div className="logo-text">
//               <h3>Malkhanagar College</h3>
//               <p>School Management</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="navbar-right">
//           {/* Back Button - Show only when NOT on dashboard home */}
//           {!isDashboardHome && (
//             <button className="navbar-btn back-btn" onClick={handleBack} title="Back to Dashboard">
//               <ArrowLeft size={20} />
//               <span>Back</span>
//             </button>
//           )}

//           {/* Notification Button */}
//           <button
//             className="navbar-btn notification-btn"
//             onClick={() => navigate('/dashboard/notifications')}
//             title="Notifications"
//           >
//             <Bell size={20} />
//             {unreadCount > 0 && (
//               <span className="notification-badge">{unreadCount}</span>
//             )}
//           </button>

//           {/* User Profile */}
//           <div className="user-profile-section">
//             <img
//               src={user?.profileImage || 'https://via.placeholder.com/40'}
//               alt={user?.name}
//             />
//             <div className="user-details">
//               <span className="user-name">{user?.name}</span>
//               <span className="user-role">{user?.role}</span>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <button className="navbar-btn logout-btn" onClick={handleLogout} title="Logout">
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>

//           {/* Mobile Menu Toggle */}
//           <button className="mobile-menu-btn" onClick={toggleSidebar}>
//             <Menu size={24} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;