import {
  FileExclamationOutlined,
  FundProjectionScreenOutlined,
  GroupOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
import About from "../pages/About";
import Gadgets from "../pages/dashboard/Products/Gadgets";
import SalesHistoryPage from "../pages/dashboard/SaleOrders/SalesHistoryPage";
import Checkout from "../pages/dashboard/Checkout/Checkout";
import Registration from "../pages/Registration";

export const dashboardRoutes = [
  {
    name: "Electric Gadgets ",
    icon: createElement(FundProjectionScreenOutlined),
    children: [
      {
        name: "Gadgets",
        icon: createElement(GroupOutlined),
        path: "gadgets",
        element: <Gadgets />,
      },
      {
        name: "Sales History",
        icon: createElement(GroupOutlined),
        path: "sales-history",
        element: <SalesHistoryPage />,
      },
      {
        // name: "checkout",
        icon: createElement(GroupOutlined),
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },

  {
    name: "Add Account",
    icon: <UserAddOutlined />,
    path: "add-account",
    element: <Registration isRoleVisiable={true} />,
  },
  {
    name: "About EGM",
    icon: createElement(FileExclamationOutlined),
    path: "about",
    element: <About />,
  },
];
