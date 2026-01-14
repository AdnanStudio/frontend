import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import teacherTrainingService from '../services/teacherTrainingService';
import SkeletonLoader from '../components/SkeletonLoader';
import './TeacherTrainingManagement.css';

const TeacherTrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: '',
    image: null,
    order: 0
  });

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      const response = await teacherTrainingService.getAllTrainings();
      setTrainings(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch trainings');
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
    data.append('phone', formData.phone);
    data.append('description', formData.description);
    data.append('order', formData.order);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editMode) {
        await teacherTrainingService.updateTraining(currentId, data);
        toast.success('Training updated successfully');
      } else {
        await teacherTrainingService.createTraining(data);
        toast.success('Training created successfully');
      }
      
      resetForm();
      fetchTrainings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleEdit = (training) => {
    setEditMode(true);
    setCurrentId(training._id);
    setFormData({
      name: training.name,
      phone: training.phone,
      description: training.description,
      order: training.order,
      image: null
    });
    setImagePreview(training.image?.url);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this training?')) return;

    try {
      await teacherTrainingService.deleteTraining(id);
      toast.success('Training deleted successfully');
      fetchTrainings();
    } catch (error) {
      toast.error('Failed to delete training');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
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
    <div className="training-management-container">
      <div className="page-header">
        <h1>Teacher Training Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Add Training
        </button>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <div className="trainings-grid">
          {trainings.map((training) => (
            <div key={training._id} className="training-card">
              <div className="training-image">
                <img 
                  src={training.image?.url || '/placeholder.png'} 
                  alt={training.name}
                  onError={(e) => e.target.src = '/placeholder.png'}
                />
              </div>
              <div className="training-content">
                <h3>{training.name}</h3>
                <p className="training-phone">📞 {training.phone}</p>
                <p className="training-desc">{training.description}</p>
                <div className="training-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(training)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(training._id)}
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
              <h2>{editMode ? 'Edit Training' : 'Add Training'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="training-form">
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
                <label>Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
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

export default TeacherTrainingManagement;