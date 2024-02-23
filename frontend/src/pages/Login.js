import React from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
const apiPath = process.env.REACT_APP_API_PATH;

async function auth() {
  console.log(apiPath);
  axios.post(`${apiPath}request`).then((response) => {
    console.log(response.data.url);
    window.location.href = response.data.url;
  });
}

function Login() {
  return (
    <div>
      <Button onClick={() => auth()}>LOGIN</Button>
    </div>
  );
}

export default Login;
