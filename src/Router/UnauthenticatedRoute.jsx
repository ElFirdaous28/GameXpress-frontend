import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const UnauthenticatedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

export default UnauthenticatedRoute;