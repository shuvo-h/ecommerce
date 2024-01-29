import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authGetters } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/storeHook";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(authGetters.selectCurrentToken);
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
    // return <Navigate to={"/register"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
