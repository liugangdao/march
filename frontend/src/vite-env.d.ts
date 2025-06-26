/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_DEV_SERVER_PORT: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 