import React, { useEffect, useState } from "react";
import { fetchAccessToken, setAccessToken } from "./accessToken";
import Routes from "./Routes";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessToken().then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return <Routes />;
};

export default App;
