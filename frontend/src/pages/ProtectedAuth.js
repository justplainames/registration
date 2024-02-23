import { Outlet, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { RoleContext } from "../helpers/RoleContext";
import axios from "axios";

const ProtectedAuth = ({ children }) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_API_PATH;
  console.log("HERE");
  useEffect(() => {
    console.log("HERE");
    const fetchData = async () => {
      console.log("HERE");
      try {
        const response = await axios.get(`${apiPath}request/authenticate`, {
          withCredentials: true,
        });
        if (response.data === "ok") {
          console.log("HEREFINALLY");
          setAuthState(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        navigate("/");
      }
    };
    fetchData();
  }, [authState, navigate]);

  return authState ? children : null;
};

export default ProtectedAuth;
