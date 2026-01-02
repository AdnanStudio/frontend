import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import './ContentPages.css';

const Administration = () => {
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
          <h1>Administration</h1>
          <div className="title-underline"></div>
        </div>

        <div className="sub-navigation">
          <Link to="/administration/governing-body" className="sub-nav-card">
            <div className="sub-nav-icon">👥</div>
            <h3>Governing Body</h3>
            <p>Our leadership and governing council</p>
          </Link>

          <Link to="/administration/principal" className="sub-nav-card">
            <div className="sub-nav-icon">👨‍💼</div>
            <h3>Principal</h3>
            <p>Message from the principal</p>
          </Link>

          <Link to="/administration/teachers" className="sub-nav-card">
            <div className="sub-nav-icon">👨‍🏫</div>
            <h3>Teachers</h3>
            <p>Our dedicated teaching faculty</p>
          </Link>

          <Link to="/administration/staff" className="sub-nav-card">
            <div className="sub-nav-icon">👔</div>
            <h3>Staff</h3>
            <p>Administrative and support staff</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Administration;