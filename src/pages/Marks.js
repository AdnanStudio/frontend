/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import markService from '../services/markService';
import studentService from '../services/studentService';
import toast from 'react-hot-toast';
import { Award, Plus, TrendingUp, BookOpen } from 'lucide-react';
import './Marks.css';

const Marks = () => {
  const { user } = useSelector((state) => state.auth);
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [createForm, setCreateForm] = useState({
    student: '',
    subject: '',
    examType: 'midterm',
    examName: '',
    totalMarks: '',
    obtainedMarks: '',
    examDate: '',
    remarks: '',
    isPublished: false,
  });

  useEffect(() => {
    fetchMarks();
    if (user.role !== 'student') {
      fetchStudents();
    }
  }, [user.role]);

  const fetchMarks = async () => {
    try {
      setLoading(true);
      const data = await markService.getAllMarks();
      setMarks(data.data);

      if (user.role === 'student' && data.data.length > 0) {
        const studentId = data.data[0].student._id;
        const statsData = await markService.getMarksByStudent(studentId);
        setStatistics(statsData.data.statistics);
      }
    } catch (error) {
      toast.error('Failed to fetch marks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data.data);
    } catch (error) {
      console.error('Failed to fetch students');
    }
  };

  const handleCreateMark = async (e) => {
    e.preventDefault();

    if (parseFloat(createForm.obtainedMarks) > parseFloat(createForm.totalMarks)) {
      toast.error('Obtained marks cannot be greater than total marks');
      return;
    }

    try {
      await markService.createMark(createForm);
      toast.success('Mark created successfully');
      setShowCreateModal(false);
      setCreateForm({
        student: '',
        subject: '',
        examType: 'midterm',
        examName: '',
        totalMarks: '',
        obtainedMarks: '',
        examDate: '',
        remarks: '',
        isPublished: false,
      });
      fetchMarks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create mark');
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'grade-a';
    if (grade === 'A-' || grade === 'B') return 'grade-b';
    if (grade === 'C' || grade === 'D') return 'grade-c';
    return 'grade-f';
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="marks-page">
      <div className="page-header">
        <div className="header-left">
          <Award size={32} />
          <div>
            <h1>Marks & Grades</h1>
            <p>View and manage student marks</p>
          </div>
        </div>
        {user.role !== 'student' && (
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={20} /> Add Marks
          </button>
        )}
      </div>

      {user.role === 'student' && statistics && (
        <div className="marks-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen size={30} />
            </div>
            <div className="stat-info">
              <h3>{statistics.totalExams}</h3>
              <p>Total Exams</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={30} />
            </div>
            <div className="stat-info">
              <h3>{statistics.percentage}</h3>
              <p>Average Percentage</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={30} />
            </div>
            <div className="stat-info">
              <h3>
                {statistics.obtainedMarks}/{statistics.totalMarks}
              </h3>
              <p>Total Marks</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading marks...</p>
        </div>
      ) : (
        <div className="marks-container">
          {marks.length === 0 ? (
            <div className="no-data">No marks available</div>
          ) : (
            <div className="marks-table-container">
              <table className="marks-table">
                <thead>
                  <tr>
                    {user.role !== 'student' && <th>Student</th>}
                    <th>Subject</th>
                    <th>Exam Type</th>
                    <th>Exam Name</th>
                    <th>Total Marks</th>
                    <th>Obtained</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((mark) => (
                    <tr key={mark._id}>
                      {user.role !== 'student' && (
                        <td>
                          <div className="student-cell">
                            <img
                              src={mark.student?.userId?.profileImage || 'https://via.placeholder.com/30'}
                              alt={mark.student?.userId?.name}
                              className="student-avatar-small"
                            />
                            <span>{mark.student?.userId?.name}</span>
                          </div>
                        </td>
                      )}
                      <td className="subject-cell">{mark.subject}</td>
                      <td>
                        <span className="exam-type-badge">{mark.examType.replace('_', ' ')}</span>
                      </td>
                      <td>{mark.examName}</td>
                      <td>{mark.totalMarks}</td>
                      <td>{mark.obtainedMarks}</td>
                      <td>{((mark.obtainedMarks / mark.totalMarks) * 100).toFixed(2)}%</td>
                      <td>
                        <span className={`grade-badge ${getGradeColor(mark.grade)}`}>{mark.grade}</span>
                      </td>
                      <td>{formatDate(mark.examDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Marks</h2>
              <button onClick={() => setShowCreateModal(false)} className="close-btn">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateMark}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Select Student *</label>
                    <select
                      value={createForm.student}
                      onChange={(e) => setCreateForm({ ...createForm, student: e.target.value })}
                      required
                    >
                      <option value="">Choose Student</option>
                      {students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.userId?.name} - {student.studentId}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      value={createForm.subject}
                      onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Exam Type *</label>
                    <select
                      value={createForm.examType}
                      onChange={(e) => setCreateForm({ ...createForm, examType: e.target.value })}
                      required
                    >
                      <option value="midterm">Midterm</option>
                      <option value="final">Final</option>
                      <option value="class_test">Class Test</option>
                      <option value="assignment">Assignment</option>
                      <option value="project">Project</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Exam Name *</label>
                    <input
                      type="text"
                      value={createForm.examName}
                      onChange={(e) => setCreateForm({ ...createForm, examName: e.target.value })}
                      placeholder="e.g., First Midterm 2024"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Marks *</label>
                    <input
                      type="number"
                      value={createForm.totalMarks}
                      onChange={(e) => setCreateForm({ ...createForm, totalMarks: e.target.value })}
                      placeholder="e.g., 100"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Obtained Marks *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={createForm.obtainedMarks}
                      onChange={(e) => setCreateForm({ ...createForm, obtainedMarks: e.target.value })}
                      placeholder="e.g., 85"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Exam Date</label>
                    <input
                      type="date"
                      value={createForm.examDate}
                      onChange={(e) => setCreateForm({ ...createForm, examDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Remarks</label>
                    <textarea
                      value={createForm.remarks}
                      onChange={(e) => setCreateForm({ ...createForm, remarks: e.target.value })}
                      placeholder="Additional comments"
                      rows="3"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={createForm.isPublished}
                        onChange={(e) => setCreateForm({ ...createForm, isPublished: e.target.checked })}
                      />
                      <span>Publish marks (students will be able to see)</span>
                    </label>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Marks
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;
