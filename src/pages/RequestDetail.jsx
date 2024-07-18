import { Card, Col, Image, Row, Typography } from "antd";
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
  useEffect(() => {
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

    getRequest();
  }, [id]);

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="request-detail-container">
      <Title level={1} className="page-title">
        Valuation Request Detail
      </Title>

      <Row gutter={16} justify="center">
        <Col span={8}>
          <Card
            title="Diamond Information"
            bordered={false}
            className="info-card diamond-info-card"
          >
            <div className="info-section">
              <div>
                <div className="info-item">
                  <Text strong>Created Date:</Text>{" "}
                  {new Date(request?.createdDate).toLocaleDateString("en-GB")}
                </div>
                <div className="info-item">
                  <Text strong>Appointed Date:</Text>{" "}
                  {request.appointmentDate
                    ? new Date(request?.appointmentDate)?.toLocaleDateString(
                        "en-GB"
                      )
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
              </div>
              {request.processStatus === "Done" && (
                <div>
                  <div className="info-item">
                    <Text strong>Certificate ID:</Text> {request.certificateId}
                  </div>
                  <div className="info-item">
                    <Text strong>Clarity:</Text> {request.clarity}
                  </div>
                  <div className="info-item">
                    <Text strong>Color:</Text> {request.color}
                  </div>
                  <div className="info-item">
                    <Text strong>Cut:</Text> {request.cut}
                  </div>
                  <div className="info-item">
                    <Text strong>Diamond Origin:</Text> {request.diamondOrigin}
                  </div>
                  <div className="info-item">
                    <Text strong>Florescence:</Text> {request.fluorescence}
                  </div>
                  <div className="info-item">
                    <Text strong>Polish:</Text> {request.polish}
                  </div>
                  <div className="info-item">
                    <Text strong>Proportions:</Text> {request.proportions}
                  </div>
                  <div className="info-item">
                    <Text strong>Shape:</Text> {request.shape}
                  </div>
                  <div className="info-item">
                    <Text strong>Symmetry:</Text> {request.symmetry}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card bordered={false} className="info-card image-card">
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

        <Col span={8}>
          <Card
            title="User Information"
            bordered={false}
            className="info-card user-info-card"
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
      </Row>
    </div>
  );
};

export default RequestDetail;
