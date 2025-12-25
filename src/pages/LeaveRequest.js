import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leaveService from '../services/leaveService';
import toast from 'react-hot-toast';
import { Send, Calendar, FileText } from 'lucide-react';
import './LeaveRequest.css';

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.subject || !formData.description || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all fields');
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date cannot be before start date');
      return;
    }

    try {
      setLoading(true);
      await leaveService.createLeaveRequest(formData);
      toast.success('Leave request submitted successfully');
      navigate('/dashboard/my-leaves');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-request-page">
      <div className="page-header">
        <div className="header-left">
          <Send size={32} />
          <div>
            <h1>Request Leave</h1>
            <p>Submit your leave application</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-group">
            <label>
              <FileText size={20} />
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Medical Leave, Family Emergency"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FileText size={20} />
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain the reason for your leave..."
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={20} />
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={20} />
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;