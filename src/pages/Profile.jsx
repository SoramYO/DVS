import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, Input, Modal, Pagination, Row, Select, message } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../components/MySpin";
import "../css/Profile.css";

const UserInfo = ({ user, showModal }) => {
  return (
    <div className="content">
      <Card className="profile-card">
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

const UserRequests = ({
  requests,
  currentPage,
  pageSize,
  handlePageChange,
  filter,
  handleFilterChange,
}) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRequests = requests?.filter(request =>
    filter === 'all' ? true : request.paymentStatus === filter
  );

  const paginatedRequests =
    filteredRequests?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  return (
    <div className="content">
      <Select
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: 16, width: 200 }}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="Paid">Paid</Select.Option>
        <Select.Option value="Pending">Pending</Select.Option>
      </Select>

      {filteredRequests?.length === 0 ? (
        <Empty description="You have no requests" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedRequests.map((request) => (
              <Col key={request.id} xs={24} sm={12} md={8}>
                <Card
                  cover={
                    <img
                      src={request.requestImage}
                      alt="request"
                      className="profile-card-img"
                    />
                  }
                >
                  <Card.Meta
                    title={`Request ID: ${request.id}`}
                    description={
                      <div>
                        <p>
                          <strong>Date</strong>:{" "}
                          {formatDate(request.createdDate)}
                        </p>
                        <p>
                          <strong>Status</strong>: {request.status}
                        </p>
                        <p>
                          <strong>Service</strong>: {request.serviceName}
                        </p>
                        <p>
                          <strong>Process</strong>: {request.paymentStatus}
                        </p>
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
            total={filteredRequests?.length || 0}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "16px" }}
          />
        </>
      )}
    </div>
  );
};

const FinishedRequests = ({
  requests,
  currentPage,
  pageSize,
  handlePageChange,
}) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const paginatedRequests =
    requests?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  return (
    <div className="content">
      {requests?.length === 0 ? (
        <Empty description="You have no finished requests" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {paginatedRequests.map((request) => (
              <Col key={request.id} xs={24} sm={12} md={8}>
                <Card
                  cover={
                    <img
                      src={request.requestImage}
                      alt="request"
                      className="profile-card-img"
                    />
                  }
                >
                  <Card.Meta
                    title={`Request ID: ${request.requestId}`}
                    description={
                      <div>
                        <p>
                          <strong>Date</strong>:{" "}
                          {formatDate(request.createdDate)}
                        </p>
                        <p>
                          <strong>Status</strong>: {request.status}
                        </p>
                        <p>
                          <strong>Service</strong>: {request.serviceName}
                        </p>
                        <p>
                          <strong>Process</strong>: {request.paymentStatus}
                        </p>
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
            style={{ textAlign: "center", marginTop: "16px" }}
          />
        </>
      )}
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState(null);
  const [finishRequest, setFinishRequest] = useState(null);
  const [currentTab, setCurrentTab] = useState("info");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');

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

  useEffect(() => {
    const getFinishRequest = async () => {
      try {
        const res = await axios.get(
          `https://dvs-be-sooty.vercel.app/api/finish-request-by-user`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data)
        setFinishRequest(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFinishRequest();
  }, []);

  useEffect(() => {
    const getAllRequestsByUser = async () => {
      try {
        const res = await axios.get(
          `https://dvs-be-sooty.vercel.app/api/getRequestByUser`,
          { withCredentials: true }
        );
        setRequests(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequestsByUser();
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
        message.error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      message.error('Server error');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1); 
  };

  if (user === null || requests === null || finishRequest === null) return <MySpin />;

  return (
    <div className="profilUserContainer">
      <nav className="sideNavbar">
        <button onClick={() => setCurrentTab("info")}>
          <strong>MY PROFILE</strong>
        </button>
        <button onClick={() => setCurrentTab("requests")}>
          <strong>ALL REQUEST</strong>
        </button>
        <button onClick={() => setCurrentTab("finishRequest")}>
          <strong>FINISH REQUEST</strong>
        </button>
      </nav>

      <div className="contentContainer">
        {currentTab === "info" && (
          <UserInfo user={user} showModal={showModal} />
        )}
        {currentTab === "requests" && (
          <UserRequests
            requests={requests}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
        )}
        {currentTab === "finishRequest" && (
          <FinishedRequests
            requests={finishRequest}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
          />
        )}
      </div>

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
