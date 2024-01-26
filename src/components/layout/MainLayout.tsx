import React, { createElement } from 'react';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const navList = [
  {
    key: "1",
    icon:UserOutlined,
    label: "abc",
  },
  {
    key: "2",
    icon:VideoCameraOutlined,
    label: "abc2",
    children:[
      {
        key: "1",
        icon:UserOutlined,
        label: "abc",
      },
    ]
  },
]

const items = navList.map(
  (navEl) => {
    
    return {
      key: navEl.key,
      icon: createElement(navEl.icon),
      label: navEl.label,
    }
  },
);


const MainLayout = () => {
    return (
        <Layout style={{minHeight:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="grid justify-items-center  text-amber-500 text-2xl font-bold h-8 mt-4">
          <h1 >EGM</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0,   }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <h1>The main gonted child here</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    );
};

export default MainLayout;