import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "../css/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://dvs-be-sooty.vercel.app/api/registerMail', { email });
      setMessage({ type: 'success', text: response.data.message });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response ? error.response.data.message : 'Server error, please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Define the position of the company address on the map
  const position = [10.841976, 106.809537]; // Coordinates for D1 Street Saigon Hi-tech Park, Ho Chi Minh City, Vietnam

  // Custom icon for the map marker
  const customMarker = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-map">
          <MapContainer center={position} zoom={15} className="leaflet-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customMarker}>
              <Popup>
                D1 Street Saigon Hi-tech Park, Ho Chi Minh City, Vietnam
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="contact-information">
          <h1><strong>CONTACT US</strong></h1>
          <address>
            <div className="contact-item">
              <span className="icon">📧</span>
              diamondvaluation@mail.com
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              D1 Street Saigon Hi-tech Park, Ho Chi Minh City, Vietnam
            </div>
          </address>
          <div className="newsletter">
            <h2>Sign up to not miss any news</h2>
            <form className="email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit" className="subscribe-button" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`message ${message.type}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
