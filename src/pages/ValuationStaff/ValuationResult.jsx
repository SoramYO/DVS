import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";

const Request = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const getAllRequests = async () => {
            await axios
                .get("https://dvs-be-sooty.vercel.app/api/requests", { withCredentials: true })
                .then((res) => {
                    setLoading(false)
                    setRequests(res.data.requests);
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error);
                });
        };
        getAllRequests();
    }, []);

    const statusColors = {
        Pending: "blue",
        "Booked Appointment": "cyan",
        Received: "green",
        "Start Valuated": "gold",
        Valuated: "purple",
        Completed: "green",
        "Pending Locked": "orange",
        "Pending Losted": "orange",
        Losted: "grey",
        Locked: "red"
    };

    const serviceColors = {
        Vip: "black",
        Normal: "",
    };

    const statusIcons = {
        Pending: <ClockCircleOutlined />,
        "Booked Appointment": <PhoneOutlined />,
        Received: <InboxOutlined />,
        "Start Valuated": <ClockCircleOutlined />,
        Valuated: <ExclamationCircleOutlined />,
        Completed: <CheckCircleOutlined />,
        "Pending Locked": <ClockCircleOutlined />,
        "Pending Losted": <ClockCircleOutlined />,
        Losted: <MinusCircleOutlined />,
        Locked: <CloseCircleOutlined />
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
            title: "Updated Date",
            dataIndex: "updatedDate",
            key: "updatedDate",
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Process",
            key: "process",
            render: (text, record) => (
                <Tag icon={statusIcons[record.processStatus]} color={statusColors[record.processStatus]}>
                    {record.processStatus}
                </Tag>
            ),
        },
        {
            title: "Service",
            dataIndex: "serviceName",
            key: "serviceName",
            render: (record) => (
                <Tag color={serviceColors[record]}>
                    {record}
                </Tag>
            ),
        },
        {
            title: "Detail",
            key: "detail",
            render: (record) => (
                <Space size="middle">
                    <Link to={`/valuationStaff/requests/detail/${record.RequestID}`}>
                        <EditOutlined />
                    </Link>
                </Space>
            ),
        },
    ];

    const filteredRequests = requests.filter(request => {
        return request.processStatus === "Valuated";
    });


    if (loading) return <MySpin />;

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Requests Table"
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

export default Request;
