import NotFound from "components/NotFound";
import LandingPage from "pages/index";
import MakeOutfitPage from "../pages/MakeOutfitPage.tsx";
import ClothPages from "../pages/clothes/index.tsx";
const authRoutes = [
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "/clothes",
    element: <ClothPages />,
  },
  {
    path: "/make-outfit",
    element: <MakeOutfitPage />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default authRoutes;
