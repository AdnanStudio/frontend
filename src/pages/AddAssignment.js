import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assignmentService from '../services/assignmentService';
import toast from 'react-hot-toast';
import { FileText, Upload, Calendar, AlertCircle } from 'lucide-react';
import './AddAssignment.css';

const AddAssignment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    section: '',
    subject: '',
    startDate: '',
    endDate: '',
    status: 'normal',
    totalMarks: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only PDF and Image files are allowed');
        return;
      }

      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.class || !formData.section || !formData.subject) {
      toast.error('Please fill all required fields');
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date must be after start date');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      await assignmentService.createAssignment(formDataToSend);
      toast.success('Assignment created successfully');
      navigate('/dashboard/assignments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-assignment-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>Create Assignment</h1>
            <p>Add a new assignment for students</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter assignment description"
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Class *</label>
              <select name="class" value={formData.class} onChange={handleChange} required>
                <option value="">Select Class</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section *</label>
              <select name="section" value={formData.section} onChange={handleChange} required>
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={18} />
                Start Date *
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={18} />
                End Date *
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <AlertCircle size={18} />
                Status
              </label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label>Total Marks</label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                min="0"
                placeholder="Enter total marks"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <Upload size={18} />
              Attachment (PDF or Image, max 10MB)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="file-input"
            />
            {selectedFile && (
              <div className="file-selected">
                <FileText size={20} />
                <span>{selectedFile.name}</span>
              </div>
            )}
            {filePreview && (
              <div className="image-preview">
                <img src={filePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/dashboard/assignments')}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
     </div>
   </div>
  );
};
export default AddAssignment;