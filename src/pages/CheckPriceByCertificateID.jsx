import { Button, Card, Form, Image, Input, Typography, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CheckPriceID.css";

const { Title, Paragraph } = Typography;

const CheckPriceByCertificateID = () => {
  const [form] = Form.useForm();
  const [priceData, setPriceData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleReset = () => {
    form.resetFields();
    setPriceData(null);
    setNotFound(false);
  };

  const handleCheckPrice = async () => {
    try {
      setLoading(true);
      const certificateId = form.getFieldValue("certificateId");
      const response = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/estimate-diamond-value-by-certificate",
        {
          certificateId,
        }
      );
      // Display success message
      message.success(response.data.message);

      // Extract estimated price from API response
      const { errCode } = response.data;
      if (errCode === 2) {
        setNotFound(true);
        setPriceData(null);
      } else {
        const { estimatedPrice, image } = response.data.diamond;
        setImage(image);
        setNotFound(false);
        setPriceData({ estimatedPrice });
      }
    } catch (error) {
      message.error("Error checking diamond price by certificate ID:", error);
      setPriceData(null);
      setNotFound(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkPriceContainer">
      <div className="buttonContainer" style={{ marginBottom: "16px" }}>
        <Link to="/calculateDiamond">
          <Button style={{backgroundColor: 'black', color: 'white'}}>
            Calculate Diamond
          </Button>
        </Link>
        <Link to="/checkPriceByCertificateID">
          <Button
            className="calculate-btn"
            style={{backgroundColor: 'black', color: 'white'}}
          >
            Check Price by Certificate ID
          </Button>
        </Link>
      </div>
      <div className="cardContainer">
        <Card title="Check Diamond Price by Certificate ID">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Certificate ID"
              name="certificateId"
              rules={[
                { required: true, message: "Please enter Certificate ID!" },
              ]}
            >
              <Input placeholder="Enter Certificate ID" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                onClick={handleCheckPrice}
                style={{backgroundColor: 'black', color: 'white'}}
              >
                Check Price
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset} className="check-price-btn">
                Reset
              </Button>
            </Form.Item>
          </Form>
          {notFound && (
            <div className="resultCard">
              <Title level={4}>Diamond Price Details</Title>
              <Paragraph className="result-card-price">
                No matching diamond found with the provided Certificate ID.
              </Paragraph>
            </div>
          )}
          {priceData && (
            <div className="resultCard">
              <Title level={4}>Diamond Price Details</Title>
              <Paragraph className="result-card-price">
                Estimated Price: $
                {priceData.estimatedPrice
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Paragraph>
              <Image src={image} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CheckPriceByCertificateID;
