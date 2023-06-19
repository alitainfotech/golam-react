import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { RouteTitles } from "./constants";
import { updateAppTitle } from "./helpers";

// Components
import AuthLayout from "./components/Layout/Auth";
import RouteAuthGuard from "./components/RouteAuthGuard";
import NonAuth from "./components/Layout/NonAuth";

// NonAuth Pages
import Login from "./pages/auth/Login";
import Error404 from "./pages/Error404";

// Auth Pages
import Tenant from "./pages/tenant/list";
import Account from "./pages/account/list";

function App() {
  const location = useLocation();

  // Update document title
  useEffect(() => {
    const matchPath = ["/tenant/", "/account/"];

    let routePath = location.pathname;

    const idx = matchPath.findIndex((v) => routePath.startsWith(v));
    if (idx !== -1) routePath = matchPath[idx] + "*";

    updateAppTitle(RouteTitles[routePath] || "404");
  }, [location]);

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <RouteAuthGuard isAuthProtected={true}>
              <AuthLayout />
            </RouteAuthGuard>
          }
        >
          <Route path="/tenant" element={<Tenant />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route
          path="/login"
          element={
            <RouteAuthGuard isAuthProtected={false}>
              <NonAuth>
                <Login />
              </NonAuth>
            </RouteAuthGuard>
          }
        />

        <Route
          path="*"
          element={
            <NonAuth>
              <Error404 />
            </NonAuth>
          }
        />
      </Routes>

      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        theme="colored"
        pauseOnFocusLoss={false}
      />
    </React.Fragment>
  );
}

export default App;
