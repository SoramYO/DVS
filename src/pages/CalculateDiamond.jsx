import React, { useState } from 'react';
import { Layout, Row, Col, Form, Button, Typography, Radio, Card, ConfigProvider, Space, Slider, InputNumber } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

import 'antd/dist/reset.css';
import '../css/CalculateDiamond.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const rapaportPrices = {
  "0.01-0.03": {
    "D": { "IF": 72, "VVS1": 69, "VVS2": 66, "VS1": 63, "VS2": 52, "SI1": 40, "SI2": 32 },
    "E": { "IF": 70, "VVS1": 67, "VVS2": 64, "VS1": 61, "VS2": 50, "SI1": 38, "SI2": 30 },
    "F": { "IF": 68, "VVS1": 65, "VVS2": 62, "VS1": 59, "VS2": 48, "SI1": 36, "SI2": 28 },
    "G": { "IF": 66, "VVS1": 63, "VVS2": 60, "VS1": 57, "VS2": 46, "SI1": 34, "SI2": 26 },
    "H": { "IF": 64, "VVS1": 61, "VVS2": 58, "VS1": 55, "VS2": 44, "SI1": 32, "SI2": 24 },
    "I": { "IF": 62, "VVS1": 59, "VVS2": 56, "VS1": 53, "VS2": 42, "SI1": 30, "SI2": 22 },
    "J": { "IF": 60, "VVS1": 57, "VVS2": 54, "VS1": 51, "VS2": 40, "SI1": 28, "SI2": 20 },
    "K": { "IF": 58, "VVS1": 55, "VVS2": 52, "VS1": 49, "VS2": 38, "SI1": 26, "SI2": 18 },
    "L": { "IF": 56, "VVS1": 53, "VVS2": 50, "VS1": 47, "VS2": 36, "SI1": 24, "SI2": 16 },
    "M": { "IF": 54, "VVS1": 51, "VVS2": 48, "VS1": 45, "VS2": 35, "SI1": 23, "SI2": 17 },
    "N": { "IF": 52, "VVS1": 49, "VVS2": 47, "VS1": 44, "VS2": 33, "SI1": 21, "SI2": 15 }
  },
  "0.04-0.07": {
    // Add price data for this range
  },
  "0.50-0.69": {
    "D": { "IF": 47, "VVS1": 43, "VVS2": 41, "VS1": 38, "VS2": 36, "SI1": 32, "SI2": 30 },
    "E": { "IF": 45, "VVS1": 41, "VVS2": 39, "VS1": 36, "VS2": 34, "SI1": 30, "SI2": 28 },
    "F": { "IF": 43, "VVS1": 39, "VVS2": 37, "VS1": 34, "VS2": 32, "SI1": 28, "SI2": 26 },
    "G": { "IF": 41, "VVS1": 37, "VVS2": 35, "VS1": 32, "VS2": 30, "SI1": 26, "SI2": 24 },
    "H": { "IF": 39, "VVS1": 35, "VVS2": 33, "VS1": 30, "VS2": 28, "SI1": 24, "SI2": 22 },
    "I": { "IF": 37, "VVS1": 33, "VVS2": 31, "VS1": 28, "VS2": 26, "SI1": 22, "SI2": 20 },
    "J": { "IF": 35, "VVS1": 31, "VVS2": 29, "VS1": 26, "VS2": 24, "SI1": 20, "SI2": 18 },
    "K": { "IF": 33, "VVS1": 29, "VVS2": 27, "VS1": 24, "VS2": 22, "SI1": 18, "SI2": 16 },
    "L": { "IF": 31, "VVS1": 27, "VVS2": 25, "VS1": 22, "VS2": 20, "SI1": 16, "SI2": 14 },
    "M": { "IF": 29, "VVS1": 25, "VVS2": 23, "VS1": 20, "VS2": 18, "SI1": 14, "SI2": 12 },
    "N": { "IF": 27, "VVS1": 23, "VVS2": 21, "VS1": 18, "VS2": 16, "SI1": 12, "SI2": 10 }
  },
};

const calculateDiamondPrice = (carat, color, clarity) => {
  let weightRange;
  if (carat <= 0.03) weightRange = "0.01-0.03";
  else if (carat <= 0.07) weightRange = "0.04-0.07";
  else if (carat <= 0.14) weightRange = "0.08-0.14";
  else if (carat <= 0.22) weightRange = "0.18-0.22";
  else if (carat <= 0.29) weightRange = "0.23-0.29";
  else if (carat <= 0.39) weightRange = "0.30-0.39";
  else if (carat <= 0.49) weightRange = "0.40-0.49";
  else if (carat <= 0.69) weightRange = "0.50-0.69";
  else if (carat <= 0.89) weightRange = "0.70-0.89";
  else weightRange = "0.90-0.99"; // Add other ranges as needed

  const pricePerCarat = rapaportPrices[weightRange][color][clarity];
  const totalPrice = pricePerCarat * 100 * carat;
  return totalPrice;
};


