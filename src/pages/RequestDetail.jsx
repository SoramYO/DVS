import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Image,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MySpin from "../components/MySpin";
import "../css/RequestDetail.css";

const { Title, Text } = Typography;

const RequestDetail = () => {
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const getRequest = async () => {
    setLoading(true);
    await axios
      .get(`https://dvs-be-sooty.vercel.app/api/requests/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRequest(res.data.request);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);
  // console.log(request);
  if (loading) {
    return <MySpin />;
  }
  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">
        Valuation Request Detail
      </Title>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Diamond Information"
            bordered={false}
            className="info-card"
          >
            <div className="info-item">
              <Text strong>Created Date:</Text>{" "}
              {new Date(request?.createdDate).toLocaleDateString("en-GB")}
              <InfoCircleOutlined className="info-icon" />
            </div>
            <div className="info-item">
              <Text strong>Appointed Date:</Text>{" "}
              {request.appointmentDate
                ? new Date(request?.appointmentDate)?.toLocaleDateString("en-GB")
                : "Chưa có"}
            </div>
            <div className="info-item">
              <Text strong>Note:</Text> {request.note}
            </div>
            <div className="info-item">
              <Text strong>Service Type:</Text> {request.serviceName}
            </div>
            <div className="info-item">
              <Text strong>Process Status:</Text> {request.processStatus}
            </div>
          </Card>

          <Card
            title="User Information"
            bordered={false}
            className="info-card"
          >
            <p>
              <Text strong>Fullname:</Text>{" "}
              {`${request.firstName} ${request.lastName}`}
            </p>
            <p>
              <Text strong>Email:</Text> {request.email}
            </p>
            <p>
              <Text strong>Phone:</Text> {request.phone}
            </p>
          </Card>
        </Col>

        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card
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
