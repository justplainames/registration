import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

const ProtectedAuth = ({ children }) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiPath}request/authenticate`, {
        withCredentials: true,
      });
      if (response.data === "ok") {
        // setAuthState({isAuthenticated: true});
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching authentication status:", error);
      navigate("/");
    }
  };

  fetchData();

  return children;
};

export default ProtectedAuth;
