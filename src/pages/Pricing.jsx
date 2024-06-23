import React from 'react';
import Certificate1 from '../assets/imgs/certs1.jpg';
import Certificate2 from '../assets/imgs/certs2.jpg';
import '../css/Pricing.css';

const Pricing = () => {
    return (
        <div className="pricingContainer">
            <h1><strong>Welcome to <span style={{ color: "green" }}>Shine's Pricing Page!</span></strong></h1>
            <h3><i>Here, we provide transparent and detailed information on our diamond pricing to help you make an informed decision.</i> </h3>
            <h3><i>Our prices, although are based on a comprehensive evaluation of each diamond's unique characteristics, including <span style={{ color: "blue" }}>Scarat weight, cut quality, color grade, and clarity</span>. We also take into account additional factors such as <span style={{ color: "blue" }}>shape and market conditions</span>.</i></h3>
            <h3><i>By breaking down these elements, we ensure you understand the value behind each diamond. Browse our pricing options, simple yet effective that fits your budget and style.</i></h3>
            <h3><i>At Shine, we believe in clarity and trust, offering you  <span style={{ color: "red" }}>the best value for your investment</span>.</i></h3>
            <h2><strong><i>There are 2 options you can choose from:</i></strong></h2>
            <p><strong>Standard Diamond Valuation (SDV) [100$]</strong>: Which provide you the basic but throughout details about your diamonds which also include a certificate from one of entrusted partner and professional in the field.</p>
            <p>Receive via digital form (Mail) or a beautifully printed certificate that you can keep and present as needed. This way, you have flexibility and peace of mind, knowing your diamond's value is documented and readily available in the format that suits you best.</p>
            <img src={Certificate1} alt="AGI Standard Valuation Report" className='report-image' />
            <p>You can see a sample <a href="https://www.agigems.com/diamond-valuation-report/" target="_blank" rel="noopener noreferrer">here</a></p>
            <p><strong>Advanced Diamond Valuation (ADV) [300$]</strong>: Which include all the benefits from Standard Valuation plus additional deep-dive document and blueprint (dossier) about how your diamond’s value being defined by their characteristic and traits.</p>
            <img src={Certificate2} alt="AGI Diamond Dossier Report" className='report-image' />
            <p>You can see a sample <a href="https://www.agigems.com/diamond-dossier-report/" target="_blank" rel="noopener noreferrer">here</a></p>
            <h3><i>We are committed to providing you with clear, fair, and transparent pricing for all our diamonds. </i></h3>
            <h3><i>If you have any questions or need further assistance, our expert team is here to help. Explore our selection with confidence, knowing that Shine values your satisfaction and trust.</i></h3>
            <h3><strong><i>Find the perfect diamond today and let us  <span style={{ color: "red" }}>help you shine brighter than ever</span>!</i></strong></h3>
        </div>
    );
};
<span style={{ color: "blue" }}></span>

export default Pricing;