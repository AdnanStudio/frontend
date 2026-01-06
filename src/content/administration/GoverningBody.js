import React, { useState, useEffect } from 'react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Users, Calendar } from 'lucide-react';
import governingBodyService from '../../services/governingBodyService';
import websiteService from '../../services/settingsService';
import toast from 'react-hot-toast';
import './AdministrationPages.css';

const GoverningBody = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch website settings for header/footer
      const settingsResponse = await websiteService.getSettings();
      if (settingsResponse.success) {
        setSettings(settingsResponse.data);
      }
      
      // Fetch governing body members and date range
      const [membersResponse, dateResponse] = await Promise.all([
        governingBodyService.getAllMembers(),
        governingBodyService.getDateRange()
      ]);
      
      console.log('Members Response:', membersResponse);
      console.log('Date Response:', dateResponse);
      
      if (membersResponse.success) {
        setMembers(membersResponse.data || []);
      }
      
      if (dateResponse.success && dateResponse.data) {
        setDateRange(dateResponse.data);
      }
    } catch (error) {
      console.error('Fetch Data Error:', error);
      // Don't show error toast if backend is not ready yet
      if (error.response?.status !== 404) {
        toast.error('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB');
    } catch (error) {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <>
        <PublicHeader settings={settings} currentPath="/administration/governing-body" />
        <div className="content-page-wrapper">
          <div className="container">
            <SkeletonLoader type="title" />
            <SkeletonLoader type="text" count={8} />
          </div>
        </div>
        <PublicFooter settings={settings} />
      </>
    );
  }

  return (
    <>
      <PublicHeader settings={settings} currentPath="/administration/governing-body" />
      
      <div className="content-page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>Governing Body</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">মালখানগর কলেজের পরিচালনা পর্ষদ</p>
          </div>

          {dateRange && (
            <div className="governing-date-banner">
              <Calendar size={32} />
              <div>
                <h3>কার্যকাল</h3>
                <p>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</p>
              </div>
            </div>
          )}

          <div className="content-body">
            <div className="governing-intro">
              <Users size={48} />
              <p>
                মালখানগর কলেজ পরিচালনা পর্ষদ কলেজের সার্বিক উন্নয়ন, নীতি নির্ধারণ এবং শিক্ষার মান উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে। পর্ষদ নিয়মিত সভা আয়োজন করে এবং কলেজের সকল গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণ করে থাকে।
              </p>
            </div>

            <div className="governing-structure">
              <h2>পরিচালনা পর্ষদের সদস্যবৃন্দ</h2>

              {members.length === 0 ? (
                <div className="no-members-container">
                  <p className="no-members">কোন সদস্য যোগ করা হয়নি</p>
                  <p className="no-members-hint">পরিচালনা পর্ষদের সদস্যদের তথ্য শীঘ্রই যুক্ত করা হবে</p>
                </div>
              ) : (
                <div className="members-grid-public">
                  {members.map((member) => (
                    <div key={member._id} className="member-card-public">
                      <div className="member-image-public">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x320?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="member-info-public">
                        <div className="member-role">{member.position}</div>
                        <h4>{member.name}</h4>
                        {member.description && (
                          <p className="member-description">{member.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PublicFooter settings={settings} />
    </>
  );
};

export default GoverningBody;