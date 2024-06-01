import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { SketchOutlined } from '@ant-design/icons';
import '../css/HomePage.css';
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const calculateDiamond = () => {
    navigate(`/calculateDiamond`);
  };
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content-header">
          <div className="hero-content">
            <Title level={1}>Compare Top-Rated Jewelers & Save</Title>
            <Paragraph>Navigate the diamond knowledge effortlessly.</Paragraph>
            <Button type="primary" size="large" className="valuation-button">Valuation Now</Button>
          </div>
          <img src="https://troyobrien.com.au/wp-content/uploads/2019/05/714B3D35-3343-4FC8-8680-B62C33E41EB8.jpeg" alt="Diamond" className="hero-image" />
        </div>
      </section>
      <hr />
      <section className="help-section">
        <Title level={1} className="help-title">How us helps you buy better</Title>
        <Row gutter={[16, 16]} className="help-section-detail">
          <Col xs={24} sm={12} md={12} lg={12}>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px' }} />
              <Title level={2}>Handpicked Premium</Title>
              <Paragraph>We only sell the top 1% of diamonds, individually handpicked by our team</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px' }} />
              <Title level={2}>Ethically Sourced</Title>
              <Paragraph>We only ever deal with ethically sourced, conflict-free diamonds</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px' }} />
              <Title level={2}>70% Cheaper than retail</Title>
              <Paragraph>By removing the middleman, we pass the saving directly to you, ensuring you pay a much lower price</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px' }} />
              <Title level={2}>Worry-Free</Title>
              <Paragraph>Free Shipping, 14 Days return, Certified & Guaranteed</Paragraph>
            </Card>
          </Col>
          <Col xs={24} className="check-price">
            <Card>
              <Title level={2}>Check Prices</Title>
              <Paragraph>Track diamond prices with our historical price charts & proprietary diamond price indexes.</Paragraph>
              <Button type="primary" size="large" className="check-price-button" onClick={calculateDiamond}>Check price</Button>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
