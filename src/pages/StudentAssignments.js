import React, { useState, useEffect } from 'react';
import assignmentService from '../services/assignmentService';
import toast from 'react-hot-toast';
import {
  FileText,
  Calendar,
  BookOpen,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import './StudentAssignments.css';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await assignmentService.getStudentAssignments();
      setAssignments(res.data);
    } catch (error) {
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const viewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} days remaining`;
    return `${hours} hours remaining`;
  };

  return (
    <div className="student-assignments-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>My Assignments</h1>
            <p>View all your class assignments</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading assignments...</p>
        </div>
      ) : (
        <>
          <div className="assignments-stats">
            <div className="stat-item">
              <h3>{assignments.length}</h3>
              <p>Total Assignments</p>
            </div>
            <div className="stat-item stat-urgent">
              <h3>{assignments.filter(a => a.status === 'urgent').length}</h3>
              <p>Urgent</p>
            </div>
            <div className="stat-item stat-active">
              <h3>{assignments.filter(a => !isExpired(a.endDate)).length}</h3>
              <p>Active</p>
            </div>
          </div>

          <div className="assignments-list">
            {assignments.length === 0 ? (
              <div className="no-data">
                <FileText size={48} />
                <p>No assignments available</p>
              </div>
            ) : (
              assignments.map((assignment) => (
                <div key={assignment._id} className="assignment-item">
                  <div className="assignment-header">
                    <div className="title-section">
                      <h3>{assignment.title}</h3>
                      {assignment.status === 'urgent' && (
                        <span className="urgent-badge">
                          <AlertCircle size={16} />
                          URGENT
                        </span>
                      )}
                    </div>

                    <button
                      className="btn-view"
                      onClick={() => viewAssignment(assignment)}
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>

                  <div className="assignment-content">
                    <div className="info-item">
                      <BookOpen size={18} />
                      <span>{assignment.subject}</span>
                    </div>

                    <div className="info-item">
                      <Calendar size={18} />
                      <span>
                        Due: {new Date(assignment.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div
                      className={`time-remaining ${
                        isExpired(assignment.endDate) ? 'expired' : ''
                      }`}
                    >
                      {getTimeRemaining(assignment.endDate)}
                    </div>
                  </div>

                  {assignment.file?.url && (
                    <div className="assignment-file">
                      <a
                        href={assignment.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                      >
                        <Download size={18} />
                        Download {assignment.file.fileType.toUpperCase()}
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Assignment Details Modal */}
      {showModal && selectedAssignment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Assignment Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h3>{selectedAssignment.title}</h3>

              <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
              <p><strong>Description:</strong> {selectedAssignment.description}</p>
              <p>
                <strong>Start:</strong>{' '}
                {new Date(selectedAssignment.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{' '}
                {new Date(selectedAssignment.endDate).toLocaleString()}
              </p>
              <p><strong>Total Marks:</strong> {selectedAssignment.totalMarks}</p>

              <p
                className={
                  isExpired(selectedAssignment.endDate)
                    ? 'text-danger'
                    : 'text-success'
                }
              >
                {getTimeRemaining(selectedAssignment.endDate)}
              </p>

              {selectedAssignment.file?.url && (
                <a
                  href={selectedAssignment.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-download-btn"
                >
                  <Download size={18} />
                  Download File
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
