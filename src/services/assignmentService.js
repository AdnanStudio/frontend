import api from './api';

const assignmentService = {
  // Create assignment
  createAssignment: async (formData) => {
    const response = await api.post('/assignments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Get all assignments (admin/teacher)
  getAllAssignments: async (params = {}) => {
    const response = await api.get('/assignments', { params });
    return response.data;
  },

  // Get student assignments
  getStudentAssignments: async () => {
    const response = await api.get('/assignments/student/my-assignments');
    return response.data;
  },

  // Get single assignment
  getAssignmentById: async (id) => {
    const response = await api.get(`/assignments/${id}`);
    return response.data;
  },

  // Update assignment
  updateAssignment: async (id, formData) => {
    const response = await api.put(`/assignments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Delete assignment
  deleteAssignment: async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  },

  // Submit marks
  submitMarks: async (id, data) => {
    const response = await api.post(`/assignments/${id}/marks`, data);
    return response.data;
  }
};

export default assignmentService;