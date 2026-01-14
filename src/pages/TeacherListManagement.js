import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import teacherListService from '../services/teacherListService';
import SkeletonLoader from '../components/SkeletonLoader';
import './TeacherListManagement.css';

const TeacherListManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phone: '',
    email: '',
    qualification: '',
    subjects: '',
    experience: '',
    image: null,
    order: 0
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherListService.getAllTeachers();
      setTeachers(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch teachers');
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
    data.append('designation', formData.designation);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('qualification', formData.qualification);
    data.append('subjects', formData.subjects);
    data.append('experience', formData.experience);
    data.append('order', formData.order);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editMode) {
        await teacherListService.updateTeacher(currentId, data);
        toast.success('Teacher updated successfully');
      } else {
        await teacherListService.createTeacher(data);
        toast.success('Teacher created successfully');
      }
      
      resetForm();
      fetchTeachers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleEdit = (teacher) => {
    setEditMode(true);
    setCurrentId(teacher._id);
    setFormData({
      name: teacher.name,
      designation: teacher.designation,
      phone: teacher.phone || '',
      email: teacher.email || '',
      qualification: teacher.qualification || '',
      subjects: Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : '',
      experience: teacher.experience || '',
      order: teacher.order,
      image: null
    });
    setImagePreview(teacher.image?.url);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;

    try {
      await teacherListService.deleteTeacher(id);
      toast.success('Teacher deleted successfully');
      fetchTeachers();
    } catch (error) {
      toast.error('Failed to delete teacher');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      phone: '',
      email: '',
      qualification: '',
      subjects: '',
      experience: '',
      image: null,
      order: 0
    });
    setImagePreview(null);
    setEditMode(false);
    setCurrentId(null);
    setShowModal(false);
  };

  return (
    <div className="teacher-list-management-container">
      <div className="page-header">
        <h1>Teacher List Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      {loading ? (
        <SkeletonLoader type="table" count={5} />
      ) : (
        <div className="teachers-table-wrapper">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Subjects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>
                    <div className="teacher-avatar">
                      <img 
                        src={teacher.image?.url || '/placeholder.png'} 
                        alt={teacher.name}
                        onError={(e) => e.target.src = '/placeholder.png'}
                      />
                    </div>
                  </td>
                  <td><strong>{teacher.name}</strong></td>
                  <td>{teacher.designation}</td>
                  <td>{teacher.phone || 'N/A'}</td>
                  <td>{teacher.email || 'N/A'}</td>
                  <td>
                    {Array.isArray(teacher.subjects) 
                      ? teacher.subjects.join(', ') 
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-edit-small"
                        onClick={() => handleEdit(teacher)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="btn-delete-small"
                        onClick={() => handleDelete(teacher._id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button className="btn-close" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="teacher-form">
              <div className="form-row">
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
                  <label>Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., M.Sc in Mathematics"
                />
              </div>

              <div className="form-group">
                <label>Subjects (comma-separated)</label>
                <input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  placeholder="e.g., Math, Physics, Chemistry"
                />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years"
                />
              </div>

              <div className="form-row">
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
                </div>
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}

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

export default TeacherListManagement;