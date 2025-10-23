import { useAuth } from "../stores/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { CUSTOM_ROUTES } from "../constants/custom-routes";
import SpinnerLoader from "./SpinnerLoader";

const ProtectedRoutes = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <SpinnerLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={CUSTOM_ROUTES.LOGIN} />;
};

export default ProtectedRoutes;
