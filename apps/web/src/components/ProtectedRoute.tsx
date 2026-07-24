import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('payflow_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}