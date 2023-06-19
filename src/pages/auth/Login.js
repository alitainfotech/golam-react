import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { AuthToken } from "../../constants";
import LocalstorageService from "../../helpers/localstorage-service";
import AuthService from "../../services/admin";

const INIT_VALUES = {
  auth: {
    username: "apiadmin4",
    password: "m6Xg!}YGv>4D:fLS",
  },
};

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    const payload = {
      ...values,
    };

    setIsLoading(true);
    await AuthService.login(payload)
      .then(async (response) => {
        const { jwt } = response.data;

        if (!jwt) {
          toast.error("Token not found!");
          return;
        }

        LocalstorageService.setItem(AuthToken, jwt);
        navigate("/tenant");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Container fluid className="">
        <Row className="g-0">
          <Col />
          
          <Col xs={4}>
            <Formik
              className="form-horizontal"
              initialValues={INIT_VALUES}
              onSubmit={handleSubmit}
            >
              {(props) => {
                const { isSubmitting, setFieldValue } = props;

                return (
                  <Form>
                    {/* Username */}
                    <div className="mb-4">
                      <Field
                        id="username"
                        name="auth.username"
                        className="form-control"
                        placeholder="Username"
                      />

                      <ErrorMessage
                        name="username"
                        className="text-danger"
                        component="div"
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <Field
                        id="password"
                        name="auth.password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />

                      <ErrorMessage
                        name="password"
                        className="text-danger"
                        component="div"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 text-center">
                      <Button
                        color="primary"
                        className="w-md waves-effect waves-light"
                        type="submit"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting || isLoading ? "Please Wait..." : "Login"}
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Col>

          <Col />
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
