import React from 'react';
import { Card } from 'antd';
import '../css/Service.css';

const Service = () => {
    return (
        <div className="service-container">
            <h1>Our Diamond Valuation Services</h1>
            <div className="service-section">
                <Card title="Rough Diamond Valuation" bordered={false} className="service-card">
                    <ul>
                        <li>From small exploration and delineation samples to large commercial productions</li>
                        <li>Additional expertise in large and very high value rough stones</li>
                    </ul>
                </Card>
            </div>
            <div className="service-section">
                <Card title="Large Diamond Expertise" bordered={false} className="service-card">
                    <ul>
                        <li>Valuation</li>
                        <li>Rough to polished planning & modelling</li>
                        <li>Specialized marketing channels</li>
                    </ul>
                </Card>
            </div>
            <div className="service-section">
                <Card title="Diamond Analysis" bordered={false} className="service-card">
                    <ul>
                        <li>Size and value distribution and trends</li>
                        <li>Sales parcel composition and recommendations</li>
                        <li>Pricing analysis and comparison to broader market</li>
                        <li>Advice on management reporting</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Service;
