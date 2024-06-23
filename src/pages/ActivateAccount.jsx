import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

const ActivateAccount = () => {
    const location = useLocation();
    const { username } = location.state || {};
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const { code } = values;
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/active-account', { code, username });
            if (response.data.errCode === 0) {
                message.success('Account activated successfully.');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Card title="Activate Account" style={{ width: 400 }}>
                <Form
                    form={form}
                    name="activate_account"
                    onFinish={onFinish}
                >
                    <p>Enter the code from your email to activate your account.</p>
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: 'Please input your activation code!' }]}
                    >
                        <Input placeholder="Activation Code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ActivateAccount;
