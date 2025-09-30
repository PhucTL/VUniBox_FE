import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import Register from "../pages/Login/register";
import Account from "../pages/account/account";
import Settings from "../pages/settings";
import App from "../App";
import Home from "../pages/home/home";
import PrivacyPolicy from "../pages/policy";
import HelpCenter from "../pages/help";
import AboutUs from "../pages/aboutUs";
import CreateProject from "../pages/Main/createProject";
import Library from "../pages/Main/library";
import LibItem from "../pages/Main/libItem";
import TrashDoc from "../pages/Main/trashDoc";
import SavedDoc from "../pages/Main/savedDoc";
import AllDoc from "../pages/Main/allDoc";
import Plans from "../pages/plans/plans";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentCancel from "../pages/payment/PaymentCancel";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      {/* Trang mặc định là Login */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account" element={<Account />} />
      <Route path="plans" element={<Plans />} />
      <Route path="payment/success" element={<PaymentSuccess />} />
      <Route path="payment/cancel" element={<PaymentCancel />} />
      <Route path="settings" element={<Settings />} />
      <Route path="policy" element={<PrivacyPolicy />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="createproject" element={<CreateProject />} />
      <Route path="library" element={<Library />} />
      <Route path="libitem/:folderName" element={<LibItem />} />
      <Route path="trashdoc" element={<TrashDoc/>} />
      <Route path="saveddoc" element={<SavedDoc/>} />
      <Route path="alldoc" element={<AllDoc/>} />
    </Route>
  </Routes>
);

export default AppRouter;
