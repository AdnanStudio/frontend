import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllUsers, deleteUser } from '../services/userService';
import './ManageUsers.css';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(selectedRole);
      setUsers(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.message || 'Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role) => {
    const colors = {
      staff: 'badge-primary',
      librarian: 'badge-success',
      accountant: 'badge-warning'
    };
    return colors[role] || 'badge-secondary';
  };

  return (
    <div className="manage-users-container">
      <div className="page-header">
        <h1>Manage Users</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/dashboard/users/add')}
        >
          <i className="fas fa-plus"></i> Add New User
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="role-filter">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="staff">Staff</option>
            <option value="librarian">Librarian</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="no-data">
              <i className="fas fa-users"></i>
              <p>No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-image">
                  <img src={user.profileImage} alt={user.name} />
                  <span className={`role-badge ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>

                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className="user-email">
                    <i className="fas fa-envelope"></i> {user.email}
                  </p>
                  {user.phone && (
                    <p className="user-phone">
                      <i className="fas fa-phone"></i> {user.phone}
                    </p>
                  )}
                  <p className="user-status">
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>

                <div className="user-actions">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => navigate(`/dashboard/users/edit/${user._id}`)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user._id, user.name)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;