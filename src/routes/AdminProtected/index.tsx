import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: ReactNode;
  isAdminOnly?: boolean;
}

const AdminProtectedRoute = ({ children, isAdminOnly = false }: AdminProtectedRouteProps) => {
  const { isAdmin, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);
  }, []);

  if (isChecking) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isAdminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
