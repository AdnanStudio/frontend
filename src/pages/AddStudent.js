import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import './StudentForm.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    studentId: '',
    class: '',
    section: '',
    rollNumber: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    bloodGroup: '',
    previousSchool: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }

      await studentService.createStudent(submitData);
      toast.success('Student added successfully!');
      navigate('/dashboard/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-page">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/dashboard/students')}>
          <ArrowLeft size={20} />
          Back to Students
        </button>
        <h1>Add New Student</h1>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        {/* Profile Image Upload */}
        <div className="form-section">
          <h3>Profile Picture</h3>
          <div className="image-upload-container">
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="placeholder">
                  <Upload size={40} />
                  <p>Upload Photo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="profileImage"
              style={{ display: 'none' }}
            />
            <label htmlFor="profileImage" className="upload-btn">
              Choose Image
            </label>
          </div>
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID *</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g., STD001"
                required
              />
            </div>

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
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Roll Number *</label>
              <input
                type="number"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Previous School</label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                placeholder="Enter previous school name"
              />
            </div>
          </div>
        </div>

        {/* Guardian Information */}
        <div className="form-section">
          <h3>Guardian Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Guardian Name *</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Enter guardian name"
                required
              />
            </div>

            <div className="form-group">
              <label>Guardian Phone *</label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="Enter guardian phone"
                required
              />
            </div>

            <div className="form-group">
              <label>Guardian Email</label>
              <input
                type="email"
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleChange}
                placeholder="Enter guardian email"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/dashboard/students')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;