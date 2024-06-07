import React, { useContext } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <div className="navbarLogo">
          <Link to="/">
            <img
              src="https://marketplace.canva.com/EAFqberfhMA/1/0/1600w/canva-black-gold-luxury-modern-diamond-brand-store-logo-VmwEPkcpqzE.jpg"
              alt="Logo"
              style={{ width: "100%" }}
            />
          </Link>
        </div>
        <div className="navbarMenu">
          <Link to="/">Home Page</Link>
          <Link to="/education">Education</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/services">Services</Link>
        </div>
      </div>
      <div className="navbarRight">
        <div className="searchContainer">
          <Input
            prefix={<SearchOutlined className="searchIcon" />}
            placeholder="Search..."
            className="searchInput"
          />
        </div>
        <div className="signInButton">
          {!user ? (
            <Link to="/login">
              <Button type="primary">Sign in</Button>
            </Link>
          ) : (
            <Dropdown overlay={userMenu}>
              <div className="profileContainer" style={{ alignItems: 'center' }}>
                <UserOutlined className="userIcon" />
                <p>
                  Welcome, {user.firstName} {user.lastName}
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
