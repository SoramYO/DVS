import { Button, Card, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/CheckPriceID.css';

const { Title, Paragraph } = Typography;

const CheckPriceByCertificateID = () => {
    const [form] = Form.useForm();
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReset = () => {
        form.resetFields();
        setPriceData(null);
    };

    const handleCheckPrice = async () => {
        try {
            setLoading(true);
            const certificateId = form.getFieldValue('certificateId');
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/estimate-diamond-value-by-certificate', {
                certificateId,
            });
            console.log('response', response.data);

            // Display success message
            message.success(response.data.message);

            // Extract estimated price from API response
            const { estimatedPrice } = response.data.diamond;
            if (!estimatedPrice) {
                setPriceData(0);
            }
            setPriceData({ estimatedPrice });
        } catch (error) {
            console.error('Error checking diamond price by certificate ID:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkPriceContainer">
            <div className="buttonContainer">
                <Link to="/calculateDiamond">
                    <Button type="primary">Calculate Diamond</Button>
                </Link>
                <Link to="/checkPriceByCertificateID">
                    <Button type="primary" style={{ marginLeft: '8px' }}>Check Price by Certificate ID</Button>
                </Link>
            </div>
            <div className="cardContainer">
                <Card title="Check Diamond Price by Certificate ID">
                    <Form form={form} layout="vertical">
                        <Form.Item label="Certificate ID" name="certificateId" rules={[{ required: true, message: 'Please enter Certificate ID!' }]}>
                            <Input placeholder="Enter Certificate ID" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} onClick={handleCheckPrice}>
                                Check Price
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                    {priceData && (
                        <div className="resultCard">
                            <Title level={4}>Diamond Price Details</Title>
                            <Paragraph className="result-card-price">
                                Estimated Price: ${priceData.estimatedPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Paragraph>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CheckPriceByCertificateID;
