import React, { useEffect } from "react";
import Layout from "../Shared/Layout/Layout";

const Home = () => {
  useEffect(() => {
    document.title = "HandCraft | Home";
  }, []);
  return <Layout>coming from home</Layout>;
};

export default Home;
