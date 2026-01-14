import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import clubService from '../services/clubService';
import SkeletonLoader from '../components/SkeletonLoader';
import './ClubManagement.css';

const ClubManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    order: 0
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await clubService.getAllMembers();
      setMembers(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch club members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('order', formData.order);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editMode) {
        await clubService.updateMember(currentId, data);
        toast.success('Member updated successfully');
      } else {
        await clubService.createMember(data);
        toast.success('Member created successfully');
      }
      
      resetForm();
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleEdit = (member) => {
    setEditMode(true);
    setCurrentId(member._id);
    setFormData({
      name: member.name,
      description: member.description,
      order: member.order,
      image: null
    });
    setImagePreview(member.image?.url);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await clubService.deleteMember(id);
      toast.success('Member deleted successfully');
      fetchMembers();
    } catch (error) {
      toast.error('Failed to delete member');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null,
      order: 0
    });
    setImagePreview(null);
    setEditMode(false);
    setCurrentId(null);
    setShowModal(false);
  };

  return (
    <div className="club-management-container">
      <div className="page-header">
        <h1>Club Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <div key={member._id} className="member-card">
              <div className="member-image">
                <img 
                  src={member.image?.url || '/placeholder.png'} 
                  alt={member.name}
                  onError={(e) => e.target.src = '/placeholder.png'}
                />
              </div>
              <div className="member-content">
                <h3>{member.name}</h3>
                <p className="member-desc">{member.description}</p>
                <div className="member-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(member._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? 'Edit Member' : 'Add Member'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="club-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;