export const AUTH_TOKEN_KEY = 'token';
export const USER_DATA_KEY = 'user';

// Kullanıcı rolleri
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

// Bildirim tipleri
export const NOTIFICATION_TYPES = {
  LIKE: 'LIKE',
  COMMENT: 'COMMENT',
  FOLLOW: 'FOLLOW',
  MESSAGE: 'MESSAGE',
};

// Post tipleri
export const POST_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
};

// Dosya limitleri
export const FILE_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Zaman formatları
export const DATE_FORMATS = {
  POST_DATE: 'DD MMM YYYY',
  MESSAGE_TIME: 'HH:mm',
  NOTIFICATION_DATE: 'DD/MM/YYYY HH:mm',
};

// Hata mesajları
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  AUTH_REQUIRED: 'Bu işlem için giriş yapmanız gerekmektedir.',
  INVALID_CREDENTIALS: 'Geçersiz kullanıcı adı veya şifre.',
  VALIDATION_ERROR: 'Lütfen tüm gerekli alanları doldurun.',
  FILE_SIZE_ERROR: 'Dosya boyutu çok büyük.',
  FILE_TYPE_ERROR: 'Desteklenmeyen dosya tipi.',
};

// Başarı mesajları
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Başarıyla giriş yaptınız.',
  REGISTER_SUCCESS: 'Hesabınız başarıyla oluşturuldu.',
  POST_CREATED: 'Gönderi başarıyla oluşturuldu.',
  POST_UPDATED: 'Gönderi başarıyla güncellendi.',
  POST_DELETED: 'Gönderi başarıyla silindi.',
  PROFILE_UPDATED: 'Profil başarıyla güncellendi.',
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile/:username',
  POST: '/post/:id',
  EXPLORE: '/explore',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
};

// Tema renkleri
export const COLORS = {
  PRIMARY: '#0095f6',
  SECONDARY: '#00376b',
  BACKGROUND: '#fafafa',
  TEXT: '#262626',
  ERROR: '#ed4956',
  SUCCESS: '#2ecc71',
  BORDER: '#dbdbdb',
};