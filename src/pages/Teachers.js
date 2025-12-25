/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teacherService from '../services/teacherService';
import toast from 'react-hot-toast';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  BookOpen,
  Phone,
  Mail
} from 'lucide-react';
import './Teachers.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, [filterSubject]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterSubject) params.subject = filterSubject;
      if (searchTerm) params.search = searchTerm;

      const data = await teacherService.getAllTeachers(params);
      setTeachers(data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTeachers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherService.deleteTeacher(id);
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        toast.error(error.message || 'Failed to delete teacher');
      }
    }
  };

  const viewTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  return (
    <div className="teachers-page">
      <div className="page-header">
        <div className="header-left">
          <GraduationCap size={32} />
          <div>
            <h1>Teachers Management</h1>
            <p>Manage all teachers in your school</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/teachers/add')}>
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-search">Search</button>
        </form>

        <div className="filter-group">
          <BookOpen size={20} />
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading teachers...</p>
        </div>
      ) : (
        <>
          <div className="teachers-stats">
            <div className="stat-item">
              <h3>{teachers.length}</h3>
              <p>Total Teachers</p>
            </div>
            <div className="stat-item">
              <h3>{teachers.filter(t => t.userId?.isActive).length}</h3>
              <p>Active</p>
            </div>
            <div className="stat-item">
              <h3>{new Set(teachers.flatMap(t => t.subject)).size}</h3>
              <p>Subjects Taught</p>
            </div>
          </div>

          <div className="teachers-grid">
            {teachers.length === 0 ? (
              <div className="no-data">
                <GraduationCap size={64} />
                <p>No teachers found</p>
                <button onClick={() => navigate('/dashboard/teachers/add')} className="btn-primary">
                  Add First Teacher
                </button>
              </div>
            ) : (
              teachers.map((teacher) => (
                <div key={teacher._id} className="teacher-card">
                  <div className="teacher-card-header">
                    <img
                      src={teacher.userId?.profileImage || 'https://via.placeholder.com/100'}
                      alt={teacher.userId?.name}
                      className="teacher-avatar"
                    />
                    <span className={`status-badge ${teacher.userId?.isActive ? 'active' : 'inactive'}`}>
                      {teacher.userId?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="teacher-card-body">
                    <h3>{teacher.userId?.name}</h3>
                    <p className="teacher-id">ID: {teacher.employeeId}</p>
                    <p className="teacher-qualification">{teacher.qualification}</p>
                    
                    <div className="teacher-subjects">
                      {teacher.subject.slice(0, 2).map((sub, index) => (
                        <span key={index} className="subject-tag">{sub}</span>
                      ))}
                      {teacher.subject.length > 2 && (
                        <span className="subject-tag more">+{teacher.subject.length - 2}</span>
                      )}
                    </div>

                    <div className="teacher-info">
                      <div className="info-item">
                        <Phone size={14} />
                        <span>{teacher.userId?.phone || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <Mail size={14} />
                        <span>{teacher.userId?.email}</span>
                      </div>
                    </div>

                    <div className="teacher-footer">
                      <span className="experience-badge">
                        {teacher.experience} years exp.
                      </span>
                      <span className="salary-badge">
                        ৳{teacher.salary?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="teacher-card-actions">
                    <button
                      className="btn-icon btn-view"
                      onClick={() => viewTeacherDetails(teacher)}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => navigate(`/dashboard/teachers/edit/${teacher._id}`)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(teacher._id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Teacher Details Modal */}
      {showModal && selectedTeacher && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Teacher Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="teacher-detail-card">
                <img
                  src={selectedTeacher.userId?.profileImage || 'https://via.placeholder.com/150'}
                  alt={selectedTeacher.userId?.name}
                  className="detail-photo"
                />
                <div className="detail-info">
                  <div className="info-row">
                    <label>Name:</label>
                    <span>{selectedTeacher.userId?.name}</span>
                  </div>
                  <div className="info-row">
                    <label>Employee ID:</label>
                    <span>{selectedTeacher.employeeId}</span>
                  </div>
                  <div className="info-row">
                    <label>Email:</label>
                    <span>{selectedTeacher.userId?.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Phone:</label>
                    <span>{selectedTeacher.userId?.phone || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <label>Date of Birth:</label>
                    <span>
                      {selectedTeacher.userId?.dateOfBirth 
                        ? new Date(selectedTeacher.userId.dateOfBirth).toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="info-row">
                    <label>Subjects:</label>
                    <span>{selectedTeacher.subject.join(', ')}</span>
                  </div>
                  <div className="info-row">
                    <label>Qualification:</label>
                    <span>{selectedTeacher.qualification}</span>
                  </div>
                  <div className="info-row">
                    <label>Experience:</label>
                    <span>{selectedTeacher.experience} years</span>
                  </div>
                  <div className="info-row">
                    <label>Salary:</label>
                    <span>৳{selectedTeacher.salary?.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <label>Joining Date:</label>
                    <span>{new Date(selectedTeacher.joiningDate).toLocaleDateString()}</span>
                  </div>
                  {selectedTeacher.classTeacher?.class && (
                    <div className="info-row">
                      <label>Class Teacher:</label>
                      <span>{selectedTeacher.classTeacher.class} - Section {selectedTeacher.classTeacher.section}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <label>Address:</label>
                    <span>{selectedTeacher.userId?.address || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <label>Status:</label>
                    <span className={selectedTeacher.userId?.isActive ? 'status-active' : 'status-inactive'}>
                      {selectedTeacher.userId?.isActive ? 'Active' : 'Inactive'}
                    </span>
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

export default Teachers;