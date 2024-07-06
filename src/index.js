import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, useNavigate  } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { Auth0Provider } from '@auth0/auth0-react';
import { REACT_AUTH0_DOMAIN, REACT_AUTH0_CLIENT_ID, REACT_REDIRECT_URI } from "./urlconstants";

const root = ReactDOM.createRoot(document.getElementById("root"));
const envDomain = process.env.REACT_APP_AUTH0_DOMAIN
const envClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const envRedirectUri = process.env.REACT_APP_REDIRECT_URI;

console.log(envDomain + "--" + envClientId + "--" + envRedirectUri);

// const config = getConfig();
// const domain = envDomain;
// const clientId = envClientId;
// const redirectUri = envRedirectUri
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
    <Auth0Provider domain={envDomain} 
      clientId={envClientId} 
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <BrowserRouter>
        <FilterProvider>
          <App />
        </FilterProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
