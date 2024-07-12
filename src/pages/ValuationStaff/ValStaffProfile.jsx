import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, message } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../../components/MySpin";
import "../../css/StaffProfile.css";

const UserInfo = ({ user, showModal }) => {
  return (
    <div className="content">
      <Card className="profileCard">
        <Card.Meta
          title={
            <div className="ant-card-meta-title">
              {user?.firstName} {user?.lastName}
            </div>
          }
          description={
            <div className="ant-card-meta-description">
              <p>
                <MailOutlined /> {user?.email}
              </p>
              <p>
                <PhoneOutlined /> {user?.phone}
              </p>
            </div>
          }
        />
        <div className="edit-button-container">
          <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://dvs-be-sooty.vercel.app/api/profile`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.userProfile);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      const res = await axios.put(
        `https://dvs-be-sooty.vercel.app/api/profile`,
        values,
        {
          withCredentials: true,
        }
      );
      if (res.data.errCode === 0) {
        message.success('Profile updated successfully');
        setUser({ ...user, ...values });
        setIsModalVisible(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      console.error('Server error');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (user === null) return <MySpin />;

  return (
    <div className="profileStaffContainer">
      <nav className="sideNav">
        <button onClick={() => console.log("MY PROFILE clicked")}>
          <strong>MY PROFILE</strong>
        </button>
      </nav>
      <UserInfo user={user} showModal={showModal} />

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleOk}
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phone: user?.phone,
          }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="Enter new first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Enter new last name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter new email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Enter new phone number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
