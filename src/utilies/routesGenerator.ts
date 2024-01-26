
import { TRoute, TUserPaths } from "../types";


export const routeGenerator = (routerItems:TUserPaths[]) =>{
     const routes = routerItems.reduce((result:TRoute[], item) => {
        if (item.path && item.element) {
          result.push({ path: item.path, element: item.element });
        }
        if (item.children) {
          item.children.forEach((child) => {
            result.push({ path: child.path!, element: child.element });
          });
        }
      
        return result;
      }, []);
      return routes;
}