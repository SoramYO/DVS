import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
} from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      setSuggestions(
        [
          { value: "Cut", link: "/cut" },
          { value: "Color", link: "/color" },
          { value: "Clarity", link: "/clarity" },
          { value: "Carat", link: "/carat" },
          { value: "Conclusion", link: "/conclusion" },
          { value: "Profile", link: "/profile" },
          {
            value: "Check price by Certificate ID",
            link: "/checkPriceByCertificateID",
          },
          { value: "Guides", link: "/guides" },
          { value: "Calculate Diamond", link: "/calculateDiamond" },
          { value: "Home", link: "/" },
          { value: "Pricing", link: "/pricing" },
          { value: "Service", link: "/services" },
          { value: "Valuation Request", link: "/request" },
          { value: "Contact", link: "/footer" },
          { value: "List Request", link: "/profile" },
        ].filter((item) =>
          item.value.toLowerCase().includes(value.toLowerCase())
        )
      );
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
      <Menu.Item key="billing">
        {user ? <Link to={`/billing`}>Billing</Link> : null}
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbarContainer">
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12} md={12} lg={16}>
          <div className="navbarLeft">
            {/* <div className="navbarMenu"> */}
            <Link to="/" className="navbarItem">
              <HomeOutlined style={{ fontSize: "26px" }} />
            </Link>
            <Link to="/request" className="navbarItem">
              <strong>Valuation</strong>
            </Link>
            <Link to="/calculateDiamond" className="navbarItem">
              <strong>Calculate</strong>
            </Link>
            <Dropdown overlay={educationMenu}>
              <Link to="/education" className="navbarItem">
                <strong>Education</strong>
              </Link>
            </Dropdown>
            <Link to="/guides" className="navbarItem">
              <strong>Guides</strong>
            </Link>
            <Link to="/services" className="navbarItem">
              <strong>Services</strong>
            </Link>
            <Link to="/pricing" className="navbarItem">
              <strong>Pricing</strong>
            </Link>
            {/* </div> */}
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} className="navbarRightContainer">
          <div className="navbarRight">
            <div className="searchContainer">
              <AutoComplete
                value={searchValue}
                options={suggestions.map((suggestion) => ({
                  value: suggestion.value,
                  label: <Link to={suggestion.link}>{suggestion.value}</Link>,
                }))}
                onChange={handleSearch}
                className="searchInput"
              >
                <Input prefix={<SearchOutlined className="searchIcon" />} />
              </AutoComplete>
            </div>
            <div className="signInButton">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button style={{ marginRight: "20px" }} type="primary">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button type="primary">Sign up</Button>
                  </Link>
                </>
              ) : (
                <Dropdown overlay={userMenu}>
                  <div className="profileContainer">
                    {/* <UserOutlined className="userIcon" /> */}
                    <Avatar
                      size="large"
                      style={{
                        backgroundColor: "#1890ff",
                        fontSize: "20px",
                      }}
                    >
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </Avatar>
                    <p>
                      {user.firstName} {user.lastName}
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
