import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Input, Modal, Pagination, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MySpin from "../components/MySpin";
import "../css/Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Số yêu cầu mỗi trang

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
        console.log(res.data.data); // Kiểm tra dữ liệu trả về từ API
        res.data.data.forEach(request => {
          console.log(request.image); // Kiểm tra từng URL ảnh
        });
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

  if (!requests.length && !user.firstName) return <MySpin />;

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedRequests = requests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="profile-container">
      <h1 className="profile-header"><strong>MY PROFILE</strong></h1>
      
      <Row justify="center">
        <Col xs={24} sm={24} md={12}>
          <Card className="profile-card">
            <Card.Meta
              title={
                <div className="ant-card-meta-title">
                  {user.firstName} {user.lastName} {renderEditButton('name')}
                </div>
              }
              description={
                <div className="ant-card-meta-description">
                  <p><MailOutlined /> {user.email} {renderEditButton('email')}</p>
                  <p><PhoneOutlined /> {user.phone} {renderEditButton('phone')}</p>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <h1 className="profile-header"><strong>MY REQUEST</strong></h1>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} md={18}>
          <div className="request-list">
            {requests.length === 0 ? (
              <Empty description="You have no requests" />
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {paginatedRequests.map(request => (
                    <Col key={request.id} xs={24} sm={12} md={6}>
                      <Card
                        cover={
                          <img src={request.requestImage} alt="diamond" className="profile-card-img" />
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
                  total={requests.length}
                  onChange={handlePageChange}
                  style={{ textAlign: 'center', marginTop: '16px' }}
                />
              </>
            )}
          </div>
        </Col>
      </Row>

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
