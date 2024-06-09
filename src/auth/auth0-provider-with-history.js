// src/auth/auth0-provider-with-history.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
// import history from "../utils/history.js";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.AUDIENCE;
// console.log("domain="+ domain + "---clientid=" + clientId + "---window.location.origin=" + window.location.origin);
  const history = useNavigate();
//   const providerConfig = {
//     domain: {domain},
//     clientId: {clientId},
//     onRedirectCallback: {onRedirectCallback},
//     authorizationParams: {
//       redirect_uri: window.location.origin,
//       ...({audience} ? { audience: {audience} } : null),
//     },
//   };

//   const onRedirectCallback = (appState) => {
//     //console.log("appState=" + appState);
//     history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
//     // history.push(appState?.returnTo || window.location.pathname);
//   };

//   domain={domain}
//       clientId={clientId}
//       redirectUri={window.location.origin}
//       onRedirectCallback={onRedirectCallback}

const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.returnTo ? appState.returnTo : window.location.pathname
    );
  };
  
  // Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
  // for a full list of the available properties on the provider
  
  
  const providerConfig = {
    domain: {domain},
    clientId: {clientId},
    onRedirectCallback,
    authorizationParams: {
      redirect_uri: window.location.origin,
      ...({audience} ? { audience: {audience} } : null),
    },
  };

  return (
    <Auth0Provider
    {...providerConfig}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;