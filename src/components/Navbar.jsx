import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Col, Dropdown, Input, Menu, Row } from "antd"; 
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/logo.webp";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      setSuggestions([
        { value: "Cut", link: "/cut" },
        { value: "Color", link: "/color" },
        { value: "Clarity", link: "/clarity" },
        { value: "Carat", link: "/carat" },
        { value: "Conclusion", link: "/conclusion" },
        { value: "Profile", link: "/profile" },
        { value: "Check price by Certificate ID", link: "/checkPriceByCertificateID" },
        { value: "Guides", link: "/guides" },
        { value: "Calculate Diamond", link: "/calculateDiamond" },
        { value: "Home", link: "/" },
        { value: "Pricing", link: "/pricing" },
        { value: "Service", link: "/services" },
        { value: "Valuation Request", link: "/request" },
        { value: "Contact", link: "/footer" },
        { value: "List Request", link: "/profile" },
        
      ].filter(item => item.value.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

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
        {user ? <Link to={`/profile`}>Profile</Link> : null}
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbarContainer">
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12} md={12} lg={12}>
          <div className="navbarLeft">
            <div className="navbarLogo">
              <Link to="/">
                <img src={Logo} alt="Logo" className="navbarLogo" />
              </Link>
            </div>
            <div className="navbarMenu">
              <Link to="/request">Valuation</Link>
              <Dropdown overlay={educationMenu}>
                <Link to="/education">Education</Link>
              </Dropdown>
              <Link to="/guides">Guides</Link>
              <Link to="/services">Services</Link>
              <Link to="/pricing">Pricing</Link>
            </div>
          </div>
        </Col>
        <Col xs={4} sm={12} md={12} lg={10} className="navbarRightContainer">
          <div className="navbarRight">
            <div className="searchContainer">
              <AutoComplete
                value={searchValue}
                options={suggestions.map(suggestion => ({
                  value: suggestion.value,
                  label: <Link to={suggestion.link}>{suggestion.value}</Link>
                }))}
                onChange={handleSearch}
                className="searchInput"
              >
                <Input
                  prefix={<SearchOutlined className="searchIcon" />}
                />
              </AutoComplete>
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
