import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { message } from "antd";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/api/register", credentials)
        .then((res) => {
          message.success(res.data.message);
          navigate("/login");
        });
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div className="registerContainer">
      <div className="registerImageContent">
        <img
          src="https://static.scientificamerican.com/sciam/cache/file/D78728AD-1FD6-431E-9F2933C6D544D339_source.jpg?w=1200"
          alt=""
          className="registerImage"
        />
      </div>
      <div className="registerForm">
        <h2>Register</h2>
        <div className="registerInput">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            value={credentials.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            value={credentials.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="phone"
            placeholder="Phone"
            id="phone"
            value={credentials.phone}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Create an account</button>
        </div>
        <div className="loginLink">
          Already has an account
          <Link to={"/login"}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
