import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
  Upload,
  message
} from "antd";
import "antd/dist/reset.css";
import React, { useContext, useState } from "react";
import "../css/CalculateDiamond.css";

import { Option } from "antd/es/mentions";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebase/firebase";
const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;



const services = [
  { id: 1, name: "Normal - 300.000VNĐ" },
  { id: 2, name: "Vip - 450.000VNĐ" },
];

const CustomerRequest = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [service, setService] = useState(1);

  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const { user } = useContext(AuthContext);

  const handleRemove = (file) => {
    // Update the state to remove the file from the list
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    setImage("");
    return false;
  };

  // Function to upload image to Firebase
  const uploadImage = async ({ onError, onSuccess, file }) => {
    try {
      // Create a reference for the file in Firebase Storage
      const storageRef = ref(storage, "images/" + file.name);

      // Upload the file to the reference
      const snapshot = await uploadBytes(storageRef, file);

      // After a successful upload, get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      setImage(downloadURL);
      onSuccess("ok");
      // Update the fileList state with the new uploaded file
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: downloadURL,
        },
      ]);
    } catch (error) {
      console.error("Error uploading file: ", error);
      onError(error);
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: "error",
          error: { status: "error", message: "Upload failed!" },
        },
      ]);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setImage("");
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: "error",
          error: {
            status: "error",
            message: "You can only upload JPG/PNG file!",
          },
        },
      ]);
    }
    return isJpgOrPng;
  };

  const handleSubmit = () => {
    if (image === "") {
      message.error("Please upload image");
      return;
    }
    const requestData = {
      requestImage: image,
      note: note,
      userId: user?.id,
      serviceId: service,
    };
    console.log(requestData)
    handleCreateRequest(requestData);
  };

  const handleCreatePayment = async (requestId, serviceId) => {
    const paymentData =
      serviceId === 1
        ? {
          amount: 300000,
          requestId: requestId
        }
        : {
          amount: 450000,
          requestId: requestId
        };
    try {
      const response = await axios.post(
        `http://localhost:8080/api/paypal`,
        paymentData,
        {
          withCredentials: true,
        }
      );
      window.open(response.data.data, '_self')
    } catch (error) {
      console.log(error)
    }
  };

  const handleCreateRequest = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/request",
        values,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        message.success("Created success");
        const requestId = response.data.requestId
        const serviceId = values.serviceId
        handleCreatePayment(requestId, serviceId)
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Title>Valuation Request</Title>
          <Form
            layout="vertical"
            className="input-form"
            form={form}
            onFinish={handleSubmit}
          >
            <Row gutter={16} className="section-spacing">
              {/* <Col span={12}>
                <Form.Item
                  label="Origin"
                  name="diamondOrigin"
                  rules={[
                    {
                      required: true,
                      message: "Please input origin!",
                    },
                  ]}
                >
                  <Input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item name="serviceId" label="Service" initialValue={1}>
                  <Select
                    value={service}
                    onChange={(value) => setService(value)}
                  >
                    {services.map((service) => (
                      <Option value={service.id}>{service.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={16} className="section-spacing">
              <Col span={24}>
                <Form.Item
                  label="Diamond Shape"
                  name="shape"
                  initialValue="ROUND"
                >
                  <Radio.Group
                    value={selectedShape}
                    onChange={(e) => setSelectedShape(e.target.value)}
                    className="radio-group"
                  >
                    {shapes.map((shape) => (
                      <Radio.Button
                        key={shape.name}
                        value={shape.name}
                        className="radio-button"
                      >
                        <div className="radio-button-label">
                          <img
                            src={shape.img}
                            alt={shape.name}
                            className="radio-button-img"
                          />
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
                        onChange={onCaratChange}
                        value={typeof carat === "number" ? carat : 0}
                        step={0.01}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={0}
                        max={10}
                        style={{ margin: "0 16px" }}
                        step={0.01}
                        value={carat}
                        onChange={onCaratChange}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row> */}
            {/* <Row gutter={16} className="section-spacing">
              <Col span={12}>
                <Form.Item label="Color Grade" name="color" initialValue="D">
                  <Radio.Group
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="radio-group-styled"
                  >
                    {colors.map((color) => (
                      <Radio.Button
                        key={color.id}
                        value={color.name}
                        className="radio-button-styled"
                      >
                        {color.name}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Clarity Grade"
                  name="clarity"
                  initialValue="IF"
                >
                  <Radio.Group
                    value={selectedClarity}
                    className="radio-group-styled"
                  >
                    {claritys.map((clarity) => (
                      <Radio.Button
                        key={clarity.id}
                        value={clarity.name}
                        onChange={(e) => setSelectedClarity(e.target.value)}
                        className="radio-button-styled"
                      >
                        {clarity.name}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row> */}
            <Row>
              <Form.Item
                label="Request Image"
                name="requestImage"
                rules={[
                  {
                    required: true,
                    message: "Please upload image!",
                  },
                ]}
              >
                <Upload
                  maxCount={1}
                  listType="picture"
                  beforeUpload={beforeUpload}
                  customRequest={uploadImage}
                  fileList={fileList}
                  onRemove={handleRemove}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Note" name="note">
                  <TextArea
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CustomerRequest;
