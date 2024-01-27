import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { dashboardRoutes } from "./dashboard.routes";
import Registration from "../pages/Registration";
import { routeGenerator } from "../utilies/routesGenerator";
import ProtectedRoute from "../components/layout/ProtectedRoute";


export const routes = createBrowserRouter([
    {
        path:"/",
        element: <Login />
    },
    {
        path:"/dashboard",
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: routeGenerator(dashboardRoutes,)
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path:"/register",
        element: <Registration />
    },
])