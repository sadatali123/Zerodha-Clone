// API Configuration
// For development, use localhost. For production, use the deployed URL
const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isDevelopment ? "http://localhost:3002" : "https://zerodha-backend-60pf.onrender.com");
const WS_BASE_URL = process.env.REACT_APP_WS_URL || 
  (isDevelopment ? "http://localhost:3002" : "https://zerodha-backend-60pf.onrender.com");

export { API_BASE_URL, WS_BASE_URL };

