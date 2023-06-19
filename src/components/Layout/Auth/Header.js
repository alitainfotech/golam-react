import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
} from "reactstrap";

import { removeAuthToken } from "../../../helpers";

function Header() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = () => {
    removeAuthToken();
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Navbar>
        <NavbarBrand href="/tenant">
          {process.env.REACT_APP_APPLICATION_TITLE}
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/tenant">Tenant</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/account">Account</NavLink>
            </NavItem>
          </Nav>

          <NavbarText>
            <Button color="link" className="px-0" onClick={() => logoutUser()}>
              Logout
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>

      {/* <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="dashboard" className="logo logo-dark">
                FE-DEV
              </Link>
            </div>
          </div>

          <div className="d-flex">
            <Button onClick={() => logoutUser()}>Logout</Button>
          </div>
        </div>
      </header> */}
    </React.Fragment>
  );
}

export default Header;
