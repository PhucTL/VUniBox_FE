import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import Account from "../pages/account/account";
import App from "../App";
import Home from "../pages/home/home";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      {/* Trang mặc định là Login */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="account" element={<Account />} />
    </Route>
  </Routes>
);

export default AppRouter;
