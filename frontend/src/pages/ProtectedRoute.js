import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuth0();
  if (user["http://localhost:3000/roles"][0] === "user") {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
