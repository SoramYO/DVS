import {
  ArrowLeftOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/RequestDetail.css";

const { Title, Text } = Typography;

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const getRequestDetail = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://dvs-be-sooty.vercel.app/api/requests/${id}`,
        { withCredentials: true }
      );
      setRequest(res.data.request);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getRequestDetail();
  }, [id, getRequestDetail]);

  const handleOk = async () => {
    if (
      appointmentDate &&
      new Date(appointmentDate) < new Date(request.createdDate)
    ) {
      console.error("The appointment date cannot be before the request creation date");
      return;
    }
    try {
      await axios.put(
        `https://dvs-be-sooty.vercel.app/api/appointment`,
        { appointmentDate, id },
        { withCredentials: true }
      );
      message.success("Processing status has been updated successfull");
      getRequestDetail();
    } catch (error) {
      navigate("/consultingStaff");
      console.error("Update failure processing status");
    }
  };

  const handleBack = () => {
    navigate("/consultingStaff");
  };

  const handleDateChange = (dates) => {
    setAppointmentDate(dates);
  };

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!request) {
    return <div>No request found</div>;
  }

  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">
      Details of Valuation Request
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{
            width: "100px",
            height: "50px",
            position: "absolute",
            top: 15,
            right: 16,
          }}
        />
      </Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Order Information"
            bordered={false}
            className="info-card"
          >
            <div className="info-item">
              <Text strong>Create Date:</Text>{" "}
              {new Date(request.createdDate).toLocaleDateString("en-GB")}
              <InfoCircleOutlined className="info-icon" />
            </div>
            <div className="info-item">
              <Text strong>Appointment Date :</Text>{" "}
              {request.appointmentDate
                ? new Date(request.appointmentDate)?.toLocaleDateString("en-GB")
                : "Chưa có"}
            </div>
            <div className="info-item">
              <Text strong>Note:</Text> {request.note}
            </div>
            <div className="info-item">
              <Text strong>Service Name:</Text> {request.serviceName}
            </div>
            <div className="info-item">
              <Text strong>Process Status:</Text> {request.processStatus}
            </div>
          </Card>

          <Card
            title="Owner Diamond Information"
            bordered={false}
            className="info-card"
          >
            <div className="icon-customer">
              <UserOutlined className="icon" />
            </div>
            <p>
              <Text strong>Full Name:</Text>{" "}
              {`${request.firstName} ${request.lastName}`}
            </p>
            <p>
              <Text strong>Email:</Text> {request.email}
            </p>
            <p>
              <Text strong>Phone Number:</Text> {request.phone}
            </p>
          </Card>
          <Col span={24}>
            <Card title="Select Appointment Date" bordered={false} className="info-card">
              <DatePicker
                picker="date"
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                placeholder="Select Appointment Date"
                style={{ marginBottom: 16 }}
              />

              <Button icon={<CheckOutlined />} onClick={handleOk}>
              Complete appointment booking
              </Button>

            </Card>
          </Col>
        </Col>

        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card
                title="Diamond image"
                bordered={false}
                className="info-card"
              >
                <Image
                  src={request.requestImage}
                  alt="Diamond"
                  className="diamond-image"
                  placeholder={
                    <Image
                      preview={false}
                      src={request.requestImage}
                      alt="Diamond"
                      className="diamond-image"
                    />
                  }
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RequestDetail;
