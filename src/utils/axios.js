// src/utils/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_URL, // твой gateway
})

// Интерцептор для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ===== Интерцептор для ответа: ловим 401 =====
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
