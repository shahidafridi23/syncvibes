import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>
);
