import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const issuerDomain = process.env.REACT_APP_ISSUER_DOMAIN.replace(
  /^https?:\/\//,
  ""
);
console.log(issuerDomain);
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={issuerDomain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: "profile openid read:Participants",
        useRefreshTokens: true,
      }}
    >
      <App bg="gray.800" />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
