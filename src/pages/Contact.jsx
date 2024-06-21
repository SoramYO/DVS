import React from 'react';
import { Modal, Form, Input, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import '../css/Contact.css';  

const Contact = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                const feedback = {
                    customerName: values.name,
                    email: values.email,
                    feedbackText: values.message,
                };

                axios.post("https://dvs-be-sooty.vercel.app/api/feedback", feedback, {
                    withCredentials: true,
                })
                    .then(res => {
                        message.success('Feedback submitted successfully');
                        form.resetFields();
                        onClose();
                    })
                    .catch(error => {
                        message.error('Failed to submit feedback');
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Validate Failed:', error);
            });
    };

    return (
        <Modal
            className="contact-form-modal"
            title="Contact Us"
            open={visible}
            onOk={handleOk}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Submit
                </Button>,
            ]}
            centered
        >
            <Form form={form} layout="vertical" name="contact_form">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please input your message!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter your message" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Contact;
