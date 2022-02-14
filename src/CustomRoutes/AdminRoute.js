import { Skeleton } from "@mui/material";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Preloader from "../Pages/Shared/Preloader/Preloader";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading, admin } = useAuth();

  if (isLoading) {
    <Preloader></Preloader>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
