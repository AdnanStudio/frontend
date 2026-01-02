import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import './ContentPages.css';

const Gallery = () => {
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
          <h1>Gallery</h1>
          <div className="title-underline"></div>
        </div>

        <div className="sub-navigation">
          <Link to="/gallery/photos" className="sub-nav-card">
            <div className="sub-nav-icon">📷</div>
            <h3>Photo Gallery</h3>
            <p>Explore our photo collection</p>
          </Link>

          <Link to="/gallery/videos" className="sub-nav-card">
            <div className="sub-nav-icon">🎥</div>
            <h3>Video Gallery</h3>
            <p>Watch our video archives</p>
          </Link>

          <Link to="/gallery/events" className="sub-nav-card">
            <div className="sub-nav-icon">🎉</div>
            <h3>Events</h3>
            <p>Past and upcoming events</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;