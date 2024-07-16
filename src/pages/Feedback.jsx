import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, message, Spin } from 'antd';
import '../css/FeedbackForm.css';

const FeedbackForm = ({ visible, onClose, requestId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get('https://dvs-be-sooty.vercel.app/api/profile', {
                    withCredentials: true,
                });
                setUserData(res.data.userProfile);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        getUserData();
    }, []);

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                setLoading(true);

                const feedbackData = {
                    customerName: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    feedbackText: values.message,
                    requestId: requestId,
                };

                axios.post("https://dvs-be-sooty.vercel.app/api/feedback", feedbackData, {
                    withCredentials: true,
                })
                .then(res => {
                    setLoading(false);
                    setSuccess(true);
                    form.resetFields();
                    setTimeout(() => {
                        setSuccess(false);
                        onClose();
                    }, 300);
                    message.success('Feedback submitted successfully'); 
                })
                .catch(error => {
                    setLoading(false);
                    console.error('Failed to submit feedback:', error);
                    message.error('Failed to submit feedback');
                });
            })
            .catch(error => {
                console.error('Validate Failed:', error);
            });
    };

    if (!userData) {
        return <Spin />;
    }

    return (
        <Modal
            className="feedback-modal"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="feedback_form"
                    onFinish={handleOk}
                >
                    <div className="feedback-modal-content">
                        <div className="feedback-modal-header">
                            <h2>Feedback</h2>
                        </div>
                        <div className="feedback-modal-body">
                            <Form.Item
                                label="Name"
                                initialValue={`${userData.firstName} ${userData.lastName}`}
                                name="name"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                initialValue={userData.email}
                                name="email"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="message"
                                rules={[{ required: true, message: 'Please input your message!' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter your message" />
                            </Form.Item>
                        </div>
                        <div className="feedback-modal-footer">
                            <Button onClick={onClose} disabled={loading}>Cancel</Button>
                            <Button type="primary" onClick={handleOk} loading={loading}>Submit</Button>
                        </div>
                    </div>
                </Form>
            </Spin>
        </Modal>
    );
};

export default FeedbackForm;
