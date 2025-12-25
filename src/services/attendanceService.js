import api from './api';

const attendanceService = {
  // Mark single attendance
  markAttendance: async (attendanceData) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  },

  // Mark bulk attendance
  markBulkAttendance: async (bulkData) => {
    const response = await api.post('/attendance/bulk', bulkData);
    return response.data;
  },

  // Mark all students as present
  markAllPresent: async (classId, date) => {
    const response = await api.post('/attendance/mark-all-present', {
      classId,
      date
    });
    return response.data;
  },

  // Get attendance by class
  getAttendanceByClass: async (classId, date) => {
    const response = await api.get(`/attendance/class/${classId}`, {
      params: { date }
    });
    return response.data;
  },

  // Get attendance by student
  getAttendanceByStudent: async (studentId, startDate, endDate) => {
    const response = await api.get(`/attendance/student/${studentId}`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Get attendance report
  getAttendanceReport: async (classId, startDate, endDate) => {
    const response = await api.get(`/attendance/report/${classId}`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Update attendance
  updateAttendance: async (attendanceId, updateData) => {
    const response = await api.put(`/attendance/${attendanceId}`, updateData);
    return response.data;
  },

  // Delete attendance
  deleteAttendance: async (attendanceId) => {
    const response = await api.delete(`/attendance/${attendanceId}`);
    return response.data;
  }
};

export default attendanceService;