import React from "react";
import { Navigate } from "react-router-dom";

import { checkAuthToken, removeAuthToken } from "../helpers";
import LocalstorageService from "../helpers/localstorage-service";
import { AuthToken } from "../constants";

const RouteAuthGuard = ({ isAuthProtected, children }) => {
  const token = checkAuthToken();

  if (!isAuthProtected && token) {
    return <Navigate to="/tenant" replace />;
  } else if (isAuthProtected && !token) {
    removeAuthToken();
    LocalstorageService.removeItem(AuthToken);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteAuthGuard;
