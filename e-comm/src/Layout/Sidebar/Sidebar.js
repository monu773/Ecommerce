import React, {useState} from 'react';
import { Layout, Menu} from 'antd';
import {
    DashboardOutlined,
    ProfileOutlined,
    FormOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const items = [
    getItem(<Link to={"/"}>Dashboard</Link>, 'sub1', <DashboardOutlined />),
    getItem(<Link to={"/showProduct"}>ShowProduct</Link>, 'sub2', <UnorderedListOutlined />),
    getItem(<Link to={"/addProduct"}>Add Product</Link>, 'sub4', <FormOutlined />),
    getItem('Profile', 'sub5', <ProfileOutlined />, [getItem('Basic Profile', '12'), getItem('Advanced Profile', '13')]),
    // getItem('Files', '9', <FileOutlined />),
  ];

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

 function Sidebar() {

  const[collapsed , setCollapsed] = useState(false);

  return (
    <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={'sub1'} mode="inline" items={items}/>
    </Sider>
  )
}

export default Sidebar;
