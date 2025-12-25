import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teacherService from '../services/teacherService';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import './StudentForm.css'; // Same CSS as AddStudent

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    employeeId: '',
    subject: [],
    qualification: '',
    experience: '',
    salary: '',
    classTeacher: {
      class: '',
      section: ''
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const navigate = useNavigate();

  const availableSubjects = [
    'Mathematics',
    'English',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'History',
    'Geography',
    'Bengali',
    'Social Science',
    'Physical Education'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'classTeacherClass' || name === 'classTeacherSection') {
      setFormData({
        ...formData,
        classTeacher: {
          ...formData.classTeacher,
          [name === 'classTeacherClass' ? 'class' : 'section']: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    if (subject && !selectedSubjects.includes(subject)) {
      const newSubjects = [...selectedSubjects, subject];
      setSelectedSubjects(newSubjects);
      setFormData({ ...formData, subject: newSubjects });
    }
  };

  const removeSubject = (subjectToRemove) => {
    const newSubjects = selectedSubjects.filter(s => s !== subjectToRemove);
    setSelectedSubjects(newSubjects);
    setFormData({ ...formData, subject: newSubjects });
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
    
    if (!formData.name || !formData.email || !formData.password || !formData.employeeId) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = new FormData();
      
      // Basic fields
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('employeeId', formData.employeeId);
      submitData.append('qualification', formData.qualification);
      submitData.append('experience', formData.experience || 0);
      submitData.append('salary', formData.salary);
      
      // Subjects - backend expects array
      selectedSubjects.forEach(subject => {
        submitData.append('subject', subject);
      });
      
      // Class Teacher info (optional)
      if (formData.classTeacher.class && formData.classTeacher.section) {
        submitData.append('classTeacher[class]', formData.classTeacher.class);
        submitData.append('classTeacher[section]', formData.classTeacher.section);
      }
      
      // Profile image
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }

      await teacherService.createTeacher(submitData);
      toast.success('Teacher added successfully!');
      navigate('/dashboard/teachers');
    } catch (error) {
      toast.error(error.message || 'Failed to add teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-page">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/dashboard/teachers')}>
          <ArrowLeft size={20} />
          Back to Teachers
        </button>
        <h1>Add New Teacher</h1>
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

        {/* Professional Information */}
        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID *</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="e.g., TCH001"
                required
              />
            </div>

            <div className="form-group">
              <label>Qualification *</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g., M.Sc in Mathematics"
                required
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter years of experience"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Salary *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter monthly salary"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Subjects *</label>
              <select onChange={handleSubjectChange} value="">
                <option value="">Select subjects to teach</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <div className="selected-subjects">
                {selectedSubjects.map((subject) => (
                  <span key={subject} className="subject-tag">
                    {subject}
                    <button
                      type="button"
                      onClick={() => removeSubject(subject)}
                      className="remove-subject"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Class Teacher (Optional) */}
        <div className="form-section">
          <h3>Class Teacher Assignment (Optional)</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Class</label>
              <select
                name="classTeacherClass"
                value={formData.classTeacher.class}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select
                name="classTeacherSection"
                value={formData.classTeacher.section}
                onChange={handleChange}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/dashboard/teachers')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Teacher'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
