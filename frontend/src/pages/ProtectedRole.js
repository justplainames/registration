import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RoleContext } from "../helpers/RoleContext";
import axios from "axios";

// using api calls because contextAPI state clears on refresh or directly accessing the pages through the address bar
const ProtectedRole = ({ children }) => {
  const { roleState, setRoleState } = useContext(RoleContext);
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiPath}request/getRole`);
        console.log(response.data);
        if (response.data === "admin") {
          setRoleState("admin");
        } else {
          setRoleState("user");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        navigate("/");
      }
    };
    fetchData();
  }, [roleState, navigate]);

  console.log("checking in RoleState", roleState);
  if (roleState !== "admin") {
    navigate("/dashboard");
  } else {
    console.log("Passed");
    return children;
  }
};

export default ProtectedRole;
