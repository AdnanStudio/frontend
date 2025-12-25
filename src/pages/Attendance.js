import React, { useState, useEffect } from 'react';
import classService from '../services/classService';
import studentService from '../services/studentService';
import attendanceService from '../services/attendanceService';
import toast from 'react-hot-toast';
import { 
  ClipboardCheck, 
  Calendar,
  Save,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existingAttendance, setExistingAttendance] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchStudents();
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedClass && selectedSection && selectedDate) {
      checkExistingAttendance();
    }
  }, [selectedClass, selectedSection, selectedDate]);

  const fetchClasses = async () => {
    try {
      const data = await classService.getAllClasses();
      setClasses(data.data);
    } catch (error) {
      toast.error('Failed to fetch classes');
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudentsByClass(selectedClass, selectedSection);
      setStudents(data.data);
      
      // Initialize attendance state
      const initialAttendance = {};
      data.data.forEach(student => {
        initialAttendance[student._id] = 'present';
      });
      setAttendance(initialAttendance);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const checkExistingAttendance = async () => {
    try {
      const classData = classes.find(
        c => c.name === selectedClass && c.section === selectedSection
      );

      if (!classData) return;

      const data = await attendanceService.getAttendanceByClass(classData._id, selectedDate);
      
      if (data.data && data.data.length > 0) {
        setExistingAttendance(data.data);
        
        // Update attendance state with existing data
        const existingData = {};
        data.data.forEach(record => {
          existingData[record.student._id] = record.status;
        });
        setAttendance(prev => ({ ...prev, ...existingData }));
        
        toast.success('Existing attendance loaded');
      } else {
        setExistingAttendance([]);
      }
    } catch (error) {
      console.log('No existing attendance');
      setExistingAttendance([]);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status
    });
  };

  const handleMarkAllPresent = () => {
    const allPresent = {};
    students.forEach(student => {
      allPresent[student._id] = 'present';
    });
    setAttendance(allPresent);
    toast.success('All students marked as present');
  };

  const handleMarkAllAbsent = () => {
    const allAbsent = {};
    students.forEach(student => {
      allAbsent[student._id] = 'absent';
    });
    setAttendance(allAbsent);
    toast.success('All students marked as absent');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection) {
      toast.error('Please select class and section');
      return;
    }

    if (students.length === 0) {
      toast.error('No students found');
      return;
    }

    try {
      setSaving(true);

      // Find the class ID
      const classData = classes.find(
        c => c.name === selectedClass && c.section === selectedSection
      );

      if (!classData) {
        toast.error('Class not found');
        return;
      }

      // Prepare attendance list
      const attendanceList = students.map(student => ({
        studentId: student._id,
        status: attendance[student._id] || 'present',
        remarks: ''
      }));

      await attendanceService.markBulkAttendance({
        classId: classData._id,
        date: selectedDate,
        attendanceList
      });

      toast.success('Attendance saved successfully!');
      
      // Refresh existing attendance
      checkExistingAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    const leave = Object.values(attendance).filter(status => status === 'leave').length;

    return { total, present, absent, late, leave };
  };

  const stats = getAttendanceStats();

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div className="header-left">
          <ClipboardCheck size={32} />
          <div>
            <h1>Mark Attendance</h1>
            <p>Record daily student attendance</p>
          </div>
        </div>
      </div>

      <div className="attendance-filters">
        <div className="filter-card">
          <Calendar size={24} />
          <div>
            <label>Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="filter-card">
          <Users size={24} />
          <div>
            <label>Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection('');
              }}
            >
              <option value="">Select Class</option>
              {[...new Set(classes.map(c => c.name))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-card">
          <Users size={24} />
          <div>
            <label>Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {classes
                .filter(c => c.name === selectedClass)
                .map(c => (
                  <option key={c._id} value={c.section}>{c.section}</option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <>
          <div className="attendance-stats">
            <div className="stat-item total">
              <Users size={24} />
              <div>
                <h3>{stats.total}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="stat-item present">
              <CheckCircle size={24} />
              <div>
                <h3>{stats.present}</h3>
                <p>Present</p>
              </div>
            </div>
            <div className="stat-item absent">
              <XCircle size={24} />
              <div>
                <h3>{stats.absent}</h3>
                <p>Absent</p>
              </div>
            </div>
            <div className="stat-item late">
              <Clock size={24} />
              <div>
                <h3>{stats.late}</h3>
                <p>Late</p>
              </div>
            </div>
            <div className="stat-item leave">
              <FileText size={24} />
              <div>
                <h3>{stats.leave}</h3>
                <p>Leave</p>
              </div>
            </div>
          </div>

          {existingAttendance.length > 0 && (
            <div className="info-banner">
              <ClipboardCheck size={20} />
              <span>Attendance already marked for this date. You can update it below.</span>
            </div>
          )}

          <div className="quick-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleMarkAllPresent}
            >
              <CheckCircle size={20} />
              Mark All Present
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleMarkAllAbsent}
            >
              <XCircle size={20} />
              Mark All Absent
            </button>
          </div>

          <form onSubmit={handleSubmit} className="attendance-form">
            <div className="attendance-table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Roll</th>
                    <th>Photo</th>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.rollNumber}</td>
                      <td>
                        <img
                          src={student.userId?.profileImage || 'https://via.placeholder.com/40'}
                          alt={student.userId?.name}
                          className="student-photo-small"
                        />
                      </td>
                      <td className="student-name">{student.userId?.name}</td>
                      <td>{student.studentId}</td>
                      <td>
                        <div className="attendance-options">
                          <label className={`attendance-option present ${attendance[student._id] === 'present' ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="present"
                              checked={attendance[student._id] === 'present'}
                              onChange={() => handleAttendanceChange(student._id, 'present')}
                            />
                            <CheckCircle size={18} />
                            <span>Present</span>
                          </label>
                          <label className={`attendance-option absent ${attendance[student._id] === 'absent' ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="absent"
                              checked={attendance[student._id] === 'absent'}
                              onChange={() => handleAttendanceChange(student._id, 'absent')}
                            />
                            <XCircle size={18} />
                            <span>Absent</span>
                          </label>
                          <label className={`attendance-option late ${attendance[student._id] === 'late' ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="late"
                              checked={attendance[student._id] === 'late'}
                              onChange={() => handleAttendanceChange(student._id, 'late')}
                            />
                            <Clock size={18} />
                            <span>Late</span>
                          </label>
                          <label className={`attendance-option leave ${attendance[student._id] === 'leave' ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="leave"
                              checked={attendance[student._id] === 'leave'}
                              onChange={() => handleAttendanceChange(student._id, 'leave')}
                            />
                            <FileText size={18} />
                            <span>Leave</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                <Save size={20} />
                {saving ? 'Saving...' : existingAttendance.length > 0 ? 'Update Attendance' : 'Save Attendance'}
              </button>
            </div>
          </form>
        </>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      )}

      {!loading && selectedClass && selectedSection && students.length === 0 && (
        <div className="no-data-message">
          <ClipboardCheck size={60} />
          <h3>No Students Found</h3>
          <p>There are no students in {selectedClass} - Section {selectedSection}</p>
        </div>
      )}

      {!selectedClass && !selectedSection && (
        <div className="no-data-message">
          <ClipboardCheck size={60} />
          <h3>Select Class & Section</h3>
          <p>Please select a class and section to mark attendance</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;