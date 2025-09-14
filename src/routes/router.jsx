import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import Account from "../pages/account/account";
import App from "../App";
import Home from "../pages/home/home";
import PrivacyPolicy from "../pages/policy";
import HelpCenter from "../pages/help";
import AboutUs from "../pages/aboutUs";
import CreateProject from "../pages/Main/createProject";
import Library from "../pages/Main/library";
import LibItem from "../pages/Main/libitem";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      {/* Trang mặc định là Login */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="account" element={<Account />} />
      <Route path="policy" element={<PrivacyPolicy />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="createproject" element={<CreateProject />} />
      <Route path="library" element={<Library />} />
      <Route path="libitem/:folderName" element={<LibItem />} />
    </Route>
  </Routes>
);

export default AppRouter;
