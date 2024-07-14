// Pricing.jsx
import { Col, Image, Radio, Row } from 'antd';
import React, { useState } from 'react';
import asscherImg from '../assets/imgs/asscher.png';
import cushionImg from '../assets/imgs/cushion.png';
import emeraldImg from '../assets/imgs/emerald.png';
import heartImg from '../assets/imgs/heart.png';
import marquiseImg from '../assets/imgs/marquise.png';
import ovalImg from '../assets/imgs/oval.png';
import pearImg from '../assets/imgs/pear.png';
import princessImg from '../assets/imgs/princess.png';
import radiantImg from '../assets/imgs/radiant.png';
import roundImg from '../assets/imgs/round.png';
import { chartByshapes, chartData } from '../components/constants';
import '../css/Pricing.css';

const shapes = [
    { name: "ROUND", img: roundImg },
    { name: "CUSHION", img: cushionImg },
    { name: "EMERALD", img: emeraldImg },
    { name: "OVAL", img: ovalImg },
    { name: "PRINCESS", img: princessImg },
    { name: "PEAR", img: pearImg },
    { name: "RADIANT", img: radiantImg },
    { name: "MARQUISE", img: marquiseImg },
    { name: "ASSCHER", img: asscherImg },
    { name: "HEART", img: heartImg }
];

const Pricing = () => {
    const [selectedShape, setSelectedShape] = useState('ROUND');

    const handleShapeChange = (shape) => {
        setSelectedShape(shape);
    };

    return (
        <div className="pricingContainer">
            <h1><strong>Welcome to <span style={{ color: "green" }}>Pricing Page!</span></strong></h1>
            <h3><i>Here, we provide transparent and detailed information on our diamond pricing.</i></h3>

            <Row gutter={16} className="section-spacing">
                <Col span={24}>
                    <Radio.Group value={selectedShape} onChange={(e) => handleShapeChange(e.target.value)} className="radio-group">
                        {shapes.map(shape => (
                            <Radio.Button key={shape.name} value={shape.name} className={`radio-button ${selectedShape === shape.name ? 'selected' : ''}`}>
                                <div className="radio-button-label">
                                    <img src={shape.img} alt={shape.name} className="radio-button-img" />
                                    <div className="radio-button-text" style={{ color: "red" }}>{shape.name}</div>
                                </div>
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Col>
            </Row>

            {selectedShape && (
                <div className="chartGrid">
                    {chartByshapes
                        .filter(item => item.shape.toUpperCase() === selectedShape)
                        .map(item => (
                            <div key={`${item.shape}_${item.carat}`} className="chartItem">
                                <p><strong>{item.carat} carat</strong></p>
                                <Image src={item.url} alt={`${item.carat} carat`} />
                            </div>
                        ))}
                </div>
            )}

            <p style={{ fontSize: 35, marginTop: 50 }}><strong>Below are the diamond prices for 1 month:</strong></p>

            <div className="chartGrid">
                {chartData.map(item => (
                    <div key={item.carat} className="chartItem">
                        <p><strong>1 month {item.carat} carat</strong></p>
                        <Image src={item.url} alt={`1 month ${item.carat} carat`} />
                    </div>
                ))}
            </div>

            <h3><strong><i>Find the perfect diamond today and let us <span style={{ color: "red" }}>help you shine brighter than ever</span>!</i></strong></h3>
        </div>
    );
};

export default Pricing;
