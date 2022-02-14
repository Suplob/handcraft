import {
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrimaryBTN from "../../Shared/PrimaryBTN/PrimaryBTN";

const AddAdmin = () => {
  const [email, setName] = React.useState("");
  const [btnText, setBtnText] = React.useState("Make Admin");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    document.title = "Add Admin | Dashboard";
  }, []);

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setBtnText(<CircularProgress />);
    axios
      .put(`https://hand-craft-backend.herokuapp.com/addAdmin/${email}`)
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setBtnText("Confirmed");
        } else {
          setSuccess(null);
          setBtnText("Error Occured!");
        }
      });
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Cormorant", textAlign: "center", mt: 3 }}
      >
        Make Admin
      </Typography>
      <form onSubmit={handleAdminSubmit}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={email}
            onChange={handleChange}
            label="Name"
            sx={{ width: "80vw", mt: 2 }}
            type="email"
          />
        </FormControl>
        <Box sx={{ width: "250px", marginTop: "20px" }}>
          <PrimaryBTN type="submit">Confirm Admin</PrimaryBTN>
        </Box>
        {success ? (
          <p style={{ color: "green" }}>Made Admin Successfully</p>
        ) : success === null ? (
          <p style={{ color: "red" }}>Oops! Error Occured</p>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
};

export default AddAdmin;
