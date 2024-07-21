import React, { useContext, useEffect, useState, useRef } from "react";
import "../css/CustomerRequest.css";
import axios from "axios";
import { push, ref as refDB, serverTimestamp } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MySpin from "../components/MySpin";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase/firebase";

const CustomerRequest = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [services, setServices] = useState([]);
  const [setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const [setIsAutoplay] = useState(true);
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
  },);

  if (services.length === 0) {
    return <MySpin />;
  }

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
      alert("Error uploading file: " + error);
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
      alert("You can only upload JPG/PNG file!");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      alert("Please upload image");
      return;
    }
    const requestData = {
      requestImage: image,
      note: note,
      userId: user?.id,
      serviceId: selectedServiceId,
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
        alert("Created success");
        const requestId = response.data.requestId;

        const newMessage = {
          message: `New Request Created:
            Service: ${selectedServiceName}
            Price: $${price}
            Note: ${note}`,
          sender: `${user.firstName} ${user.lastName}`,
          timestamp: serverTimestamp(),
          read: true,
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

  const handleNext = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="layout centered-layout">
      <div className="site-layout-content">
        <h1>VALUATION REQUEST</h1>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="section-spacing carousel-wrapper">
            <button
              type="button"
              onClick={handlePrev}
              className="carousel-nav-button left"
            >
              &lt;
            </button>
            <div className="carousel" ref={carouselRef}>
              {services.map((service) => (
                <div key={service.serviceId} className="service-container">
                  <button
                    type="button"
                    className={`service-button ${selectedServiceId === service.serviceId ? "selected" : ""
                      }`}
                    onClick={() => handleServiceChange(service.serviceId)}
                  >
                    {service.serviceName} ${service.price}
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="carousel-nav-button right"
            >
              &gt;
            </button>
          </div>
          <div>
            <label htmlFor="requestImage">Diamond Image</label>
            <input
              type="file"
              id="requestImage"
              name="requestImage"
              onChange={(e) => {
                const file = e.target.files[0];
                beforeUpload(file) && uploadImage({ file });
              }}
              disabled={uploading}
            />
          </div>
          <div>
            <label htmlFor="note"><strong>Note</strong></label>
            <textarea
              id="note"
              name="note"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRequest;
