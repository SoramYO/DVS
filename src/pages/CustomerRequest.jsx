import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  Upload,
  message,
} from "antd";
import "antd/dist/reset.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/CustomerRequest.css";

import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MySpin from "../components/MySpin";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebase/firebase";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const CustomerRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const [isAutoplay, setIsAutoplay] = useState(true);
  const { user } = useContext(AuthContext);
  const carouselRef = useRef(null);

  const getAllServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://dvs-be-sooty.vercel.app/api/user-service",
        { withCredentials: true }
      );
      setLoading(false);
      setServices(res.data.services.data);
      if (res.data.services.data.length > 0) {
        const defaultService = res.data.services.data[0];
        setSelectedService(defaultService.id);
        setPrice(defaultService.price);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    setImage("");
    return false;
  };

  const uploadImage = async ({ onError, onSuccess, file }) => {
    try {
      const storageRef = ref(storage, "images/" + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
      onSuccess("ok");
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
      message.error("Error uploading file: ", error);
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
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
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
      serviceId: selectedService,
    };
    handleCreateRequest(requestData);
  };

  const handleCreatePayment = async (requestId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/paypal",
        { amount: price, requestId: requestId },
        { withCredentials: true }
      );
      window.open(response.data.data, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateRequest = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/request",
        values,
        { withCredentials: true }
      );
      if (response.status === 200) {
        message.success("Created success");
        const requestId = response.data.requestId;
        handleCreatePayment(requestId);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };

  const handleServiceChange = (serviceId) => {
    const selectedService = services.find((service) => service.id === serviceId);
    if (selectedService) {
      setSelectedService(selectedService.id);
      setPrice(selectedService.price);
      setIsAutoplay(false);
    }
  };

  if (loading) {
    return <MySpin />;
  }

  return (
    <Layout className="layout centered-layout">
      <Content>
        <div className="site-layout-content">
          <Title>VALUATION REQUEST</Title>
          <Form
            layout="vertical"
            className="input-form"
            form={form}
            onFinish={handleSubmit}
          >
            <Row gutter={16} className="section-spacing">
              <Col span={24}>
                <div className="carousel-wrapper">
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => carouselRef.current.prev()}
                    className="carousel-nav-button left"
                  />
                  <Carousel
                    dots={true}
                    slidesToShow={4}
                    slidesToScroll={1}
                    autoplay={isAutoplay}
                    autoplaySpeed={2000}
                    arrows={false}
                    ref={carouselRef}
                  >
                    {services.map((service) => (
                      <div key={service.id} className="service-container">
                        <Button
                          className={`service-button ${selectedService === service.id ? "selected" : ""
                            }`}
                          onClick={() => handleServiceChange(service.id)}
                        >
                          {service.serviceName} ${service.price}
                        </Button>
                      </div>
                    ))}
                  </Carousel>
                  <Button
                    icon={<RightOutlined />}
                    onClick={() => carouselRef.current.next()}
                    className="carousel-nav-button right"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Form.Item
                label="Diamond Image"
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
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="send-button"
              >
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
