import { createBrowserRouter } from "react-router-dom";

//routes import

import portalRoutes from "./portal";

//layouts import
import { PortalLayout } from "layouts";
import NotFound from "components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PortalLayout />,
    children: portalRoutes,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
