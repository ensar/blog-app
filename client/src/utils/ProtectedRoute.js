import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
