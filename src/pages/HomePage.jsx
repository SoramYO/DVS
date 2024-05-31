import React from 'react'
import "../css/HomePage.css";

const HomePage = () => {
  return (
    //<div>HomePage</div>
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Compare Top-Rated Jewelers & Save</h1>
          <h4>Navigate the diamond knowledge effortlessly.</h4>
          <button className="valuation-button">Valuation Now</button>
        </div>
        <img src="https://th.bing.com/th/id/OIP.OcAAp06y7QOusEru_vsXwQHaHa?rs=1&pid=ImgDetMain.jpg" alt="Diamond" className="hero-image" />
      </section>
      <hr></hr>

      <section className="help-section">
        <h1>How us helps you buy better</h1>
        <div className="help-section-detail">
          <div className="help-cards">
            <div className="card">
              <h2>Handpicked Premium</h2>
              <p>We only sell the top 1% of diamonds, individually handpicked by our team</p>
            </div>
            <div className="card">
              <h2>Ethically Sourced</h2>
              <p>We only ever deal with ethically sourced, conflict-free diamonds</p>
            </div>
            <div className="card">
              <h2>70% Cheaper than retail</h2>
              <p>By removing the middleman, we pass the saving directly to you, ensuring you pay much the lower price</p>
            </div>
            <div className="card">
              <h2>Worry-Free</h2>
              <p>Free Shipping, 14 Days return, Certified & Guaranteed</p>
            </div>
          </div>
          <div className="check-price">
            <h1>CHECK PRICES</h1>
            <h3>Track diamond prices with our historical price charts & proprietary diamond price indexes.</h3>
            <button className="check-price-button">Check price</button>
          </div>
        </div>

      </section>

    </div>
  )
}

export default HomePage