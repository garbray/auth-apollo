import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink, ApolloProvider } from "@apollo/react-hooks";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { TokenRefreshLink } from "apollo-link-token-refresh";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  fetchAccessToken,
  getAccessToken,
  setAccessToken,
} from "./accessToken";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    },
  };
});

const isTokenExpired = () => {
  const token = getAccessToken();
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (exp && Date.now() >= exp * 1000) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const tokenRefresh = new TokenRefreshLink({
  isTokenValidOrUndefined: () => isTokenExpired(),
  fetchAccessToken: () => fetchAccessToken(),
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  // handleResponse: (operation, accessTokenField) => {},
  handleError: (err) => {
    console.warn("your refresh token is invalid, try to relogin");
    console.log(err);
    // user logout
  },
});
// authLink.concat(link),
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([tokenRefresh, authLink, link]),
  name: "test",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
