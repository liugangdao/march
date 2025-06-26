# API 配置说明

## 概述

本项目使用 Vite 代理和统一的 API 配置来管理后端 API 调用，避免了硬编码 API 地址的问题。

## 配置结构

### 1. Vite 代理配置 (`vite.config.js`)

```javascript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### 2. API 配置文件 (`src/config/api.ts`)

- 统一管理 API 基础 URL
- 配置 API 端点
- 创建 axios 实例
- 添加请求/响应拦截器

### 3. 环境变量类型定义 (`src/vite-env.d.ts`)

为 TypeScript 提供环境变量的类型支持。

## 使用方法

### 在组件中使用 API

```typescript
import { apiClient, API_ENDPOINTS } from "../config/api";

// 注册用户
const response = await apiClient.post(API_ENDPOINTS.users.register, {
  name: "用户名",
  email: "email@example.com",
  password: "密码"
});

// 用户登录
const response = await apiClient.post(API_ENDPOINTS.users.login, 
  new URLSearchParams({
    username: email,
    password: password,
  }), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }
);
```

## 环境变量配置

创建 `.env` 文件（基于 `.env.example`）：

```env
# API Configuration
VITE_API_BASE_URL=http://127.0.0.1:8000

# Development server configuration
VITE_DEV_SERVER_PORT=3000
```

## 优势

1. **开发环境**: 使用 Vite 代理，避免 CORS 问题
2. **生产环境**: 使用实际 API URL
3. **统一管理**: 所有 API 调用都通过统一的配置
4. **自动认证**: 请求拦截器自动添加 token
5. **错误处理**: 响应拦截器统一处理 401 错误
6. **类型安全**: TypeScript 支持

## 注意事项

- 开发环境会自动使用代理，无需修改 API 调用
- 生产环境需要在环境变量中配置正确的 API URL
- Token 会自动从 localStorage 中获取并添加到请求头
- 401 错误会自动跳转到登录页面 