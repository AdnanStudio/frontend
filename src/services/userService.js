import api from './api';

// ✅ Create new user (Staff/Librarian/Accountant)
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users/create', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create user' };
  }
};

// ✅ Get all users
export const getAllUsers = async (role = '') => {
  try {
    const response = await api.get(`/users${role ? `?role=${role}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

// ✅ Get single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user' };
  }
};

// ✅ Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

// ✅ Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};

// ✅ Upload profile picture
export const uploadProfilePic = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const response = await api.post(`/users/upload-pic/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to upload profile picture' };
  }
};