const colors1 = ['#253E12', '#2D9EFE'];
const colors2 = ['#fc6076', '#ff9a44'];
const colors3 = ['#40e495', '#30dd8a'];
const colors4 = ['#ff7e5f', '#feb47b'];
const colors5 = ['#596c7b', '#2a363b'];
const colors6 = ['#ff9ff3', '#ff79c6'];
const colors7 = ['#52575d', '#6e7679'];
const colors8 = ['#ffb997', '#ff6e7f'];
const colors9 = ['#5d5179', '#f3ff'];
const colors10 = ['#ff8a5b', '#ff2e63'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const CalculateDiamond = () => {
  const [form] = Form.useForm();
  const [priceData, setPriceData] = useState(0);
  const [selectedShape, setSelectedShape] = useState('ROUND');
  const [selectedColor, setSelectedColor] = useState('D');
  const [selectedClarity, setSelectedClarity] = useState('IF');
  const [carat, setInputValue] = useState(0);

  const totalPrice = calculateDiamondPrice(carat, selectedColor, selectedClarity);




  const handleFormSubmit = (values) => {
    const { carat, color, clarity } = values;
    const totalPrice = calculateDiamondPrice(parseFloat(carat), color, clarity);
    setPriceData({ fairPrice: totalPrice, carat, color, clarity });
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleClarityChange = (clarity) => {
    setSelectedClarity(clarity);
  };

  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue(value);
  };
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Title>Calculator Input</Title>
          <Form layout="vertical" className="input-form" form={form} onFinish={handleFormSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Diamond Shape" name="origin" initialValue="natural">
                  <Space>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => handleShapeChange('ROUND')}
                        style={{ background: selectedShape === 'ROUND' ? '#1890ff' : '' }}
                      >
                        ROUND
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('CUSHION')}
                        style={{ background: selectedShape === 'CUSHION' ? '#1890ff' : '' }}>
                        CUSHION
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('EMERALD')}
                        style={{ background: selectedShape === 'EMERALD' ? '#1890ff' : '' }}>
                        EMERALD
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors4.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors4).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors4).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('OVAL')}
                        style={{ background: selectedShape === 'OVAL' ? '#1890ff' : '' }}>
                        OVAL
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors5.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors5).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors5).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('PRINCESS')}
                        style={{ background: selectedShape === 'PRINCESS' ? '#1890ff' : '' }}>
                        PRINCESS
                      </Button>
                    </ConfigProvider>
                  </Space>
                  <Space>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors6.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors6).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors6).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('PEAR')}
                        style={{ background: selectedShape === 'PEAR' ? '#1890ff' : '' }}>
                        PEAR
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors7.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors7).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors7).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('RADIANT')}
                        style={{ background: selectedShape === 'RADIANT' ? '#1890ff' : '' }}>
                        RADIANT
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors8.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors8).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors8).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('MARQUISE')}
                        style={{ background: selectedShape === 'MARQUISE' ? '#1890ff' : '' }}>
                        MARQUISE
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors9.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors9).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors9).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('ASSCHER')}
                        style={{ background: selectedShape === 'ASSCHER' ? '#1890ff' : '' }}>
                        ASSCHER
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors10.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors10).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors10).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary"
                        size="large"
                        onClick={() => handleShapeChange('HEART')}
                        style={{ background: selectedShape === 'HEART' ? '#1890ff' : '' }}>
                        HEART
                      </Button>
                    </ConfigProvider>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={0.01}
                      max={0.89}
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Color Grade" name="color" rules={[{ required: true, message: 'Please select the color grade!' }]}>
                  <Radio.Group>
                    <Button value="D" onClick={() => handleColorChange('D')} style={{ background: selectedColor === 'D' ? '#1890ff' : '#fff', color: selectedColor === 'D' ? '#fff' : '#000' }}>D</Button>
                    <Button value="E" onClick={() => handleColorChange('E')} style={{ background: selectedColor === 'E' ? '#1890ff' : '#fff', color: selectedColor === 'E' ? '#fff' : '#000' }}>E</Button>
                    <Button value="F" onClick={() => handleColorChange('F')} style={{ background: selectedColor === 'F' ? '#1890ff' : '#fff', color: selectedColor === 'F' ? '#fff' : '#000' }}>F</Button>
                    <Button value="G" onClick={() => handleColorChange('G')} style={{ background: selectedColor === 'G' ? '#1890ff' : '#fff', color: selectedColor === 'G' ? '#fff' : '#000' }}>G</Button>
                    <Button value="H" onClick={() => handleColorChange('H')} style={{ background: selectedColor === 'H' ? '#1890ff' : '#fff', color: selectedColor === 'H' ? '#fff' : '#000' }}>H</Button>
                    <Button value="I" onClick={() => handleColorChange('I')} style={{ background: selectedColor === 'I' ? '#1890ff' : '#fff', color: selectedColor === 'I' ? '#fff' : '#000' }}>I</Button>
                    <Button value="J" onClick={() => handleColorChange('J')} style={{ background: selectedColor === 'J' ? '#1890ff' : '#fff', color: selectedColor === 'J' ? '#fff' : '#000' }}>J</Button>
                    <Button value="K" onClick={() => handleColorChange('K')} style={{ background: selectedColor === 'K' ? '#1890ff' : '#fff', color: selectedColor === 'K' ? '#fff' : '#000' }}>K</Button>
                    <Button value="L" onClick={() => handleColorChange('L')} style={{ background: selectedColor === 'L' ? '#1890ff' : '#fff', color: selectedColor === 'L' ? '#fff' : '#000' }}>L</Button>
                    <Button value="M" onClick={() => handleColorChange('M')} style={{ background: selectedColor === 'M' ? '#1890ff' : '#fff', color: selectedColor === 'M' ? '#fff' : '#000' }}>M</Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Clarity Grade" name="clarity" rules={[{ required: true, message: 'Please select the clarity grade!' }]}>
                  <Radio.Group>
                    <Button value="IF" onClick={() => handleClarityChange('IF')} style={{ background: selectedClarity === 'IF' ? '#1890ff' : '#fff', color: selectedClarity === 'IF' ? '#fff' : '#000' }}>IF</Button>
                    <Button value="VVS1" onClick={() => handleClarityChange('VVS1')} style={{ background: selectedClarity === 'VVS1' ? '#1890ff' : '#fff', color: selectedClarity === 'VVS1' ? '#fff' : '#000' }}>VVS1</Button>
                    <Button value="VVS2" onClick={() => handleClarityChange('VVS2')} style={{ background: selectedClarity === 'VVS2' ? '#1890ff' : '#fff', color: selectedClarity === 'VVS2' ? '#fff' : '#000' }}>VVS2</Button>
                    <Button value="VS1" onClick={() => handleClarityChange('VS1')} style={{ background: selectedClarity === 'VS1' ? '#1890ff' : '#fff', color: selectedClarity === 'VS1' ? '#fff' : '#000' }}>VS1</Button>
                    <Button value="VS2" onClick={() => handleClarityChange('VS2')} style={{ background: selectedClarity === 'VS2' ? '#1890ff' : '#fff', color: selectedClarity === 'VS2' ? '#fff' : '#000' }}>VS2</Button>
                    <Button value="SI1" onClick={() => handleClarityChange('SI1')} style={{ background: selectedClarity === 'SI1' ? '#1890ff' : '#fff', color: selectedClarity === 'SI1' ? '#fff' : '#000' }}>SI1</Button>
                    <Button value="SI2" onClick={() => handleClarityChange('SI2')} style={{ background: selectedClarity === 'SI2' ? '#1890ff' : '#fff', color: selectedClarity === 'SI2' ? '#fff' : '#000' }}>SI2</Button>
                    <Button value="SI3" onClick={() => handleClarityChange('SI3')} style={{ background: selectedClarity === 'SI3' ? '#1890ff' : '#fff', color: selectedClarity === 'SI3' ? '#fff' : '#000' }}>SI3</Button>
                    <Button value="I1" onClick={() => handleClarityChange('I1')} style={{ background: selectedClarity === 'I1' ? '#1890ff' : '#fff', color: selectedClarity === 'I1' ? '#fff' : '#000' }}>I1</Button>
                    <Button value="I2" onClick={() => handleClarityChange('I2')} style={{ background: selectedClarity === 'I2' ? '#1890ff' : '#fff', color: selectedClarity === 'I2' ? '#fff' : '#000' }}>I2</Button>
                    <Button value="I3" onClick={() => handleClarityChange('I3')} style={{ background: selectedClarity === 'I3' ? '#1890ff' : '#fff', color: selectedClarity === 'I3' ? '#fff' : '#000' }}>I3</Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">Calculate Price</Button>
            </Form.Item>
          </Form>
          <Card title="Price Information">
            {priceData && (
              <>
                <Paragraph>Carat: {priceData.carat}</Paragraph>
                <Paragraph>Color: {priceData.color}</Paragraph>
                <Paragraph>Clarity: {priceData.clarity}</Paragraph>
                <Paragraph>Fair Price: ${priceData.fairPrice.toFixed(2)}</Paragraph>
                <Paragraph>Total Price: ${totalPrice.toFixed(2)}</Paragraph>
              </>
            )}
          </Card>
        </div>
      </Content>
    </Layout >
  );
};

export default CalculateDiamond;