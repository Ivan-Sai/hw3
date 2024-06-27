const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  SERVER: BACKEND_URL,
};

export default config;
