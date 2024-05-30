import React, { useContext } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import "../css/Navbar.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

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
          <img
            src="https://marketplace.canva.com/EAFqberfhMA/1/0/1600w/canva-black-gold-luxury-modern-diamond-brand-store-logo-VmwEPkcpqzE.jpg"
            alt=""
            style={{ width: "100%" }}
          />
        </div>
        <div className="navbarMenu">
          <h5>Diamonds</h5>
          <h5>Education</h5>
          <h5>Guides</h5>
          <h5>Services</h5>
        </div>
      </div>
      <div className="navbarRight">
        <div className="searchContainer">
          <SearchOutlined className="searchIcon" />
          <input type="text" placeholder="search..." />
        </div>
        {!user ? (
          <Link to={"/login"}>
            <button className="signInButton">Sign in</button>
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
  );
};

export default Navbar;
