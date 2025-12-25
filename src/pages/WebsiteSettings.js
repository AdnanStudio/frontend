// frontend/src/pages/WebsiteSettings.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Settings,
  Upload,
  Save,
  Image,
  Globe,
  BarChart
} from 'lucide-react';
import './WebsiteSettings.css';
import websiteService from '../services/websiteService';

const WebsiteSettings = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector((state) => state.auth || {});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolEmail: '',
    aboutText: '',
    visionMission: '',
    totalStudents: 0,
    totalTeachers: 0,
    totalStaff: 0,
    facebookLink: '',
    youtubeLink: '',
    playStoreLink: '',
    appStoreLink: ''
  });

  const [images, setImages] = useState({
    logo: null,
    headerImage: null,
    aboutImage: null
  });

  const [previews, setPreviews] = useState({
    logo: '',
    headerImage: '',
    aboutImage: ''
  });

  // prevent state updates after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      console.log('📡 Fetching website settings...');
      setLoading(true);
      const response = await websiteService.getSettings();
      const data = response.data || {};

      if (!isMounted.current) return;

      setSettings({
        schoolName: data.schoolName || '',
        schoolAddress: data.schoolAddress || '',
        schoolPhone: data.schoolPhone || '',
        schoolEmail: data.schoolEmail || '',
        aboutText: data.aboutText || '',
        visionMission: data.visionMission || '',
        totalStudents: data.totalStudents ?? 0,
        totalTeachers: data.totalTeachers ?? 0,
        totalStaff: data.totalStaff ?? 0,
        facebookLink: data.facebookLink || '',
        youtubeLink: data.youtubeLink || '',
        playStoreLink: data.playStoreLink || '',
        appStoreLink: data.appStoreLink || ''
      });

      setPreviews({
        logo: data.logo || '',
        headerImage: data.headerImage || '',
        aboutImage: data.aboutImage || ''
      });

      console.log('✅ Settings fetched:', {
        schoolName: data.schoolName,
        logo: data.logo ? '✅' : '❌',
        headerImage: data.headerImage ? '✅' : '❌'
      });
    } catch (error) {
      console.error('Fetch Settings Error:', error);
      toast.error('Failed to fetch settings');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setSettings(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // simple size check (5MB)
    const maxSizeMB = 5;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      toast.error(`File too large. Max ${maxSizeMB}MB allowed.`);
      console.warn('⚠️ File rejected (too large):', file.name, `${(file.size/1024/1024).toFixed(2)}MB`);
      return;
    }

    console.log(`🖼️ Selected ${imageType}:`, file.name, `${(file.size/1024/1024).toFixed(2)}MB`);

    setImages(prev => ({ ...prev, [imageType]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isMounted.current) {
        setPreviews(prev => ({ ...prev, [imageType]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImageInputs = () => {
    setImages({ logo: null, headerImage: null, aboutImage: null });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      console.log('📝 Saving settings started...');
      setSaving(true);
      let updatedCount = 0;

      // 1. Save basic settings
      console.log('→ Sending basic settings to server');
      await websiteService.updateSettings(settings);
      updatedCount++;
      toast.success('Basic settings saved!');

      // 2. Upload logo if changed
      if (images.logo) {
        console.log('→ Uploading logo...');
        const logoResult = await websiteService.updateLogo(images.logo);
        console.log('   logo upload result:', logoResult?.data || logoResult);
        updatedCount++;
        toast.success('Logo uploaded successfully!');
      }

      // 3. Upload header image if changed
      if (images.headerImage) {
        console.log('→ Uploading header image...');
        const headerResult = await websiteService.updateHeaderImage(images.headerImage);
        console.log('   header upload result:', headerResult?.data || headerResult);
        updatedCount++;
        toast.success('Header image uploaded successfully!');
      }

      // 4. Upload about image if changed
      if (images.aboutImage) {
        console.log('→ Uploading about image...');
        const aboutResult = await websiteService.updateAboutImage(images.aboutImage);
        console.log('   about upload result:', aboutResult?.data || aboutResult);
        updatedCount++;
        toast.success('About image uploaded successfully!');
      }

      toast.success(`🎉 All settings saved! (${updatedCount} updates)`, { duration: 4000 });

      // Refresh settings to show updated images
      console.log('🔄 Refreshing settings after save...');
      await fetchSettings();

      // Clear selected files
      clearImageInputs();

      // Confirm to open home page
      const viewChanges = window.confirm(
        '✅ Settings saved successfully!\n\nWould you like to open the home page in a new tab to see the changes?'
      );

      if (viewChanges) {
        window.open('/?updated=true', '_blank');
      }

      console.log('✅ Saving finished.');
    } catch (error) {
      console.error('❌ Save Settings Error:', error);
      toast.error(error.response?.data?.message || 'Failed to update settings');
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="website-settings-page">
      <div className="page-header">
        <div className="header-left">
          <Settings size={32} />
          <div>
            <h1>Website Settings</h1>
            <p>Manage your school website content and appearance</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="settings-form">

        {/* School Info */}
        <div className="settings-section">
          <div className="section-header">
            <Globe size={24} />
            <h2>School Information</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>School Name *</label>
              <input
                type="text"
                name="schoolName"
                value={settings.schoolName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>School Address</label>
              <input
                type="text"
                name="schoolAddress"
                value={settings.schoolAddress}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="schoolPhone"
                value={settings.schoolPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="schoolEmail"
                value={settings.schoolEmail}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="settings-section">
          <div className="section-header">
            <Image size={24} />
            <h2>Website Images</h2>
          </div>

          <div className="images-grid">
            {/* Logo */}
            <div className="image-upload-box">
              <label>School Logo</label>
              <div className="image-preview-container">
                {previews.logo ? (
                  <img src={previews.logo} className="image-preview" alt="School logo preview" />
                ) : (
                  <div className="image-placeholder">
                    <Upload size={40} />
                    <p>No logo uploaded</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'logo')}
                id="logo-upload"
                hidden
              />
              <label htmlFor="logo-upload" className="upload-btn">
                <Upload size={18} />
                Choose Logo
              </label>
            </div>

            {/* Header Image */}
            <div className="image-upload-box">
              <label>Header Image</label>
              <div className="image-preview-container wide">
                {previews.headerImage ? (
                  <img src={previews.headerImage} className="image-preview" alt="Header preview" />
                ) : (
                  <div className="image-placeholder">
                    <Upload size={40} />
                    <p>No header image uploaded</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'headerImage')}
                id="header-upload"
                hidden
              />
              <label htmlFor="header-upload" className="upload-btn">
                <Upload size={18} />
                Choose Header Image
              </label>
            </div>

            {/* About Image */}
            <div className="image-upload-box">
              <label>About Section Image</label>
              <div className="image-preview-container">
                {previews.aboutImage ? (
                  <img src={previews.aboutImage} className="image-preview" alt="About preview" />
                ) : (
                  <div className="image-placeholder">
                    <Upload size={40} />
                    <p>No about image</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'aboutImage')}
                id="about-upload"
                hidden
              />
              <label htmlFor="about-upload" className="upload-btn">
                <Upload size={18} />
                Choose About Image
              </label>
            </div>
          </div>
        </div>

        {/* About & Vision */}
        <div className="settings-section">
          <div className="section-header">
            <Globe size={24} />
            <h2>About & Vision</h2>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label>About Text</label>
              <textarea
                name="aboutText"
                value={settings.aboutText}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="form-group full-width">
              <label>Vision & Mission</label>
              <textarea
                name="visionMission"
                value={settings.visionMission}
                onChange={handleChange}
                rows="5"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="settings-section">
          <div className="section-header">
            <BarChart size={24} />
            <h2>Statistics</h2>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Total Students</label>
              <input
                type="number"
                name="totalStudents"
                value={settings.totalStudents}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Teachers</label>
              <input
                type="number"
                name="totalTeachers"
                value={settings.totalTeachers}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Staff</label>
              <input
                type="number"
                name="totalStaff"
                value={settings.totalStaff}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="settings-section">
          <div className="section-header">
            <Globe size={24} />
            <h2>Social Media & Apps</h2>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Facebook Link</label>
              <input
                type="url"
                name="facebookLink"
                value={settings.facebookLink}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>YouTube Link</label>
              <input
                type="url"
                name="youtubeLink"
                value={settings.youtubeLink}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Play Store Link</label>
              <input
                type="url"
                name="playStoreLink"
                value={settings.playStoreLink}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>App Store Link</label>
              <input
                type="url"
                name="appStoreLink"
                value={settings.appStoreLink}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? (
              <>
                <div className="btn-spinner" style={{ marginRight: 10 }}></div>
                Saving... Please wait
              </>
            ) : (
              <>
                <Save size={20} style={{ marginRight: 8 }} />
                Save All Settings
              </>
            )}
          </button>
        </div>

        {/* Add Info Box */}
        <div className="settings-info-box">
          <h3>💡 Important Notes:</h3>
          <ul>
            <li>✅ Images are automatically uploaded to Cloudinary</li>
            <li>✅ Changes will be visible immediately on the home page</li>
            <li>✅ After saving, you'll get an option to view the updated home page</li>
            <li>✅ Recommended image sizes:
              <ul>
                <li>Logo: 200x200px (PNG with transparent background)</li>
                <li>Header: 1920x600px (Landscape)</li>
                <li>About: 800x600px (Landscape)</li>
              </ul>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default WebsiteSettings;
