import { Button, Form, Input, message } from "antd";
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
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/login",
        values,
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

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Form
          form={form}
          name='login'
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "Username can only contain letters and numbers!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
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
