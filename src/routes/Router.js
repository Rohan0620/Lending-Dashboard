import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
// import Home from '../pages/Home/Home'
import Home from "../pages/Home/Home";
import Auth from "../pages/auth/Auth";
import Register from "../pages/auth/Register";
import LenderInfo from "../pages/LenderInfo/Info";
import LenderLocation from "../pages/LenderLocation/LenderLocation";
import AddAccount from "../pages/addAccount/AddAccount";
import ApprovedCust from "../pages/Approvedcustomer/ApprovedCust";
import Dashboard from "../pages/Dashboard/Dashboard";

import Loans from "../pages/Loans/Loans";

import PendingCustomer from "../pages/PendingCustomer/Pending";
import Repayment from "../pages/Repayments/Repayments";
import Setting from "../pages/Settings/Setting";
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/addlenderinfo" element={<LenderInfo />} />
          <Route exact path="/addlenderloc" element={<LenderLocation />} />
          <Route exact path="/addaccount" element={<AddAccount />} />
          <Route exact path="/approvedcustomer" element={<PrivateRoute />}>
            <Route exact path="/approvedcustomer" element={<ApprovedCust />} />
          </Route>
          <Route exact path="/all_loans" element={<PrivateRoute />}>
            <Route exact path="/all_loans" element={<Loans />} />
          </Route>
          <Route exact path="/pendingcustomer" element={<PrivateRoute />}>
            <Route
              exact
              path="/pendingcustomer"
              element={<PendingCustomer />}
            />
          </Route>
          <Route exact path="/repay" element={<PrivateRoute />}>
            <Route exact path="/repay" element={<Repayment />} />
          </Route>
          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/settings" element={<PrivateRoute />}>
            <Route exact path="/settings" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
