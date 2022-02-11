import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
