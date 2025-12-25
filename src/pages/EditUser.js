import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserById, updateUser, uploadProfilePic } from '../services/userService';
import './AddUser.css';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff',
    phone: '',
    address: '',
    dateOfBirth: '',
    isActive: true
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      const user = response.data;
      
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'staff',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        isActive: user.isActive
      });
      
      setImagePreview(user.profileImage);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch user');
      navigate('/dashboard/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      // Update user data
      await updateUser(id, formData);

      // Upload new profile picture if selected
      if (imageFile) {
        await uploadProfilePic(id, imageFile);
      }

      toast.success('User updated successfully');
      navigate('/dashboard/users');
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i> Loading...
      </div>
    );
  }

  return (
    <div className="add-user-container">
      <div className="page-header">
        <h1>Edit User</h1>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/dashboard/users')}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="profile-upload-section">
            <div className="profile-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="placeholder-image">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <div className="upload-button-wrapper">
              <label htmlFor="profileImage" className="btn btn-outline">
                <i className="fas fa-camera"></i> Change Profile Picture
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <p className="upload-hint">Max size: 5MB (JPG, PNG, GIF)</p>
            </div>
          </div>

          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <label>Role <span className="required">*</span></label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled
              >
                <option value="staff">Staff</option>
                <option value="librarian">Librarian</option>
                <option value="accountant">Accountant</option>
              </select>
              <p className="field-hint">Role cannot be changed</p>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label htmlFor="isActive">Active User</label>
              </div>
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter full address"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard/users')}
              disabled={updating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> Update User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;