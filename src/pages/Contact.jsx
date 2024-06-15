import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import '../css/Contact.css';

const Contact = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Contact Form Values:', values);
                form.resetFields();
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            className="contact-form-modal"
            title="Contact Us"
            visible={visible}
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
        >
            <Form form={form} layout="vertical" name="contact_form">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please input your message!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Contact;
