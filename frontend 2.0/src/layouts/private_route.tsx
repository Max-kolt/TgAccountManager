import { useAuth } from "../hooks/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const user = useAuth();
  if (!user.token || user.token == "") return <Navigate to="/login" />;

  return <Outlet />;
}
