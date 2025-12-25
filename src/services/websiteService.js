import api from './api';

const websiteService = {
  // Get website settings
  getSettings: async () => {
    const response = await api.get('/website/settings');
    return response.data;
  },

  // Update basic settings
  updateSettings: async (settingsData) => {
    const response = await api.put('/website/settings', settingsData);
    return response.data;
  },

  // Update logo
  updateLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    
    const response = await api.put('/website/settings/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Update header image
  updateHeaderImage: async (file) => {
    const formData = new FormData();
    formData.append('headerImage', file);
    
    const response = await api.put('/website/settings/header-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Update about image
  updateAboutImage: async (file) => {
    const formData = new FormData();
    formData.append('aboutImage', file);
    
    const response = await api.put('/website/settings/about-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default websiteService;