import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import './AcademicPages.css';

const AcademicCalendar = () => {
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
          <h1>Academic Calendar</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            শিক্ষাবর্ষ ২০২৪-২০২৫ এর একাডেমিক ক্যালেন্ডার
          </p>
        </div>

        <div className="content-body">
          <div className="calendar-intro">
            <div className="calendar-info-box">
              <Calendar size={32} />
              <div>
                <h4>শিক্ষাবর্ষ</h4>
                <p>জানুয়ারি ২০২৫ - ডিসেম্বর ২০২৫</p>
              </div>
            </div>
            <div className="calendar-info-box">
              <Clock size={32} />
              <div>
                <h4>ক্লাস সময়</h4>
                <p>সকাল ৮:০০ টা - বিকাল ৩:৩০ টা</p>
              </div>
            </div>
            <div className="calendar-info-box">
              <AlertCircle size={32} />
              <div>
                <h4>সাপ্তাহিক ছুটি</h4>
                <p>শুক্রবার ও শনিবার</p>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h2>জানুয়ারি - মার্চ ২০২৫</h2>
            <div className="calendar-timeline">
              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">জানুয়ারি</span>
                  <span className="day">১-১০</span>
                </div>
                <div className="event-details">
                  <h4>নতুন শিক্ষাবর্ষ ভর্তি</h4>
                  <p>উচ্চ মাধ্যমিক একাদশ শ্রেণি ও স্নাতক (সম্মান) প্রথম বর্ষে ভর্তি কার্যক্রম</p>
                  <span className="event-type admission">ভর্তি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">জানুয়ারি</span>
                  <span className="day">১৫</span>
                </div>
                <div className="event-details">
                  <h4>ক্লাস শুরু</h4>
                  <p>সকল শ্রেণির নিয়মিত ক্লাস শুরু হবে</p>
                  <span className="event-type class">ক্লাস</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">ফেব্রুয়ারি</span>
                  <span className="day">২১</span>
                </div>
                <div className="event-details">
                  <h4>আন্তর্জাতিক মাতৃভাষা দিবস</h4>
                  <p>শহীদ দিবস পালন ও সাংস্কৃতিক অনুষ্ঠান</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">মার্চ</span>
                  <span className="day">১-৭</span>
                </div>
                <div className="event-details">
                  <h4>প্রথম সাময়িক পরীক্ষা</h4>
                  <p>সকল শ্রেণির প্রথম সাময়িক পরীক্ষা অনুষ্ঠিত হবে</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">মার্চ</span>
                  <span className="day">১৭</span>
                </div>
                <div className="event-details">
                  <h4>জাতির জনক জন্মদিন</h4>
                  <p>বঙ্গবন্ধু শেখ মুজিবুর রহমানের জন্মদিন ও জাতীয় শিশু দিবস</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">মার্চ</span>
                  <span className="day">২৬</span>
                </div>
                <div className="event-details">
                  <h4>স্বাধীনতা দিবস</h4>
                  <p>মহান স্বাধীনতা ও জাতীয় দিবস উদযাপন</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h2>এপ্রিল - জুন ২০২৫</h2>
            <div className="calendar-timeline">
              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">এপ্রিল</span>
                  <span className="day">১৪</span>
                </div>
                <div className="event-details">
                  <h4>পহেলা বৈশাখ</h4>
                  <p>বাংলা নববর্ষ উদযাপন ও সাংস্কৃতিক অনুষ্ঠান</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">এপ্রিল</span>
                  <span className="day">২০-২৫</span>
                </div>
                <div className="event-details">
                  <h4>বার্ষিক ক্রীড়া প্রতিযোগিতা</h4>
                  <p>আন্তঃশ্রেণি ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা</p>
                  <span className="event-type event">অনুষ্ঠান</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">মে</span>
                  <span className="day">১</span>
                </div>
                <div className="event-details">
                  <h4>মে দিবস</h4>
                  <p>আন্তর্জাতিক শ্রমিক দিবস</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">মে</span>
                  <span className="day">১০-২০</span>
                </div>
                <div className="event-details">
                  <h4>অর্ধ-বার্ষিক পরীক্ষা</h4>
                  <p>সকল শ্রেণির অর্ধ-বার্ষিক পরীক্ষা</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">জুন</span>
                  <span className="day">১-১৫</span>
                </div>
                <div className="event-details">
                  <h4>গ্রীষ্মকালীন ছুটি</h4>
                  <p>মধ্যবর্তী ছুটি</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h2>জুলাই - সেপ্টেম্বর ২০২৫</h2>
            <div className="calendar-timeline">
              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">জুলাই</span>
                  <span className="day">১</span>
                </div>
                <div className="event-details">
                  <h4>ক্লাস পুনরায় শুরু</h4>
                  <p>গ্রীষ্মকালীন ছুটির পর ক্লাস শুরু</p>
                  <span className="event-type class">ক্লাস</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">জুলাই</span>
                  <span className="day">১০-১৫</span>
                </div>
                <div className="event-details">
                  <h4>মডেল টেস্ট পরীক্ষা</h4>
                  <p>দ্বাদশ শ্রেণির এইচএসসি মডেল টেস্ট</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">আগস্ট</span>
                  <span className="day">১৫</span>
                </div>
                <div className="event-details">
                  <h4>জাতীয় শোক দিবস</h4>
                  <p>বঙ্গবন্ধু শেখ মুজিবুর রহমানের শাহাদত বার্ষিকী</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">সেপ্টেম্বর</span>
                  <span className="day">১-১০</span>
                </div>
                <div className="event-details">
                  <h4>দ্বিতীয় সাময়িক পরীক্ষা</h4>
                  <p>সকল শ্রেণির দ্বিতীয় সাময়িক পরীক্ষা</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <h2>অক্টোবর - ডিসেম্বর ২০২৫</h2>
            <div className="calendar-timeline">
              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">অক্টোবর</span>
                  <span className="day">১৫-২০</span>
                </div>
                <div className="event-details">
                  <h4>শারদীয় দুর্গা পূজা</h4>
                  <p>দুর্গা পূজা উপলক্ষে ছুটি</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">নভেম্বর</span>
                  <span className="day">১-১৫</span>
                </div>
                <div className="event-details">
                  <h4>প্রি-টেস্ট পরীক্ষা</h4>
                  <p>বার্ষিক পরীক্ষার পূর্বে প্রস্তুতিমূলক পরীক্ষা</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">নভেম্বর</span>
                  <span className="day">২০</span>
                </div>
                <div className="event-details">
                  <h4>বার্ষিক সাংস্কৃতিক অনুষ্ঠান</h4>
                  <p>কলেজ বার্ষিক সাংস্কৃতিক সন্ধ্যা</p>
                  <span className="event-type event">অনুষ্ঠান</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">ডিসেম্বর</span>
                  <span className="day">১-১৫</span>
                </div>
                <div className="event-details">
                  <h4>বার্ষিক পরীক্ষা</h4>
                  <p>একাদশ শ্রেণি ও স্নাতক বার্ষিক পরীক্ষা</p>
                  <span className="event-type exam">পরীক্ষা</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">ডিসেম্বর</span>
                  <span className="day">১৬</span>
                </div>
                <div className="event-details">
                  <h4>বিজয় দিবস</h4>
                  <p>মহান বিজয় দিবস উদযাপন</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">ডিসেম্বর</span>
                  <span className="day">২৫</span>
                </div>
                <div className="event-details">
                  <h4>বড়দিন</h4>
                  <p>খ্রিস্টান সম্প্রদায়ের বড়দিন</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>

              <div className="calendar-event">
                <div className="event-date">
                  <span className="month">ডিসেম্বর</span>
                  <span className="day">২৫-৩১</span>
                </div>
                <div className="event-details">
                  <h4>শীতকালীন ছুটি</h4>
                  <p>বছর শেষের ছুটি</p>
                  <span className="event-type holiday">ছুটি</span>
                </div>
              </div>
            </div>
          </div>

          <div className="exam-schedule-section">
            <h2>পরীক্ষার সময়সূচি</h2>
            <div className="exam-schedule-grid">
              <div className="exam-schedule-card">
                <h4>প্রথম সাময়িক পরীক্ষা</h4>
                <p><strong>সময়:</strong> মার্চ ১-৭, ২০২৫</p>
                <p><strong>পরীক্ষার সময়:</strong> সকাল ১০:০০ - দুপুর ১:০০</p>
              </div>

              <div className="exam-schedule-card">
                <h4>অর্ধ-বার্ষিক পরীক্ষা</h4>
                <p><strong>সময়:</strong> মে ১০-২০, ২০২৫</p>
                <p><strong>পরীক্ষার সময়:</strong> সকাল ১০:০০ - দুপুর ১:০০</p>
              </div>

              <div className="exam-schedule-card">
                <h4>দ্বিতীয় সাময়িক পরীক্ষা</h4>
                <p><strong>সময়:</strong> সেপ্টেম্বর ১-১০, ২০২৫</p>
                <p><strong>পরীক্ষার সময়:</strong> সকাল ১০:০০ - দুপুর ১:০০</p>
              </div>

              <div className="exam-schedule-card">
                <h4>বার্ষিক পরীক্ষা</h4>
                <p><strong>সময়:</strong> ডিসেম্বর ১-১৫, ২০২৫</p>
                <p><strong>পরীক্ষার সময়:</strong> সকাল ১০:০০ - দুপুর ১:০০</p>
              </div>
            </div>
          </div>

          <div className="calendar-notes">
            <h3>গুরুত্বপূর্ণ নির্দেশনা:</h3>
            <ul>
              <li>সরকারি ছুটির তালিকা পরিবর্তন হতে পারে</li>
              <li>পরীক্ষার রুটিন পরীক্ষার ১৫ দিন আগে প্রকাশ করা হবে</li>
              <li>জরুরি ছুটি ঘোষণা হলে নোটিশ বোর্ডে জানানো হবে</li>
              <li>ক্লাস মিস করলে শিক্ষকের অনুমতি নিয়ে পুনরায় উপস্থিত হতে হবে</li>
              <li>যেকোনো তথ্যের জন্য কলেজ অফিসে যোগাযোগ করুন</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;