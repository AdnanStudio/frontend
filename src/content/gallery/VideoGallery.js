import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Play, Video, X } from 'lucide-react';
import './GalleryPages.css';

const VideoGallery = () => {
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    window.scrollTo(0, 0);
  }, []);

  // Placeholder videos - Replace with actual video URLs
  const videos = [
    {
      id: 1,
      title: 'কলেজ পরিচিতি ভিডিও',
      description: 'মালখানগর কলেজের সার্বিক পরিচিতি এবং সুবিধাদি',
      thumbnail: '/college.jpg',
      duration: '৫:৩০',
      date: '২০২৪',
      category: 'পরিচিতি'
    },
    {
      id: 2,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩',
      description: 'বার্ষিক আন্তঃশ্রেণি ক্রীড়া প্রতিযোগিতার হাইলাইটস',
      thumbnail: '/college.jpg',
      duration: '১০:১৫',
      date: '২০২৩',
      category: 'ক্রীড়া'
    },
    {
      id: 3,
      title: 'সাংস্কৃতিক সন্ধ্যা ২০২৩',
      description: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠানের বিশেষ পরিবেশনা',
      thumbnail: '/college.jpg',
      duration: '১৫:৪৫',
      date: '২০২৩',
      category: 'সাংস্কৃতিক'
    },
    {
      id: 4,
      title: 'বিজয় দিবস উদযাপন',
      description: 'মহান বিজয় দিবস উদযাপন অনুষ্ঠান',
      thumbnail: '/college.jpg',
      duration: '৮:২০',
      date: '২০২৩',
      category: 'অনুষ্ঠান'
    },
    {
      id: 5,
      title: 'বিজ্ঞান মেলা ২০২৩',
      description: 'শিক্ষার্থীদের বিজ্ঞান প্রদর্শনী এবং প্রতিযোগিতা',
      thumbnail: '/college.jpg',
      duration: '১২:৩০',
      date: '২০২৩',
      category: 'একাডেমিক'
    },
    {
      id: 6,
      title: 'অধ্যক্ষের বাণী',
      description: 'নতুন শিক্ষাবর্ষে অধ্যক্ষের বাণী ও দিকনির্দেশনা',
      thumbnail: '/sir.jpg',
      duration: '৪:১৫',
      date: '২০২৪',
      category: 'বার্তা'
    }
  ];

  const openVideo = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
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
          <p className="page-subtitle">
            মালখানগর কলেজের ভিডিও সংগ্রহ
          </p>
        </div>

        <div className="content-body">
          <div className="gallery-intro">
            <Video size={48} />
            <p>
              মালখানগর কলেজের বিভিন্ন অনুষ্ঠান, কার্যক্রম এবং গুরুত্বপূর্ণ মুহূর্তের ভিডিও সংগ্রহ। প্রতিটি ভিডিও আমাদের কলেজের প্রাণবন্ত কার্যক্রম এবং শিক্ষার্থীদের অংশগ্রহণের প্রমাণ।
            </p>
          </div>

          <div className="video-grid">
            {videos.map(video => (
              <div
                key={video.id}
                className="video-card"
                onClick={() => openVideo(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-button">
                    <Play size={48} fill="white" />
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-details">
                  <span className="video-category">{video.category}</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <span className="video-date">{video.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <button className="modal-close" onClick={closeVideo}>
            <X size={32} />
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-player">
              <div className="video-placeholder">
                <Play size={64} />
                <p>ভিডিও প্লেয়ার (শীঘ্রই যুক্ত হবে)</p>
                <span className="video-title">{selectedVideo.title}</span>
              </div>
            </div>
            <div className="modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
              <div className="modal-meta">
                <span className="meta-item">
                  <strong>ক্যাটাগরি:</strong> {selectedVideo.category}
                </span>
                <span className="meta-item">
                  <strong>সময়কাল:</strong> {selectedVideo.duration}
                </span>
                <span className="meta-item">
                  <strong>তারিখ:</strong> {selectedVideo.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;