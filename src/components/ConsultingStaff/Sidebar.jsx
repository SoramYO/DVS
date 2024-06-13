import { DesktopOutlined, SolutionOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logo.webp";
const { Sider } = Layout;


const Sidebar = () => {
  return (
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        background: "#000000",
      }}
    >
      <div
      >
        <img
          src={Logo}
          alt="logo"
          style={{ width: "100%", height: "180px" }}
        />
      </div>
      <Menu theme='dark' defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          <Link to="/consultingStaff">Orders</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SolutionOutlined />}>
          <Link>Notifications</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SolutionOutlined />}>
          <Link>Messages</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar