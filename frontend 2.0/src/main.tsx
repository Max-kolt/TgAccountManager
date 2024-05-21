import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/main";
import { LoginPage } from "./pages/login";
import "./index.css";

const all_users_router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);


const use_func_router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <></>,
  },
]);



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);
