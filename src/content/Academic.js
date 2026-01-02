import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import './ContentPages.css';

const Academic = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <SkeletonLoader type="text" count={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Academic</h1>
          <div className="title-underline"></div>
        </div>

        <div className="sub-navigation">
          <Link to="/academic/programs" className="sub-nav-card">
            <div className="sub-nav-icon">📚</div>
            <h3>Programs</h3>
            <p>Our academic programs and courses</p>
          </Link>

          <Link to="/academic/departments" className="sub-nav-card">
            <div className="sub-nav-icon">🏫</div>
            <h3>Departments</h3>
            <p>Academic departments overview</p>
          </Link>

          <Link to="/academic/syllabus" className="sub-nav-card">
            <div className="sub-nav-icon">📖</div>
            <h3>Syllabus</h3>
            <p>Course syllabus and curriculum</p>
          </Link>

          <Link to="/academic/calendar" className="sub-nav-card">
            <div className="sub-nav-icon">📅</div>
            <h3>Academic Calendar</h3>
            <p>Important dates and schedule</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Academic;