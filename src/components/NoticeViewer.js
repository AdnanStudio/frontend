import React, { useState } from 'react';
import { X, Download, FileText, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import './NoticeViewer.css';

const NoticeViewer = ({ attachment, onClose }) => {
  const [scale, setScale] = useState(1);
  const [pdfError, setPdfError] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = attachment.fileUrl;
    link.download = attachment.fileName || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const isPDF = attachment.fileType === 'pdf';

  return (
    <div className="notice-viewer-overlay" onClick={onClose}>
      <div className="notice-viewer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="notice-viewer-header">
          <div className="viewer-title">
            {isPDF ? <FileText size={20} /> : <ImageIcon size={20} />}
            <span>{attachment.fileName || 'Attachment'}</span>
          </div>
          
          <div className="viewer-actions">
            {!isPDF && (
              <>
                <button onClick={handleZoomOut} className="viewer-btn" title="Zoom Out">
                  <ZoomOut size={20} />
                </button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
                <button onClick={handleZoomIn} className="viewer-btn" title="Zoom In">
                  <ZoomIn size={20} />
                </button>
              </>
            )}
            
            <button onClick={handleDownload} className="viewer-btn download-btn" title="Download">
              <Download size={20} />
              <span>Download</span>
            </button>
            
            <button onClick={onClose} className="viewer-btn close-btn" title="Close">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Viewer Content */}
        <div className="notice-viewer-content">
          {isPDF ? (
            <div className="pdf-viewer-wrapper">
              {!pdfError ? (
                <iframe
                  src={`${attachment.fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  title={attachment.fileName}
                  className="pdf-iframe"
                  onError={() => setPdfError(true)}
                />
              ) : (
                <div className="pdf-error">
                  <FileText size={60} />
                  <p>Unable to display PDF in browser</p>
                  <button onClick={handleDownload} className="btn-download-alt">
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="image-viewer-wrapper">
              <img
                src={attachment.fileUrl}
                alt={attachment.fileName}
                style={{ transform: `scale(${scale})` }}
                className="viewer-image"
              />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="notice-viewer-footer">
          <span className="file-type-badge">
            {isPDF ? 'PDF Document' : 'Image File'}
          </span>
          <span className="file-size-info">
            Click and drag to pan • Use buttons to zoom
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeViewer;