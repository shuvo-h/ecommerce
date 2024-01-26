import { Layout, Menu, } from 'antd';
import { TSidebarItem } from '../../types';
import { sidebarItemsGenerator } from '../../utilies/sidebarItemsGenerator';
import { dashboardRoutes } from '../../routes/dashboard.routes';
const {  Sider } = Layout;



const Sidebar = () => {
  const dashboardLayoutPath = 'dashboard'
  const sidebarItems: TSidebarItem[]= sidebarItemsGenerator(dashboardRoutes,dashboardLayoutPath);
  
  
    return (
      <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="grid justify-items-center  text-amber-500 text-2xl font-bold h-8 mt-4">
        <h1 >EGM</h1>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
    </Sider>
    );
};

export default Sidebar;