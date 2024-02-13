import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Home from "./home/Home";
import FeaturedBooks from "./featuredBooks/FeaturedBooks";
import Books from "./books/Books";
import AboutUsPage from "./about/AboutUsPage";
import PagenotFound from "./404-pageNotFound/PagenotFound";
import { LoginState } from "../LoginState";
import ClientProfile from "./clientProfile/ClientProfile";
import ViewBook from "./viewBooks/ViewBook";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import OtpForm from "./otpForm/OtpForm";
import { PrivateRoute } from "./PrivateRoutes/PrivateRoute";
import Documents from "./Documents/Documents";
import ClientLogout from "./clientLogout/ClientLogout";
import Notifications from "./Notifications/Notifications";

// import Order from './Order/Order'
// import ClientDashboard from './clientProfile/ClientDashboard'

const ClientApp = () => {
  return (
    <LoginState>
      <React.Fragment>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/menu"
              element={
                <PrivateRoute>
                  <FeaturedBooks />
                </PrivateRoute>
              }
            />

            <Route
              path="/books"
              element={
                <PrivateRoute>
                  <Books />
                </PrivateRoute>
              }
            />

            <Route
              path="/books/:id"
              element={
                <PrivateRoute>
                  <ViewBook />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ClientProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutUsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/document"
              element={
                <PrivateRoute>
                  <Documents />
                </PrivateRoute>
              }
            />
            <Route
              path="/logoutclient"
              element={
                <PrivateRoute>
                  <ClientLogout />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route path="/otp" element={<OtpForm />} />
            {/* <Route path='/orders' element={<ClientDashboard />} /> */}

            <Route path="*" element={<PagenotFound></PagenotFound>} />
          </Routes>
        </Router>
      </React.Fragment>
    </LoginState>
  );
};

export default ClientApp;
