import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  if (!isAuthenticated() || !(auth()?.roles?.includes("MINISTRY") || auth()?.roles?.includes("DISTRICT") || auth()?.roles?.includes("SECTOR") || auth()?.roles?.includes("CELL") || auth()?.roles?.includes("VILLAGE") || auth()?.roles?.includes("PARENT"))) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default AdminRoute;