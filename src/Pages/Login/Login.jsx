import { Box, Typography } from "@mui/material";
import React from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../hooks/useAuth";
import Banner from "../Shared/Banner/Banner";
import Layout from "../Shared/Layout/Layout";
import PrimaryBTN from "../Shared/PrimaryBTN/PrimaryBTN";
import "./style.css";

const Login = () => {
  const { handleLogIn } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    handleLogIn(email, password, history, location);
  };

  return (
    <Layout>
      <Banner>Login</Banner>
      <Box sx={{ margin: "100px auto 0 auto", width: "40vw" }}>
        <form className="loginForm form" onSubmit={handleLogin}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Cormorant", textAlign: "center", mb: 2 }}
          >
            Login
          </Typography>

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
          <PrimaryBTN>Login</PrimaryBTN>
        </form>
        <p
          onClick={() => history.push("/register")}
          style={{ cursor: "pointer" }}
        >
          Don't Have An Account? Register
        </p>
      </Box>
    </Layout>
  );
};

export default Login;
