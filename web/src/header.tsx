import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation, useMeQuery } from "./generated/graphql";

const Header: React.FC = () => {
  // fetchPolicy cache the user
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const [logout, { client }] = useLogoutMutation();

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      {data && data.me ? (
        <div>
          You are logged in as: {data.me.email}
          <form>
            <button
              onClick={async () => {
                await logout();
                setAccessToken("");
                await client!.resetStore();
              }}
            >
              logout
            </button>
          </form>
        </div>
      ) : (
        <div>not logged in</div>
      )}
    </header>
  );
};

export default Header;
