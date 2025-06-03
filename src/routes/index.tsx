import { createBrowserRouter } from "react-router-dom";
import PATH from "../constants/routePaths";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Product from "../pages/Product";

const customerRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: PATH.HOME, element: <Home /> },
    { path: PATH.CATEGORY, element: <Category /> },
    { path: PATH.PRODUCT_DETAIL, element: <Product /> },
  ],
};

const router = createBrowserRouter([customerRoutes]);

export default router;
