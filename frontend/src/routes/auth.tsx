import { Navigate } from "react-router-dom";

import Login from "pages/auth/login";
import Register from "pages/auth/register";

const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
    {
      path: "register",
      element: <Register />,
    },

  {
    path: "*",
    element: <Navigate replace to="/auth/login" />,
  },
];

export default authRoutes;
