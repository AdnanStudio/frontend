import api from './api';

const classService = {
  // Get all classes
  getAllClasses: async () => {
    const response = await api.get('/classes');
    return response.data;
  },

  // Get single class
  getClass: async (id) => {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  },

  // Create class
  createClass: async (classData) => {
    const response = await api.post('/classes', classData);
    return response.data;
  },

  // Update class
  updateClass: async (id, classData) => {
    const response = await api.put(`/classes/${id}`, classData);
    return response.data;
  },

  // Delete class
  deleteClass: async (id) => {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  },

  // Add student to class
  addStudentToClass: async (classId, studentId) => {
    const response = await api.post(`/classes/${classId}/students`, { studentId });
    return response.data;
  },

  // Remove student from class
  removeStudentFromClass: async (classId, studentId) => {
    const response = await api.delete(`/classes/${classId}/students/${studentId}`);
    return response.data;
  }
};

export default classService;

// Named exports for convenience
export const getAllClasses = classService.getAllClasses;
export const getClasses = classService.getAllClasses;
export const getClass = classService.getClass;
export const createClass = classService.createClass;
export const updateClass = classService.updateClass;
export const deleteClass = classService.deleteClass;
export const addStudentToClass = classService.addStudentToClass;
export const removeStudentFromClass = classService.removeStudentFromClass;