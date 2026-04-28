// API Configuration
const getApiBaseUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  let baseUrl;
  
  if (codespace) {
    baseUrl = `https://${codespace}-8000.app.github.dev/api/`;
    console.log('Using Codespace URL:', baseUrl);
  } else if (isDevelopment) {
    baseUrl = 'http://localhost:8000/api/';
    console.log('Using localhost URL:', baseUrl);
  } else {
    baseUrl = '/api/';
    console.log('Using relative URL:', baseUrl);
  }
  
  return baseUrl;
};

export const API_BASE_URL = getApiBaseUrl();

export const getEndpoint = (resource) => {
  return `${API_BASE_URL}${resource}/`;
};
