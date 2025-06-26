import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // 如果用户未登录，则重定向到登录页
    // 使用 state 记录下用户原本想去的页面 (location)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户已登录，则正常渲染他们想访问的页面
  return <>{children}</>;
} 