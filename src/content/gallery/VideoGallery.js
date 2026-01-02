import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import '../ContentPages.css';

const VideoGallery = () => {
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <SkeletonLoader type="image" height="300px" />
            <SkeletonLoader type="image" height="300px" />
            <SkeletonLoader type="image" height="300px" />
            <SkeletonLoader type="image" height="300px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Video Gallery</h1>
          <div className="title-underline"></div>
        </div>

        <div className="content-body">
          <div className="content-section">
            <p>
              {/* Content will be added later */}
              Video gallery will be added here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;