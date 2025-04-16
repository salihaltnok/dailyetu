import { FILE_LIMITS } from './constants';

// Dosya boyutu kontrolü
export const isValidFileSize = (file, type) => {
  const limit = type === 'image' ? FILE_LIMITS.IMAGE_MAX_SIZE : FILE_LIMITS.VIDEO_MAX_SIZE;
  return file.size <= limit;
};

// Dosya tipi kontrolü
export const isValidFileType = (file, type) => {
  const allowedTypes = type === 'image' 
    ? FILE_LIMITS.ALLOWED_IMAGE_TYPES 
    : FILE_LIMITS.ALLOWED_VIDEO_TYPES;
  return allowedTypes.includes(file.type);
};

// Tarih formatlama
export const formatDate = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Az önce';
  } else if (minutes < 60) {
    return `${minutes} dakika önce`;
  } else if (hours < 24) {
    return `${hours} saat önce`;
  } else if (days < 7) {
    return `${days} gün önce`;
  } else {
    return new Date(date).toLocaleDateString('tr-TR');
  }
};

// URL'den kullanıcı adı çıkarma
export const extractUsername = (path) => {
  const match = path.match(/\/profile\/([^/]+)/);
  return match ? match[1] : null;
};

// Dosya boyutunu formatla
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Text kısaltma
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !value) {
      errors[field] = 'Bu alan zorunludur';
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `En az ${fieldRules.minLength} karakter olmalıdır`;
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `En fazla ${fieldRules.maxLength} karakter olmalıdır`;
    }

    if (fieldRules.email && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = 'Geçerli bir e-posta adresi giriniz';
    }

    if (fieldRules.match && value !== values[fieldRules.match]) {
      errors[field] = 'Şifreler eşleşmiyor';
    }
  });

  return errors;
};

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage set error:', e);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('LocalStorage get error:', e);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('LocalStorage remove error:', e);
    }
  }
};

// Dosya yükleme için yardımcı fonksiyon
export const handleFileUpload = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (options.preview) {
        resolve(e.target.result);
      } else {
        resolve(file);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };

    if (options.preview) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

// Kullanıcı rolü kontrolü
export const hasRole = (user, role) => {
  return user?.roles?.includes(role);
};

// Debounce fonksiyonu
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle fonksiyonu
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};