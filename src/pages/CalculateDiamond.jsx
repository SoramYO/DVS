import { Button, Card, Col, Collapse, Form, InputNumber, Layout, Radio, Row, Slider, Typography } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/CalculateDiamond.css';

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

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

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

const CalculateDiamond = () => {
  const [form] = Form.useForm();
  const [priceData, setPriceData] = useState(null);
  const [selectedShape, setSelectedShape] = useState('ROUND');
  const [selectedColor, setSelectedColor] = useState('D');
  const [selectedClarity, setSelectedClarity] = useState('IF');
  const [selectedFluorescence, setSelectedFluorescence] = useState('None');
  const [selectedOrigin, setSelectedOrigin] = useState('Natural');
  const [selectedPolish, setSelectedPolish] = useState('Excellent');
  const [selectedSymmetry, setSelectedSymmetry] = useState('Excellent');
  const [selectedProportions, setSelectedProportions] = useState('Ideal');
  const [selectedMeasurements, setSelectedMeasurements] = useState('Medium');
  const [carat, setInputValue] = useState(0.01);
  const [advancedOpen, setAdvancedOpen] = useState(false);


  useEffect(() => {
    if (carat && selectedColor && selectedClarity && selectedShape) {
      handleCalculatePrice();
    }
  }, [carat, selectedColor, selectedClarity, selectedShape, selectedFluorescence, selectedOrigin, selectedPolish, selectedSymmetry, selectedProportions, selectedMeasurements]);

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleClarityChange = (clarity) => {
    setSelectedClarity(clarity);
  };

  const handleFluorescenceChange = (fluorescence) => {
    setSelectedFluorescence(fluorescence);
  };

  const handleOriginChange = (origin) => {
    setSelectedOrigin(origin);
  };

  const handlePolishChange = (polish) => {
    setSelectedPolish(polish);
  };

  const handleSymmetryChange = (symmetry) => {
    setSelectedSymmetry(symmetry);
  };

  const handleProportionsChange = (proportions) => {
    setSelectedProportions(proportions);
  };

  const handleMeasurementsChange = (measurements) => {
    setSelectedMeasurements(measurements);
  };

  const handleAdvancedToggle = () => {
    setAdvancedOpen(!advancedOpen);
  };

  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue(value);
  };

  const handleReset = () => {
    form.resetFields();
    setPriceData(null);
    setSelectedShape('ROUND');
    setSelectedColor('D');
    setSelectedClarity('IF');
    setSelectedFluorescence('None');
    setSelectedOrigin('Natural');
    setSelectedPolish('Excellent');
    setSelectedSymmetry('Excellent');
    setSelectedProportions('Ideal');
    setSelectedMeasurements('Medium');
    setInputValue(0.01);
  };

  const handleCalculatePrice = async () => {
    try {
      const response = await axios.post('https://dvs-be-sooty.vercel.app/api/estimate-diamond-value', {
        caratWeight: carat,
        color: selectedColor,
        clarity: selectedClarity,
        cut: selectedShape,
        fluorescence: selectedFluorescence,
        origin: selectedOrigin,
        shape: selectedShape,
        polish: selectedPolish,
        symmetry: selectedSymmetry,
        proportions: selectedProportions,
        measurements: selectedMeasurements
      });

      const { estimatedPrice } = response.data;
      setPriceData({
        fairPrice: estimatedPrice,
        carat,
        color: selectedColor,
        clarity: selectedClarity,
        shape: selectedShape,
        fluorescence: selectedFluorescence,
        origin: selectedOrigin,
        polish: selectedPolish,
        symmetry: selectedSymmetry,
        proportions: selectedProportions,
        measurements: selectedMeasurements
      });
    } catch (error) {
      console.error('Error calculating diamond price:', error);
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Title>Calculate Diamond Price</Title>
          <Form layout="vertical" className="input-form" form={form}>
            <Row gutter={16} className="section-spacing">
              <Col span={24}>
                <Form.Item label="Diamond Shape" name="shape" initialValue="ROUND">
                  <Radio.Group value={selectedShape} onChange={(e) => handleShapeChange(e.target.value)} className="radio-group">
                    {shapes.map(shape => (
                      <Radio.Button key={shape.name} value={shape.name} className="radio-button">
                        <div className="radio-button-label">
                          <img src={shape.img} alt={shape.name} className="radio-button-img" />
                          <div className="radio-button-text">{shape.name}</div>
                        </div>
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="section-spacing">
              <Col span={24}>
                <Form.Item label="Carat">
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={0.01}
                        max={10.99}
                        onChange={onChange}
                        value={typeof carat === 'number' ? carat : 0}
                        step={0.01}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={0}
                        max={10}
                        style={{ margin: '0 16px' }}
                        step={0.01}
                        value={carat}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="section-spacing">
              <Col span={12}>
                <Form.Item label="Color Grade" name="color" rules={[{ required: true, message: 'Please select the color grade!' }]}>
                  <Radio.Group value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} className="radio-group-styled">
                    {['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].map(color => (
                      <Radio.Button key={color} value={color} className="radio-button-styled">
                        {color}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Clarity Grade" name="clarity" rules={[{ required: true, message: 'Please select the clarity grade!' }]}>
                  <Radio.Group value={selectedClarity} onChange={(e) => handleClarityChange(e.target.value)} className="radio-group-styled">
                    {['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3'].map(clarity => (
                      <Radio.Button key={clarity} value={clarity} className="radio-button-styled">
                        {clarity}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Collapse className="section-spacing">
              <Panel header="Advanced Options" key="1" onClick={handleAdvancedToggle}>
                <Row gutter={16} className="section-spacing">
                  <Col span={12}>
                    <Form.Item label="Fluorescence" name="fluorescence">
                      <Radio.Group value={selectedFluorescence} onChange={(e) => handleFluorescenceChange(e.target.value)} className="radio-group-styled">
                        {['None', 'Faint', 'Medium', 'Strong', 'VeryStrong'].map(fluorescence => (
                          <Radio.Button key={fluorescence} value={fluorescence} className="radio-button-styled">
                            {fluorescence}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Origin" name="origin">
                      <Radio.Group value={selectedOrigin} onChange={(e) => handleOriginChange(e.target.value)} className="radio-group-styled">
                        {['Natural', 'Synthetic'].map(origin => (
                          <Radio.Button key={origin} value={origin} className="radio-button-styled">
                            {origin}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="section-spacing">
                  <Col span={12}>
                    <Form.Item label="Polish" name="polish">
                      <Radio.Group value={selectedPolish} onChange={(e) => handlePolishChange(e.target.value)} className="radio-group-styled">
                        {['Excellent', 'VeryGood', 'Good', 'Fair', 'Poor'].map(polish => (
                          <Radio.Button key={polish} value={polish} className="radio-button-styled">
                            {polish}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Symmetry" name="symmetry">
                      <Radio.Group value={selectedSymmetry} onChange={(e) => handleSymmetryChange(e.target.value)} className="radio-group-styled">
                        {['Excellent', 'VeryGood', 'Good', 'Fair', 'Poor'].map(symmetry => (
                          <Radio.Button key={symmetry} value={symmetry} className="radio-button-styled">
                            {symmetry}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="section-spacing">
                  <Col span={12}>
                    <Form.Item label="Proportions" name="proportions">
                      <Radio.Group value={selectedProportions} onChange={(e) => handleProportionsChange(e.target.value)} className="radio-group-styled">
                        {['Ideal', 'Excellent', 'VeryGood', 'Good', 'Fair'].map(proportions => (
                          <Radio.Button key={proportions} value={proportions} className="radio-button-styled">
                            {proportions}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Measurements" name="measurements">
                      <Radio.Group value={selectedMeasurements} onChange={(e) => handleMeasurementsChange(e.target.value)} className="radio-group-styled">
                        {['Small', 'Medium', 'Large'].map(measurements => (
                          <Radio.Button key={measurements} value={measurements} className="radio-button-styled">
                            {measurements}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Form.Item>
              <Button type="primary" onClick={handleCalculatePrice}>
                Check Price
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
          {priceData && (
            <Card title="Price Information" className="result-card">
              <div className="result-card-title">Diamond Price Details</div>
              <div className="result-card-content">
                <Paragraph>Shape: {priceData.shape}</Paragraph>
                <Paragraph>Carat: {priceData.carat}</Paragraph>
                <Paragraph>Color: {priceData.color}</Paragraph>
                <Paragraph>Clarity: {priceData.clarity}</Paragraph>
                {advancedOpen && (
                  <>
                    <Paragraph>Fluorescence: {priceData.fluorescence}</Paragraph>
                    <Paragraph>Origin: {priceData.origin}</Paragraph>
                    <Paragraph>Polish: {priceData.polish}</Paragraph>
                    <Paragraph>Symmetry: {priceData.symmetry}</Paragraph>
                    <Paragraph>Proportions: {priceData.proportions}</Paragraph>
                    <Paragraph>Measurements: {priceData.measurements}</Paragraph>
                  </>
                )}
                <Paragraph className="result-card-price">Fair Price: ${priceData.fairPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Paragraph>
              </div>
            </Card>
          )}

        </div>
      </Content>
    </Layout>
  );
};

export default CalculateDiamond;
