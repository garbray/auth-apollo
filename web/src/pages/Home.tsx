import React from "react";
import { Link } from "react-router-dom";
import { User, useUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  // will make the request always not read from the cache
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>Home</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {data.users.map((user: User) => (
            <li key={user.id}>
              {user.email} - {user.id}
            </li>
          ))}
        </ul>
      </section>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
