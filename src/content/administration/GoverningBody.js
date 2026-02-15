import React, { useState, useEffect } from 'react';
import { Phone, Mail, Users, Shield, Award, Clock } from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import SkeletonLoader from '../../components/SkeletonLoader';
import governingBodyService from '../../services/governingBodyService';
import axios from 'axios';
import './AdministrationPages.css';

const GoverningBody = () => {
  const [members, setMembers] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch settings
      const settingsResponse = await axios.get(
        'https://backend-yfp1.onrender.com/api/public/home'
      );
      setSettings(settingsResponse.data.data?.websiteSettings || {});

      // Fetch governing body members
      const membersResponse = await governingBodyService.getAllMembers();
      setMembers(membersResponse.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separate president/secretary from regular members
  const president = members.find(m => m.role === 'সভাপতি');
  const secretary = members.find(m => m.role === 'সদস্য সচিব');
  const regularMembers = members.filter(m => m.role === 'সদস্য');

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <PublicHeader settings={settings} currentPath="/administration/governing-body" />
        <div className="container">
          <SkeletonLoader type="title" />
          <SkeletonLoader type="text" count={8} />
        </div>
        <PublicFooter settings={settings} />
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <PublicHeader settings={settings} currentPath="/administration/governing-body" />
      
      <div className="container">
        <div className="page-header">
          <h1>Governing Body</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            মালখানগর কলেজের পরিচালনা পর্ষদ
          </p>
        </div>

        <div className="content-body">
          <div className="governing-intro">
            <Users size={48} />
            <p>
              মালখানগর কলেজ পরিচালনা পর্ষদ কলেজের সার্বিক উন্নয়ন, নীতি নির্ধারণ এবং শিক্ষার মান উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে। পর্ষদ নিয়মিত সভা আয়োজন করে এবং কলেজের সকল গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণ করে থাকে। শিক্ষার মান উন্নয়ন, অবকাঠামো উন্নয়ন এবং শিক্ষার্থীদের সার্বিক কল্যাণ নিশ্চিত করাই পরিচালনা পর্ষদের মূল লক্ষ্য।
            </p>
          </div>

          <div className="governing-structure">
            <h2>পরিচালনা পর্ষদের সদস্যবৃন্দ</h2>

            {/* President Card */}
            {president && (
              <div className="member-card president-card">
                <div className="member-badge">
                  <Shield size={32} />
                </div>
                <div className="member-image-container">
                  <img
                    src={president.image?.url || '/placeholder.png'}
                    alt={president.name}
                    onError={(e) => (e.target.src = '/placeholder.png')}
                  />
                </div>
                <div className="member-info">
                  <h3>{president.role}</h3>
                  <h4>{president.name}</h4>
                  <p className="designation">{president.designation}</p>
                  <p className="details">{president.description}</p>
                  {(president.email || president.phone) && (
                    <div className="member-contact">
                      {president.phone && (
                        <div className="contact-item">
                          <Phone size={16} />
                          <span>{president.phone}</span>
                        </div>
                      )}
                      {president.email && (
                        <div className="contact-item">
                          <Mail size={16} />
                          <span>{president.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Secretary Card */}
            {secretary && (
              <div className="member-card secretary-card">
                <div className="member-image-container">
                  <img
                    src={secretary.image?.url || '/placeholder.png'}
                    alt={secretary.name}
                    onError={(e) => (e.target.src = '/placeholder.png')}
                  />
                </div>
                <div className="member-info">
                  <div className="member-role">{secretary.role}</div>
                  <h4>{secretary.name}</h4>
                  <p className="member-name">{secretary.designation}</p>
                  <p className="member-description">{secretary.description}</p>
                  {(secretary.email || secretary.phone) && (
                    <div className="member-contact">
                      {secretary.phone && (
                        <div className="contact-item">
                          <Phone size={16} />
                          <span>{secretary.phone}</span>
                        </div>
                      )}
                      {secretary.email && (
                        <div className="contact-item">
                          <Mail size={16} />
                          <span>{secretary.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Regular Members Grid */}
            {regularMembers.length > 0 && (
              <div className="members-grid">
                {regularMembers.map((member) => (
                  <div key={member._id} className="member-card">
                    <div className="member-image-container">
                      <img
                        src={member.image?.url || '/placeholder.png'}
                        alt={member.name}
                        onError={(e) => (e.target.src = '/placeholder.png')}
                      />
                    </div>
                    <div className="member-role">{member.role}</div>
                    <h4>{member.name}</h4>
                    <p className="member-name">{member.designation}</p>
                    <p className="member-description">{member.description}</p>
                    {(member.email || member.phone) && (
                      <div className="member-contact">
                        {member.phone && (
                          <div className="contact-item">
                            <Phone size={14} />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        {member.email && (
                          <div className="contact-item">
                            <Mail size={14} />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {members.length === 0 && (
              <div className="no-data">
                <p>No governing body members available at the moment.</p>
              </div>
            )}
          </div>

          <div className="governing-responsibilities">
            <h2>পরিচালনা পর্ষদের দায়িত্ব ও কার্যাবলী</h2>
            <div className="responsibilities-grid">
              <div className="responsibility-card">
                <Award size={40} />
                <h4>নীতি নির্ধারণ</h4>
                <p>
                  কলেজের শিক্ষা নীতি, ভর্তি নীতি এবং পরীক্ষা পদ্ধতি নির্ধারণ করা। শিক্ষার্থীদের সার্বিক কল্যাণ এবং শিক্ষার মান উন্নয়নে সঠিক নীতিমালা প্রণয়ন করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>বাজেট অনুমোদন</h4>
                <p>
                  বার্ষিক বাজেট প্রণয়ন ও অনুমোদন এবং আর্থিক স্বচ্ছতা নিশ্চিত করা। কলেজের সকল আয়-ব্যয়ের হিসাব যাচাই করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>শিক্ষক নিয়োগ</h4>
                <p>
                  যোগ্য শিক্ষক নিয়োগ এবং তাদের পদোন্নতি সংক্রান্ত সিদ্ধান্ত গ্রহণ। শিক্ষকদের দক্ষতা উন্নয়ন এবং প্রশিক্ষণের ব্যবস্থা করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>অবকাঠামো উন্নয়ন</h4>
                <p>
                  কলেজের ভবন, শ্রেণিকক্ষ এবং অন্যান্য সুবিধা উন্নয়নের পরিকল্পনা। নতুন ভবন নির্মাণ এবং পুরাতন ভবন সংস্কার।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>একাডেমিক তত্ত্বাবধান</h4>
                <p>
                  শিক্ষার মান নিয়ন্ত্রণ এবং একাডেমিক কার্যক্রম মনিটরিং করা। পরীক্ষার ফলাফল পর্যালোচনা এবং শিক্ষার মান উন্নয়ন।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>সমস্যা সমাধান</h4>
                <p>
                  শিক্ষার্থী, শিক্ষক ও অভিভাবকদের সমস্যা সমাধানে কার্যকর পদক্ষেপ নেওয়া। কলেজের সার্বিক পরিবেশ উন্নয়ন।
                </p>
              </div>
            </div>
          </div>

          <div className="meeting-schedule">
            <h2>
              <Clock size={32} />
              সভার সময়সূচি
            </h2>
            <div className="meeting-info">
              <div className="meeting-card">
                <h4>নিয়মিত সভা</h4>
                <p>প্রতি মাসের প্রথম শনিবার</p>
                <span className="time">সকাল ১০:০০ টা</span>
                <p className="meeting-desc">
                  মাসিক নিয়মিত সভায় কলেজের চলমান কার্যক্রম পর্যালোচনা এবং সমস্যা সমাধানের পদক্ষেপ নির্ধারণ করা হয়।
                </p>
              </div>

              <div className="meeting-card">
                <h4>জরুরি সভা</h4>
                <p>প্রয়োজন অনুযায়ী</p>
                <span className="time">সভাপতি কর্তৃক আহূত</span>
                <p className="meeting-desc">
                  জরুরি প্রয়োজনে বা গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণের জন্য সভাপতি যেকোনো সময় জরুরি সভা আহ্বান করতে পারেন।
                </p>
              </div>

              <div className="meeting-card">
                <h4>বার্ষিক সাধারণ সভা</h4>
                <p>বছরে একবার</p>
                <span className="time">জানুয়ারি মাসে</span>
                <p className="meeting-desc">
                  বার্ষিক সাধারণ সভায় পূর্ববর্তী বছরের কার্যক্রম পর্যালোচনা এবং আগামী বছরের পরিকল্পনা অনুমোদন করা হয়।
                </p>
              </div>
            </div>
          </div>

          <div className="transparency-section">
            <h2>স্বচ্ছতা ও জবাবদিহিতা</h2>
            <p>
              মালখানগর কলেজ পরিচালনা পর্ষদ সম্পূর্ণ স্বচ্ছতা ও জবাবদিহিতার সাথে কাজ করে। সকল সভার কার্যবিবরণী সংরক্ষণ করা হয় এবং গুরুত্বপূর্ণ সিদ্ধান্তসমূহ কলেজ ওয়েবসাইটে প্রকাশ করা হয়।
            </p>
            <div className="transparency-features">
              <div className="trans-feature">
                <span className="feature-icon">📋</span>
                <h4>সভার কার্যবিবরণী প্রকাশ</h4>
                <p>সকল সভার সিদ্ধান্ত প্রকাশ করা হয়</p>
              </div>
              <div className="trans-feature">
                <span className="feature-icon">💰</span>
                <h4>আর্থিক প্রতিবেদন</h4>
                <p>বার্ষিক আর্থিক বিবরণী প্রকাশিত হয়</p>
              </div>
              <div className="trans-feature">
                <span className="feature-icon">🗣️</span>
                <h4>জনমত গ্রহণ</h4>
                <p>গুরুত্বপূর্ণ বিষয়ে জনমত নেওয়া হয়</p>
              </div>
            </div>
          </div>

          <div className="contact-governing">
            <h2>যোগাযোগ</h2>
            <p>
              পরিচালনা পর্ষদের সাথে যোগাযোগ করতে বা কোনো মতামত জানাতে নিচের মাধ্যমে যোগাযোগ করুন:
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <strong>ইমেইল:</strong> governing@malkhangarcollege.edu.bd
              </div>
              <div className="contact-method">
                <strong>ফোন:</strong> +880 1XXX-XXXXXX
              </div>
              <div className="contact-method">
                <strong>অফিস সময়:</strong> রবিবার - বৃহস্পতিবার (৯:০০ AM - ৪:০০ PM)
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter settings={settings} />
    </div>
  );
};

export default GoverningBody;
