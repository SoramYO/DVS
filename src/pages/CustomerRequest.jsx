import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import "antd/dist/reset.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/CustomerRequest.css";

import axios from "axios";
import { push, ref as refDB, serverTimestamp } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MySpin from "../components/MySpin";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase/firebase";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const CustomerRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const [isAutoplay, setIsAutoplay] = useState(true);
  const { user } = useContext(AuthContext);
  const carouselRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const chatId = `${user.id} ${user.firstName} ${user.lastName}`;

  const getAllServices = async () => {
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

  if (services.length === 0) {
    return <MySpin />
  }

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    setImage("");
    return false;
  };

  const uploadImage = async ({ onError, onSuccess, file }) => {
    setUploading(true);
    try {
      const storageRef = ref(storage, "images/" + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
      onSuccess("ok");
      setFileList([
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
        {
          uid: file.uid,
          name: file.name,
          status: "error",
          error: { status: "error", message: "Upload failed!" },
        },
      ]);
    } finally {
      setUploading(false);
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

        const newMessage = {
          message: `New Request Created:
            Service: ${selectedServiceName}
            Price: $${price}
            Note: ${note}`,
          sender: `${user.firstName} ${user.lastName}`,
          timestamp: serverTimestamp(),
          read: true
        };

        // Gửi tin nhắn lên Firebase
        push(refDB(db, `messages/${chatId}`), newMessage);
        // Tiếp tục với quá trình thanh toán
        handleCreatePayment(requestId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleServiceChange = (serviceId) => {
    const selectedService = services.find(
      (service) => service.serviceId === serviceId
    );
    if (selectedService) {
      setPrice(selectedService.price);
      setSelectedServiceId(selectedService.serviceId);
      setSelectedServiceName(selectedService.serviceName);
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
                  <Spin spinning={loading}>
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
                        <div key={service.serviceId} className="service-container">
                          <Button
                            className={`service-button ${selectedServiceId === service.serviceId ? "selected" : ""
                              }`}
                            onClick={() => handleServiceChange(service.serviceId)}
                          >
                            {service.serviceName} ${service.price}
                          </Button>
                        </div>
                      ))}
                    </Carousel>
                  </Spin>
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
                <Spin spinning={uploading}>
                  <Upload
                    maxCount={1}
                    listType="picture"
                    beforeUpload={beforeUpload}
                    customRequest={uploadImage}
                    fileList={fileList}
                    onRemove={handleRemove}
                    disabled={uploading}
                  >
                    <Button icon={<UploadOutlined />} disabled={uploading}>
                      {uploading ? 'Uploading...' : 'Click to Upload'}
                    </Button>
                  </Upload>
                </Spin>
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
