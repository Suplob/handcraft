import React, { useEffect } from "react";
import Layout from "../Shared/Layout/Layout";
import Banner from "../Shared/Banner/Banner";
import Services from "./Services/Services";
import Review from "./Review/Review";

const Home = () => {
  useEffect(() => {
    document.title = "HandCraft | Home";
  }, []);
  return (
    <Layout>
      <Banner btn>ELEGANTLY DESIGNED POTS</Banner>
      <Services></Services>
      <Review></Review>
    </Layout>
  );
};

export default Home;
