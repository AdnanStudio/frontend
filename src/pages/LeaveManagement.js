import React, { useState, useEffect } from 'react';
import leaveService from '../services/leaveService';
import toast from 'react-hot-toast';
import { 
  FileText, 
  Check, 
  X, 
  Trash2, 
  Calendar,
  Filter,
  User
} from 'lucide-react';
import './LeaveManagement.css';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, [filterStatus, filterRole]);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterRole) params.role = filterRole;

      const data = await leaveService.getAllLeaveRequests(params);
      setLeaves(data.data);
    } catch (error) {
      toast.error('Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm('Are you sure you want to approve this leave request?')) {
      try {
        await leaveService.approveLeaveRequest(id);
        toast.success('Leave request approved');
        fetchLeaves();
      } catch (error) {
        toast.error('Failed to approve leave request');
      }
    }
  };

  const openRejectModal = (leave) => {
    setSelectedLeave(leave);
    setShowRejectModal(true);
    setRejectionReason('');
  };

  const handleReject = async () => {
    try {
      await leaveService.rejectLeaveRequest(selectedLeave._id, rejectionReason);
      toast.success('Leave request rejected');
      setShowRejectModal(false);
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to reject leave request');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await leaveService.deleteLeaveRequest(id);
        toast.success('Leave request deleted');
        fetchLeaves();
      } catch (error) {
        toast.error('Failed to delete leave request');
      }
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
    <div className="leave-management-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>Leave Management</h1>
            <p>Manage all leave requests</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <Filter size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="staff">Staff</option>
            <option value="librarian">Librarian</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => {
                  const badge = getStatusBadge(leave.status);
                  return (
                    <tr key={leave._id}>
                      <td>
                        <div className="user-info">
                          <img
                            src={leave.userId?.profileImage || 'https://via.placeholder.com/40'}
                            alt={leave.userId?.name}
                            className="user-photo"
                          />
                          <span>{leave.userId?.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="role-badge">{leave.userId?.role}</span>
                      </td>
                      <td>
                        <strong>{leave.subject}</strong>
                        <p className="description">{leave.description}</p>
                      </td>
                      <td>
                        <div className="date-range">
                          <Calendar size={14} />
                          {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                        </div>
                      </td>
                      <td>{leave.days} days</td>
                      <td>
                        <span className={`status-badge ${badge.class}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {leave.status === 'pending' && (
<>
<button
className="btn-icon btn-approve"
onClick={() => handleApprove(leave._id)}
title="Approve"
>
<Check size={18} />
</button>
<button
className="btn-icon btn-reject"
onClick={() => openRejectModal(leave)}
title="Reject"
>
<X size={18} />
</button>
</>
)}
<button
className="btn-icon btn-delete"
onClick={() => handleDelete(leave._id)}
title="Delete"
>
<Trash2 size={18} />
</button>
</div>
</td>
</tr>
);
})
)}
</tbody>
</table>
</div>
)}
  {/* Reject Modal */}
  {showRejectModal && (
    <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reject Leave Request</h2>
          <button onClick={() => setShowRejectModal(false)} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to reject this leave request?</p>
          <div className="form-group">
            <label>Rejection Reason (Optional)</label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Provide a reason for rejection..."
              rows="4"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={() => setShowRejectModal(false)}
          >
            Cancel
          </button>
          <button className="btn-danger" onClick={handleReject}>
            Reject Leave
          </button>
        </div>
      </div>
    </div>
  )}
</div>
);
};
export default LeaveManagement;