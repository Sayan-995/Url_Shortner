/**
 * Local storage utilities with expiration support
 */

export const storage = {
  set: (key, value, expirationMinutes = null) => {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiration: expirationMinutes ? Date.now() + expirationMinutes * 60 * 1000 : null,
      };
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  get: (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!data) return null;

      // Check if expired
      if (data.expiration && Date.now() > data.expiration) {
        storage.remove(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  getAllKeys: () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys;
  },
};

export default storage;
