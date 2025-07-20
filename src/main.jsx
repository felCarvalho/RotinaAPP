import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import routes from "./routes/routes";
import "./taillwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NuqsAdapter>
      <RouterProvider router={routes} />
    </NuqsAdapter>
  </StrictMode>,
);
