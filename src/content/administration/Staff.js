import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Users, Briefcase, Settings } from 'lucide-react';
import './AdministrationPages.css';

const Staff = () => {
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

  const staffCategories = [
    {
      title: 'প্রশাসনিক কর্মচারী',
      icon: <Briefcase size={40} />,
      members: [
        { name: 'জনাব মোঃ আলী আহমেদ', designation: 'অফিস সুপারিনটেনডেন্ট' },
        { name: 'জনাবা রোকসানা পারভীন', designation: 'হিসাব রক্ষক' },
        { name: 'জনাব শাহজাহান আলী', designation: 'ক্যাশিয়ার' },
        { name: 'জনাবা সালমা খাতুন', designation: 'অফিস সহকারী' },
        { name: 'জনাব রহিম উদ্দিন', designation: 'অফিস সহকারী' }
      ]
    },
    {
      title: 'গ্রন্থাগারিক',
      icon: <Settings size={40} />,
      members: [
        { name: 'জনাব আবদুল গাফফার', designation: 'প্রধান গ্রন্থাগারিক' },
        { name: 'জনাবা নাসিমা বেগম', designation: 'সহকারী গ্রন্থাগারিক' }
      ]
    },
    {
      title: 'ল্যাব সহকারী',
      icon: <Settings size={40} />,
      members: [
        { name: 'জনাব মোঃ জসিম উদ্দিন', designation: 'পদার্থবিজ্ঞান ল্যাব সহকারী' },
        { name: 'জনাব আবদুল মান্নান', designation: 'রসায়ন ল্যাব সহকারী' },
        { name: 'জনাবা শিরিন আক্তার', designation: 'জীববিজ্ঞান ল্যাব সহকারী' },
        { name: 'জনাব সাইফুল ইসলাম', designation: 'কম্পিউটার ল্যাব সহকারী' }
      ]
    },
    {
      title: 'সহায়ক কর্মী',
      icon: <Users size={40} />,
      members: [
        { name: 'জনাব আবুল কালাম', designation: 'ড্রাইভার' },
        { name: 'জনাব শামসুল হক', designation: 'ড্রাইভার' },
        { name: 'জনাব করিম মিয়া', designation: 'অফিস সহায়ক' },
        { name: 'জনাব রফিক মিয়া', designation: 'অফিস সহায়ক' },
        { name: 'জনাব হাবিব মিয়া', designation: 'দারোয়ান' },
        { name: 'জনাব জামাল মিয়া', designation: 'দারোয়ান' },
        { name: 'জনাব মনির হোসেন', designation: 'পরিচ্ছন্নতা কর্মী' },
        { name: 'জনাব সোহরাব আলী', designation: 'পরিচ্ছন্নতা কর্মী' },
        { name: 'জনাব নজরুল ইসলাম', designation: 'মালী' },
        { name: 'জনাব আক্তার হোসেন', designation: 'ইলেকট্রিশিয়ান' }
      ]
    }
  ];

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Support Staff</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            মালখানগর কলেজের সহায়ক কর্মচারীবৃন্দ
          </p>
        </div>

        <div className="content-body">
          <div className="staff-intro">
            <Users size={48} />
            <p>
              মালখানগর কলেজের সুষ্ঠু পরিচালনা ও শিক্ষা কার্যক্রম সফল করতে আমাদের কর্মচারীদের ভূমিকা অপরিসীম। প্রশাসনিক কর্মচারী থেকে শুরু করে সহায়ক কর্মী পর্যন্ত সবাই নিষ্ঠা ও দক্ষতার সাথে নিজ নিজ দায়িত্ব পালন করে যাচ্ছেন। তাদের অক্লান্ত পরিশ্রম ও সেবায় কলেজের পরিবেশ থাকে পরিচ্ছন্ন, নিরাপদ ও শিক্ষাবান্ধব।
            </p>
          </div>

          <div className="staff-stats">
            <div className="stat-box-staff">
              <h3>৪০+</h3>
              <p>মোট কর্মচারী</p>
            </div>
            <div className="stat-box-staff">
              <h3>৫+</h3>
              <p>প্রশাসনিক</p>
            </div>
            <div className="stat-box-staff">
              <h3>৬+</h3>
              <p>ল্যাব ও লাইব্রেরি</p>
            </div>
            <div className="stat-box-staff">
              <h3>২৯+</h3>
              <p>সহায়ক কর্মী</p>
            </div>
          </div>

          {staffCategories.map((category, index) => (
            <div key={index} className="staff-category">
              <div className="category-header">
                {category.icon}
                <h2>{category.title}</h2>
              </div>
              <div className="staff-members-grid">
                {category.members.map((member, idx) => (
                  <div key={idx} className="staff-member-card">
                    <div className="staff-avatar">
                      <Users size={40} />
                    </div>
                    <h4>{member.name}</h4>
                    <p>{member.designation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="staff-appreciation">
            <h2>কর্মচারীদের অবদান</h2>
            <p>
              মালখানগর কলেজের প্রতিটি কর্মচারী তাদের নিজ নিজ কর্মক্ষেত্রে গুরুত্বপূর্ণ ভূমিকা পালন করেন। প্রশাসনিক কর্মচারীরা অফিসের সকল কাজ সুষ্ঠুভাবে সম্পাদন করেন, গ্রন্থাগারিকরা শিক্ষার্থীদের বই সরবরাহ ও গবেষণায় সহায়তা করেন, ল্যাব সহকারীরা ব্যবহারিক ক্লাসের জন্য প্রয়োজনীয় সামগ্রী প্রস্তুত রাখেন এবং সহায়ক কর্মীরা ক্যাম্পাসকে পরিচ্ছন্ন ও নিরাপদ রাখেন। তাদের সম্মিলিত প্রচেষ্টায় কলেজ একটি আদর্শ শিক্ষা প্রতিষ্ঠান হিসেবে পরিচালিত হচ্ছে।
            </p>
          </div>

          <div className="staff-welfare">
            <h2>কর্মচারী কল্যাণ</h2>
            <p>
              মালখানগর কলেজ কর্মচারীদের কল্যাণে বিভিন্ন পদক্ষেপ গ্রহণ করেছে:
            </p>
            <ul className="welfare-list">
              <li>সময়মত বেতন-ভাতা প্রদান</li>
              <li>বার্ষিক বোনাস ও উৎসব ভাতা</li>
              <li>চিকিৎসা সহায়তা কর্মসূচি</li>
              <li>প্রশিক্ষণ ও দক্ষতা উন্নয়ন সুবিধা</li>
              <li>নিরাপদ ও স্বাস্থ্যকর কর্মপরিবেশ</li>
              <li>পদোন্নতির সুযোগ</li>
              <li>অবসর সুবিধা</li>
            </ul>
          </div>

          <div className="staff-recognition">
            <h2>স্বীকৃতি ও পুরস্কার</h2>
            <p>
              কলেজ প্রতি বছর কর্মদক্ষতা ও নিষ্ঠার ভিত্তিতে শ্রেষ্ঠ কর্মচারী নির্বাচন করে এবং তাদের পুরস্কৃত করে। এটি কর্মচারীদের মনোবল বৃদ্ধি এবং কর্মে আরও নিবেদিত হতে উৎসাহিত করে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;