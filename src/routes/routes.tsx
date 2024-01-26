import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { dashboardRoutes } from "./dashboard.routes";
import Registration from "../pages/Registration";
import { routeGenerator } from "../utilies/routesGenerator";


export const routes = createBrowserRouter([
    {
        path:"/dashboard",
        element: <App />,
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