import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const { Header } = Layout;

const AppHeader = () => {
  const { dispatch, user } = useContext(AuthContext);
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
        zIndex: 99,
        width: "100%",
        padding: "0 17%",
        boxSizing: "border-box",
        position: 'fixed'
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
          <span style={{ color: "#fff" }}>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;