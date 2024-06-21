import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Col, FloatButton, Radio, Row, Space, Table, Tag, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FinishRequest = () => {
    const [requests, setRequests] = useState([]);
    const [serviceFilter, setServiceFilter] = useState("All");

    const getAllRequests = async () => {
        try {
            const res = await axios.get("https://dvs-be-sooty.vercel.app/api/finished-request", { withCredentials: true });
            setRequests(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllRequests();
    }, []);

    const handleSendToCustomer = async (requestId) => {
        try {
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/send-valuation-result-customer', { requestId }, { withCredentials: true });
            if (response.data.message) {
                message.success(response.data.message);
                getAllRequests(); // Refresh the requests list
            } else {
                message.error('Failed to send result to customer');
            }
        } catch (error) {
            console.error('Error sending result to customer:', error);
            message.error('Error sending result to customer');
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
        "Ready for valuation": "blue"
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
        "Ready for valuation": <CheckCircleOutlined />
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
                    <Button onClick={() => handleSendToCustomer(record.requestId)} >
                        Send Result To Customer
                    </Button>
                </Space>
            ),
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
                            <div style={{ textAlign: "center", margin: "10px 0" }}>
                                <Radio.Group onChange={handleServiceFilterChange} defaultValue="All" buttonStyle="solid">
                                    <Radio.Button value="All" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", margin: "5px" }}>
                                        All
                                    </Radio.Button>
                                    <Radio.Button value="Advanced Valuation" style={{ padding: "10px 20px", backgroundColor: "#ffc107", color: "#fff", border: "none", borderRadius: "5px", margin: "5px" }}>
                                        Advanced Valuation
                                    </Radio.Button>
                                    <Radio.Button value="Basic Valuation" style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", margin: "5px" }}>
                                        Basic Valuation
                                    </Radio.Button>
                                </Radio.Group>
                            </div>
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

export default FinishRequest;
