import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RoleContext } from "../helpers/RoleContext";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

// using api calls because contextAPI state clears on refresh or directly accessing the pages through the address bar
const ProtectedAuthRole = ({ children }) => {
  const { roleState, setRoleState } = useContext(RoleContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;

  const fetchData = async () => {
    try {
      const authResponse = await axios.get(`${apiPath}request/authenticate`, {
        withCredentials: true,
      });
      if (authResponse.data === "ok") {
        // setAuthState({isAuthenticated: true});

        const roleResponse = await axios.get(`${apiPath}request/getRole`);
        if (roleResponse.data.role === "admin") {
          // setRoleState(roleResponse.data);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  fetchData();

  return children;
};

export default ProtectedAuthRole;
