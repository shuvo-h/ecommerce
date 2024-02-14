import {  ReactNode } from "react";
import { TUserPaths } from "../types";
import { NavLink } from "react-router-dom";

type TSidebarItem = {
    key: string;
    icon: ReactNode;
    label: ReactNode;
    children?: TSidebarItem[];
  };

  
export const sidebarItemsGenerator = (navBarItems:TUserPaths[],layout:string) =>{
    const sidebarItems = navBarItems.reduce((result:TSidebarItem[], item) => {
        if (item.path && item.name) {
          result.push({ 
              key: item.name, 
              icon: item.icon,
              label: <NavLink to={`/${layout}/${item.path}`}>{item.name}</NavLink>
          });
        }
        if (item.children) {
          result.push({ 
              key: item.name || '', 
              icon: item.icon,
              label: item.name, 
              children: item.children.filter(child => child.name && child.path).map(child=>{
                  return {
                      key: child.name || '',
                      icon: item.icon,
                      label: <NavLink to={`/${layout}/${child.path}`}>{child.name}</NavLink>
                  }
              }) 
          });
        }
      
        return result;
      }, [] );
      
      return sidebarItems;
}