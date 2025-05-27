import { createBrowserRouter } from "react-router-dom";
import PATH from "../constants/routePaths";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const customerRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [{ path: PATH.HOME, element: <Home /> }],
};

const router = createBrowserRouter([customerRoutes]);

export default router;
