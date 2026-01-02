import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import './ContentPages.css';

const Admission = () => {
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
          <h1>Admission</h1>
          <div className="title-underline"></div>
        </div>

        <div className="sub-navigation">
          <Link to="/admission/procedure" className="sub-nav-card">
            <div className="sub-nav-icon">📝</div>
            <h3>Admission Procedure</h3>
            <p>Step-by-step admission process</p>
          </Link>

          <Link to="/admission/requirements" className="sub-nav-card">
            <div className="sub-nav-icon">📋</div>
            <h3>Requirements</h3>
            <p>Eligibility and required documents</p>
          </Link>

          <Link to="/admission/apply" className="sub-nav-card">
            <div className="sub-nav-icon">✍️</div>
            <h3>Apply Online</h3>
            <p>Submit your admission application</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admission;