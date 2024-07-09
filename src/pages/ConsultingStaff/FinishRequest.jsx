import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, InboxOutlined, MinusCircleOutlined, PhoneOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, FloatButton, Radio, Row, Space, Table, Tag, message } from "antd";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from "react";
import MySpin from "../../components/MySpin";
import SignatureModal from "./SignatureCanvas";
import handlePrintValuationPaper from "./printValuation";
const FinishRequest = () => {
    const [requests, setRequests] = useState([]);
    const [serviceFilter, setServiceFilter] = useState("All");
    const [loading, setLoading] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [signatureUrl, setSignatureUrl] = useState(null);
    const [signName, setSignName] = useState('');
    const [recordForPrint, setRecordForPrint] = useState(null);

    const getAllRequests = async () => {
        setLoading(true)
        try {
            const res = await axios.get("https://dvs-be-sooty.vercel.app/api/finished-request", { withCredentials: true });
            setRequests(res.data.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        getAllRequests();
    }, []);

    const handleSendToCustomer = async (requestId) => {
        setLoading(true)
        try {
            const response = await axios.post('https://dvs-be-sooty.vercel.app/api/send-valuation-result-customer', { requestId }, { withCredentials: true });
            const sendMailResponse = await axios.post('https://dvs-be-sooty.vercel.app/api/notification-valuation-success', { requestId }, { withCredentials: true });
            if (response.data.message && sendMailResponse.data.message) {
                setLoading(false)
                message.success(response.data.message && sendMailResponse.data.message);
                getAllRequests(); // Refresh the requests list
            } else {
                message.error('Failed to send result to customer');
            }
        } catch (error) {
            setLoading(false);
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
    const renderActionButtons = (text, record) => {
        if (signName !== '' && signatureUrl !== null) {
            return (
                <Button
                    onClick={() => handlePrintValuationPaper(record, signatureUrl, signName)}
                    style={{ backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                >
                    <PrinterOutlined /> Print Sealing Report
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => {
                        setShowSignatureModal(true);
                        setRecordForPrint(record); // Set record for print
                    }}
                    style={{ backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                >
                    Sign
                </Button>
            );
        }
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
                    style={{ width: "50px", height: "50px", borderRadius: 180 }}
                />
            ),
        },
        // {
        //     title: "Note",
        //     dataIndex: "note",
        //     key: "note",
        // },
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
                    <Button onClick={() => handleSendToCustomer(record.requestId)}>
                        Send Result To Customer
                    </Button>
                </Space>
            ),
        },
        {
            key: 'action',
            render: renderActionButtons,
        },
    ];


    const uploadSignatureToFirebase = async (signatureUrl) => {
        const byteArray = Uint8Array.from(atob(signatureUrl.split(',')[1]), c => c.charCodeAt(0));
        try {
            const storage = getStorage();
            const storageRef = ref(storage, 'signatures/' + new Date().getTime() + '.png');
            const snapshot = await uploadBytes(storageRef, byteArray);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setSignatureUrl(downloadURL);
            console.log('Signature uploaded:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handlesubmitUploadSignature = async (signature, name) => {
        setSignName(name); // Set signName state with name input
        await uploadSignatureToFirebase(signature);
    };

    const handlePrintSealingReportAfterSigning = async () => {
        // Check if all necessary data is available
        if (recordForPrint && signatureUrl && signName) {
            handlePrintValuationPaper(recordForPrint, signatureUrl, signName);
        } else {
            console.warn('Cannot print sealing report: Missing data.');
        }
    };

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
                        // title="Requests Table"
                        extra={
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
            <SignatureModal
                visible={showSignatureModal}
                onCancel={() => {
                    setShowSignatureModal(false);
                    setRecordForPrint(null); // Reset record for print when modal closes
                }}
                onSubmit={handlesubmitUploadSignature}
            />
            {recordForPrint && (
                <Button
                    onClick={handlePrintSealingReportAfterSigning}
                    style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', marginTop: '10px' }}
                >
                    <PrinterOutlined /> Print Sealing Report
                </Button>
            )}
        </div>
    );
};

export default FinishRequest;
