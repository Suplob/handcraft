import {
  Container,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "../Shared/Layout/Layout";
import axios from "axios";
import Preloader from "../Shared/Preloader/Preloader";
import styled from "styled-components";
import { Box } from "@mui/system";
import useAuth from "../../hooks/useAuth";
import PrimaryBTN from "../Shared/PrimaryBTN/PrimaryBTN";

const SingleService = () => {
  const { id } = useParams();
  const [service, setService] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [orderText, setOrderText] = React.useState("ORDER NOW");
  const [succes, setSuccess] = React.useState(false);

  const { user } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    setSuccess(false);
    axios
      .get(`https://hand-craft-backend.herokuapp.com/service/${id}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      });
  }, [id]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderText("ORDERING!");
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const address = data.get("address");

    axios
      .post(`https://hand-craft-backend.herokuapp.com/order`, {
        name,
        email,
        address,
        product: service,
        status: "Pending",
      })
      .then((res) => {
        if (res.status === 200) {
          setOrderText("ORDERED");
          setSuccess("Ordered Successfully!");
        }
      });
  };

  const matches = useMediaQuery("(min-width:600px)");

  const backgroundStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url("https://etruscan.qodeinteractive.com/wp-content/uploads/2021/08/h1-newbgimg-1.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginTop: "-80px",
    height: "70vh",
    position: "relative",
    zIndex: "999",
  };

  const HeroText = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    width: 100%;
  `;

  const H1 = styled.h1`
    font-family: "Cormorant", serif;
    color: white;
    text-align: center;
    font-size: 80px;
    font-weight: 300;
  `;

  const Img = styled.img`
    width: 100%;
    height: 500px;
    object-fit: cover;
  `;

  const Input = styled.input`
    width: 100%;
    height: 30px;
    padding: 12px 17px;
    margin-top: 10px;
    margin-bottom: 10px;
  `;

  return (
    <Layout>
      <Box sx={backgroundStyle}>
        <HeroText matches>
          <H1
            style={{
              fontSize: matches ? "60px" : "40px",
            }}
          >
            {service.name}
          </H1>
        </HeroText>
      </Box>
      {loading ? (
        <Preloader></Preloader>
      ) : (
        <Container>
          <Grid container spacing={3} sx={{ my: 4 }}>
            <Grid item xs={12} md={6}>
              <Img src={service.image} />
              <Typography variant="h2" sx={{ fontFamily: "Cormorant" }}>
                {service.name}
              </Typography>
              <span style={{ color: "rgba(0,0,0,0.7)", fontSize: "25px" }}>
                $ {service.price}
              </span>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="read-only"
                  value={service?.rating?.rate}
                  readOnly
                  sx={{ fontColor: "rgba(0,0,0,0.8)" }}
                />
                <p>( {service?.rating?.count} Customer Review)</p>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3">Order Now!</Typography>
              <form onSubmit={handleOrderSubmit}>
                <Input
                  name="name"
                  placeholder="Name"
                  required
                  value={user.displayName}
                />
                <br />
                <Input
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  required
                />
                <br />
                <Input name="address" placeholder="Address" required />
                <PrimaryBTN type="submit">{orderText}</PrimaryBTN>
                <p style={{ color: "green" }}>{succes}</p>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default SingleService;
