import axios from "axios";
import { getItem } from "@/hook/localStorage";
const instance = axios.create({
  baseURL: "http://localhost:8000/wemedia",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getItem("token")
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
