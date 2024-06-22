import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Col, FloatButton, Radio, Row, Space, Table, Tag, message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";

const TakedRequest = () => {
    const [requests, setRequests] = useState([]);
    const [serviceFilter, setServiceFilter] = useState("All");
    const [loading, setLoading] = useState(false);

    const getAllRequests = async () => {
        setLoading(true);
        await axios
            .get("https://dvs-be-sooty.vercel.app/api/take-request", { withCredentials: true })
            .then((res) => {
                setRequests(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllRequests();
    }, []);

    const handleSendToValuationStaff = async (requestId) => {
        setLoading(true);
        try {
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/send-diamond-to-valuationStaff', { requestId }, { withCredentials: true });
            if (response.data.message) {
                setLoading(false);
                message.success(response.data.message);
                getAllRequests();
            } else {
                message.error('Failed to send request to valuation staff');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error sending request to valuation staff:', error);
            message.error('Error sending request to valuation staff');
        }
    };

    const handleCustomerTookSample = async (requestId) => {
        setLoading(true);
        try {
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/customer-took-sample', { requestId }, { withCredentials: true });
            if (response.data.message) {
                setLoading(false);
                message.success(response.data.message);
                getAllRequests();
            } else {
                message.error('Failed to update request status');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating request status:', error);
            message.error('Error updating request status');
        }
    };

    const handleSealingRequest = (requestId) => async () => {
        setLoading(true);
        try {
            const requestType = "Sealing";
            const description = "Requesting for sealing request.";
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/request-approval', { requestId, requestType, description }, { withCredentials: true });
            if (response.data.message) {
                setLoading(false);
                message.success(response.data.message);
                getAllRequests(); // Refresh the requests list
            } else {
                message.error('Failed to update request status');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating request status:', error);
            message.error('Error updating request status');
        }
    };

    const handleCommitmentRequest = (requestId) => async () => {
        setLoading(true);
        try {
            const requestType = "Commitment";
            const description = "Requesting for commitment.";
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/request-approval', { requestId, requestType, description }, { withCredentials: true });
            if (response.data.message) {
                setLoading(false);
                message.success(response.data.message);
                getAllRequests();
            } else {
                message.error('Failed to update request status');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating request status:', error);
            message.error('Error updating request status');
        }
    };

    const statusColors = {
        "Pending": "blue",
        "Booked Appointment": "cyan",
        "Received": "green",
        "Approved": "gold",
        "In Progress": "gold",
        "Sent to Valuation": "purple",
        "Completed": "green",
        "Start Valuated": "gold",
        "Valuated": "purple",
        "Commitment": "orange",
        "Sealing": "orange",
        "Result Sent to Customer": "purple",
        "Received for Valuation": "cyan",
        "Sent to Consulting": "cyan",
        "Unprocessed": "red",
        "Ready for valuation": "blue",
        "Done": "green"
    };

    const serviceColors = {
        "Advanced Valuation": "black",
        "Basic Valuation": ""
    };

    const statusIcons = {
        "Pending": <ClockCircleOutlined />,
        "Booked Appointment": <PhoneOutlined />,
        "Received": <InboxOutlined />,
        "Approved": <ExclamationCircleOutlined />,
        "In Progress": <ClockCircleOutlined />,
        "Sent to Valuation": <ClockCircleOutlined />,
        "Completed": <CheckCircleOutlined />,
        "Start Valuated": <ClockCircleOutlined />,
        "Valuated": <ExclamationCircleOutlined />,
        "Commitment": <ClockCircleOutlined />,
        "Sealing": <ClockCircleOutlined />,
        "Result Sent to Customer": <ExclamationCircleOutlined />,
        "Received for Valuation": <InboxOutlined />,
        "Sent to Consulting": <InboxOutlined />,
        "Unprocessed": <MinusCircleOutlined />,
        "Ready for valuation": <CheckCircleOutlined />,
        "Done": <CheckCircleOutlined />
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "requestImage",
            key: "requestImage",
            render: (image) => (
                <img
                    src={image}
                    alt="Request"
                    style={{ width: "50px", height: "50px" }}
                />
            ),
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Finish Date",
            dataIndex: "finishDate",
            key: "finishDate",
            render: (date) => date ? new Date(date).toLocaleDateString("en-GB") : 'N/A',
        },
        {
            title: "Process",
            key: "process",
            render: (text, record) => (
                <Tag icon={statusIcons[record.processStatus]} color={statusColors[record.processStatus]}>
                    {record.processStatus || "Unprocessed"}
                </Tag>
            ),
        },
        {
            title: "Service",
            key: "service",
            render: (text, record) => (
                <Tag color={serviceColors[record.serviceName]}>
                    {record.serviceName}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "detail",
            render: (text, record) => (
                <Space size="middle">
                    {record.processStatus === "Ready for valuation" ? (
                        <Button onClick={() => handleSendToValuationStaff(record.requestId)}>
                            Send to valuation staff
                        </Button>
                    ) : record.processStatus === "Completed" ? (
                        <Button onClick={() => handleCustomerTookSample(record.requestId)}>
                            Customer Took Sample
                        </Button>
                    ) : record.processStatus === "Done" ? (
                        <Button disabled={record.processStatus === "Done"}>
                            Customer Took Sample
                        </Button>
                    ) : (
                        <Button disabled={record.processStatus === "Start Valuated" || record.processStatus === "Sent to Consulting" || record.processStatus === "Valuated"}>
                            <Link to={`/consultingStaff/takedRequest/detail/${record.requestId}`}>Receive Diamond</Link>
                        </Button>
                    )}
                </Space>
            ),
        },
        {
            title: "Another Action",
            key: "anotherAction",
            render: (text, record) => {
                const isSealing = record.finishDate && moment().diff(moment(record.finishDate), 'days') > 7 && record.processStatus === "Completed";
                const isCommitment = record.processStatus === "Completed";
                // Chỉ hiển thị nút khi cả hai điều kiện đều đúng
                if (isSealing && isCommitment) {
                    return (
                        <Button onClick={() => handleSealingRequest(record.requestId)} style={{ color: 'red' }}>
                            Sealing
                        </Button>
                    );
                } else if (!isSealing && isCommitment) {
                    // Hiển thị nút "Commitment" khi chỉ có điều kiện isCommitment đúng
                    return (
                        <Button onClick={() => handleCommitmentRequest(record.requestId)} style={{ color: 'blue' }}>
                            Commitment
                        </Button>
                    );
                } else {
                    // Trường hợp còn lại không hiển thị nút gì cả
                    return null;
                }
            },
        },

    ];

    const handleServiceFilterChange = (e) => {
        setServiceFilter(e.target.value);
    };

    const filteredRequests = requests.filter(request => {
        if (serviceFilter !== "All" && request.serviceName !== serviceFilter) {
            return false;
        }
        return true;
    });

    if (loading) {
        return <MySpin />
    }

    return (
        <div className="tabled">
            <FloatButton
                href=""
                tooltip={<div>New diamond for valuate</div>}
                badge={{
                    count: filteredRequests.length,
                    color: 'blue',
                }}
            />
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Requests Table"
                        extra={
                            <>
                                <div style={{ textAlign: "center", margin: "10px 0" }}>
                                    <Radio.Group onChange={handleServiceFilterChange} defaultValue="All" buttonStyle="solid">
                                        <Radio.Button value="All" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", margin: "5px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            All
                                        </Radio.Button>
                                        <Radio.Button value="Advanced Valuation" style={{ padding: "10px 20px", backgroundColor: "#ffc107", color: "#fff", border: "none", borderRadius: "5px", margin: "5px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            Advanced Valuation
                                        </Radio.Button>
                                        <Radio.Button value="Basic Valuation" style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", margin: "5px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            Basic Valuation
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </>
                        }
                    >
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={filteredRequests}
                                pagination={false}
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TakedRequest;
