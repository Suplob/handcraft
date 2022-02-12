import { Box } from "@mui/material";
import React from "react";
import RotateLoader from "react-spinners/RotateLoader";

const Preloader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 3,
        alignItems: "center",
      }}
    >
      <RotateLoader />
    </Box>
  );
};

export default Preloader;
