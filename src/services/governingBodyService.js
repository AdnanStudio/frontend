import api from './api';

const governingBodyService = {
  // Get all members (Public API)
  getAllMembers: async () => {
    try {
      const response = await api.get('/governing-body');
      return response.data;
    } catch (error) {
      console.error('Get All Members Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get date range (Public API)
  getDateRange: async () => {
    try {
      const response = await api.get('/governing-body/date-range');
      return response.data;
    } catch (error) {
      console.error('Get Date Range Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get member by ID (Public API)
  getMemberById: async (id) => {
    try {
      const response = await api.get(`/governing-body/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get Member By ID Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create member (Admin API)
  createMember: async (formData) => {
    try {
      const response = await api.post('/governing-body', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create Member Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update member (Admin API)
  updateMember: async (id, formData) => {
    try {
      const response = await api.put(`/governing-body/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update Member Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete member (Admin API)
  deleteMember: async (id) => {
    try {
      const response = await api.delete(`/governing-body/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete Member Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update date range (Admin API)
  updateDateRange: async (dateRange) => {
    try {
      const response = await api.put('/governing-body/date-range/update', dateRange);
      return response.data;
    } catch (error) {
      console.error('Update Date Range Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default governingBodyService;