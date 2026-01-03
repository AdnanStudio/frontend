import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Calendar, MapPin, Users } from 'lucide-react';
import './GalleryPages.css';

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    window.scrollTo(0, 0);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫',
      date: '১৫ ফেব্রুয়ারি ২০২৫',
      time: 'সকাল ৯:০০ টা',
      location: 'কলেজ মাঠ',
      description: 'আন্তঃশ্রেণি ক্রীড়া প্রতিযোগিতা - ফুটবল, ক্রিকেট, ভলিবল এবং অন্যান্য খেলা',
      participants: '৫০০+ শিক্ষার্থী',
      image: '/college.jpg'
    },
    {
      id: 2,
      title: 'সাংস্কৃতিক সন্ধ্যা',
      date: '২৫ ফেব্রুয়ারি ২০২৫',
      time: 'বিকাল ৪:০০ টা',
      location: 'কলেজ অডিটোরিয়াম',
      description: 'গান, নাটক, নৃত্য এবং কবিতা আবৃত্তি প্রতিযোগিতা',
      participants: '২০০+ শিক্ষার্থী',
      image: '/college.jpg'
    },
    {
      id: 3,
      title: 'বিজ্ঞান মেলা ২০২৫',
      date: '১০ মার্চ ২০২৫',
      time: 'সকাল ১০:০০ টা',
      location: 'বিজ্ঞান ভবন',
      description: 'শিক্ষার্থীদের বৈজ্ঞানিক প্রকল্প প্রদর্শনী এবং প্রতিযোগিতা',
      participants: '১৫০+ প্রকল্প',
      image: '/college.jpg'
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: 'বিজয় দিবস উদযাপন ২০২৩',
      date: '১৬ ডিসেম্বর ২০২৩',
      location: 'কলেজ ক্যাম্পাস',
      description: 'মহান বিজয় দিবস উপলক্ষে আলোচনা সভা, সাংস্কৃতিক অনুষ্ঠান',
      image: '/college.jpg',
      gallery: '৫০+ ছবি'
    },
    {
      id: 2,
      title: 'শহীদ দিবস পালন',
      date: '২১ ফেব্রুয়ারি ২০২৪',
      location: 'শহীদ মিনার',
      description: 'আন্তর্জাতিক মাতৃভাষা দিবস উপলক্ষে প্রভাত ফেরি, আলোচনা সভা',
      image: '/college.jpg',
      gallery: '৪০+ ছবি'
    },
    {
      id: 3,
      title: 'বার্ষিক পুরস্কার বিতরণী',
      date: '৩০ জানুয়ারি ২০২৪',
      location: 'কলেজ অডিটোরিয়াম',
      description: 'মেধাবী শিক্ষার্থীদের পুরস্কার ও সার্টিফিকেট প্রদান',
      image: '/college.jpg',
      gallery: '৬০+ ছবি'
    },
    {
      id: 4,
      title: 'স্বাধীনতা দিবস উদযাপন',
      date: '২৬ মার্চ ২০২৪',
      location: 'কলেজ ক্যাম্পাস',
      description: 'জাতীয় পতাকা উত্তোলন, আলোচনা সভা এবং সাংস্কৃতিক অনুষ্ঠান',
      image: '/college.jpg',
      gallery: '৭০+ ছবি'
    }
  ];

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Events</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            মালখানগর কলেজের অনুষ্ঠান ও কার্যক্রম
          </p>
        </div>

        <div className="content-body">
          <div className="gallery-intro">
            <Calendar size={48} />
            <p>
              মালখানগর কলেজে সারা বছর ধরে বিভিন্ন শিক্ষামূলক, সাংস্কৃতিক ও ক্রীড়া অনুষ্ঠান আয়োজন করা হয়। এই অনুষ্ঠানগুলো শিক্ষার্থীদের সর্বাঙ্গীণ বিকাশে গুরুত্বপূর্ণ ভূমিকা পালন করে।
            </p>
          </div>

          <div className="events-tabs">
            <button
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              আসন্ন অনুষ্ঠান
            </button>
            <button
              className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              পূর্ববর্তী অনুষ্ঠান
            </button>
          </div>

          {activeTab === 'upcoming' && (
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-card upcoming">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-badge">আসছে</div>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-meta">
                      <div className="meta-item">
                        <Calendar size={18} />
                        <span>{event.date} | {event.time}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={18} />
                        <span>{event.location}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={18} />
                        <span>{event.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="events-grid">
              {pastEvents.map(event => (
                <div key={event.id} className="event-card-small">
                  <div className="event-image-small">
                    <img src={event.image} alt={event.title} />
                    <div className="gallery-badge">{event.gallery}</div>
                  </div>
                  <div className="event-content-small">
                    <h4>{event.title}</h4>
                    <div className="event-date-small">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <p>{event.description}</p>
                    <div className="event-location-small">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="event-categories">
            <h2>অনুষ্ঠানের ধরন</h2>
            <div className="categories-grid">
              <div className="category-box">
                <span className="category-icon">🏆</span>
                <h4>ক্রীড়া প্রতিযোগিতা</h4>
                <p>ফুটবল, ক্রিকেট, ভলিবল এবং অন্যান্য খেলাধুলা</p>
              </div>

              <div className="category-box">
                <span className="category-icon">🎭</span>
                <h4>সাংস্কৃতিক অনুষ্ঠান</h4>
                <p>গান, নাটক, নৃত্য এবং কবিতা আবৃত্তি</p>
              </div>

              <div className="category-box">
                <span className="category-icon">🔬</span>
                <h4>বিজ্ঞান মেলা</h4>
                <p>বৈজ্ঞানিক প্রকল্প প্রদর্শনী এবং প্রতিযোগিতা</p>
              </div>

              <div className="category-box">
                <span className="category-icon">💬</span>
                <h4>বিতর্ক প্রতিযোগিতা</h4>
                <p>জাতীয় ও আন্তর্জাতিক বিষয়ে বিতর্ক</p>
              </div>

              <div className="category-box">
                <span className="category-icon">🎖️</span>
                <h4>জাতীয় দিবস</h4>
                <p>শহীদ দিবস, স্বাধীনতা দিবস, বিজয় দিবস উদযাপন</p>
              </div>

              <div className="category-box">
                <span className="category-icon">🎓</span>
                <h4>শিক্ষা সফর</h4>
                <p>ঐতিহাসিক স্থান ও শিল্প প্রতিষ্ঠান পরিদর্শন</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;