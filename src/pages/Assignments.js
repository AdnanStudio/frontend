import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import assignmentService from '../services/assignmentService';
import toast from 'react-hot-toast';
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  AlertCircle,
  Calendar,
  BookOpen
} from 'lucide-react';
import './Assignments.css';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAssignments();
  }, [filterClass, filterSection, filterStatus]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterClass) params.class = filterClass;
      if (filterSection) params.section = filterSection;
      if (filterStatus) params.status = filterStatus;

      const data = await assignmentService.getAllAssignments(params);
      setAssignments(data.data);
    } catch (error) {
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await assignmentService.deleteAssignment(id);
        toast.success('Assignment deleted successfully');
        fetchAssignments();
      } catch (error) {
        toast.error('Failed to delete assignment');
      }
    }
  };

  const viewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'urgent' ? 'status-urgent' : 'status-normal';
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="assignments-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>Assignments Management</h1>
            <p>Create and manage class assignments</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/assignments/add')}>
          <Plus size={20} />
          Create Assignment
        </button>
      </div>

      <div className="filters-section">
        <div className="search-form">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

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

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
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

          <div className="assignments-grid">
            {filteredAssignments.length === 0 ? (
              <div className="no-data">
                <FileText size={48} />
                <p>No assignments found</p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => (
                <div key={assignment._id} className="assignment-card">
                  <div className="card-header">
                    <div className="card-title-row">
                      <h3>{assignment.title}</h3>
                      <span className={`status-badge ${getStatusBadge(assignment.status)}`}>
                        {assignment.status === 'urgent' && <AlertCircle size={14} />}
                        {assignment.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="card-subject">
                      <BookOpen size={16} />
                      {assignment.subject}
                    </p>
                  </div>

                  <div className="card-body">
                    <p className="assignment-description">
                      {assignment.description.substring(0, 100)}...
                    </p>

                    <div className="assignment-meta">
                      <div className="meta-item">
                        <span className="label">Class:</span>
                        <span>{assignment.class} - {assignment.section}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>
                          {new Date(assignment.startDate).toLocaleDateString()} - 
                          {new Date(assignment.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      {isExpired(assignment.endDate) && (
                        <span className="expired-badge">Expired</span>
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn-icon btn-view"
                      onClick={() => viewAssignment(assignment)}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => navigate(`/dashboard/assignments/edit/${assignment._id}`)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(assignment._id)}
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

      {/* Assignment Details Modal */}
      {showModal && selectedAssignment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content assignment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Assignment Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="assignment-detail">
                <div className="detail-row">
                  <label>Title:</label>
                  <span>{selectedAssignment.title}</span>
                </div>
                <div className="detail-row">
                  <label>Subject:</label>
                  <span>{selectedAssignment.subject}</span>
                </div>
                <div className="detail-row">
                  <label>Class:</label>
                  <span>{selectedAssignment.class} - Section {selectedAssignment.section}</span>
                </div>
                <div className="detail-row">
                  <label>Description:</label>
                  <p>{selectedAssignment.description}</p>
                </div>
                <div className="detail-row">
                  <label>Start Date:</label>
                  <span>{new Date(selectedAssignment.startDate).toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <label>End Date:</label>
                  <span>{new Date(selectedAssignment.endDate).toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <label>Total Marks:</label>
                  <span>{selectedAssignment.totalMarks}</span>
                </div>
                <div className="detail-row">
                  <label>Status:</label>
                  <span className={`status-badge ${getStatusBadge(selectedAssignment.status)}`}>
                    {selectedAssignment.status.toUpperCase()}
                  </span>
                </div>
                {selectedAssignment.file?.url && (
                  <div className="detail-row file-preview">
                    <label>Attachment:</label>
                    <a 
                      href={selectedAssignment.file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      <FileText size={18} />
                      View {selectedAssignment.file.fileType.toUpperCase()} File
                    </a>
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

export default Assignments;