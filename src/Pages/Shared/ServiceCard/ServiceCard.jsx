import { Rating, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const ServiceCard = ({ data }) => {
  const history = useHistory();

  const CardContainer = styled.div`
    cursor: pointer;
  `;
  const CardImage = styled.img`
    width: 100%;
    height: 350px;
    object-fit: cover;
  `;
  const CardBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  `;
  const CardName = styled.p`
    font-family: "Cormorant", serif;
    font-size: 32px;
    transition: 200ms;
    &:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  `;
  const CardPrice = styled.p`
    font-style: italic;
    color: rgba(0, 0, 0, 0.7);
  `;

  const { name, image, rating, price } = data;

  return (
    <CardContainer onClick={() => history.push(`/service/${data._id}`)}>
      <CardImage src={image} />
      <CardBottom>
        <CardName>{name}</CardName>
        <CardPrice>${price}</CardPrice>
      </CardBottom>
      <Rating
        name="read-only"
        value={rating.rate}
        readOnly
        sx={{ fontColor: "rgba(0,0,0,0.8)" }}
      />
    </CardContainer>
  );
};

export default ServiceCard;
