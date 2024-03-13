import { createBrowserRouter } from "react-router-dom";

//routes import
import portalRoutes from "./portal";
import authRoutes from "./auth";

//layouts import
import { PortalLayout, AuthLayout } from "layouts";
import NotFound from "components/NotFound";
import Logout from "pages/auth/logout";
import MakeOutfitPage from "../pages/makeOutfit/MakeOutfitPage.tsx";

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
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: "logout",
    element: <Logout/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
