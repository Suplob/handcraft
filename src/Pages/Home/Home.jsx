import React, { useEffect } from "react";
import Layout from "../Shared/Layout/Layout";
import Banner from "./Banner/Banner";

const Home = () => {
  useEffect(() => {
    document.title = "HandCraft | Home";
  }, []);
  return (
    <Layout>
      <Banner></Banner>
    </Layout>
  );
};

export default Home;
