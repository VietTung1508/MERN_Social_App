import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const IsAuth = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
