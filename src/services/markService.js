import api from './api';

const markService = {
  // Get all marks
  getAllMarks: async () => {
    const response = await api.get('/marks');
    return response.data;
  },

  // Get marks by student
  getMarksByStudent: async (studentId) => {
    const response = await api.get(`/marks/student/${studentId}`);
    return response.data;
  },

  // Create mark
  createMark: async (markData) => {
    const response = await api.post('/marks', markData);
    return response.data;
  },

  // Update mark
  updateMark: async (id, markData) => {
    const response = await api.put(`/marks/${id}`, markData);
    return response.data;
  },

  // Delete mark
  deleteMark: async (id) => {
    const response = await api.delete(`/marks/${id}`);
    return response.data;
  }
};

export default markService;