import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import noticeService from '../services/noticeService';
import toast from 'react-hot-toast';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  FileText,
  Image as ImageIcon,
  Download,
  X
} from 'lucide-react';
import './Notices.css';

const Notices = () => {
  const { user } = useSelector((state) => state.auth);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general',
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: ''
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await noticeService.getAllNotices();
      setNotices(data.data);
    } catch (error) {
      toast.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('type', formData.type);
      submitData.append('publishDate', formData.publishDate);
      if (formData.expiryDate) {
        submitData.append('expiryDate', formData.expiryDate);
      }

      // Append files
      files.forEach((file) => {
        submitData.append('attachments', file);
      });

      if (selectedNotice) {
        await noticeService.updateNotice(selectedNotice._id, submitData);
        toast.success('Notice updated successfully!');
      } else {
        await noticeService.createNotice(submitData);
        toast.success('Notice created successfully!');
      }

      setShowModal(false);
      resetForm();
      fetchNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save notice');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticeService.deleteNotice(id);
        toast.success('Notice deleted successfully');
        fetchNotices();
      } catch (error) {
        toast.error('Failed to delete notice');
      }
    }
  };

  const handleView = (notice) => {
    setSelectedNotice(notice);
    setViewMode(true);
    setShowModal(true);
  };

  const handleEdit = (notice) => {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      publishDate: new Date(notice.publishDate).toISOString().split('T')[0],
      expiryDate: notice.expiryDate ? new Date(notice.expiryDate).toISOString().split('T')[0] : ''
    });
    setViewMode(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'general',
      publishDate: new Date().toISOString().split('T')[0],
      expiryDate: ''
    });
    setFiles([]);
    setSelectedNotice(null);
    setViewMode(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getFileIcon = (fileType) => {
    return fileType === 'pdf' ? <FileText size={20} /> : <ImageIcon size={20} />;
  };

  return (
    <div className="notices-page">
      <div className="page-header">
        <div className="header-left">
          <Bell size={32} />
          <div>
            <h1>Notice Management</h1>
            <p>Create and manage school notices</p>
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={20} />
          Create Notice
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading notices...</p>
        </div>
      ) : (
        <div className="notices-grid">
          {notices.length === 0 ? (
            <div className="no-data">No notices found</div>
          ) : (
            notices.map((notice) => (
              <div key={notice._id} className="notice-card">
                <div className="notice-card-header">
                  <span className={`notice-type-badge ${notice.type}`}>
                    {notice.type}
                  </span>
                  <div className="notice-date">
                    <Calendar size={16} />
                    <span>{formatDate(notice.publishDate)}</span>
                  </div>
                </div>

                <div className="notice-card-body">
                  <h3>{notice.title}</h3>
                  <p>{notice.description.substring(0, 100)}...</p>

                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="notice-attachments">
                      <span className="attachments-label">
                        📎 {notice.attachments.length} Attachment(s)
                      </span>
                    </div>
                  )}
                </div>

                <div className="notice-card-actions">
                  <button
                    className="btn-icon btn-view"
                    onClick={() => handleView(notice)}
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleEdit(notice)}
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(notice._id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create/Edit/View Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {viewMode ? 'View Notice' : selectedNotice ? 'Edit Notice' : 'Create Notice'}
              </h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              {viewMode ? (
                <div className="notice-view">
                  <div className="view-header">
                    <h2>{selectedNotice.title}</h2>
                    <span className={`notice-type-badge ${selectedNotice.type}`}>
                      {selectedNotice.type}
                    </span>
                  </div>
                  
                  <div className="view-meta">
                    <span>
                      <Calendar size={16} />
                      Published: {formatDate(selectedNotice.publishDate)}
                    </span>
                    {selectedNotice.expiryDate && (
                      <span>
                        Expires: {formatDate(selectedNotice.expiryDate)}
                      </span>
                    )}
                  </div>

                  <div className="view-description">
                    <p>{selectedNotice.description}</p>
                  </div>

                  {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                    <div className="view-attachments">
                      <h4>Attachments:</h4>
                      {selectedNotice.attachments.map((attachment, index) => (
                        <div key={index} className="attachment-item">
                          {getFileIcon(attachment.fileType)}
                          <span>{attachment.fileName || `Attachment ${index + 1}`}</span>
                          <a 
                            href={attachment.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-download"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Notice Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter notice title"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Enter notice description"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Notice Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="general">General</option>
                        <option value="urgent">Urgent</option>
                        <option value="holiday">Holiday</option>
                        <option value="exam">Exam</option>
                        <option value="event">Event</option>
                        <option value="admission">Admission</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Publish Date</label>
                      <input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Expiry Date (Optional)</label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Attachments (PDF or Images - Max 5 files)</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                      {files.length > 0 && (
                        <div className="selected-files">
                          {files.map((file, index) => (
                            <span key={index} className="file-tag">
                              {file.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedNotice && selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                      <div className="form-group full-width">
                        <label>Existing Attachments</label>
                        <div className="existing-attachments">
                          {selectedNotice.attachments.map((attachment, index) => (
                            <div key={index} className="existing-attachment-item">
                              {getFileIcon(attachment.fileType)}
                              <span>{attachment.fileName || `File ${index + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {selectedNotice ? 'Update Notice' : 'Create Notice'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;