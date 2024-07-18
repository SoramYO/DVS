import {
  ClockCircleOutlined,
  MailFilled,
  PhoneFilled
} from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/logoweb1.png";
import "../css/Header.css";
import Contact from "../pages/Contact";

const Header = () => {
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [timeStatus, setTimeStatus] = useState({ time: '', status: '' });

  useEffect(() => {
    const updateTimeStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}:${seconds}`;
      const status = (hours >= 8 && hours < 21) ? 'Openning' : 'We are Closing';

      setTimeStatus({ time: currentTime, status });
    };

    updateTimeStatus();
    const interval = setInterval(updateTimeStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const showContactModal = () => {
    setIsContactModalVisible(true);
  };

  const handleContactClose = () => {
    setIsContactModalVisible(false);
  };
  const openZalo = () => {
    const zaloUrl = "https://zalo.me/0976457150";
    window.open(zaloUrl, "_blank");
  };

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <div className="clockContainer">
          <ClockCircleOutlined className="headerIcon" />
          <h5>{timeStatus.time} - {timeStatus.status}</h5>
        </div>
      </div>
      <div className="headerCenter">
        <Link to="/">
          <img src={Logo} alt="Logo" className="headerLogo" />
        </Link>
      </div>
      <div className="headerRight">
        <MailFilled className="headerIcon emailIcon" onClick={showContactModal} />
        <div className="phoneContainer">
          <PhoneFilled className="headerIcon" onClick={openZalo} />
          <h5>0976457150</h5>
        </div>
      </div>
      <Contact visible={isContactModalVisible} onClose={handleContactClose} />
    </div>
  );
};

export default Header;
