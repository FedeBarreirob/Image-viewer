import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/authStore";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useUserStore();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
