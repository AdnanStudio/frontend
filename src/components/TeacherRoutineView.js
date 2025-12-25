import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classRoutineService from '../services/classRoutineService';
import teacherService from '../services/teacherService';
import WeeklyRoutineView from './WeeklyRoutineView';
import toast from 'react-hot-toast';
import { Calendar, Loader } from 'lucide-react';
import './TeacherRoutineView.css';

const TeacherRoutineView = () => {
  const [routines, setRoutines] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchTeacherRoutines();
  }, []);

  const fetchTeacherRoutines = async () => {
    try {
      setLoading(true);
      
      // Get teacher profile
      const teacherData = await teacherService.getTeacherProfile();
      setTeacherId(teacherData.data._id);

      // Fetch all routines (backend will filter and highlight)
      const routinesData = await classRoutineService.getAllRoutines();
      setRoutines(routinesData.data);
      
      if (routinesData.data.length > 0) {
        setSelectedRoutine(routinesData.data[0]);
      }
    } catch (error) {
      console.error('Fetch Routines Error:', error);
      toast.error(error.message || 'Failed to load routines');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Loading your class routines...</p>
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <div className="no-routine-container">
        <Calendar size={64} />
        <h3>No Class Routines Available</h3>
        <p>Class routines haven't been published yet.</p>
      </div>
    );
  }

  return (
    <div className="teacher-routine-view">
      <div className="routine-selector">
        <label>Select Class:</label>
        <select
          value={selectedRoutine?._id || ''}
          onChange={(e) => {
            const routine = routines.find(r => r._id === e.target.value);
            setSelectedRoutine(routine);
          }}
        >
          {routines.map((routine) => (
            <option key={routine._id} value={routine._id}>
              {routine.class.className} - Section {routine.class.section}
            </option>
          ))}
        </select>
      </div>

      {selectedRoutine && (
        <WeeklyRoutineView
          routine={selectedRoutine}
          highlightTeacher={true}
          teacherId={teacherId}
        />
      )}

      <div className="routine-legend">
        <div className="legend-item">
          <div className="legend-color highlighted"></div>
          <span>Your Classes</span>
        </div>
        <div className="legend-item">
          <div className="legend-color normal"></div>
          <span>Other Classes</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherRoutineView;