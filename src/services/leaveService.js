import api from './api';

const leaveService = {
  // Create leave request
  createLeaveRequest: async (leaveData) => {
    const response = await api.post('/leaves', leaveData);
    return response.data;
  },

  // Get all leave requests (Admin)
  getAllLeaveRequests: async (params = {}) => {
    const response = await api.get('/leaves', { params });
    return response.data;
  },

  // Get my leave requests
  getMyLeaveRequests: async () => {
    const response = await api.get('/leaves/my-leaves');
    return response.data;
  },

  // Approve leave request
  approveLeaveRequest: async (id) => {
    const response = await api.put(`/leaves/${id}/approve`);
    return response.data;
  },

  // Reject leave request
  rejectLeaveRequest: async (id, rejectionReason = '') => {
    const response = await api.put(`/leaves/${id}/reject`, { rejectionReason });
    return response.data;
  },

  // Delete leave request
  deleteLeaveRequest: async (id) => {
    const response = await api.delete(`/leaves/${id}`);
    return response.data;
  }
};

export default leaveService;