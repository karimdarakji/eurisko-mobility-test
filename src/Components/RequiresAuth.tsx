import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const RequiresAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAppSelector((state) => state.user);
  let location = useLocation();

  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiresAuth;
