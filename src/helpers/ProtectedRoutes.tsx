import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/authStore";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isRestoring } = useUserStore();

  if (isRestoring) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
