import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentToken } from "../../redux/features/apiAuth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
