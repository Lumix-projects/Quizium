import axios from "axios";

const api = axios.create({
  baseURL: "https://quizium-api.vercel.app/api",
});

export default api;
