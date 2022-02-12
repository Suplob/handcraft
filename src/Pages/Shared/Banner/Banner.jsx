import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import SecondaryBTN from "../SecondaryBTN/SecondaryBTN";

const Banner = ({ children, btn }) => {
  const history = useHistory();
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
  return (
    <Box sx={{ ...backgroundStyle }}>
      <HeroText matches>
        <H1
          style={{
            fontSize: matches ? "60px" : "40px",
          }}
        >
          {children}
        </H1>
        <br />
        {btn && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link to="/allProducts" smooth style={{ textDecoration: "none" }}>
              <SecondaryBTN style={{ margin: "0 auto" }}>EXPLORE</SecondaryBTN>
            </Link>
          </Box>
        )}
      </HeroText>
    </Box>
  );
};

export default Banner;
