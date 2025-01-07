// src/components/ProtectedRoute.tsx
import { Route, Navigate } from 'react-router-dom';
import { useUserStore } from '../store/authStore';
import { ComponentType } from 'react';

interface ProtectedRouteProps {
  component: ComponentType;
  path: string;
}

const ProtectedRoute = ({ component: Component, path }: ProtectedRouteProps) => {
  const { user } = useUserStore();

  return (
    <Route
      path={path}
      element={
        user ? (
          <Component />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
