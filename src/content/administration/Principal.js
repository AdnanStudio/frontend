import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import LazyImage from '../../components/LazyImage';
import { Mail, Phone, GraduationCap, Award } from 'lucide-react';
import './AdministrationPages.css';

const Principal = () => {
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
          <SkeletonLoader type="image" height="400px" />
          <SkeletonLoader type="text" count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Principal's Profile</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            অধ্যক্ষ (ভারপ্রাপ্ত) - মালখানগর কলেজ
          </p>
        </div>

        <div className="content-body">
          <div className="principal-profile">
            <div className="principal-image-section">
              <div className="principal-image-wrapper">
                <LazyImage
                  src="/sir.jpg"
                  alt="Principal"
                  placeholderType="spinner"
                />
              </div>
              <div className="principal-contact">
                <h3>যোগাযোগ</h3>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>+880 1XXX-XXXXXX</span>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <span>principal@malkhangarcollege.edu.bd</span>
                </div>
              </div>
            </div>

            <div className="principal-details">
              <h2>অধ্যক্ষের বাণী</h2>
              <div className="principal-message">
                <p className="message-text">
                  প্রিয় শিক্ষার্থী, অভিভাবক এবং শুভানুধ্যায়ীবৃন্দ,
                </p>
                <p className="message-text">
                  মালখানগর কলেজে আপনাদের স্বাগতম। আমাদের এই প্রতিষ্ঠান শুধুমাত্র একাডেমিক শিক্ষার জায়গা নয়, বরং এটি একটি পরিপূর্ণ শিক্ষা প্রতিষ্ঠান যেখানে শিক্ষার্থীদের মেধা, দক্ষতা, নৈতিকতা এবং চরিত্র গঠনে আমরা সর্বাত্মক প্রচেষ্টা চালিয়ে যাচ্ছি।
                </p>
                <p className="message-text">
                  আমরা বিশ্বাস করি যে শিক্ষা শুধু পরীক্ষায় ভালো ফলাফল অর্জন নয়, বরং এটি জীবনের জন্য প্রস্তুতি নেওয়ার একটি সামগ্রিক প্রক্রিয়া। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে একজন দায়িত্বশীল, সৎ এবং দক্ষ নাগরিক হিসেবে গড়ে তোলা যারা দেশ ও জাতির সেবায় নিজেদের নিয়োজিত করতে পারবে।
                </p>
                <p className="message-text">
                  প্রিয় শিক্ষার্থীরা, তোমাদের প্রতি আমার পরামর্শ হলো - স্বপ্ন দেখো, কঠোর পরিশ্রম করো এবং নৈতিকতা ও অধ্যবসায়ের সাথে এগিয়ে চলো। মনে রেখো, সফলতার কোনো শর্টকাট নেই। তোমাদের প্রতিটি প্রচেষ্টায় এবং অগ্রযাত্রায় মালখানগর কলেজ সর্বদা তোমাদের পাশে রয়েছে।
                </p>
                <p className="message-text">
                  অভিভাবকদের প্রতি আমার অনুরোধ, আপনারা আপনাদের সন্তানদের শিক্ষা জীবনে সর্বদা পাশে থাকুন এবং তাদের সঠিক দিকনির্দেশনা প্রদান করুন। কলেজের সাথে নিয়মিত যোগাযোগ রাখুন এবং আমাদের যেকোনো পরামর্শ বা মতামত জানাতে দ্বিধা করবেন না।
                </p>
                <p className="message-text">
                  আসুন, আমরা একসাথে মালখানগর কলেজকে একটি আদর্শ শিক্ষা প্রতিষ্ঠান হিসেবে গড়ে তুলি।
                </p>
                <p className="signature">
                  <strong>আন্তরিক শুভেচ্ছান্তে,</strong><br />
                  <strong>অধ্যক্ষ (ভারপ্রাপ্ত)</strong><br />
                  <strong>মালখানগর কলেজ</strong>
                </p>
              </div>

              <div className="principal-qualifications">
                <h3>
                  <GraduationCap size={24} />
                  শিক্ষাগত যোগ্যতা
                </h3>
                <ul>
                  <li>এমএ (বাংলা), ঢাকা বিশ্ববিদ্যালয়</li>
                  <li>বিএড (শিক্ষা), জাতীয় বিশ্ববিদ্যালয়</li>
                  <li>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ সনদ</li>
                </ul>
              </div>

              <div className="principal-experience">
                <h3>
                  <Award size={24} />
                  কর্মজীবন ও অভিজ্ঞতা
                </h3>
                <div className="experience-timeline">
                  <div className="experience-item">
                    <span className="year">২০২৩ - বর্তমান</span>
                    <p>অধ্যক্ষ (ভারপ্রাপ্ত), মালখানগর কলেজ</p>
                  </div>
                  <div className="experience-item">
                    <span className="year">২০১৮ - ২০২৩</span>
                    <p>উপাধ্যক্ষ, মালখানগর কলেজ</p>
                  </div>
                  <div className="experience-item">
                    <span className="year">২০১০ - ২০১৮</span>
                    <p>বিভাগীয় প্রধান (বাংলা), মালখানগর কলেজ</p>
                  </div>
                  <div className="experience-item">
                    <span className="year">২০০৫ - ২০১০</span>
                    <p>প্রভাষক (বাংলা), মালখানগর কলেজ</p>
                  </div>
                </div>
              </div>

              <div className="principal-achievements">
                <h3>পুরস্কার ও সম্মাননা</h3>
                <ul>
                  <li>শ্রেষ্ঠ শিক্ষক পুরস্কার - জেলা শিক্ষা বোর্ড (২০২০)</li>
                  <li>শিক্ষা উন্নয়নে অসামান্য অবদান - স্থানীয় প্রশাসন (২০২১)</li>
                  <li>বাংলা সাহিত্যে বিশেষ অবদান - সাহিত্য সংসদ (২০১৯)</li>
                </ul>
              </div>

              <div className="principal-vision">
                <h3>দৃষ্টিভঙ্গি ও পরিকল্পনা</h3>
                <p>
                  আমার লক্ষ্য হলো মালখানগর কলেজকে একটি আধুনিক, প্রযুক্তিনির্ভর এবং মানসম্পন্ন শিক্ষা প্রতিষ্ঠান হিসেবে গড়ে তোলা। আমরা পরিকল্পনা করছি:
                </p>
                <ul>
                  <li>ডিজিটাল ক্লাসরুম সম্প্রসারণ এবং অনলাইন শিক্ষা ব্যবস্থার উন্নয়ন</li>
                  <li>শিক্ষকদের জন্য নিয়মিত প্রশিক্ষণ কর্মসূচি আয়োজন</li>
                  <li>শিক্ষার্থীদের সহপাঠ্যক্রমিক কার্যক্রমে আরও বেশি সুযোগ প্রদান</li>
                  <li>গ্রন্থাগার ও ল্যাবরেটরি আধুনিকীকরণ</li>
                  <li>শিক্ষার্থীদের মানসিক স্বাস্থ্য ও কাউন্সেলিং সেবা চালু করা</li>
                  <li>স্থানীয় সম্প্রদায় ও শিল্প প্রতিষ্ঠানের সাথে সংযোগ স্থাপন</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="office-hours">
            <h2>অফিস সময়</h2>
            <div className="hours-info">
              <p><strong>কর্মদিবস:</strong> রবিবার - বৃহস্পতিবার</p>
              <p><strong>সময়:</strong> সকাল ৯:০০ টা - বিকাল ৪:০০ টা</p>
              <p><strong>সাক্ষাৎ:</strong> পূর্ব অ্যাপয়েন্টমেন্ট সাপেক্ষে</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;