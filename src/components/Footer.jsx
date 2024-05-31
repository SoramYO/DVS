import React from 'react';
import "../css/Footer.css";
import AddressIcon from '../assets/icons/map.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import EmailIcon from '../assets/icons/mail.svg';

const Footer = () => {
  return (
    
    <footer className="footer">
      <div className="contact-information">
        <h1>Contact information</h1>
        <address>
          <div className="contact-item">
          <img src={EmailIcon} alt="Email Icon" className="icon" />
            Antwerpdiamonds.direct<br />
            Pelikaanstraat 78 - room 2002, 2018 Antwerp, BE
          </div>
          <div className="contact-item">
            <img src={PhoneIcon} alt="Phone Icon" className="icon" />
            0032-3-233-91-60
          </div>
          <div className="contact-item">
          <img src={AddressIcon} alt="Address Icon" className="icon" />
            info@antwerpdiamonds.direct
          </div>
        </address>
      </div>
      <div className="newsletter">
        <h1>Sign up to not miss any news</h1>
        <p>Enter your latest offers, news and promotions straight to your inbox. Join our email promotions list and we’ll let you know about the best deals!</p>
      </div>
    </footer>
  );
}

export default Footer;
