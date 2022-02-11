import React from "react";
import styled from "styled-components";

const PrimaryBTN = ({ children }) => {
  const Button = styled.button`
    width: 100%;
    background-color: black;
    font-weight: 600;
    font-family: "Cormorant", serif;
    color: white;
    padding: 12px 17px;
    border: 1px solid transparent;
    font-size: 20px;
    transition: 150ms;
    cursor: pointer;
    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black;
    }
  `;

  return <Button>{children}</Button>;
};

export default PrimaryBTN;
