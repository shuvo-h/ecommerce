import {
  FileExclamationOutlined,
  FundProjectionScreenOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
import About from "../pages/About";
import Gadgets from "../pages/dashboard/Products/Gadgets";
import SalesHistoryPage from "../pages/dashboard/SalesHistoryPage";

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
    ],
  },

  {
    name: "About EGM",
    icon: createElement(FileExclamationOutlined),
    path: "about",
    element: <About />,
  },
];
