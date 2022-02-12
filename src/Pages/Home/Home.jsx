import React, { useEffect } from "react";
import Layout from "../Shared/Layout/Layout";
import Banner from "../Shared/Banner/Banner";
import Services from "./Services/Services";

const Home = () => {
  useEffect(() => {
    document.title = "HandCraft | Home";
  }, []);
  return (
    <Layout>
      <Banner btn>ELEGANTLY DESIGNED POTS</Banner>
      <Services></Services>
    </Layout>
  );
};

export default Home;
