import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireAuth() {
  const token = localStorage.getItem("tg_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
