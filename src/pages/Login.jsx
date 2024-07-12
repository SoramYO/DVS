import { Button, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MySpin from "../components/MySpin";
import { AuthContext } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { dispatch, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/login",
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
        console.error("You are not allowed to login!");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.error(err.response.data.message);
    }
  };

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-item">
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              block
            >
              Log in
            </Button>
          </div>
        </form>
        <div className="additional-links">
          <div className="register-link">
            Don't have an account? <Link to={"/register"}>Sign up</Link>
          </div>
          <div className="forgot-password-link">
            <Link to={"/forgot-password"}>Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
