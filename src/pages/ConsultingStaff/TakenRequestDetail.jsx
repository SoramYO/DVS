import {
    ArrowLeftOutlined,
    CheckOutlined,
    InfoCircleOutlined,
    MessageOutlined,
    PrinterOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Image,
    Modal,
    Row,
    Spin,
    Typography,
    message
} from "antd";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/RequestDetail.css";
import ReceiptRequest from "./ReceiptRequest";
import SignatureModal from "./SignatureCanvas";

const { Title, Text } = Typography;

const TakenRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [signatureUrl, setSignatureUrl] = useState(null);
    const [signName, setSignName] = useState("");
    const [isDiamondReceived, setIsDiamondReceived] = useState(false);

    const getRequestDetail = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://dvs-be-sooty.vercel.app/api/requests/${id}`,
                { withCredentials: true }
            );
            setRequest(res.data.request);
        } catch (error) {
            console.error("Error fetching request detail:", error);
            console.error("Failed to fetch request detail");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getRequestDetail();
    }, [id, getRequestDetail]);

    const takeRequest = async (signatureUrl, signName) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "https://dvs-be-sooty.vercel.app/api/receive-diamond",
                { requestId: id, signatureUrl, signName },
                { withCredentials: true }
            );
            setLoading(false);
            await handlePrintSealingReportAfterSigning();
            navigate("/consultingStaff/takedRequest");
            if (response.data.message) {
                message.success(response.data.message);
                setIsDiamondReceived(true);
            } else {
                console.error("Failed to take request");
            }
        } catch (error) {
            console.error("Error taking request:", error);
            console.error("Error taking request");
        }
    };


    const handleOk = async () => {
        if (appointmentDate && new Date(appointmentDate) < new Date(request.createdDate)) {
            message.error("The appointment date cannot be before the request creation date");
            return;
        }
        try {
            await axios.put(
                `https://dvs-be-sooty.vercel.app/api/appointment`,
                { appointmentDate, id },
                { withCredentials: true }
            );
            message.success("Processing status has been updated successfully");
            await getRequestDetail();
            navigate("/consultingStaff");
        } catch (error) {
            console.error("Update failure processing status:", error);
            message.error("Failed to update processing status");
        } finally {
            navigate("/consultingStaff");
        }
    };

    const uploadSignatureToFirebase = async (signatureUrl) => {
        const byteArray = Uint8Array.from(
            atob(signatureUrl.split(",")[1]),
            (c) => c.charCodeAt(0)
        );
        try {
            const storage = getStorage();
            const storageRef = ref(storage, "signatures/" + new Date().getTime() + ".png");
            const snapshot = await uploadBytes(storageRef, byteArray);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setSignatureUrl(downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmitUploadSignature = async (signature, name) => {
        setSignName(name);
        const signatureURL = await uploadSignatureToFirebase(signature);
        setSignatureUrl(signatureURL);
        setShowSignatureModal(false);
    };



    const handlePrintSealingReportAfterSigning = async () => {
        ReceiptRequest(request, signatureUrl, signName);
    };

    const handleDateChange = (dates) => {
        setAppointmentDate(dates);
    };

    const handleBack = () => {
        navigate("/consultingStaff/takedRequest");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        takeRequest(signatureUrl, signName);
    };


    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleOpenChat = () => {
        const chatId = `${request.userId} ${request.firstName} ${request.lastName}`;
        navigate('/consultingStaff/chat', { state: { openChatId: chatId } });
    };

    if (loading) {
        return (
            <div className="loading">
                <Spin size="large" />
            </div>
        );
    }

    if (!request) {
        return <div>No request found</div>;
    }

    return (
        <div className="request-detail-container">
            <Title level={1} className="page-title">
                Valuation Request Details
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    style={{
                        width: "100px",
                        height: "50px",
                        position: "absolute",
                        top: 15,
                        right: 16,
                    }}
                />
            </Title>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Order Information" bordered={false} className="info-card">
                        <div className="info-item">
                            <Text strong>Create Date:</Text>{" "}
                            {new Date(request.createdDate).toLocaleDateString("en-GB")}
                            <InfoCircleOutlined className="info-icon" />
                        </div>
                        <div className="info-item">
                            <Text strong>Appointment Date:</Text>{" "}
                            {request.appointmentDate
                                ? new Date(request.appointmentDate)?.toLocaleDateString("en-GB")
                                : "Not yet"}
                        </div>
                        <div className="info-item">
                            <Text strong>Note:</Text> {request.note}
                        </div>
                        <div className="info-item">
                            <Text strong>Service Name:</Text> {request.serviceName}
                        </div>
                        <div className="info-item">
                            <Text strong>Process Status:</Text> {request.processStatus}
                        </div>
                    </Card>

                    <Card title="Owner Diamond Information" bordered={false} className="info-card">
                        <div className="icon-customer">
                            <UserOutlined className="icon" />
                        </div>
                        <p>
                            <Text strong>Full Name:</Text>{" "}
                            {`${request.firstName} ${request.lastName}`}
                        </p>
                        <p>
                            <Text strong>Email:</Text> {request.email}
                        </p>
                        <p>
                            <Text strong>Phone Number:</Text> {request.phone}
                        </p>
                        <Button
                            icon={<MessageOutlined />}
                            onClick={handleOpenChat}
                        >
                            Message
                        </Button>
                    </Card>

                    {request.processStatus === "Approved" ? (
                        <Card title="Select Appointment Date" bordered={false} className="info-card">
                            <Row>
                                <DatePicker
                                    picker="date"
                                    onChange={handleDateChange}
                                    format="DD/MM/YYYY"
                                    placeholder="Select Appointment Date"
                                    style={{ marginBottom: 16 }}
                                />
                            </Row>
                            <Row>
                                <Button icon={<CheckOutlined />} onClick={handleOk}>
                                    Complete Booking Appointment
                                </Button>
                            </Row>
                        </Card>
                    ) : (
                        <Card title="Confirm receive diamond" bordered={false} className="info-card">
                            {!signatureUrl ? (
                                <Button
                                    onClick={() => setShowSignatureModal(true)}
                                    style={{ backgroundColor: "#007bff", color: "#fff", border: "none" }}
                                >
                                    Sign
                                </Button>
                            ) : (
                                <Button onClick={showModal}>Receive Diamond</Button>
                            )}
                            {isDiamondReceived && (
                                <Button
                                    onClick={handlePrintSealingReportAfterSigning}
                                    style={{ backgroundColor: "#007bff", color: "#fff", border: "none" }}
                                >
                                    <PrinterOutlined /> Print Sealing Report
                                </Button>
                            )}
                        </Card>


                    )}
                </Col>

                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card title="Diamond image" bordered={false} className="info-card">
                                <Image
                                    src={request.requestImage}
                                    alt="Diamond"
                                    className="diamond-image"
                                    placeholder={<Image preview={false} src={request.requestImage} alt="Diamond" className="diamond-image" />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal
                title="Confirm Receive Diamond"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you got the diamond?</p>
            </Modal>
            <SignatureModal
                visible={showSignatureModal}
                onCancel={() => {
                    setShowSignatureModal(false);
                }}
                onSubmit={handleSubmitUploadSignature}
            />
        </div>
    );
};

export default TakenRequestDetail;
