import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Save, X } from 'lucide-react';
import governingBodyService from '../services/governingBodyService';
import SkeletonLoader from '../components/SkeletonLoader';
import toast from 'react-hot-toast';
import './GoverningBodyManagement.css';

const GoverningBodyManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    order: 0,
    startDate: '',
    endDate: '',
    image: null
  });

  useEffect(() => {
    fetchMembers();
    fetchDateRange();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await governingBodyService.getAllMembers();
      console.log('Fetch Members Response:', response);
      
      if (response.success) {
        setMembers(response.data || []);
      } else {
        toast.error('Failed to load members');
      }
    } catch (error) {
      console.error('Fetch Members Error:', error);
      toast.error(error.response?.data?.message || 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const fetchDateRange = async () => {
    try {
      const response = await governingBodyService.getDateRange();
      console.log('Fetch Date Range Response:', response);
      
      if (response.success && response.data) {
        setDateRange({
          startDate: response.data.startDate?.split('T')[0] || '',
          endDate: response.data.endDate?.split('T')[0] || ''
        });
      }
    } catch (error) {
      console.error('Fetch Date Range Error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.position || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!editingMember && !formData.image) {
      toast.error('Please select an image');
      return;
    }

    // Create FormData
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('position', formData.position);
    submitData.append('description', formData.description);
    submitData.append('order', formData.order);
    submitData.append('startDate', formData.startDate);
    submitData.append('endDate', formData.endDate);
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    // Log FormData contents
    console.log('Submitting FormData:');
    for (let pair of submitData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setSubmitting(true);
      let response;
      
      if (editingMember) {
        response = await governingBodyService.updateMember(editingMember._id, submitData);
        toast.success('Member updated successfully');
      } else {
        response = await governingBodyService.createMember(submitData);
        toast.success('Member created successfully');
      }
      
      console.log('Submit Response:', response);
      
      fetchMembers();
      handleCloseModal();
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description || '',
      order: member.order,
      startDate: member.dateRange.startDate.split('T')[0],
      endDate: member.dateRange.endDate.split('T')[0],
      image: null
    });
    setImagePreview(member.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await governingBodyService.deleteMember(id);
      toast.success('Member deleted successfully');
      fetchMembers();
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete member');
    }
  };

  const handleUpdateDateRange = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      toast.error('Please select both dates');
      return;
    }

    try {
      const response = await governingBodyService.updateDateRange(dateRange);
      console.log('Update Date Range Response:', response);
      
      toast.success('Date range updated successfully');
      setShowDateModal(false);
      fetchMembers();
    } catch (error) {
      console.error('Update Date Range Error:', error);
      toast.error(error.response?.data?.message || 'Failed to update date range');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      description: '',
      order: 0,
      startDate: '',
      endDate: '',
      image: null
    });
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="governing-management-container">
        <SkeletonLoader type="title" />
        <SkeletonLoader type="card" count={3} />
      </div>
    );
  }

  return (
    <div className="governing-management-container">
      <div className="management-header">
        <h1>Governing Body Management</h1>
        <div className="header-actions">
          <button
            className="btn-date-range"
            onClick={() => setShowDateModal(true)}
          >
            <Calendar size={20} />
            Update Date Range
          </button>
          <button
            className="btn-add"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Add Member
          </button>
        </div>
      </div>

      {dateRange.startDate && (
        <div className="current-date-range">
          <Calendar size={20} />
          <span>Current Term: {new Date(dateRange.startDate).toLocaleDateString('en-GB')} - {new Date(dateRange.endDate).toLocaleDateString('en-GB')}</span>
        </div>
      )}

      <div className="members-list">
        {members.length === 0 ? (
          <p className="no-data">No members added yet</p>
        ) : (
          <div className="members-grid">
            {members.map((member) => (
              <div key={member._id} className="member-item">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-details">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-desc">{member.description}</p>
                  <p className="member-order">Order: {member.order}</p>
                </div>
                <div className="member-actions">
                  <button onClick={() => handleEdit(member)} className="btn-edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="btn-delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Member Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter member name"
                />
              </div>

              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  placeholder="e.g., Chairman, Member"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  placeholder="Brief description about the member"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image {!editingMember && '*'}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editingMember}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-cancel" disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  <Save size={20} />
                  {submitting ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="modal-overlay" onClick={() => setShowDateModal(false)}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Date Range</h2>
              <button onClick={() => setShowDateModal(false)} className="btn-close">
                <X size={24} />
              </button>
            </div>

            <div className="date-form">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                />
              </div>

              <button onClick={handleUpdateDateRange} className="btn-submit">
                Update Date Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoverningBodyManagement;