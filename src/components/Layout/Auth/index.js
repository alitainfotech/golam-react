import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

import Header from "./Header";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/tenant");
  }, [location]);

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
