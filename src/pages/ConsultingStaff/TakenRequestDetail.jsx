import {
    ArrowLeftOutlined,
    CheckOutlined,
    InfoCircleOutlined,
    PrinterOutlined,
    UserOutlined,
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
    message,
} from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/RequestDetail.css";
import ReceiptRequest from "../ConsultingStaff/ReceiptRequest";

const { Title, Text } = Typography;

const TakenRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getRequestDetail = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://dvs-be-sooty.vercel.app/api/requests/${id}`,
                { withCredentials: true }
            );
            console.log(res.data.request[0]);
            setRequest(res.data.request[0]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getRequestDetail();
    }, [id, getRequestDetail]);

    const takeRequest = async () => {
        try {
            let response = await axios.post(
                "https://dvs-be-sooty.vercel.app/api/receive-diamond",
                { requestId: id },
                { withCredentials: true }
            );
            if (response.data.message) {
                message.success(response.data.message);
            } else {
                message.error("Failed to take request");
            }
            navigate("/consultingStaff/takedRequest");
        } catch (error) {
            console.error("Error taking request:", error);
            message.error("Error taking request");
        }
    };

    const handleOk = async () => {
        if (
            appointmentDate &&
            new Date(appointmentDate) < new Date(request.createdDate)
        ) {
            message.error("Ngày hẹn không thể trước ngày tạo yêu cầu");
            return;
        }
        try {
            await axios.put(
                `https://dvs-be-sooty.vercel.app/api/appointment`,
                { appointmentDate, id },
                { withCredentials: true }
            );
            message.success("Trạng thái xử lý đã được cập nhật thành công");
            getRequestDetail();
        } catch (error) {
            message.error("Cập nhật trạng thái xử lý thất bại");
        }
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
        takeRequest();
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
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
                Chi Tiết Yêu Cầu Định Giá
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
                    <Card
                        title="Thông tin đơn hàng"
                        bordered={false}
                        className="info-card"
                    >
                        <div className="info-item">
                            <Text strong>Ngày tạo:</Text>{" "}
                            {new Date(request.createdDate).toLocaleDateString("en-GB")}
                            <InfoCircleOutlined className="info-icon" />
                        </div>
                        <div className="info-item">
                            <Text strong>Ngày hẹn:</Text>{" "}
                            {request.appointmentDate
                                ? new Date(request.appointmentDate)?.toLocaleDateString("en-GB")
                                : "Chưa có"}
                        </div>
                        <div className="info-item">
                            <Text strong>Ghi chú:</Text> {request.note}
                        </div>
                        <div className="info-item">
                            <Text strong>Loại dịch vụ:</Text> {request.serviceName}
                        </div>
                        <div className="info-item">
                            <Text strong>Trạng thái xử lý:</Text> {request.processStatus}
                        </div>
                    </Card>

                    <Card
                        title="Thông tin chủ kim cương"
                        bordered={false}
                        className="info-card"
                    >
                        <div className="icon-customer">
                            <UserOutlined className="icon" />
                        </div>
                        <p>
                            <Text strong>Họ và tên:</Text>{" "}
                            {`${request.firstName} ${request.lastName}`}
                        </p>
                        <p>
                            <Text strong>Email:</Text> {request.email}
                        </p>
                        <p>
                            <Text strong>Số điện thoại:</Text> {request.phone}
                        </p>
                    </Card>

                    {request.processStatus === "Approved" ? (
                        <Card title="Chọn ngày hẹn" bordered={false} className="info-card">
                            <Row>
                                <DatePicker
                                    picker="date"
                                    onChange={handleDateChange}
                                    format="DD/MM/YYYY"
                                    placeholder="Chọn ngày hẹn"
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
                        <Card
                            title="Confirm receive diamond"
                            bordered={false}
                            className="info-card"
                        >
                            <Button onClick={showModal}>Receive Diamond</Button>
                            <> </>
                            <Button
                                onClick={() => ReceiptRequest(request)}
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                }}
                            >
                                <PrinterOutlined /> Print Valuation
                            </Button>
                        </Card>
                    )}
                </Col>

                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card
                                title="Ảnh kim cương"
                                bordered={false}
                                className="info-card"
                            >
                                <Image
                                    src={request.requestImage}
                                    alt="Diamond"
                                    className="diamond-image"
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src={request.requestImage}
                                            alt="Diamond"
                                            className="diamond-image"
                                        />
                                    }
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
                <p>Bạn chắc chắn đã nhận viên kim cương?</p>
            </Modal>
        </div>
    );
};

export default TakenRequestDetail;
