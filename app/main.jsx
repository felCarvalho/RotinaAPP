import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet } from "react-router";
import "./taillwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Outlet />
  </StrictMode>,
);
