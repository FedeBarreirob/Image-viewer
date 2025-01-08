import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface CheckLocationProps {
    children: ReactNode;
  }

const CheckLocation : React.FC<CheckLocationProps> = ({ children }) => {
  const location = useLocation();
  const protectedRoutes = ["/home", "/favorites", "/detail"];

  const isDetailRoute = /^\/detail\/[^/]+$/.test(location.pathname);

  const isProtectedRoute = protectedRoutes.some(route => route === location.pathname) || isDetailRoute;

  return isProtectedRoute ? children : null;
};

export default CheckLocation;
