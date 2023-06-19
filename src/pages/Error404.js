import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

import { checkAuthToken } from "../helpers";

function Error404() {
  const navigate = useNavigate();
  const token = checkAuthToken();

  return (
    <React.Fragment>
      <div className="my-5 pt-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center my-5">
                <h1 className="fw-bold text-error">404</h1>
                <h3 className="text-uppercase">
                  The requested page not found!
                </h3>
                <div className="mt-5 text-center">
                  <Button
                    onClick={() => {
                      navigate(token ? -1 : "/login");
                    }}
                  >
                    {`${token ? "Go Back" : "Back to Login"}`}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Error404;
