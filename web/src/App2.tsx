// import { useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";
import React from "react";
import { useHelloQuery } from "./generated/graphql";

const App: React.FC = () => {
  // const { data, loading } = useQuery(gql`
  //   {
  //     hello
  //   }
  // `);

  const { data, loading } = useHelloQuery();

  if (loading) {
    return <div>loading</div>;
  }
  return <div className="App">{JSON.stringify(data, null, 2)}</div>;
};

export default App;
