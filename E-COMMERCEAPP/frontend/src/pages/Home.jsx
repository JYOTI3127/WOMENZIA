import React from "react";
import NewCollection from "../components/NewCollection";
import BestSeller from "../components/BestSeller";
import Policies from "../components/Policies";

const Home = () => {
  return (
    <>
      <NewCollection />
      <BestSeller />
      <Policies />
    </>
  );
};

export default Home;
