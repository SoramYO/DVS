import React, { useState, useContext } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Button,
  Typography,
  Radio,
  Slider,
  InputNumber,
  Input,
  Upload,
  message,
  Select,
} from "antd";
import "antd/dist/reset.css";
import "../css/CalculateDiamond.css";
import { UploadOutlined } from "@ant-design/icons";

import roundImg from "../assets/imgs/round.png";
import cushionImg from "../assets/imgs/cushion.png";
import emeraldImg from "../assets/imgs/emerald.png";
import ovalImg from "../assets/imgs/oval.png";
import princessImg from "../assets/imgs/princess.png";
import pearImg from "../assets/imgs/pear.png";
import radiantImg from "../assets/imgs/radiant.png";
import marquiseImg from "../assets/imgs/marquise.png";
import asscherImg from "../assets/imgs/asscher.png";
import heartImg from "../assets/imgs/heart.png";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

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
  { name: "HEART", img: heartImg },
];

const colors = [
  { id: 1, name: "D" },
  { id: 2, name: "E" },
  { id: 3, name: "F" },
  { id: 4, name: "G" },
  { id: 5, name: "H" },
  { id: 6, name: "I" },
  { id: 7, name: "J" },
  { id: 8, name: "K" },
  { id: 9, name: "L" },
  { id: 10, name: "M" },
  { id: 11, name: "N" },
];

const claritys = [
  { id: 1, name: "IF" },
  { id: 2, name: "VVS1" },
  { id: 3, name: "VVS2" },
  { id: 4, name: "VS1" },
  { id: 5, name: "VS2" },
  { id: 6, name: "SI1" },
  { id: 7, name: "SI2" },
  { id: 8, name: "SI3" },
  { id: 9, name: "I1" },
  { id: 10, name: "I2" },
  { id: 11, name: "I3" },
];

const services = [
  { id: 1, name: "Normal" },
  { id: 2, name: "Vip" },
];

const CustomerRequest = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [selectedShape, setSelectedShape] = useState("ROUND");
  const [selectedColor, setSelectedColor] = useState("D");
  const [selectedClarity, setSelectedClarity] = useState("IF");
  const [service, setService] = useState(1);
  const [carat, setCarat] = useState(0.01);
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const onCaratChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setCarat(value);
  };
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
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
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
      shape: selectedShape,
      color: selectedColor,
      clarity: selectedClarity,
      caratWeight: carat,
      requestImage: image,
      diamondOrigin: origin,
      note: note,
      userId: user?.id,
      serviceId: service,
    };
    handleCreateRequest(requestData)
  };
  const handleCreateRequest = async(values) => {
    axios
    .post("https://dvs-be-sooty.vercel.app/api/createNewRequest", values, {
      withCredentials: true,
    })
    .then((res) => {
      message.success("Created successfully");
      navigate("/");
    })
    .catch((error) => {
      message.error(error.response.data.message);
    });
  }
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
              <Col span={12}>
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
              </Col>
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
            <Row gutter={16} className="section-spacing">
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
            </Row>
            <Row gutter={16} className="section-spacing">
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
            </Row>
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
