import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';

const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/forgot-password', { email: values.email });
            if (response.data.errCode === 0) {
                message.success('Password reset link sent to your email.');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Card title="Reset password" style={{ width: 400 }}>
                <Form
                    form={form}
                    name="forgot_password"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Send Reset Link
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPassword;
