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
        <div className="help-section-detail">
          <div>
            <Row >
              <Row>
                <Card className="help-card">
                  <SketchOutlined style={{ fontSize: '30px' }} />
                  <Title level={2}>Expert Valuation</Title>
                  <Paragraph>Receive precise diamond valuations from our team of experts, ensuring you understand the true worth of your gem.</Paragraph>
                </Card>
                <Card className="help-card">
                  <SketchOutlined style={{ fontSize: '30px' }} />
                  <Title level={2}>Ethical Standards</Title>
                  <Paragraph>Our valuations are conducted with the highest ethical standards, guaranteeing conflict-free and responsibly sourced diamonds.</Paragraph>
                </Card>
              </Row>
              <Row>
                <Card className="help-card">
                  <SketchOutlined style={{ fontSize: '30px' }} />
                  <Title level={2}>Cost-Effective Service</Title>
                  <Paragraph>Our transparent pricing structure ensures you get a fair valuation without hidden fees, saving you money compared to traditional appraisal methods.</Paragraph>
                </Card>
                <Card className="help-card">
                  <SketchOutlined style={{ fontSize: '30px' }} />
                  <Title level={2}>Convenient and Secure</Title>
                  <Paragraph>Enjoy the convenience of free shipping and a 14-day return policy, with all valuations certified and guaranteed for accuracy.</Paragraph>
                </Card>
              </Row>
            </Row>
          </div>
          <div>
            <Card className='check-price-card'>
              <Title style={{ color: "green" }} level={1}>Check Prices</Title>
              <Paragraph>Track diamond prices with our historical price charts & proprietary diamond price indexes.</Paragraph>
              <Button type="primary" size="large" className="check-price-button" onClick={calculateDiamond}>Check price</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
