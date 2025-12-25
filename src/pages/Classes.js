import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classService from '../services/classService';
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Plus, 
  Users, 
  GraduationCap,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import './Classes.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await classService.getAllClasses();
      setClasses(data.data);
    } catch (error) {
      toast.error('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classService.deleteClass(id);
        toast.success('Class deleted successfully');
        fetchClasses();
      } catch (error) {
        toast.error('Failed to delete class');
      }
    }
  };

  const viewClassDetails = (classData) => {
    setSelectedClass(classData);
    setShowModal(true);
  };

  return (
    <div className="classes-page">
      <div className="page-header">
        <div className="header-left">
          <BookOpen size={32} />
          <div>
            <h1>Classes Management</h1>
            <p>Manage all classes and sections</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/classes/add')}>
          <Plus size={20} />
          Add Class
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading classes...</p>
        </div>
      ) : (
        <>
          <div className="classes-stats">
            <div className="stat-item">
              <h3>{classes.length}</h3>
              <p>Total Classes</p>
            </div>
            <div className="stat-item">
              <h3>{classes.reduce((acc, cls) => acc + (cls.students?.length || 0), 0)}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-item">
              <h3>{new Set(classes.map(c => c.name)).size}</h3>
              <p>Grade Levels</p>
            </div>
          </div>

          <div className="classes-grid">
            {classes.length === 0 ? (
              <div className="no-data">No classes found</div>
            ) : (
              classes.map((classData) => (
                <div key={classData._id} className="class-card">
                  <div className="class-card-header">
                    <div className="class-name">
                      <h3>{classData.name}</h3>
                      <span className="section-badge">Section {classData.section}</span>
                    </div>
                    <BookOpen size={40} className="class-icon" />
                  </div>

                  <div className="class-card-body">
                    <div className="class-info-item">
                      <Users size={20} />
                      <div>
                        <p className="info-label">Students</p>
                        <p className="info-value">{classData.students?.length || 0}</p>
                      </div>
                    </div>

                    <div className="class-info-item">
                      <GraduationCap size={20} />
                      <div>
                        <p className="info-label">Class Teacher</p>
                        <p className="info-value">
                          {classData.classTeacher?.userId?.name || 'Not Assigned'}
                        </p>
                      </div>
                    </div>

                    <div className="class-info-item">
                      <BookOpen size={20} />
                      <div>
                        <p className="info-label">Subjects</p>
                        <p className="info-value">{classData.subjects?.length || 0} Subjects</p>
                      </div>
                    </div>
                  </div>

                  <div className="class-card-actions">
                    <button
                      className="btn-icon btn-view"
                      onClick={() => viewClassDetails(classData)}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => navigate(`/dashboard/classes/edit/${classData._id}`)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(classData._id)}
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

      {/* Class Details Modal */}
      {showModal && selectedClass && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Class Details - {selectedClass.name} ({selectedClass.section})</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="class-details">
                <div className="detail-section">
                  <h3>Class Information</h3>
                  <div className="info-row">
                    <label>Class Name:</label>
                    <span>{selectedClass.name}</span>
                  </div>
                  <div className="info-row">
                    <label>Section:</label>
                    <span>{selectedClass.section}</span>
                  </div>
                  <div className="info-row">
                    <label>Class Teacher:</label>
                    <span>{selectedClass.classTeacher?.userId?.name || 'Not Assigned'}</span>
                  </div>
                  <div className="info-row">
                    <label>Total Students:</label>
                    <span>{selectedClass.students?.length || 0}</span>
                  </div>
                </div>

                {selectedClass.subjects && selectedClass.subjects.length > 0 && (
                  <div className="detail-section">
                    <h3>Subjects & Teachers</h3>
                    <div className="subjects-list">
                      {selectedClass.subjects.map((subject, index) => (
                        <div key={index} className="subject-item">
                          <span className="subject-name">{subject.name}</span>
                          <span className="teacher-name">
                            {subject.teacher?.userId?.name || 'No Teacher'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedClass.schedule && selectedClass.schedule.length > 0 && (
                  <div className="detail-section">
                    <h3>Class Schedule</h3>
                    <div className="schedule-list">
                      {selectedClass.schedule.map((day, index) => (
                        <div key={index} className="schedule-day">
                          <h4>{day.day}</h4>
                          {day.periods.map((period, pIndex) => (
                            <div key={pIndex} className="period-item">
                              <span>{period.startTime} - {period.endTime}</span>
                              <span>{period.subject}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;