import api from './api';

const teacherService = {
  // Get all teachers
  getAllTeachers: async (params) => {
    const response = await api.get('/teachers', { params });
    return response.data;
  },

  // Get single teacher
  getTeacher: async (id) => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  },

  // Create teacher
  createTeacher: async (teacherData) => {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  },

  // Update teacher
  updateTeacher: async (id, teacherData) => {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  },

  // Delete teacher
  deleteTeacher: async (id) => {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  },

  // Get teachers by subject
  getTeachersBySubject: async (subject) => {
    const response = await api.get(`/teachers/subject/${subject}`);
    return response.data;
  },

  // ✅ Get logged-in teacher profile
  getTeacherProfile: async () => {
    try {
      const response = await api.get('/teachers/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to fetch teacher profile'
      };
    }
  }
};

export default teacherService;

// Named exports for convenience
export const getAllTeachers = teacherService.getAllTeachers;
export const getTeachers = teacherService.getAllTeachers;
export const getTeacher = teacherService.getTeacher;
export const createTeacher = teacherService.createTeacher;
export const updateTeacher = teacherService.updateTeacher;
export const deleteTeacher = teacherService.deleteTeacher;
export const getTeachersBySubject = teacherService.getTeachersBySubject;
export const getTeacherProfile = teacherService.getTeacherProfile;


// import api from './api';

// const teacherService = {
//   // Get all teachers
//   getAllTeachers: async (params) => {
//     const response = await api.get('/teachers', { params });
//     return response.data;
//   },

//   // Get single teacher
//   getTeacher: async (id) => {
//     const response = await api.get(`/teachers/${id}`);
//     return response.data;
//   },

//   // Create teacher
//   createTeacher: async (teacherData) => {
//     const response = await api.post('/teachers', teacherData);
//     return response.data;
//   },

//   // Update teacher
//   updateTeacher: async (id, teacherData) => {
//     const response = await api.put(`/teachers/${id}`, teacherData);
//     return response.data;
//   },

//   // Delete teacher
//   deleteTeacher: async (id) => {
//     const response = await api.delete(`/teachers/${id}`);
//     return response.data;
//   },

//   // Get teachers by subject
//   getTeachersBySubject: async (subject) => {
//     const response = await api.get(`/teachers/subject/${subject}`);
//     return response.data;
//   }
// };

// export default teacherService;

// // Named exports for convenience
// export const getAllTeachers = teacherService.getAllTeachers;
// export const getTeachers = teacherService.getAllTeachers;
// export const getTeacher = teacherService.getTeacher;
// export const createTeacher = teacherService.createTeacher;
// export const updateTeacher = teacherService.updateTeacher;
// export const deleteTeacher = teacherService.deleteTeacher;
// export const getTeachersBySubject = teacherService.getTeachersBySubject;