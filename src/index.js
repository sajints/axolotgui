import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, useNavigate } from "react-router-dom";
// import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
import history from "./utils/history"; 

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.AUDIENCE;
  // const history = useNavigate();

const onRedirectCallback = (appState) => {
  
  history(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: {domain},
  clientId: {clientId},
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...({audience} ? { audience: {audience} } : null),
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Auth0ProviderWithHistory> */}
      <Auth0Provider
    {...providerConfig}
  >
        <App />
        </Auth0Provider>,
      {/* </Auth0ProviderWithHistory> */}
    </BrowserRouter>
  </React.StrictMode>
);
