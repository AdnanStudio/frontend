import api from './api';

const studentService = {
  // Get all students
  getAllStudents: async (params) => {
    const response = await api.get('/students', { params });
    return response.data;
  },

  // Get single student
  getStudent: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Create student
  createStudent: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  // Update student
  updateStudent: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },

  // Delete student
  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },

  // Get students by class
  getStudentsByClass: async (className, section) => {
    const response = await api.get(`/students/class/${className}/${section}`);
    return response.data;
  },

  // Toggle student status
  toggleStudentStatus: async (id) => {
    const response = await api.put(`/students/${id}/status`);
    return response.data;
  },

  // ✅ Get logged-in student profile
  getStudentProfile: async () => {
    try {
      const response = await api.get('/students/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to fetch student profile'
      };
    }
  }
};

export default studentService;

// Named export (optional but convenient)
export const getStudentProfile = studentService.getStudentProfile;



// import api from './api';

// const studentService = {
//   // Get all students
//   getAllStudents: async (params) => {
//     const response = await api.get('/students', { params });
//     return response.data;
//   },

//   // Get single student
//   getStudent: async (id) => {
//     const response = await api.get(`/students/${id}`);
//     return response.data;
//   },

//   // Create student
//   createStudent: async (studentData) => {
//     const response = await api.post('/students', studentData);
//     return response.data;
//   },

//   // Update student
//   updateStudent: async (id, studentData) => {
//     const response = await api.put(`/students/${id}`, studentData);
//     return response.data;
//   },

//   // Delete student
//   deleteStudent: async (id) => {
//     const response = await api.delete(`/students/${id}`);
//     return response.data;
//   },

//   // Get students by class
//   getStudentsByClass: async (className, section) => {
//     const response = await api.get(`/students/class/${className}/${section}`);
//     return response.data;
//   },

//   // Toggle student status
//   toggleStudentStatus: async (id) => {
//     const response = await api.put(`/students/${id}/status`);
//     return response.data;
//   }
// };

// export default studentService;