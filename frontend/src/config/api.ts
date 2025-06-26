// API 配置文件
export const API_CONFIG = {
  // 开发环境使用代理，生产环境使用实际 URL
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
};

// API 端点配置
export const API_ENDPOINTS = {
  // 用户相关
  users: {
    register: '/users/register',
    login: '/users/login',
    profile: '/users/profile',
  },
  // 主题相关
  themes: {
    list: '/themes',
    detail: (id: string) => `/themes/${id}`,
  },
  // 预订相关
  bookings: {
    list: '/bookings',
    create: '/bookings',
    detail: (id: string) => `/bookings/${id}`,
  },
  // 房间相关
  rooms: {
    list: '/rooms',
    detail: (id: string) => `/rooms/${id}`,
  },
};

// 创建 axios 实例
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期或无效，清除本地存储并跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 