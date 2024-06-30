import { SketchOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Guides.css';

const { Title, Paragraph } = Typography;

const Guides = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="guidesContainer">
      <Title level={1}>Master the 4 C's of Diamond Valuation</Title>
      <Paragraph>
        Buying a diamond can be overwhelming with numerous choices available. To ensure you make an informed decision, it's crucial to understand the fundamental characteristics that determine the quality and value of a diamond, known as the 4 Cs:
      </Paragraph>
      <ul>
        <li><a href="https://antwerpdiamonds.direct/en/education/diamond-grading-learn-the-4-cs/diamond-cut" target="_blank" rel="noopener noreferrer">1. Diamond Cut:</a> Understand how the cut impacts the brilliance and price of your diamond.</li>
        <li><a href="https://antwerpdiamonds.direct/en/education/diamond-grading-learn-the-4-cs/diamond-clarity" target="_blank" rel="noopener noreferrer">2. Diamond Clarity:</a> Learn how clarity influences the purity and price of the diamond.</li>
        <li><a href="https://antwerpdiamonds.direct/en/education/diamond-grading-learn-the-4-cs/diamond-color" target="_blank" rel="noopener noreferrer">3. Diamond Color:</a> Discover how color affects the appearance and value of the diamond.</li>
        <li><a href="https://antwerpdiamonds.direct/en/education/diamond-grading-learn-the-4-cs/diamond-carat" target="_blank" rel="noopener noreferrer">4. Diamond Carat Weight:</a> Explore how carat weight determines the size and worth of the diamond.</li>
      </ul>
      <Title level={2}>Key Characteristics</Title>
      <Row className="help-section-detail" gutter={[16, 16]}>
        <Col span={12}>
          <Card onClick={() => handleCardClick("/cut")} className="help-card">
            <SketchOutlined style={{ fontSize: '30px' }} />
            <Title level={3}>Cut</Title>
            <Paragraph>The brilliance or shine of a diamond is determined by its cut. A poorly cut diamond will appear dull and unattractive.</Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card onClick={() => handleCardClick("/color")} className="help-card">
            <SketchOutlined style={{ fontSize: '30px' }} />
            <Title level={3}>Color</Title>
            <Paragraph>Colorless diamonds are the most valuable. The presence of color in a diamond reduces its value, with grades ranging from D (colorless) to Z (light yellow).</Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card onClick={() => handleCardClick("/carat")} className="help-card">
            <SketchOutlined style={{ fontSize: '30px' }} />
            <Title level={3}>Carat</Title>
            <Paragraph>Carat is the unit of measurement for diamond weight. One carat equals 0.2 grams. The carat weight influences the size and price of the diamond.</Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card onClick={() => handleCardClick("/clarity")} className="help-card">
            <SketchOutlined style={{ fontSize: '30px' }} />
            <Title level={3}>Clarity</Title>
            <Paragraph>Clarity measures the number and size of imperfections in a diamond. Diamonds are graded from Flawless (no imperfections) to Included (visible imperfections).</Paragraph>
          </Card>
        </Col>
      </Row>
      <Title level={2}>Need Assistance?</Title>
      <Paragraph>
        Understanding the different facets of diamond grading is crucial before selecting your stone. Visit our Diamond Learning Center for more in-depth knowledge about certified diamonds, their characteristics, and quality.
      </Paragraph>
      <Title level={3}><span style={{ color: "green" }}>Need help finding what you are looking for?</span></Title>
      <Paragraph>
        Here is a simple chart with all details about how your diamond’s value is determined:
      </Paragraph>
      <img src="/assets/dia.jpg" alt="Diamond detail" className="diamond-image" />
      <Paragraph>
        Still having trouble? Not to worry, our enthusiastic and professional team is here to assist you. Explore our advanced guides and educational pages to learn more about diamonds and their unique traits.
      </Paragraph>
      <Paragraph>
        Let us enlighten you today: <a href="https://www.diamonds.pro/education/" target="_blank" rel="noopener noreferrer">Diamond Education</a>
      </Paragraph>
      <div className="button-container">
        <Link to="/requests">
          <button type="button" className="booking-button">Book an Appointment</button>
        </Link>
      </div>
    </div>
  );
};

export default Guides;
