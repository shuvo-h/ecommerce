import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { TUser, authGetters, logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/storeHook";
import { verifyToken } from "../../utilies/verifyToken";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(authGetters.selectCurrentToken);
  const user = useAppSelector(authGetters.selectCurrentUser);
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
    // return <Navigate to={"/register"} replace={true} />;
  }

  // prevent the user to modify data from localstorage
  // match the role and user id and token with cookie
  let tokenUser;
  if (token) {
    tokenUser = verifyToken(token) as TUser;
  }
  
  if (tokenUser !== undefined && (tokenUser.role !== user?.role || tokenUser._id !== user._id)) {
    dispatch(logout());
  }


  return children;
};

export default ProtectedRoute;
