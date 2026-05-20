import { useAuth } from "./features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loading from "./features/shared/components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;