import { PhotoCamera } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";
import PrimaryBTN from "../../Shared/PrimaryBTN/PrimaryBTN";

const Review = () => {
  const [value, setValue] = React.useState(0);
  const [submitBtnText, setSubmitBtnText] = React.useState("Review");
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    document.title = "Review | HandCraft";
  }, []);

  const handleReviewSubmit = (e) => {
    setSubmitBtnText(<CircularProgress color="inherit" />);
    e.preventDefault();

    const data = new FormData(e.target);
    data.append("image", image);
    data.append("rating", value);

    fetch("https://hand-craft-backend.herokuapp.com/addReview", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (!image) {
          alert("Please select any image");
          setSubmitBtnText("Review");
        } else if (result.acknowledged) {
          setSubmitBtnText("Reviewed!");
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };

  const { user } = useAuth();

  const Form = styled.form`
    width: 80%;
    margin: 50px auto 0 auto;
  `;

  const Input = styled.input`
    height: 40px;
    width: 100%;
    padding: 20px;
  `;
  const TextArea = styled.textarea`
    height: 100px;
    width: 100%;
  `;
  const InputButton = styled("input")({
    display: "none",
  });

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Cormorant", textAlign: "center" }}
      >
        Review
      </Typography>
      <Form onSubmit={handleReviewSubmit}>
        <label htmlFor="icon-button-file">
          <InputButton
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <br />
        <br />
        <Input placeholder="Name" value={user.displayName} name="name"></Input>
        <br />
        <br />
        <Input placeholder="Email" value={user.email} name="email"></Input>
        <br />
        <br />
        <TextArea placeholder="Detailed Review" name="review"></TextArea>
        <br />
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {success ? (
          <p style={{ color: "green" }}>Reviewed Successfully</p>
        ) : success === false ? (
          <p style={{ color: "red" }}>Oops! Error Occured</p>
        ) : (
          <p></p>
        )}
        <PrimaryBTN>{submitBtnText}</PrimaryBTN>
      </Form>
    </div>
  );
};

export default Review;
