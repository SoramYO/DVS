import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import MySpin from "../components/MySpin";
import '../css/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("https://dvs-be-sooty.vercel.app/api/register", values, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        message.success("Created successfully");
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message);
      });
  };

  const styleText = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const styleIcon = {
    paddingRight: "4px",
    fontSize: "25px",
    marginBottom: "20px",
  };

  if (loading) {
    return <MySpin />
  }

  return (
    <Row className="register-container">
      <Col span={12} className="info-section">
        <div className="benefit-content">
          <h2>Diamond Valuation</h2>
          <ul>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Accurate and instant valuations<br />Enter your diamond details to get a precise valuation in minutes.</p>
            </div>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Expert insights<br />Gain access to professional evaluations and detailed diamond reports.</p>
            </div>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Trusted by industry professionals<br />Thousands of jewelers and collectors rely on us for accurate diamond assessments.</p>
            </div>
          </ul>
        </div>
      </Col>
      <Col span={12} className="form-section">
        <div className="form-container">
          <h2>Register</h2>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            {/* <Form.Item>
              <ReCAPTCHA
                sitekey="6LeQv_kpAAAAAPv37gbLx6LwXOD-W2oGBqhtA1CY"
                onChange={onCaptchaChange}
              />
            </Form.Item> */}
            <Form.Item>
              <Button className="button-create" type="primary" htmlType="submit" block>
                Create an account
              </Button>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>Already has an account?</div>
                <Link style={{ paddingLeft: "10px" }} to={"/login"}>Login</Link>
              </div>
              <div className="forgotPasswordLink">
                <Link to={"/forgot-password"}>Forgot password?</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
