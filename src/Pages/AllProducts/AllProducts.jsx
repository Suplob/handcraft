import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../Shared/Banner/Banner";
import Layout from "../Shared/Layout/Layout";
import Preloader from "../Shared/Preloader/Preloader";
import ServiceCard from "../Shared/ServiceCard/ServiceCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hand-craft-backend.herokuapp.com/services`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
  }, []);

  console.log(products);

  return (
    <Layout>
      <Banner>All Products</Banner>
      <Container>
        {loading ? (
          <Box sx={{ my: 10 }}>
            <Preloader></Preloader>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ my: 3 }}>
            {products.map((product) => (
              <Grid item xs={12} md={6} lg={4}>
                <ServiceCard data={product} key={product._id}></ServiceCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default AllProducts;
