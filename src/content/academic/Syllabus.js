import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Download, FileText } from 'lucide-react';
import './AcademicPages.css';

const Syllabus = () => {
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
          <h1>Syllabus</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            শিক্ষাক্রম ও পাঠ্যসূচি
          </p>
        </div>

        <div className="content-body">
          <div className="syllabus-intro">
            <p>
              মালখানগর কলেজে ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয় কর্তৃক নির্ধারিত পাঠ্যসূচি অনুসরণ করা হয়। 
              নিচে বিভিন্ন শাখা ও বিষয়ের পাঠ্যসূচির সংক্ষিপ্ত বিবরণ দেওয়া হলো।
            </p>
          </div>

          <div className="syllabus-section">
            <h2>উচ্চ মাধ্যমিক (HSC) সিলেবাস</h2>

            <div className="syllabus-group">
              <div className="syllabus-header science-bg">
                <h3>বিজ্ঞান শাখা</h3>
              </div>
              <div className="syllabus-content">
                <div className="subject-syllabus">
                  <h4>পদার্থবিজ্ঞান</h4>
                  <ul>
                    <li>তাপগতিবিদ্যা ও গ্যাসের গতিতত্ত্ব</li>
                    <li>তরঙ্গ ও শব্দ</li>
                    <li>আলোর প্রতিসরণ, ব্যতিচার ও বিচ্ছুরণ</li>
                    <li>তড়িৎ ও চুম্বকত্ব</li>
                    <li>আধুনিক পদার্থবিজ্ঞান</li>
                    <li>ইলেকট্রনিক্স</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>রসায়ন</h4>
                  <ul>
                    <li>পরিমাণগত রসায়ন</li>
                    <li>পরমাণুর গঠন</li>
                    <li>রাসায়নিক বন্ধন</li>
                    <li>জৈব রসায়ন</li>
                    <li>তড়িৎ রসায়ন</li>
                    <li>রাসায়নিক গতিবিদ্যা</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>জীববিজ্ঞান</h4>
                  <ul>
                    <li>কোষ ও এর গঠন</li>
                    <li>মানব শরীরতত্ত্ব</li>
                    <li>জীবপ্রযুক্তি</li>
                    <li>বংশগতি ও বিবর্তন</li>
                    <li>পরিবেশ ও বাস্তুতন্ত্র</li>
                    <li>উদ্ভিদ ও প্রাণী বৈচিত্র্য</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>উচ্চতর গণিত</h4>
                  <ul>
                    <li>ম্যাট্রিক্স ও নির্ণায়ক</li>
                    <li>ভেক্টর</li>
                    <li>জটিল সংখ্যা</li>
                    <li>সমীকরণ</li>
                    <li>ত্রিকোণমিতি</li>
                    <li>ক্যালকুলাস</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="syllabus-group">
              <div className="syllabus-header arts-bg">
                <h3>মানবিক শাখা</h3>
              </div>
              <div className="syllabus-content">
                <div className="subject-syllabus">
                  <h4>বাংলা</h4>
                  <ul>
                    <li>সাহিত্যের ইতিহাস</li>
                    <li>কবিতা ও গল্প</li>
                    <li>প্রবন্ধ ও নাটক</li>
                    <li>উপন্যাস</li>
                    <li>ব্যাকরণ ও রচনা</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>পৌরনীতি ও সুশাসন</h4>
                  <ul>
                    <li>পৌরনীতি ও সুশাসনের ধারণা</li>
                    <li>রাষ্ট্র ও সরকার</li>
                    <li>বাংলাদেশের সংবিধান</li>
                    <li>রাজনৈতিক দল ও নির্বাচন</li>
                    <li>মানবাধিকার ও আইন</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>ইতিহাস</h4>
                  <ul>
                    <li>প্রাচীন সভ্যতা</li>
                    <li>মধ্যযুগীয় ইতিহাস</li>
                    <li>আধুনিক ইতিহাস</li>
                    <li>বাংলাদেশের মুক্তিযুদ্ধ</li>
                    <li>বিশ্ব ইতিহাস</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>ইসলামের ইতিহাস ও সংস্কৃতি</h4>
                  <ul>
                    <li>ইসলামের উৎপত্তি ও বিকাশ</li>
                    <li>খিলাফত যুগ</li>
                    <li>ইসলামি সভ্যতা ও সংস্কৃতি</li>
                    <li>মুসলিম বিশ্বের ইতিহাস</li>
                    <li>ইসলাম ও বাংলাদেশ</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="syllabus-group">
              <div className="syllabus-header commerce-bg">
                <h3>ব্যবসায় শিক্ষা শাখা</h3>
              </div>
              <div className="syllabus-content">
                <div className="subject-syllabus">
                  <h4>হিসাববিজ্ঞান</h4>
                  <ul>
                    <li>হিসাববিজ্ঞানের মূলনীতি</li>
                    <li>দ্বৈত দাখিলা পদ্ধতি</li>
                    <li>রেওয়ামিল ও আর্থিক বিবরণী</li>
                    <li>ব্যাংক সমন্বয় বিবরণী</li>
                    <li>অংশীদারি হিসাব</li>
                    <li>কোম্পানি হিসাব</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>ব্যবসায় সংগঠন ও ব্যবস্থাপনা</h4>
                  <ul>
                    <li>ব্যবসায়ের ধারণা</li>
                    <li>ব্যবসায় পরিবেশ</li>
                    <li>ব্যবস্থাপনার নীতি</li>
                    <li>সংগঠন ও নিয়ন্ত্রণ</li>
                    <li>মানব সম্পদ ব্যবস্থাপনা</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>অর্থায়ন ও ব্যাংকিং</h4>
                  <ul>
                    <li>অর্থায়নের ধারণা</li>
                    <li>আর্থিক বিশ্লেষণ</li>
                    <li>মূলধন কাঠামো</li>
                    <li>ব্যাংকিং ব্যবস্থা</li>
                    <li>কেন্দ্রীয় ব্যাংক</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>

                <div className="subject-syllabus">
                  <h4>উৎপাদন ব্যবস্থাপনা ও বিপণন</h4>
                  <ul>
                    <li>উৎপাদন ব্যবস্থাপনা</li>
                    <li>বিপণনের ধারণা</li>
                    <li>বিপণন মিশ্রণ</li>
                    <li>পণ্য ও মূল্য নির্ধারণ</li>
                    <li>বিজ্ঞাপন ও বিক্রয় বৃদ্ধি</li>
                  </ul>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>ডাউনলোড সিলেবাস (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="syllabus-section">
            <h2>স্নাতক (সম্মান) সিলেবাস</h2>
            <p className="section-intro">
              স্নাতক (সম্মান) কোর্সের বিস্তারিত সিলেবাস জাতীয় বিশ্ববিদ্যালয় কর্তৃক নির্ধারিত। 
              প্রতিটি বিষয়ে চার বছরে মোট ১৬টি পেপার রয়েছে।
            </p>

            <div className="honours-syllabus-grid">
              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>বাংলা (সম্মান)</h4>
                <p>প্রাচীন ও মধ্যযুগীয় বাংলা সাহিত্য, আধুনিক সাহিত্য, ভাষাতত্ত্ব, লোকসাহিত্য</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>

              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>ইংরেজি (সম্মান)</h4>
                <p>ইংরেজি সাহিত্যের ইতিহাস, কবিতা, নাটক, উপন্যাস, ভাষাবিজ্ঞান</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>

              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>রাষ্ট্রবিজ্ঞান (সম্মান)</h4>
                <p>রাজনৈতিক তত্ত্ব, তুলনামূলক রাজনীতি, আন্তর্জাতিক সম্পর্ক, জনপ্রশাসন</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>

              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>ইতিহাস (সম্মান)</h4>
                <p>প্রাচীন, মধ্য ও আধুনিক ইতিহাস, বাংলাদেশের ইতিহাস, বিশ্ব ইতিহাস</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>

              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>হিসাববিজ্ঞান (সম্মান)</h4>
                <p>আর্থিক হিসাববিজ্ঞান, ব্যবস্থাপনা হিসাববিজ্ঞান, নিরীক্ষা, করবিধি</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>

              <div className="honours-syllabus-card">
                <FileText size={40} />
                <h4>ইসলামের ইতিহাস (সম্মান)</h4>
                <p>ইসলামি ইতিহাস, সংস্কৃতি, দর্শন, মুসলিম সভ্যতা</p>
                <button className="download-btn-secondary">
                  <Download size={14} />
                  <span>সিলেবাস ডাউনলোড</span>
                </button>
              </div>
            </div>
          </div>

          <div className="syllabus-note">
            <h3>গুরুত্বপূর্ণ তথ্য:</h3>
            <ul>
              <li>সিলেবাস প্রতি বছর আপডেট হতে পারে</li>
              <li>সর্বশেষ সিলেবাস শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের ওয়েবসাইটে পাওয়া যাবে</li>
              <li>ব্যবহারিক পরীক্ষার জন্য আলাদা সিলেবাস রয়েছে</li>
              <li>যেকোনো সিলেবাস সংক্রান্ত তথ্যের জন্য কলেজ অফিসে যোগাযোগ করুন</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;