import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "./navbar/AdminNavbar";
import PagenotFound from "./404-pageNotFoundADMIN/PagenotFound";
import AdminHome from "./adminHome/AdminHome";
import ManageBooks from "./manageBooks/ManageBooks";
import ViewUsers from "./viewUsers/ViewUsers";
import IssuedBooks from "./issuedBooks/IssuedBooks";
import BooksRequests from "./booksRequests/BooksRequests";
import ReturnedBooks from "./returnedBooks/ReturnedBooks";
import EditBookForm from "./manageBooks/EditBookForm";
import AddNewBook from "./addNewBook/AddNewBook";
import AdminLogout from "./adminLogout/AdminLogout";
import UserIndividualPage from "./viewUsers/UserIndividualPage";
import IssueBookToUser from "./issuedBooks/IssueBookToUser";
import Sidebar from "./sidebar/Sidebar";
import AdminSignup from "./createAdminAccount/AdminSignup";
// import AdminOtpForm from "./adminOTP/adminOtpForm";
import AdminOtpForm from "./adminOTP/AdminOtpForm";
import { PrivateRouteAdmin } from "./privateRoutesAdmin/privateRoutesAdmin";
import AdminChartEvaluate from "./adminChart/adminChartEvaluate";


const AdminAPP = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRouteAdmin>
                <AdminHome />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/logout"
            element={
              <PrivateRouteAdmin>
                <AdminLogout />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/managebooks"
            element={
              <PrivateRouteAdmin>
                <ManageBooks />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/viewusers"
            element={
              <PrivateRouteAdmin>
                <ViewUsers />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/viewusers/:id"
            element={
              <PrivateRouteAdmin>
                <UserIndividualPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/issuedbooks"
            element={
              <PrivateRouteAdmin>
                <IssuedBooks />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/issuebooktouser"
            element={
              <PrivateRouteAdmin>
                <IssueBookToUser />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/booksrequests"
            element={
              <PrivateRouteAdmin>
                <BooksRequests />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/chart"
            element={
              <PrivateRouteAdmin>
                <AdminChartEvaluate />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/returnedbooks"
            element={
              <PrivateRouteAdmin>
                <ReturnedBooks />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/addnewbook"
            element={
              <PrivateRouteAdmin>
                <AddNewBook />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/managebooks/:id"
            element={
              <PrivateRouteAdmin>
                <EditBookForm />
              </PrivateRouteAdmin>
            }
          />
          <Route path="*" element={<PagenotFound />} />
          <Route path="/admin/adminsignup" element={
            <PrivateRouteAdmin>
              <AdminSignup />
            </PrivateRouteAdmin>
        } />
          <Route path="/admin/otp" element={<AdminOtpForm />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default AdminAPP;
