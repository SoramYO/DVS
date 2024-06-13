import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, Row } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const educationMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/cut">Cut</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/color">Color</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/clarity">Clarity</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/carat">Carat</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/conclusion">Conclusion</Link>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to={`/profile/${user.id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbarContainer">
      <Row justify="space-between" align="middle">
        <Col>
          <div className="navbarLeft">
            <div className="navbarLogo">
              <Link to="/">
                <img
                  src="https://marketplace.canva.com/EAFqberfhMA/1/0/1600w/canva-black-gold-luxury-modern-diamond-brand-store-logo-VmwEPkcpqzE.jpg"
                  alt="Logo"
                  className="navbarLogo"
                />
              </Link>
            </div>
            <Row>
              <div className="navbarMenu">
                <Link to="/">HomePage</Link>
                <Dropdown overlay={educationMenu}>
                  <Link to="/education">Education</Link>
                </Dropdown>
                <Link to="/guides">Guides</Link>
                <Link to="/services">Services</Link>
                <Link to="/pricing">Pricing</Link>
              </div>
            </Row>
          </div>
        </Col>
        <Col>
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
                  <div className="profileContainer">
                    <UserOutlined className="userIcon" />
                    <p>
                      Welcome, {user.firstName} {user.lastName}
                    </p>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
