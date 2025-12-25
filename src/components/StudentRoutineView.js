import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classRoutineService from '../services/classRoutineService';
import studentService from '../services/studentService';
import WeeklyRoutineView from './WeeklyRoutineView';
import toast from 'react-hot-toast';
import { Calendar, Loader } from 'lucide-react';
import './StudentRoutineView.css';

const StudentRoutineView = () => {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchStudentRoutine();
  }, []);

  const fetchStudentRoutine = async () => {
    try {
      setLoading(true);
      
      // Get student's class info
      const studentData = await studentService.getStudentProfile();
      const classId = studentData.data.class._id;

      // Fetch routine for student's class
      const routineData = await classRoutineService.getRoutineByClass(classId);
      setRoutine(routineData.data);
    } catch (error) {
      console.error('Fetch Routine Error:', error);
      toast.error(error.message || 'Failed to load class routine');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Loading your class routine...</p>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="no-routine-container">
        <Calendar size={64} />
        <h3>No Class Routine Available</h3>
        <p>Your class routine hasn't been published yet.</p>
      </div>
    );
  }

  return (
    <div className="student-routine-view">
      <WeeklyRoutineView routine={routine} />
    </div>
  );
};

export default StudentRoutineView;