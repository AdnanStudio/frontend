import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import leaveService from '../services/leaveService';
import toast from 'react-hot-toast';
import { FileText, Plus, Calendar, Clock } from 'lucide-react';
import './MyLeaves.css';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const fetchMyLeaves = async () => {
    try {
      setLoading(true);
      const data = await leaveService.getMyLeaveRequests();
      setLeaves(data.data);
    } catch (error) {
      toast.error('Failed to fetch your leaves');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'status-pending', text: 'Pending' },
      approved: { class: 'status-approved', text: 'Approved' },
      rejected: { class: 'status-rejected', text: 'Rejected' }
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="my-leaves-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>My Leave Requests</h1>
            <p>View all your leave applications</p>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={() => navigate('/dashboard/leave-request')}
        >
          <Plus size={20} />
          New Request
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="leaves-grid">
          {leaves.length === 0 ? (
            <div className="no-data">
              <FileText size={48} />
              <p>No leave requests found</p>
              <button
                className="btn-primary"
                onClick={() => navigate('/dashboard/leave-request')}
              >
                Submit Your First Request
              </button>
            </div>
          ) : (
            leaves.map((leave) => {
              const badge = getStatusBadge(leave.status);
              return (
                <div key={leave._id} className="leave-card">
                  <div className="leave-header">
                    <h3>{leave.subject}</h3>
                    <span className={`status-badge ${badge.class}`}>
                      {badge.text}
                    </span>
                  </div>

                  <p className="leave-description">{leave.description}</p>

                  <div className="leave-dates">
                    <div className="date-item">
                      <Calendar size={16} />
                      <span>{formatDate(leave.startDate)} - {formatDate(leave.endDate)}</span>
                    </div>
                    <div className="date-item">
                      <Clock size={16} />
                      <span>{leave.days} {leave.days === 1 ? 'day' : 'days'}</span>
                    </div>
                  </div>

                  {leave.status === 'approved' && leave.approvedBy && (
                    <div className="leave-footer">
                      <span>Approved by: {leave.approvedBy.name}</span>
                    </div>
                  )}

                  {leave.rejectionReason && (
                    <div className="rejection-reason">
                      <strong>Rejection Reason:</strong>
                      <p>{leave.rejectionReason}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyLeaves;