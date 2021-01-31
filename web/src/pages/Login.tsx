import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await login({
            variables: { email, password },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  // optional
                  __typename: "Query",
                  me: data.login.user,
                },
              });
            },
          });
          console.log(response);

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }
          history.push("/");
        }}
      >
        <fieldset>
          <label htmlFor="email">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
              id="email"
              type="email"
            />
          </label>
          <label htmlFor="password">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              id="email"
              type="password"
            />
          </label>
          <button type="submit">Login</button>
        </fieldset>
      </form>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Login;
