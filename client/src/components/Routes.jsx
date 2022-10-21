import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
// TERMINALS INFO
import TerminalUpdate from "../pages/sqr_section/sqr_terminal/TerminalUpdate";
import AddTerminal from "../pages/sqr_section/sqr_terminal/AddTerminal";
// PROVIDER INFO
import ProviderUpdate from "../pages/sqr_section/sqr_provider/ProviderUpdate";
import AddProvider from "../pages/sqr_section/sqr_provider/AddProvider";
// RETAILER INFO
import RetailerUpdate from "../pages/km_section/km_retailer/RetailerUpdate";
import AddRetailer from "../pages/km_section/km_retailer/AddRetailer";
// OTHER TERMINALS
import TerminalsUpdate from "../pages/km_section/km_terminal/TerminalsUpdate";
import AddKmTerminal from "../pages/km_section/km_terminal/AddKmTerminal";
// USERS INFO
import UserUpdate from "../pages/tijorat_section/tijorat_user/UserUpdate";
import AddUser from "../pages/tijorat_section/tijorat_user/AddUser";
// SALE INFO
import SaleUpdate from "../pages/tijorat_section/tijorat_sale/SaleUpdate";
import AddSales from "../pages/tijorat_section/tijorat_sale/AddSales";
// ORGANIZATION INFO
import UpdateOrganization from "../pages/tijorat_section/tijorat_organization/UpdateOrganization";
import AddOrganization from "../pages/tijorat_section/tijorat_organization/AddOrganization";
// KM TERMINALS PERMISSION
import KmTerminalPermission from "../pages/km_section/km_terminal_permission/KmTerminalPermission";
import KmTerminalPermissionUpdate from "../pages/km_section/km_terminal_permission/KmTerminalPermissionUpdate";
// CKMS POS REQUESTS
import AddPosRequests from "../pages/ckms_section/ckms_pos_requests/AddPosRequests";
// NOT FOUND PAGE
import NotFound from "../components/404";
import {
  Terminals,
  Providers,
  Retailers,
  Users,
  Sales,
  Terminal,
  Organization,
  KmTerminal,
  PosRequests,
} from "./Constants";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import AddTransferKeys from "../pages/ckms_section/ckms_transfer_keys/AddTransferKeys";

export const AllRoutes = ({ setSearch, Searching }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {!userInfo ? (
        <>
          {" "}
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      ) : (
        <Route path="*" element={<NotFound />} />
      )}

      {userInfo && (
        <>
          <Route
            path="/"
            element={<Terminals setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/provider"
            element={<Providers setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/retailer"
            element={<Retailers setSeayrch={setSearch} searching={Searching} />}
          />
          <Route
            path="/user"
            element={<Users setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/sale"
            element={<Sales setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/terminal"
            element={<Terminal setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/organization"
            element={
              <Organization setSearch={setSearch} searching={Searching} />
            }
          />
          <Route
            path="/permission"
            element={<KmTerminal setSearch={setSearch} searching={Searching} />}
          />
          <Route
            path="/posrequests"
            element={
              <PosRequests setSearch={setSearch} searching={Searching} />
            }
          />
        </>
      )}

      {userInfo?.IsAdmin && (
        <>
          <>
            <Route path="/update/:id" element={<TerminalUpdate />} />
            <Route path="/retailer/update/:id" element={<RetailerUpdate />} />
            <Route path="/user/update/:id" element={<UserUpdate />} />
            <Route path="/sale/update/:id" element={<SaleUpdate />} />
            <Route path="/terminal/update/:id" element={<TerminalsUpdate />} />
            <Route
              path="/organization/update/:id"
              element={<UpdateOrganization />}
            />
            <Route path="/provider/update/:id" element={<ProviderUpdate />} />
            <Route
              path="/permission/update/:id"
              element={<KmTerminalPermissionUpdate />}
            />
          </>
          <>
            <Route path="/add" element={<AddTerminal />} />
            <Route path="/retailer/add" element={<AddRetailer />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/sale/add" element={<AddSales />} />
            <Route path="/terminal/add" element={<AddKmTerminal />} />
            <Route path="/organization/add" element={<AddOrganization />} />
            <Route path="/provider/add" element={<AddProvider />} />
            <Route path="/permission/add" element={<KmTerminalPermission />} />
            <Route path="/posrequests/add" element={<AddPosRequests />} />{" "}
            <Route path="/transfer/key/:id" element={<AddTransferKeys />} />{" "}
          </>
        </>
      )}
    </Routes>
  );
};
