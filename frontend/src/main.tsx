import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main";
import { LoginPage } from "./pages/login";
import "./index.css";
import { PrivateRoute } from "./layouts/private_route";
import AuthProvider from "./hooks/AuthProvider";
import { SubscriptionFunctionPage } from "./pages/subscription_function";
import { AccountsBasePage } from "./pages/accounts_base";
import { ErrorPage } from "./pages/error";
import { SettingsPage } from "./pages/site_settings";
import { AccountPage } from "./pages/account";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/base" element={<AccountsBasePage />} />
          <Route path="/sub_func" element={<SubscriptionFunctionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/account/:login" element={<AccountPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
