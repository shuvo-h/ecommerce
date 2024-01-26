import { createElement } from "react";
import { FundProjectionScreenOutlined, GroupOutlined, FileExclamationOutlined  } from "@ant-design/icons";
import Gadgets from "../pages/dashboard/Gadgets";
import SalesHistoryPage from "../pages/dashboard/SalesHistoryPage";
import About from "../pages/About";

export const dashboardRoutes = [
    {
        name:"Electric Gadgets ",
        icon: createElement(FundProjectionScreenOutlined ),
        children: [
            {
                name:"Gadgets",
                icon: createElement(GroupOutlined),
                path:"gadgets",
                element: <Gadgets />,
            },
            {
                name:"Sales History",
                icon: createElement(GroupOutlined),
                path:"sales-history",
                element: <SalesHistoryPage />,
            }
        ],
        
    },
    
    {
        name:"About EGM",
        icon: createElement(FileExclamationOutlined ),
        path:"about",
        element: <About />,
        
    },
    
]
