import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

import Header from "./Header";

const AuthLayout = () => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />

        <div className="main-content">
          <div className="page-content">
            <Container fluid className="">
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthLayout;
