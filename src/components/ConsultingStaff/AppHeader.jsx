import React, { useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
const { Header } = Layout;

const AppHeader = () => {
  const { dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/consultingStaff/conStaffProfile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      style={{
        backgroundColor: "#000000",
        color: "#fff",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        position: "fixed",
        zIndex: 1,
        width: "100%",
        padding: "0 17%",
        boxSizing: "border-box",
      }}
    >
      <Dropdown overlay={userMenu}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#fff"}}>
            Welcome, Consulting Staff
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;