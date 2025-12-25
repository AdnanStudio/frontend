import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classRoutineService from '../services/classRoutineService';
import WeeklyRoutineView from '../components/WeeklyRoutineView';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader } from 'lucide-react';
import './ClassRoutineView.css';

const ClassRoutineView = () => {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutine();
  }, [id]);

  const fetchRoutine = async () => {
    try {
      setLoading(true);
      const data = await classRoutineService.getRoutineById(id);
      setRoutine(data.data);
    } catch (error) {
      toast.error('Failed to load routine');
      navigate('/dashboard/class-routine');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Loading routine...</p>
      </div>
    );
  }

  return (
    <div className="class-routine-view-page">
      <button className="btn-back" onClick={() => navigate('/dashboard/class-routine')}>
        <ArrowLeft size={20} />
        Back to Routines
      </button>

      {routine && <WeeklyRoutineView routine={routine} />}
    </div>
  );
};

export default ClassRoutineView;