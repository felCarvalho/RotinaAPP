import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import "./taillwind.css";
import { authenticateInterceptor } from "./services/auth/refreshToken/refreshToken";

authenticateInterceptor();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NuqsAdapter>
      <RouterProvider router={routes} />
    </NuqsAdapter>
  </StrictMode>,
);
