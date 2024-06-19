import { message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        credentials,
        { withCredentials: true }
      );

      if (res.data.user.role === "Customer") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        message.success("Login successful!");
        navigate("/");
      } else if (res.data.user.role === "Consulting Staff") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        message.success("Login successful!");
        navigate("/consultingStaff");
      } else if (res.data.user.role === "Valuation Staff") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        message.success("Login successful!");
        navigate("/valuationStaff");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
        message.error("You are not allowed to login!");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      message.error(err.response.data.message);
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginImageContent">
        <img
          src="https://cdn.dribbble.com/users/22930/screenshots/2063689/media/0979e0e7470ae3c789cc23202826d5b2.gif"
          alt=""
          className="loginImage"
        />
      </div>
      <div className="loginForm">
        <h2>Login</h2>
        <div className="loginInput">
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
          <button className="loginButton" onClick={handleClick}>Log in</button>
        </div>
        <div className="registerLink">
          Don't have an account?
          <Link to={"/register"}>Sign up</Link>
        </div>
        <div className="forgotPasswordLink">
          <Link to={"/forgot-password"}>Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
