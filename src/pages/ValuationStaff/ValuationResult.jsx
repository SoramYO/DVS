import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Card, Row, Col } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import MySpin from "../../components/MySpin";

const Request = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getAllRequests = async () => {
            await axios
                .get("http://localhost:8080/api/requests", { withCredentials: true })
                .then((res) => {
                    setRequests(res.data.requests);
                    console.log(res.data.requests);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAllRequests();
    }, []);

    const statusColors = {
        Pending: "blue",
        Approved: "green",
        Received: "cyan",
        Valuated: "purple",
        Completed: "gold",
        Locked: "red",
        Losted: "grey",
    };
    const serviceColors = {
        Vip: "black",
        Normal: "",
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
                <Tag color={statusColors[record.processStatus]}>
                    {record.processStatus}
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
            title: "Detail",
            key: "detail",
            render: (text, record) => (
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


    if (!requests.length) return <MySpin />;

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
