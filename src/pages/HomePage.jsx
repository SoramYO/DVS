import { SketchOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Typography } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";
import HomePageImage3 from '../assets/imgs/homepage3.jpg';
import HomePageImage5 from '../assets/imgs/homepage5.jpg';
import HomePageImage6 from '../assets/imgs/homepage6.jpg';
import HomePageImage2 from '../assets/imgs/homepage7.jpg';
import HomePageImage4 from '../assets/imgs/homepage8.jpg';
import HomePageImage1 from '../assets/imgs/hompage1 copy.jpg';
import '../css/HomePage.css';
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const calculateDiamond = () => {
    navigate(`/calculateDiamond`);
  };
  const slides = [
    {
      title: 'Compare Top-Rated Jewelers & Save',
      description: 'Navigate the diamond knowledge effortlessly.',
      buttonLabel: 'Valuation Now',
      buttonLink: '/request',
      image: HomePageImage1,
    },
    {
      title: 'Explore Our Diamond Education Center',
      description: 'Learn about diamond grades, cuts, and more.',
      buttonLabel: 'Learn More',
      buttonLink: '/education',
      image: HomePageImage2,
    },
    {
      title: 'How us helps you buy better',
      description: 'Our valuations are conducted with the highest ethical standards, guaranteeing conflict-free and responsibly sourced diamonds.',
      buttonLabel: 'Valuation Now',
      buttonLink: '/request',
      image: HomePageImage3,
    },
    {
      title: 'Expert Valuation',
      description: 'Receive precise diamond valuations from our team of experts, ensuring you understand the true worth of your gem.',
      buttonLabel: 'Valuation Now',
      buttonLink: '/request',
      image: HomePageImage4,
    },
    {
      title: 'Cost-Effective Service',
      description: 'Our transparent pricing structure ensures you get a fair valuation without hidden fees, saving you money compared to traditional appraisal methods.',
      buttonLabel: 'Valuation Now',
      buttonLink: '/request',
      image: HomePageImage5,
    },
    {
      title: 'Convenient and Secure',
      description: 'Enjoy the convenience of free shipping and a 14-day return policy, with all valuations certified and guaranteed for accuracy.',
      buttonLabel: 'Valuation Now',
      buttonLink: '/request',
      image: HomePageImage6,
    }

  ];

  return (
    <>
      <div className="homepage">
        <Carousel autoplay>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.image} alt={`Slide ${index}`} className="slide-image" />
              <div className="slide-content">
                <Card className="slide-card">
                  <Title level={1} className="slide-title">{slide.title}</Title>
                  <Paragraph className="slide-description">{slide.description}</Paragraph>
                  <Button type="primary" size="large" className="slide-button" href={slide.buttonLink}>
                    {slide.buttonLabel}
                  </Button>
                </Card>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="section-space"></div>
        <hr />
        <section className="help-section">
          <Title level={1} className="help-title">How us helps you buy better</Title>
          <div className="help-section-detail">
            <div className="help-cards-container">
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
              <Card className="help-card">
                <SketchOutlined style={{ fontSize: '30px' }} />
                <Title level={2}>Expert Advice</Title>
                <Paragraph>Our team of experts is on hand to provide advice and guidance on your diamond valuation, ensuring you make an informed decision.</Paragraph>
              </Card>
              <Card className="help-card">
                <SketchOutlined style={{ fontSize: '30px' }} />
                <Title level={2}>Secure Payment</Title>
                <Paragraph>Our secure payment system ensures your transaction is safe and protected, with multiple payment options available for your convenience.</Paragraph>
              </Card>
            </div>
            <div className="check-price-card">
              <div className="check-price-content">
                <Title level={2} style={{ color: "green", marginBottom: 0 }}>Check Prices</Title>
                <Paragraph style={{ marginBottom: 20 }}>Track diamond prices with our historical price charts & proprietary diamond price indexes.</Paragraph>
                <div className="check-button">
                  <Button type="primary" size="large" className="check-price-button" onClick={calculateDiamond}>Check Price</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    </>
  );
};

export default HomePage;
