import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    InboxOutlined,
    MinusCircleOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Modal, Radio, Row, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../../components/MySpin";
import SealingReport from "./SealingReport";

const RequestApproval = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const getAllRequests = async () => {
            setLoading(true);
            try {
                const res = await axios.get("https://dvs-be-sooty.vercel.app/api/request-approved", { withCredentials: true });
                console.log(res.data.data);
                setLoading(false);
                setRequests(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllRequests();
    }, []);

    const statusColors = {
        Pending: "blue",
        "Booked Appointment": "cyan",
        Received: "green",
        Approved: "gold",
        "In Progress": "gold",
        "Sent to Valuation": "purple",
        Completed: "green",
        "Start Valuated": "gold",
        Valuated: "purple",
        Commitment: "orange",
        Sealing: "orange",
        "Result Sent to Customer": "purple",
        "Received for Valuation": "cyan",
        "Sent to Consulting": "cyan",
        Unprocessed: "red",
        "Ready for valuation": "blue",
        Done: "green",
    };

    const serviceColors = {
        Sealing: "red",
        Commitment: "blue",
    };

    const statusIcons = {
        Pending: <ClockCircleOutlined />,
        "Booked Appointment": <PhoneOutlined />,
        Received: <InboxOutlined />,
        Approved: <ExclamationCircleOutlined />,
        "In Progress": <ClockCircleOutlined />,
        "Sent to Valuation": <ClockCircleOutlined />,
        Completed: <CheckCircleOutlined />,
        "Start Valuated": <ClockCircleOutlined />,
        Valuated: <ExclamationCircleOutlined />,
        Commitment: <ClockCircleOutlined />,
        Sealing: <ClockCircleOutlined />,
        "Result Sent to Customer": <ExclamationCircleOutlined />,
        "Received for Valuation": <InboxOutlined />,
        "Sent to Consulting": <InboxOutlined />,
        Unprocessed: <MinusCircleOutlined />,
        "Ready for valuation": <CheckCircleOutlined />,
        Done: <CheckCircleOutlined />,
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "requestId",
            key: "requestId",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "requestImage",
            key: "requestImage",
            render: (image) => (
                <img src={image} alt="Request" style={{ width: "50px", height: "50px" }} />
            ),
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Created Date",
            dataIndex: "RequestCreatedDate",
            key: "RequestCreatedDate",
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Process",
            key: "process",
            dataIndex: "processStatus",
            render: (processStatus) => (
                <Tag icon={statusIcons[processStatus]} color={statusColors[processStatus]}>
                    {processStatus || "Unprocessed"}
                </Tag>
            ),
        },
        {
            title: "Request Type",
            key: "service",
            dataIndex: "requestType",
            render: (requestType) => (
                <Tag color={serviceColors[requestType]}>{requestType}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button type="primary" onClick={() => {
                    setSelectedRequest(record);
                    setIsModalVisible(true);
                }}>
                    View
                </Button>
            ),
        }
    ];

    const handleServiceFilterChange = (e) => {
        setServiceFilter(e.target.value);
    };

    const filteredRequests = requests.filter((request) => {
        if (filter !== "All" && request.processStatus !== filter) {
            return false;
        }
        if (serviceFilter !== "All" && request.requestType !== serviceFilter) {
            return false;
        }
        return true;
    });

    if (loading) return <MySpin />;

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Requests Table"
                        extra={
                            <div style={{ margin: "10px 0" }}>
                                <Radio.Group onChange={handleServiceFilterChange} defaultValue="All">
                                    <Radio.Button value="All">All</Radio.Button>
                                    <Radio.Button value="Sealing">Sealing</Radio.Button>
                                    <Radio.Button value="Commitment">Commitment</Radio.Button>
                                </Radio.Group>
                            </div>
                        }
                    >
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={filteredRequests}
                                pagination={{ pageSize: 10 }}
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal
                title="Sealing Report"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedRequest && <SealingReport reportData={selectedRequest} />}
            </Modal>
        </div>
    );
};

export default RequestApproval;
