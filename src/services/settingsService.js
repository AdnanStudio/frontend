import api from './api';

const settingsService = {
  // ============================================
  // GET SETTINGS
  // ============================================
  getSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ============================================
  // UPDATE BASIC SETTINGS
  // ============================================
  updateBasicSettings: async (data) => {
    try {
      const response = await api.put('/settings/basic', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ============================================
  // SCROLLING TEXT
  // ============================================
  addScrollingText: async (data) => {
    try {
      const response = await api.post('/settings/scrolling-text', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateScrollingText: async (textId, data) => {
    try {
      const response = await api.put(`/settings/scrolling-text/${textId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteScrollingText: async (textId) => {
    try {
      const response = await api.delete(`/settings/scrolling-text/${textId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ============================================
  // HERO IMAGES
  // ============================================
  addHeroImage: async (formData) => {
    try {
      const response = await api.post('/settings/hero-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateHeroImageOrder: async (imageId, order) => {
    try {
      const response = await api.put(`/settings/hero-images/${imageId}/order`, { order });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteHeroImage: async (imageId) => {
    try {
      const response = await api.delete(`/settings/hero-images/${imageId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ============================================
  // SINGLE IMAGES (About, Chairman, Notice)
  // ============================================
  updateAboutImage: async (formData) => {
    try {
      const response = await api.put('/settings/about-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteAboutImage: async () => {
    try {
      const response = await api.delete('/settings/about-image');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateChairmanImage: async (formData) => {
    try {
      const response = await api.put('/settings/chairman-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteChairmanImage: async () => {
    try {
      const response = await api.delete('/settings/chairman-image');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateNoticeImage: async (formData) => {
    try {
      const response = await api.put('/settings/notice-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteNoticeImage: async () => {
    try {
      const response = await api.delete('/settings/notice-image');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default settingsService;