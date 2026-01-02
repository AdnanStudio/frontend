import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import './ContentPages.css';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
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
          <h1>About Us</h1>
          <div className="title-underline"></div>
        </div>

        <div className="sub-navigation">
          <Link to="/about/history" className="sub-nav-card">
            <div className="sub-nav-icon">🏛️</div>
            <h3>College History</h3>
            <p>Learn about our journey and heritage</p>
          </Link>

          <Link to="/about/mission-vision" className="sub-nav-card">
            <div className="sub-nav-icon">🎯</div>
            <h3>Mission & Vision</h3>
            <p>Our goals and aspirations</p>
          </Link>

          <Link to="/about/facilities" className="sub-nav-card">
            <div className="sub-nav-icon">🏢</div>
            <h3>Facilities</h3>
            <p>Campus infrastructure and amenities</p>
          </Link>

          <Link to="/about/achievements" className="sub-nav-card">
            <div className="sub-nav-icon">🏆</div>
            <h3>Achievements</h3>
            <p>Our milestones and successes</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;