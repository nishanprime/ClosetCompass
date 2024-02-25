import { createBrowserRouter } from "react-router-dom";

//routes import

import portalRoutes from "./portal";

//layouts import
import { PortalLayout } from "layouts";
import NotFound from "components/NotFound";
import MakeOutfitPage from "../pages/MakeOutfitPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PortalLayout />,
    children: portalRoutes,
  },
  {
    path: "/makeOutfit",
    element: <MakeOutfitPage/>,
    children: portalRoutes,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
