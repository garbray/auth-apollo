import React from "react";
import { useByeQuery } from "../generated/graphql";

export const Bye: React.FC = () => {
  const { data, loading, error } = useByeQuery();

  if (error) {
    return <div> {error}</div>;
  }

  if (loading) {
    return <div> loading... </div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
