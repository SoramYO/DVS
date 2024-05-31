import React, { useState } from 'react';
import { Layout, Row, Col, Form, Input, Button, Typography, Radio, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faFlask } from '@fortawesome/free-solid-svg-icons';
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

const CalculateDiamond = () => {
  const [moreInputs, setMoreInputs] = useState(false);
  const [form] = Form.useForm();
  const [priceData, setPriceData] = useState(null);

  const handleFormSubmit = (values) => {
    const { carat, color, clarity } = values;
    const totalPrice = calculateDiamondPrice(parseFloat(carat), color, clarity);
    setPriceData({ fairPrice: totalPrice, carat, color, clarity });
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Title>Calculator Input</Title>
          <Form layout="vertical" className="input-form" form={form} onFinish={handleFormSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Diamond Origin" name="origin" initialValue="natural">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="natural">
                      <FontAwesomeIcon icon={faGem} /> Natural
                    </Radio.Button>
                    <Radio.Button value="labGrown">
                      <FontAwesomeIcon icon={faFlask} /> Lab Grown
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Carat Weight" name="carat" rules={[{ required: true, message: 'Please input the carat weight!' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Color Grade" name="color" rules={[{ required: true, message: 'Please select the color grade!' }]}>
                  <Radio.Group>
                    <Radio value="D">D</Radio>
                    <Radio value="E">E</Radio>
                    <Radio value="F">F</Radio>
                    <Radio value="G">G</Radio>
                    <Radio value="H">H</Radio>
                    <Radio value="I">I</Radio>
                    <Radio value="J">J</Radio>
                    <Radio value="K">K</Radio>
                    <Radio value="L">L</Radio>
                    <Radio value="M">M</Radio>
                    <Radio value="N">N</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Clarity Grade" name="clarity" rules={[{ required: true, message: 'Please select the clarity grade!' }]}>
                  <Radio.Group>
                    <Radio value="IF">IF</Radio>
                    <Radio value="VVS1">VVS1</Radio>
                    <Radio value="VVS2">VVS2</Radio>
                    <Radio value="VS1">VS1</Radio>
                    <Radio value="VS2">VS2</Radio>
                    <Radio value="SI1">SI1</Radio>
                    <Radio value="SI2">SI2</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">Calculate Price</Button>
            </Form.Item>
          </Form>
          {priceData && (
            <Card title="Price Information">
              <Paragraph>Carat: {priceData.carat}</Paragraph>
              <Paragraph>Color: {priceData.color}</Paragraph>
              <Paragraph>Clarity: {priceData.clarity}</Paragraph>
              <Paragraph>Fair Price: ${priceData.fairPrice.toFixed(2)}</Paragraph>
            </Card>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default CalculateDiamond;