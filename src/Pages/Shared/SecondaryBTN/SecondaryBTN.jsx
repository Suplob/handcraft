import React from "react";
import styled from "styled-components";

const SecondaryBTN = ({ children }) => {
  const Button = styled.button`
    width: 100%;
    background-color: white;
    font-weight: 600;
    font-family: "Cormorant", serif;
    color: black;
    padding: 12px 17px;
    border: 1px solid transparent;
    font-size: 20px;
    transition: 150ms;
    cursor: pointer;
    &:hover {
      background-color: transparent;
      border: 1px solid white;
      color: white;
    }
  `;

  return <Button>{children}</Button>;
};

export default SecondaryBTN;
