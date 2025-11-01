import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL,
    headers:{
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})

// Интерцепторы для логирования или обработки ошибок
instance.interceptors.request.use(
  (config) => {
    // например, добавляем токен
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;