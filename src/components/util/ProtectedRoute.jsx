import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { userInfo, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // user is not logged in
  if (!userInfo) {
    return <Navigate to={`/login?from=${location.pathname}`} replace />;
  }

  // user isn't an admin
  if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
}
