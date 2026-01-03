import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Camera, X } from 'lucide-react';
import './GalleryPages.css';

const PhotoGallery = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { value: 'all', label: 'সকল ছবি' },
    { value: 'campus', label: 'ক্যাম্পাস' },
    { value: 'events', label: 'অনুষ্ঠান' },
    { value: 'sports', label: 'ক্রীড়া' },
    { value: 'cultural', label: 'সাংস্কৃতিক' },
    { value: 'academic', label: 'একাডেমিক' },
  ];

  // Placeholder images - Replace with actual images
  const photos = [
    {
      id: 1,
      title: 'কলেজ ভবন',
      category: 'campus',
      image: '/college.jpg',
      date: '২০২৪'
    },
    {
      id: 2,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
      category: 'sports',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 3,
      title: 'সাংস্কৃতিক সন্ধ্যা',
      category: 'cultural',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 4,
      title: 'বিজয় দিবস উদযাপন',
      category: 'events',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 5,
      title: 'বিজ্ঞান মেলা',
      category: 'academic',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 6,
      title: 'শহীদ মিনার',
      category: 'campus',
      image: '/college.jpg',
      date: '২০২৪'
    },
    {
      id: 7,
      title: 'ফুটবল টুর্নামেন্ট',
      category: 'sports',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 8,
      title: 'নববর্ষ উদযাপন',
      category: 'cultural',
      image: '/college.jpg',
      date: '২০২৪'
    },
    {
      id: 9,
      title: 'শিক্ষা সফর',
      category: 'academic',
      image: '/college.jpg',
      date: '২০২৩'
    },
    {
      id: 10,
      title: 'স্বাধীনতা দিবস',
      category: 'events',
      image: '/college.jpg',
      date: '২০২৪'
    },
    {
      id: 11,
      title: 'গ্রন্থাগার',
      category: 'campus',
      image: '/college.jpg',
      date: '২০২৪'
    },
    {
      id: 12,
      title: 'বিতর্ক প্রতিযোগিতা',
      category: 'cultural',
      image: '/college.jpg',
      date: '২০২৩'
    }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (photo) => {
    setLightboxImage(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <SkeletonLoader type="image" height="250px" />
            <SkeletonLoader type="image" height="250px" />
            <SkeletonLoader type="image" height="250px" />
            <SkeletonLoader type="image" height="250px" />
            <SkeletonLoader type="image" height="250px" />
            <SkeletonLoader type="image" height="250px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Photo Gallery</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            মালখানগর কলেজের স্মৃতিময় মুহূর্ত
          </p>
        </div>

        <div className="content-body">
          <div className="gallery-intro">
            <Camera size={48} />
            <p>
              মালখানগর কলেজের বিভিন্ন অনুষ্ঠান, কার্যক্রম এবং দৈনন্দিন কলেজ জীবনের সুন্দর মুহূর্তগুলো এই গ্যালারিতে সংরক্ষিত রয়েছে। প্রতিটি ছবি আমাদের কলেজের সমৃদ্ধ ইতিহাস এবং প্রাণবন্ত পরিবেশের সাক্ষ্য বহন করে।
            </p>
          </div>

          <div className="gallery-stats">
            <div className="stat-item">
              <h3>১০০০+</h3>
              <p>ফটো সংগ্রহ</p>
            </div>
            <div className="stat-item">
              <h3>৫০+</h3>
              <p>ইভেন্ট কভার</p>
            </div>
            <div className="stat-item">
              <h3>১০+</h3>
              <p>বছরের আর্কাইভ</p>
            </div>
          </div>

          <div className="category-filter">
            <label>ক্যাটাগরি নির্বাচন করুন:</label>
            <div className="category-buttons">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="photo-grid">
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                className="photo-item"
                onClick={() => openLightbox(photo)}
              >
                <div className="photo-image">
                  <img src={photo.image} alt={photo.title} />
                  <div className="photo-overlay">
                    <Camera size={32} />
                    <span>দেখুন</span>
                  </div>
                </div>
                <div className="photo-info">
                  <h4>{photo.title}</h4>
                  <span className="photo-date">{photo.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="no-photos">
              <Camera size={60} color="#ccc" />
              <p>এই ক্যাটাগরিতে কোনো ছবি নেই</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.image} alt={lightboxImage.title} />
            <div className="lightbox-info">
              <h3>{lightboxImage.title}</h3>
              <p>{lightboxImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;