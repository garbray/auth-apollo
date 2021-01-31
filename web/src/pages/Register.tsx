import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await register({ variables: { email, password } });
          console.log(response);
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
          <button type="submit">Submit</button>
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

export default Register;
