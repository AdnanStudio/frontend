import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classService from '../services/classService';
import { getTeachers } from '../services/teacherService';
import toast from 'react-hot-toast';
import { BookOpen, ArrowLeft, Plus, X } from 'lucide-react';
import './AddClass.css';

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    classTeacher: '',
    subjects: []
  });

  const [newSubject, setNewSubject] = useState({
    name: '',
    teacher: ''
  });

  useEffect(() => {
    fetchTeachers();
    fetchClassData();
  }, [id]);

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch teachers');
    }
  };

  const fetchClassData = async () => {
    try {
      setFetchLoading(true);
      const response = await classService.getClass(id);
      const classData = response.data;
      
      setFormData({
        name: classData.name,
        section: classData.section,
        classTeacher: classData.classTeacher?._id || '',
        subjects: classData.subjects || []
      });
    } catch (error) {
      toast.error('Failed to fetch class data');
      navigate('/dashboard/classes');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectChange = (e) => {
    setNewSubject({
      ...newSubject,
      [e.target.name]: e.target.value
    });
  };

  const addSubject = () => {
    if (!newSubject.name) {
      toast.error('Please enter subject name');
      return;
    }

    setFormData({
      ...formData,
      subjects: [...formData.subjects, newSubject]
    });

    setNewSubject({ name: '', teacher: '' });
    toast.success('Subject added');
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
    toast.success('Subject removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.section) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await classService.updateClass(id, formData);
      toast.success('Class updated successfully!');
      navigate('/dashboard/classes');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update class');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading class data...</p>
      </div>
    );
  }

  return (
    <div className="add-class-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard/classes')}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-title">
          <BookOpen size={32} />
          <div>
            <h1>Edit Class</h1>
            <p>Update class information</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Class Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Class 10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Section <span className="required">*</span></label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="e.g., A"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Class Teacher</label>
                <select
                  name="classTeacher"
                  value={formData.classTeacher}
                  onChange={handleChange}
                >
                  <option value="">Select Class Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.userId?.name} - {teacher.employeeId}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subjects Section */}
          <div className="form-section">
            <h2>Subjects</h2>
            
            <div className="add-subject-form">
              <div className="subject-inputs">
                <input
                  type="text"
                  name="name"
                  value={newSubject.name}
                  onChange={handleSubjectChange}
                  placeholder="Subject Name"
                />
                <select
                  name="teacher"
                  value={newSubject.teacher}
                  onChange={handleSubjectChange}
                >
                  <option value="">Select Teacher (Optional)</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.userId?.name}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={addSubject} className="btn-add-subject">
                  <Plus size={20} />
                  Add
                </button>
              </div>
            </div>

            {formData.subjects.length > 0 && (
              <div className="subjects-list">
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="subject-item">
                    <div className="subject-info">
                      <span className="subject-name">{subject.name}</span>
                      <span className="subject-teacher">
                        {teachers.find(t => t._id === subject.teacher)?.userId?.name || 'No Teacher'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="btn-remove"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/dashboard/classes')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClass;