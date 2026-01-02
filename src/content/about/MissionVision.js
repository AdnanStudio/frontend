import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import '../ContentPages.css';

const MissionVision = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <SkeletonLoader type="text" count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Mission & Vision</h1>
          <div className="title-underline"></div>
        </div>

        <div className="content-body">
          <div className="content-section">
            <p>
              {/* Content will be added later */}
              Mission and vision content will be added here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;