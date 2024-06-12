import React, { useState } from 'react';
import "../css/Profile.css";
import { Card, Row, Col, Button, Modal, Input, Form, Empty, List } from 'antd';
import { MailOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';

const userInitial = {
  name: 'John Wick',
  email: 'customer1@gmail.com',
  phone: '0123456789',
};

const Profile = () => {
  const [user, setUser] = useState(userInitial);
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

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
                  {user.name} {renderEditButton('name')}
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
        <Col xs={24} sm={24} md={12}>
          <div className="request-list">
            {requests.length === 0 ? (
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
                            <p>Date: {request.date}</p>
                            <p>Status: {request.status}</p>
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
