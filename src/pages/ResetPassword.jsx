import React, { useEffect, useState, } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const id = params.get('id');
        if (token && id) {
            setToken(token);
            setUserId(id);
        } else {
            message.error('Invalid or missing token');
            navigate("/login");
        }
    }, [location, navigate]);

    const onFinish = async (values) => {
        try {
            const response = await axios.put('http://localhost:8080/api/reset-password', {
                token,
                userId,
                password: values.password,
            });

            if (response.data.errCode === 0) {
                message.success('Password reset successfully');
                navigate("/login");
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Card title="Reset Password" style={{ width: 400 }}>
                <Form
                    form={form}
                    name="reset_password"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm New Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPassword;
