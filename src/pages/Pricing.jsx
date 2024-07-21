import React, { useState } from 'react';
import { Modal, Image } from 'antd';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleShapeChange = (shape) => {
        setSelectedShape(shape);
    };

    const showModal = (item) => {
        setModalContent(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalContent(null);
    };

    return (
        <div className="pricing-container">
            <h1><strong>Welcome to <span className="highlight">Pricing Page!</span></strong></h1>
            <h3><i>Here, we provide transparent and detailed information on our diamond pricing.</i></h3>

            <div className="radio-group">
                {shapes.map(shape => (
                    <div
                        key={shape.name}
                        className={`radio-button ${selectedShape === shape.name ? 'selected' : ''}`}
                        onClick={() => handleShapeChange(shape.name)}
                    >
                        <div className="radio-button-label">
                            <img src={shape.img} alt={shape.name} className="radio-button-img" />
                            <div className="radio-button-text" style={{ color: "red" }}>{shape.name}</div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedShape && (
                <div className="chart-grid">
                    {chartByshapes
                        .filter(item => item.shape.toUpperCase() === selectedShape)
                        .map(item => (
                            <div key={`${item.shape}_${item.carat}`} className="chart-item" onClick={() => showModal(item)}>
                                <p><strong>{item.carat} carat</strong></p>
                                <img src={item.url} alt={`${item.carat} carat`} className="chart-image" />
                            </div>
                        ))}
                </div>
            )}

            <p className="price-info"><strong>Below are the diamond prices for 1 month:</strong></p>

            <div className="chart-grid">
                {chartData.map(item => (
                    <div key={item.carat} className="chart-item" onClick={() => showModal(item)}>
                        <p><strong>1 month {item.carat} carat</strong></p>
                        <img src={item.url} alt={`1 month ${item.carat} carat`} className="chart-image" />
                    </div>
                ))}
            </div>

            <h3><strong><i>Find the perfect diamond today and let us <span className="highlight">help you shine brighter than ever</span>!</i></strong></h3>

            <Modal
                title={`${modalContent?.carat} Carat ${modalContent?.shape}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Image src={modalContent?.url} alt={`${modalContent?.carat} carat`} />
                <p><strong>Carat:</strong> {modalContent?.carat}</p>
                <p><strong>Shape:</strong> {modalContent?.shape}</p>
            </Modal>
        </div>
    );
};

export default Pricing;
