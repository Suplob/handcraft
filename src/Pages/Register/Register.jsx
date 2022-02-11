import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Layout from "../Shared/Layout/Layout";
import PrimaryBTN from "../Shared/PrimaryBTN/PrimaryBTN";
import "./style.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { handlePasswordRegister } = useAuth();

  useEffect(() => {
    document.title = "Register | HandCraft";
  }, []);

  const history = useHistory();
  const location = useLocation();

  function handleRegister(e) {
    setLoading(true);
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    handlePasswordRegister(name, email, password, history, location);

    e.preventDefault();
  }

  return (
    <Layout>
      <Box sx={{ margin: "100px auto 0 auto", width: "40vw" }}>
        <form className="loginForm form" onSubmit={handleRegister}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Cormorant", textAlign: "center", mb: 2 }}
          >
            Register
          </Typography>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            style={{ marginBottom: "30px" }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            style={{ marginBottom: "30px" }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            required
            name="password"
            style={{ marginBottom: "20px" }}
          />
          <PrimaryBTN>Register</PrimaryBTN>
        </form>
      </Box>
    </Layout>
  );
};

export default Register;
