import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classRoutineService from '../services/classRoutineService';
import classService from '../services/classService';
import teacherService from '../services/teacherService';
import subjectService from '../services/subjectService';
import toast from 'react-hot-toast';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  BookOpen,
  Save,
  X
} from 'lucide-react';
import './ClassRoutine.css';

const ClassRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState(null);

  const [formData, setFormData] = useState({
    classId: '',
    academicYear: new Date().getFullYear().toString(),
    schedule: []
  });

  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [routinesRes, classesRes, teachersRes, subjectsRes] = await Promise.all([
        classRoutineService.getAllRoutines(),
        classService.getAllClasses(),
        teacherService.getAllTeachers(),
        subjectService.getAllSubjects()
      ]);

      setRoutines(routinesRes.data);
      setClasses(classesRes.data);
      setTeachers(teachersRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const initializeSchedule = () => {
    return days.map(day => ({
      day,
      periods: [
        {
          periodNumber: 1,
          startTime: '08:00',
          endTime: '08:45',
          subject: '',
          teacher: '',
          room: ''
        },
        {
          periodNumber: 2,
          startTime: '08:45',
          endTime: '09:30',
          subject: '',
          teacher: '',
          room: ''
        },
        {
          periodNumber: 3,
          startTime: '09:30',
          endTime: '10:15',
          subject: '',
          teacher: '',
          room: ''
        },
        {
          periodNumber: 4,
          startTime: '10:30',
          endTime: '11:15',
          subject: '',
          teacher: '',
          room: ''
        },
        {
          periodNumber: 5,
          startTime: '11:15',
          endTime: '12:00',
          subject: '',
          teacher: '',
          room: ''
        },
        {
          periodNumber: 6,
          startTime: '12:00',
          endTime: '12:45',
          subject: '',
          teacher: '',
          room: ''
        }
      ]
    }));
  };

  const handleAddNew = () => {
    setFormData({
      classId: '',
      academicYear: new Date().getFullYear().toString(),
      schedule: initializeSchedule()
    });
    setEditMode(false);
    setCurrentRoutine(null);
    setShowModal(true);
  };

  const handleEdit = (routine) => {
    setFormData({
      classId: routine.class._id,
      academicYear: routine.academicYear,
      schedule: routine.schedule
    });
    setEditMode(true);
    setCurrentRoutine(routine);
    setShowModal(true);
  };

  const handlePeriodChange = (dayIndex, periodIndex, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[dayIndex].periods[periodIndex][field] = value;
    setFormData({ ...formData, schedule: newSchedule });
  };

  const handleAddPeriod = (dayIndex) => {
    const newSchedule = [...formData.schedule];
    const lastPeriod = newSchedule[dayIndex].periods[newSchedule[dayIndex].periods.length - 1];
    const newPeriodNumber = lastPeriod ? lastPeriod.periodNumber + 1 : 1;

    newSchedule[dayIndex].periods.push({
      periodNumber: newPeriodNumber,
      startTime: '13:00',
      endTime: '13:45',
      subject: '',
      teacher: '',
      room: ''
    });

    setFormData({ ...formData, schedule: newSchedule });
  };

  const handleRemovePeriod = (dayIndex, periodIndex) => {
    const newSchedule = [...formData.schedule];
    newSchedule[dayIndex].periods.splice(periodIndex, 1);
    setFormData({ ...formData, schedule: newSchedule });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.classId) {
      toast.error('Please select a class');
      return;
    }

    try {
      if (editMode) {
        await classRoutineService.updateRoutine(currentRoutine._id, {
          schedule: formData.schedule
        });
        toast.success('Routine updated successfully');
      } else {
        await classRoutineService.createRoutine(formData);
        toast.success('Routine created successfully');
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to save routine');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this routine?')) {
      try {
        await classRoutineService.deleteRoutine(id);
        toast.success('Routine deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete routine');
      }
    }
  };

  const handleView = (routine) => {
    navigate(`/dashboard/class-routine/${routine._id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading routines...</p>
      </div>
    );
  }

  return (
    <div className="class-routine-page">
      <div className="page-header">
        <div className="header-left">
          <Calendar size={32} />
          <div>
            <h1>Class Routine Management</h1>
            <p>Create and manage class routines</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleAddNew}>
          <Plus size={20} />
          Create Routine
        </button>
      </div>

      <div className="routines-grid">
        {routines.length === 0 ? (
          <div className="no-data">
            <Calendar size={64} />
            <p>No routines found</p>
            <button onClick={handleAddNew} className="btn-primary">
              Create First Routine
            </button>
          </div>
        ) : (
          routines.map((routine) => (
            <div key={routine._id} className="routine-card">
              <div className="routine-card-header">
                <h3>{routine.class.className}</h3>
                <span className="section-badge">Section {routine.class.section}</span>
              </div>
              <div className="routine-card-body">
                <p className="academic-year">
                  <Clock size={16} />
                  Academic Year: {routine.academicYear}
                </p>
                <p className="schedule-info">
                  <BookOpen size={16} />
                  {routine.schedule.reduce((acc, day) => acc + day.periods.length, 0)} Total Periods
                </p>
              </div>
              <div className="routine-card-actions">
                <button
                  className="btn-icon btn-view"
                  onClick={() => handleView(routine)}
                  title="View"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="btn-icon btn-edit"
                  onClick={() => handleEdit(routine)}
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(routine._id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content routine-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? 'Edit Routine' : 'Create New Routine'}</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Class *</label>
                      <select
                        value={formData.classId}
                        onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                        required
                        disabled={editMode}
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls._id}>
                            {cls.className} - Section {cls.section}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Academic Year *</label>
                      <input
                        type="text"
                        value={formData.academicYear}
                        onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                        required
                        disabled={editMode}
                      />
                    </div>
                  </div>
                </div>

                <div className="schedule-editor">
                  <h3>Weekly Schedule</h3>
                  {formData.schedule.map((daySchedule, dayIndex) => (
                    <div key={daySchedule.day} className="day-schedule-editor">
                      <div className="day-header">
                        <h4>{daySchedule.day}</h4>
                        <button
                          type="button"
                          className="btn-add-period"
                          onClick={() => handleAddPeriod(dayIndex)}
                        >
                          <Plus size={16} />
                          Add Period
                        </button>
                      </div>

                      <div className="periods-list">
                        {daySchedule.periods.map((period, periodIndex) => (
                          <div key={periodIndex} className="period-editor">
                            <div className="period-number-badge">Period {period.periodNumber}</div>

                            <div className="period-fields">
                              <div className="form-group">
                                <label>Start Time</label>
                                <input
                                  type="time"
                                  value={period.startTime}
                                  onChange={(e) =>
                                    handlePeriodChange(dayIndex, periodIndex, 'startTime', e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>End Time</label>
                                <input
                                  type="time"
                                  value={period.endTime}
                                  onChange={(e) =>
                                    handlePeriodChange(dayIndex, periodIndex, 'endTime', e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>Subject</label>
                                <select
                                  value={period.subject}
                                  onChange={(e) =>
                                    handlePeriodChange(dayIndex, periodIndex, 'subject', e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select Subject</option>
                                  {subjects.map((subject) => (
                                    <option key={subject._id} value={subject._id}>
                                      {subject.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Teacher</label>
                                <select
                                  value={period.teacher}
                                  onChange={(e) =>
                                    handlePeriodChange(dayIndex, periodIndex, 'teacher', e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select Teacher</option>
                                  {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                      {teacher.userId.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Room</label>
                                <input
                                  type="text"
                                  value={period.room}
                                  onChange={(e) =>
                                    handlePeriodChange(dayIndex, periodIndex, 'room', e.target.value)
                                  }
                                  placeholder="Room No."
                                />
                              </div>

                              <button
                                type="button"
                                className="btn-remove-period"
                                onClick={() => handleRemovePeriod(dayIndex, periodIndex)}
                                title="Remove Period"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={20} />
                  {editMode ? 'Update Routine' : 'Create Routine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRoutine;