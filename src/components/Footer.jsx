import React from 'react';
import "../css/Footer.css";
import AddressIcon from '../assets/icons/map.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import EmailIcon from '../assets/icons/mail.svg';
import FooterBand from '../assets/icons/footerband.png';

const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer-content">
        <div className="contact-information">
          <h1>Contact information</h1>
          <address>
            <div className="contact-item">
              <img src={EmailIcon} alt="Email Icon" className="icon" />
              Antwerpdiamonds.direct.
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
        <hr></hr>
        <div className="newsletter">
          <h1>Sign up to not miss any news</h1>
          <form className="email-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="sendEmail-button">Subscribe</button>
          </form>
          <p>Receive our latest offers, news and promotions straight to your inbox. Just enter your email address to join our world of diamonds!</p>
        </div>

      </div>
        <img src={FooterBand} alt="Footer Band " className="footerBand" />


    </footer>
  );
}

export default Footer;
