import React from "react";
import { useLocation } from "react-router-dom";

function Verification() {
  const location = useLocation();
  console.log("Location =", location);
  const urlParams = new URLSearchParams(location.search);
  console.log("URL Params = ", urlParams);
  const accessToken = urlParams.get("code");
  console.log(accessToken);
  return <div>Verifying</div>;
}

export default Verification;
