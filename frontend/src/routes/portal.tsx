import NotFound from "components/NotFound";
import LandingPage from "pages/index";

const authRoutes = [
  {
    path: "",
    element: <LandingPage />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default authRoutes;
