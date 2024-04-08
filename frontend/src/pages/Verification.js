import React from "react";
import { useLocation } from "react-router-dom";

function Verification() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("code");
  return <div>Verifying</div>;
}

export default Verification;
