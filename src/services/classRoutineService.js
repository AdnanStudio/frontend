import api from './api';

const classRoutineService = {
  // Create new routine (Admin only)
  createRoutine: async (routineData) => {
    try {
      const response = await api.post('/class-routines', routineData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create routine' };
    }
  },

  // Get all routines (filtered by role)
  getAllRoutines: async (params = {}) => {
    try {
      const response = await api.get('/class-routines', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch routines' };
    }
  },

  // Get routine by ID
  getRoutineById: async (id) => {
    try {
      const response = await api.get(`/class-routines/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch routine' };
    }
  },

  // Get routine by class ID
  getRoutineByClass: async (classId, academicYear) => {
    try {
      const params = academicYear ? { academicYear } : {};
      const response = await api.get(`/class-routines/class/${classId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class routine' };
    }
  },

  // Update routine (Admin only)
  updateRoutine: async (id, routineData) => {
    try {
      const response = await api.put(`/class-routines/${id}`, routineData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update routine' };
    }
  },

  // Delete routine (Admin only)
  deleteRoutine: async (id) => {
    try {
      const response = await api.delete(`/class-routines/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete routine' };
    }
  }
};

export default classRoutineService;