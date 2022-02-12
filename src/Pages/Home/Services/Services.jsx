import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Preloader from "../../Shared/Preloader/Preloader";
import ServiceCard from "../../Shared/ServiceCard/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://hand-craft-backend.herokuapp.com/servicesLimited")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Cormorant", textAlign: "center", my: 3 }}
      >
        Best Collection
      </Typography>
      {loading ? (
        <Preloader></Preloader>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service._id}>
              <ServiceCard data={service}></ServiceCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Services;
