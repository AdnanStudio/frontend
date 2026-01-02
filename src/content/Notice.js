import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../components/SkeletonLoader';
import noticeService from '../services/noticeService';
import NoticeViewer from '../components/NoticeViewer';
import { FileText, Download, Calendar, Bell, Image as ImageIcon } from 'lucide-react';
import './ContentPages.css';

const Notice = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await noticeService.getPublicNotices();
      setNotices(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleAttachmentClick = (attachment) => {
    setSelectedAttachment(attachment);
  };

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
          <h1>Notice Board</h1>
          <div className="title-underline"></div>
        </div>

        <div className="notice-full-list">
          {notices.length === 0 ? (
            <div className="no-notices">
              <Bell size={60} color="#ccc" />
              <p>No notices available</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice._id} className="notice-item-full">
                <div className="notice-item-header">
                  <div className="notice-item-left">
                    <span className={`notice-badge ${notice.type}`}>
                      {notice.type}
                    </span>
                    <div className="notice-date-public">
                      <Calendar size={16} />
                      <span>{formatDate(notice.publishDate)}</span>
                    </div>
                  </div>
                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="notice-attachment-indicator">
                      📎 {notice.attachments.length}
                    </div>
                  )}
                </div>

                <h4>{notice.title}</h4>
                <p className="notice-description">{notice.description}</p>

                {notice.attachments && notice.attachments.length > 0 && (
                  <div className="notice-files-grid">
                    {notice.attachments.map((attachment, index) => (
                      <button
                        key={index}
                        className="file-preview-btn"
                        onClick={() => handleAttachmentClick(attachment)}
                      >
                        {attachment.fileType === 'pdf' ? (
                          <>
                            <FileText size={18} />
                            <span>PDF Document</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={18} />
                            <span>Image File</span>
                          </>
                        )}
                        <Download size={14} className="download-icon" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {selectedAttachment && (
          <NoticeViewer
            attachment={selectedAttachment}
            onClose={() => setSelectedAttachment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Notice;