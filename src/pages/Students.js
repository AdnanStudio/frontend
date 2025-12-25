import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import toast from 'react-hot-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  UserCheck,
  UserX
} from 'lucide-react';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [filterClass, filterSection]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterClass) params.class = filterClass;
      if (filterSection) params.section = filterSection;
      if (searchTerm) params.search = searchTerm;

      const data = await studentService.getAllStudents(params);
      setStudents(data.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await studentService.toggleStudentStatus(id);
      toast.success('Student status updated');
      fetchStudents();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <div className="header-left">
          <Users size={32} />
          <div>
            <h1>Students Management</h1>
            <p>Manage all students in your school</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/students/add')}>
          <Plus size={20} />
          Add Student
        </button>
      </div>

      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-search">Search</button>
        </form>

        <div className="filter-group">
          <Filter size={20} />
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">All Classes</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>

          <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : (
        <>
          <div className="students-stats">
            <div className="stat-item">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-item">
              <h3>{students.filter(s => s.userId?.isActive).length}</h3>
              <p>Active</p>
            </div>
            <div className="stat-item">
              <h3>{students.filter(s => !s.userId?.isActive).length}</h3>
              <p>Inactive</p>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Roll</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <img
                          src={student.userId?.profileImage || 'https://via.placeholder.com/40'}
                          alt={student.userId?.name}
                          className="student-photo"
                        />
                      </td>
                      <td>{student.studentId}</td>
                      <td className="student-name">{student.userId?.name}</td>
                      <td>{student.class}</td>
                      <td>{student.section}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.userId?.phone || 'N/A'}</td>
                      <td>
                        <span className={`status-badge ${student.userId?.isActive ? 'active' : 'inactive'}`}>
                          {student.userId?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-view"
                            onClick={() => viewStudentDetails(student)}
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="btn-icon btn-edit"
                            onClick={() => navigate(`/dashboard/students/edit/${student._id}`)}
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="btn-icon btn-toggle"
                            onClick={() => handleToggleStatus(student._id)}
                            title={student.userId?.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {student.userId?.isActive ? <UserX size={18} /> : <UserCheck size={18} />}
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            onClick={() => handleDelete(student._id)}
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="student-detail-card">
                <img
                  src={selectedStudent.userId?.profileImage || 'https://via.placeholder.com/150'}
                  alt={selectedStudent.userId?.name}
                  className="detail-photo"
                />
                <div className="detail-info">
                  <div className="info-row">
                    <label>Name:</label>
                    <span>{selectedStudent.userId?.name}</span>
                  </div>
                  <div className="info-row">
                    <label>Student ID:</label>
                    <span>{selectedStudent.studentId}</span>
                  </div>
                  <div className="info-row">
                    <label>Email:</label>
                    <span>{selectedStudent.userId?.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Phone:</label>
                    <span>{selectedStudent.userId?.phone || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <label>Class:</label>
                    <span>{selectedStudent.class} - Section {selectedStudent.section}</span>
                  </div>
                  <div className="info-row">
                    <label>Roll Number:</label>
                    <span>{selectedStudent.rollNumber}</span>
                  </div>
                  <div className="info-row">
                    <label>Blood Group:</label>
                    <span>{selectedStudent.bloodGroup || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <label>Guardian Name:</label>
                    <span>{selectedStudent.guardianName}</span>
                  </div>
                  <div className="info-row">
                    <label>Guardian Phone:</label>
                    <span>{selectedStudent.guardianPhone}</span>
                  </div>
                  <div className="info-row">
                    <label>Address:</label>
                    <span>{selectedStudent.userId?.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;