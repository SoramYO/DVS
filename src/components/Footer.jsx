import React, { useState } from 'react';
import "../css/Footer.css";
import AddressIcon from '../assets/icons/map.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import EmailIcon from '../assets/icons/mail.svg';
import GIA from '../assets/imgs/GIA.png';
import HRD from '../assets/imgs/HRD.png';
import IGI from '../assets/imgs/IGI.png';
import Visa from '../assets/imgs/Visa.png';
import Mastercard from '../assets/imgs/MasterCard.png';
import Amex from '../assets/imgs/Amex.png';
import Paypal from '../assets/imgs/PayPal.png';
import Bancontact from '../assets/imgs/Bancontact.png';
import Banktransfer from '../assets/imgs/Banktransfer.png';
import DHL from '../assets/imgs/DHL.png';
import Fedex from '../assets/imgs/Fedex.png';
import Ideal from '../assets/imgs/Ideal.png';
import Malca from '../assets/imgs/Malca.png';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';
const Footer = () => {
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/registerMail', { email: values.email });
      notification.success({
        message: 'Subscription Successful',
        description: response.data.message,
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Subscription Failed',
        description: error.response ? error.response.data.message : 'Server error, please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-information">
          <h1>Contact information</h1>
          <address>
            <div className="contact-item">
              <img src={AddressIcon} alt="Address Icon" className="icon" />
              diamondvaluation@gmail.com
            </div>
            <div className="contact-item">
              <img src={PhoneIcon} alt="Phone Icon" className="icon" />
              0032-3-233-91-60
            </div>
            <div className="contact-item">
              <img src={EmailIcon} alt="Email Icon" className="icon" />
              VRG2+27 Dĩ An, Bình Dương, Việt Nam
            </div>
          </address>
        </div>
        <hr />
        <div className="newsletter">
          <h1>Sign up to not miss any news</h1>
          <Form
            form={form}
            className="email-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} className="subscribe-button">
                Subscribe
              </Button>
            </Form.Item>
          </Form>
          <p>Receive our latest offers, news, and promotions straight to your inbox. Just enter your email address to join our world of diamonds!</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-section">
          <span>Certificates</span>
          <div className="certificates">
            <div className="trustpilot">
              <iframe
                src="https://widget.trustpilot.com/review/antwerpdiamonds.direct?utm_medium=trustbox&utm_source=Mini"
                width="100%"
                height="52px"
                title="Trustpilot"
              ></iframe>
            </div>
            <img src={GIA} alt="GIA" />
            <img src={HRD} alt="HRD" />
            <img src={IGI} alt="IGI" />
          </div>
        </div>
        <div className="footer-section">
          <span>Payment methods</span>
          <div className="payment-methods">
            <img src={Visa} alt="Visa" />
            <img src={Mastercard} alt="Mastercard" />
            <img src={Amex} alt="Amex" />
            <img src={Paypal} alt="Paypal" />
            <img src={Bancontact} alt="Bancontact" />
            <img src={Banktransfer} alt="Bank Transfer" />
          </div>
        </div>
        <div className="footer-section">
          <span>Carriers</span>
          <div className="shipping-methods">
            <img style={{ width: '100px' }} src={DHL} alt="DHL" />
            <img src={Fedex} alt="Fedex" />
            <img src={Ideal} alt="Ideal" />
            <img src={Malca} alt="Malca" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
