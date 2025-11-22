import axios from "axios";
import { getValidatedToken } from "./token";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Request interceptor to attach auth token to every request
api.interceptors.request.use((config) => {
  // Get validated token from cookie storage
  const token = getValidatedToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Return modified config with auth headers
  return config;
});

export default api;
