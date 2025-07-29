// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Asegúrate de definir esta variable en tu .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de respuesta opcional (si quieres manejar errores globalmente)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes personalizar el manejo de errores globales si quieres
    console.error("API Error:", error.response?.status || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
