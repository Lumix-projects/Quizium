import axios from "axios";
import cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
