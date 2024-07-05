import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, useNavigate  } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { Auth0Provider } from '@auth0/auth0-react';
import { REACT_AUTH0_DOMAIN, REACT_AUTH0_CLIENT_ID, REACT_REDIRECT_URI } from "./urlconstants";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const config = getConfig();
const domain = REACT_AUTH0_DOMAIN;
const clientId = REACT_AUTH0_CLIENT_ID;
const redirectUri = REACT_REDIRECT_URI
// const providerConfig = {
//   domain: config.domain,
//   clientId: config.clientId,
//   onRedirectCallback,
//   authorizationParams: {
//     redirect_uri: window.location.origin,
//     ...(config.audience ? { audience: config.audience } : null),
//   },
// };
// const history = useNavigate();
// const onRedirectCallback = (appState) => {
//   history.push(appState?.returnTo || window.location.pathname);
// };
root.render(
  
  <React.StrictMode>
    <Auth0Provider domain={REACT_AUTH0_DOMAIN} 
      clientId={REACT_AUTH0_CLIENT_ID} 
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri
      }}>
      <BrowserRouter>
        <FilterProvider>
          <App />
        </FilterProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
