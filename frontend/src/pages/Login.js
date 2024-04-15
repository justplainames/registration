import React from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
const apiPath = process.env.REACT_APP_API_PATH;

async function auth() {
  axios.post(`${apiPath}/request`).then((response) => {
    window.location.href = response.data.url;
  });
}

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </div>
  );
}

export default Login;
