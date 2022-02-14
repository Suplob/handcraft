import styled from "styled-components";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  let year = new Date().getFullYear();

  const Footer = styled.footer`
    background-color: #2b2b2b;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 50px;
  `;
  const Ul = styled.ul`
    width: 50%;
    text-align: start;
  `;
  const Li = styled.li`
    cursor: pointer;
    margin-bottom: 5px;
  `;
  const HelpWrapper = styled.div`
    margin-top: 15px;
  `;
  const HelpItem = styled.div`
    border-left: 3px solid white;
    padding-left: 10px;
  `;
  const HelpText = styled.a`
    margin-top: -2px;
    transition: 150ms ease-in-out;
    color: white;
    cursor: pointer;
    display: block;
    text-decoration: none;
    &:hover {
      color: rgba(247, 243, 243, 0.6);
    }
  `;

  return (
    <Footer>
      <Container sx={{ my: 5 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ borderBottom: "2px solid white", pb: 2, width: "50%" }}
            >
              Navigation
            </Typography>
            <Ul>
              <Li onClick={() => history.push("/")}>Home</Li>
              <Li onClick={() => history.push("/allProducts")}>All Products</Li>
              <Li onClick={() => history.push("/login")}>Login</Li>
              <Li onClick={() => history.push("/register")}>Register</Li>
            </Ul>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ borderBottom: "2px solid white", pb: 2, width: "50%" }}
            >
              Need Help?
            </Typography>
            <HelpWrapper>
              <HelpItem>
                <small>Call Us</small>
                <HelpText href="tel:8801738573932">+8801738573932</HelpText>
              </HelpItem>
              <HelpItem style={{ marginTop: "15px" }}>
                <small>Email Us</small>
                <HelpText href="mailto:parbaroy30@gmail.com">
                  parbaroy30@gmail.com
                </HelpText>
              </HelpItem>
            </HelpWrapper>
          </Grid>
        </Grid>
      </Container>
      <p>
        Copyright © {year}{" "}
        <a
          style={{ fontWeight: "800", color: "white", textDecoration: "none" }}
          href="https://www.linkedin.com/in/suplobroy/"
        >
          Suplob Roy
        </a>
        . All Rights Reserved.
      </p>
    </Footer>
  );
};

export default Footer;
