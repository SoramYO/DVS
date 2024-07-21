import { MessageOutlined, SketchOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Carousel, Drawer, Typography } from 'antd';
import { onValue, ref, update } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HomePageImage3 from '../assets/imgs/homepage3.jpg';
import HomePageImage5 from '../assets/imgs/homepage5.jpg';
import HomePageImage6 from '../assets/imgs/homepage6.jpg';
import HomePageImage2 from '../assets/imgs/homepage7.jpg';
import HomePageImage4 from '../assets/imgs/homepage8.jpg';
import HomePageImage1 from '../assets/imgs/hompage1.jpg';
import Chat from '../components/CustomerChat';
import { AuthContext } from "../context/AuthContext";
import '../css/HomePage.css';
import { db } from '../firebase/firebase';
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const calculateDiamond = () => {
    navigate(`/calculateDiamond`);
  };
  useEffect(() => {
    if (user) {
      const chatId = `${user.firstName} ${user.lastName}`;
      const messagesRef = ref(db, `messages/${chatId}`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messages = Object.entries(data);
          const unreadMessages = messages.filter(([key, msg]) =>
            msg.sender !== `${user.firstName} ${user.lastName}` && !msg.read
          );
          setNewMessageCount(unreadMessages.length);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);
  const handleOpenChat = () => {
    setVisible(true);
    if (user) {
      const chatId = `${user.firstName} ${user.lastName}`;
      const messagesRef = ref(db, `messages/${chatId}`);

      // Đọc tất cả tin nhắn hiện tại
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updates = {};
          Object.entries(data).forEach(([key, msg]) => {
            if (msg.sender !== `${user.firstName} ${user.lastName}` && !msg.read) {
              updates[`${key}/read`] = true;
            }
          });

          // Cập nhật tất cả tin nhắn chưa đọc thành đã đọc
          update(messagesRef, updates);
        }
      }, { onlyOnce: true });
    }
    setNewMessageCount(0);
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
    <div className="homepage">
      <Carousel autoplay>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={`Slide ${index}`} className="slide-image" />
            <div className="slide-content">
              <Card className="slide-card">
                <Title level={1} className="slide-title">{slide.title}</Title>
                <Paragraph style={{ color: "black", fontSize: "22px" }} className="slide-description">{slide.description}</Paragraph>
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
        <Title level={1} className="help-title">HOW US HELPS YOU BUY BETTER</Title>
        <div className="help-section-detail">
          <div className="help-cards-container">
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Expert Valuation</Title>
              <Paragraph><i>Receive precise diamond valuations from our team of experts, ensuring you understand the true worth of your gem.</i></Paragraph>
            </Card>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Ethical Standards</Title>
              <Paragraph><i>Our valuations are conducted with the highest ethical standards, guaranteeing conflict-free and responsibly sourced diamonds.</i></Paragraph>
            </Card>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Cost-Effective Service</Title>
              <Paragraph><i>Our transparent pricing structure ensures you get a fair valuation without hidden fees, saving you money compared to traditional appraisal methods.</i></Paragraph>
            </Card>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Convenient and Secure</Title>
              <Paragraph><i>Enjoy the convenience of free shipping and a 14-day return policy, with all valuations certified and guaranteed for accuracy.</i></Paragraph>
            </Card>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Expert Advice</Title>
              <Paragraph><i>Our team of experts is on hand to provide advice and guidance on your diamond valuation, ensuring you make an informed decision.</i></Paragraph>
            </Card>
            <Card className="help-card">
              <SketchOutlined style={{ fontSize: '30px', color: "red" }} />
              <Title level={2}>Secure Payment</Title>
              <Paragraph><i>Our secure payment system ensures your transaction is safe and protected, with multiple payment options available for your convenience.</i></Paragraph>
            </Card>
          </div>
          <div className="check-price-card">
            <div className="check-price-content">
              <Title level={2} style={{ color: "red", marginBottom: 0 }}><strong>CHECK PRICE</strong></Title>
              <Paragraph style={{ marginBottom: 20 }}>Track diamond prices with our historical price charts & proprietary diamond price indexes.</Paragraph>
              <div className="check-button">
                <Button type="primary" size="large" className="check-price-button" onClick={calculateDiamond}>Calculate Diamond</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="message-button">
        <Badge count={newMessageCount} offset={[-10, 0]}>
          <Button
            icon={<MessageOutlined />}
            onClick={handleOpenChat}
          >
            Message
          </Button>
        </Badge>
      </div>
      <Drawer
        title="Chat"
        placement="left"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        style={{ position: 'fixed' }}
        height="400px"
        width="300px"
      >
        {user ? (
          <Chat user={user} />

        ) : (
          <div>
            Please log in to start messaging.
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default HomePage;
