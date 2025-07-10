import axios from "axios";
import { APP_AUTH_KEY } from "../hooks/useAuth";

let HOSTED_BASE_URL = 'https://api.custory.sg/api'
let LOCAL_BASE_URL = 'http://localhost:5001/api'


export const BASE_SERVER_URL = import.meta.env.VITE_API_URL;

const serverInstance = axios.create({
  baseURL: BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverInstance;

serverInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem(APP_AUTH_KEY);
  let token = "";
  if (auth) token = JSON.parse(auth)?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

serverInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error?.response?.data?.message;
    if (errMessage?.includes("not logged in") && !originalRequest._retry) {
      localStorage.removeItem(APP_AUTH_KEY);
    }
    return Promise.reject(error);
  }
);
