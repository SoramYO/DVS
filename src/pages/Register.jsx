import React from "react";
import { Button, Form, Input, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Register.css';
import { CheckOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post("https://dvs-be-sooty.vercel.app/api/register", values, {
        withCredentials: true,
      })
      .then((res) => {
        message.success("Created successfully");
        navigate("/accounts");
      })
      .catch((error) => {
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
    fontSize: "20px",
  };

  return (
    <Row className="register-container">
      <Col span={12} className="info-section">
        <div className="benefit-content">
          <h2>Diamond Valuation</h2>
          <ul>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Quick and free sign-up<br />Enter your email address to create an account.</p>
            </div>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Get started quickly<br />Once signed up immediately start favoriting diamonds and setting price alerts.</p>
            </div>
            <div style={styleText}>
              <CheckOutlined style={styleIcon} />
              <p>Trusted by buyers<br />Thousands have trusted us to get the best diamond.</p>
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
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
