import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Button, Card, Col, Empty, Form, Input, Modal, Pagination, Row } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import "../css/Profile.css";
import MySpin from "../components/MySpin";

const UserInfo = ({ user, showModal }) => {
  const renderEditButton = (field) => (
    <Button
      type="link"
      icon={<EditOutlined />}
      onClick={() => showModal(field)}
    />
  );

  return (
    <div className="content">
      <Card className="profile-card">
        <Card.Meta
          title={
            <div className="ant-card-meta-title">
              {user?.firstName} {user?.lastName} {renderEditButton('name')}
            </div>
          }
          description={
            <div className="ant-card-meta-description">
              <p><MailOutlined /> {user?.email} {renderEditButton('email')}</p>
              <p><PhoneOutlined /> {user?.phone} {renderEditButton('phone')}</p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

const UserRequests = ({ requests, currentPage, pageSize, handlePageChange }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const paginatedRequests = requests?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  return (
    <div className="content">
      {requests?.length === 0 ? (
        <Empty description="You have no requests" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedRequests.map(request => (
              <Col key={request.id} xs={24} sm={12} md={6}>
                <Card
                  cover={
                    <img src={request.requestImage} alt="request" className="profile-card-img" />
                  }
                >
                  <Card.Meta
                    title={`Request ID: ${request.id}`}
                    description={
                      <div>
                        <p><strong>Date</strong>: {formatDate(request.createdDate)}</p>
                        <p><strong>Status</strong>: {request.status}</p>
                        <p><strong>Service</strong>: {request.serviceName}</p>
                        <p><strong>Process</strong>: {request.paymentStatus}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={requests?.length || 0}
            onChange={handlePageChange}
            style={{ textAlign: 'center', marginTop: '16px' }}
          />
        </>
      )}
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState(null);
  const [currentTab, setCurrentTab] = useState('info');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/profile/${id}`, {
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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (user === null || requests === null) return <MySpin />;

  return (
    <div className="profilUserContainer">
      <nav className="sideNav">
        <button onClick={() => setCurrentTab('info')}><strong>MY PROFILE</strong></button>
        <button onClick={() => setCurrentTab('requests')}><strong>MY REQUEST</strong></button>
      </nav>
      
      <div className="contentContainer">
        {currentTab === 'info' && <UserInfo user={user} showModal={showModal} />}
        {currentTab === 'requests' && 
          <UserRequests 
            requests={requests} 
            currentPage={currentPage} 
            pageSize={pageSize} 
            handlePageChange={handlePageChange} 
          />}
      </div>

      <Modal
        title={`Edit ${currentField}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleOk}
          initialValues={{ [currentField]: user?.[currentField] }}
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
