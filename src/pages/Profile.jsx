import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Input, List, Modal, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "../css/Profile.css";


const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/users/${id}`, {
          withCredentials: true,
        });
        setUser(res.data.user[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [id]);

  useEffect(() => {
    const getAllRequestsByUser = async () => {
      try {
        const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/getRequestByUser/${id}`, { withCredentials: true });
        console.log(res.data.data);
        setRequests(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequestsByUser();
  }, [id]);

  const showModal = (field) => {
    setCurrentField(field);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setUser({ ...user, [currentField]: values[currentField] });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderEditButton = (field) => (
    <Button
      type="link"
      icon={<EditOutlined />}
      onClick={() => showModal(field)}
    />
  );

  return (
    <div className="profile-container">
      <h1 className="profile-header"><strong>MY PROFILE</strong></h1>
      <Row justify="center" gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Card className="profile-card">
            <Card.Meta
              title={
                <div>
                  {user.firstName} <></>
                  {user.lastName} {renderEditButton('name')}
                </div>
              }
              description={
                <div>
                  <p><MailOutlined /> {user.email} {renderEditButton('email')}</p>
                  <p><PhoneOutlined /> {user.phone} {renderEditButton('phone')}</p>
                </div>
              }
            />
          </Card>
        </Col>


        {/* Cái này của phần hiện thị người dùng có định giá cái nào chưa, 
            tại profile ngắn quá nên viết thêm cho dài,
            theo sql là thuộc bảng request,  */}
        <Col xs={12} sm={12} md={12}>
          <div className="request-list">
            {requests === 0 ? (
              <Empty description="You have no requests" />
            ) : (
              <List
                dataSource={requests}
                renderItem={request => (
                  <List.Item key={request.id} className="request-item">
                    <Card>
                      <Card.Meta
                        title={`Request ID: ${request.id}`}
                        description={
                          <div>
                            <img src={request.image} alt="diamond" />
                            <p>Date: {request.createdDate}</p>
                            <p>Status: {request.status}</p>
                            <p>Service: {request.serviceName}</p>
                            <p>Process: {request.paymentStatus}</p>
                          </div>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </div>
        </Col>
      </Row>


      {/* Cái này của phần người dùng edit thông tin, tại profile ngắn quá nên viết thêm cho dài */}
      <Modal
        title={`Edit ${currentField}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleOk}
          initialValues={{ [currentField]: user[currentField] }}
        >
          <Form.Item
            name={currentField}
            rules={[{ required: true, message: `Please input your ${currentField}!` }]}
          >
            <Input placeholder={`Enter new ${currentField}`} />
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