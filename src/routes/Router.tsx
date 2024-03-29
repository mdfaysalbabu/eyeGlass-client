import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddGlass from "../pages/addGlass";
import AllGlasses from "../pages/allGlass";
import SalesHistory from "../pages/SalesHistory";
import DashboardHome from "../pages/HomeCharts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "add-product",
        element: <AddGlass />,
      },
      {
        path: "all-products",
        element: <AllGlasses />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;