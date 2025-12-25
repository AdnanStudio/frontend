import api from './api';

const SUBJECT_API = '/subjects';

// ============ Get All Subjects ============
export const getAllSubjects = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.isActive !== undefined) queryParams.append('isActive', filters.isActive);
    if (filters.class) queryParams.append('class', filters.class);

    const response = await api.get(`${SUBJECT_API}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching subjects' };
  }
};

// ============ Get Single Subject ============
export const getSubjectById = async (id) => {
  try {
    const response = await api.get(`${SUBJECT_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching subject' };
  }
};

// ============ Create Subject ============
export const createSubject = async (subjectData) => {
  try {
    const response = await api.post(SUBJECT_API, subjectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating subject' };
  }
};

// ============ Update Subject ============
export const updateSubject = async (id, subjectData) => {
  try {
    const response = await api.put(`${SUBJECT_API}/${id}`, subjectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating subject' };
  }
};

// ============ Delete Subject ============
export const deleteSubject = async (id) => {
  try {
    const response = await api.delete(`${SUBJECT_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting subject' };
  }
};

// ============ Get Subjects by Class ============
export const getSubjectsByClass = async (classId) => {
  try {
    const response = await api.get(`${SUBJECT_API}/class/${classId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching subjects' };
  }
};

// ============ Get Subjects by Teacher ============
export const getSubjectsByTeacher = async (teacherId) => {
  try {
    const response = await api.get(`${SUBJECT_API}/teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching subjects' };
  }
};

// ============ Toggle Subject Status ============
export const toggleSubjectStatus = async (id) => {
  try {
    const response = await api.patch(`${SUBJECT_API}/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error toggling subject status' };
  }
};

const subjectService = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsByClass,
  getSubjectsByTeacher,
  toggleSubjectStatus
};

export default subjectService;