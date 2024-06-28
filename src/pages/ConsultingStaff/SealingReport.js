import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Layout,
    Row,
    Typography,
    Upload,
    message,
} from "antd";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState } from "react";
import "../../css/SealingReport.css";
import MySpin from "../components/MySpin";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebase/firebase";

const { Content } = Layout;
const { Title } = Typography;

const SealingReport = () => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [reportData, setReportData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        sealingDate: null,
        notes: "",
        attachedFile: "",
    });
    const { user } = useContext(AuthContext);

    const handleInputChange = (e) => {
        setReportData({ ...reportData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date, dateString) => {
        setReportData({ ...reportData, sealingDate: dateString });
    };

    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        setReportData({ ...reportData, attachedFile: "" });
        return false;
    };

    // Upload file to Firebase
    const uploadFile = async ({ onError, onSuccess, file }) => {
        try {
            const storageRef = ref(storage, "sealing-reports/" + file.name);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File available at", downloadURL);
            setReportData({ ...reportData, attachedFile: downloadURL });
            onSuccess("ok");
            setFileList([
                ...fileList,
                {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: downloadURL,
                },
            ]);
        } catch (error) {
            console.error("Error uploading file: ", error);
            onError(error);
            setFileList([
                ...fileList,
                {
                    uid: file.uid,
                    name: file.name,
                    status: "error",
                    error: { status: "error", message: "Upload failed!" },
                },
            ]);
        }
    };

    const handleSubmit = async () => {
        if (!reportData.customerName || !reportData.sealingDate) {
            message.error("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "https://dvs-be-sooty.vercel.app/api/sealing-report",
                {
                    ...reportData,
                    userId: user?.id,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                message.success("Sealing report created successfully");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message || "Error creating report");
        }
    };

    if (loading) {
        return <MySpin />;
    }

    return (
        <Layout className="layout">
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <Title>Sealing Report</Title>
                    <Form layout="vertical" className="input-form" onFinish={handleSubmit}>
                        <Row gutter={16} className="section-spacing">
                            <Col span={12}>
                                <Form.Item label="Customer Name" required>
                                    <Input
                                        name="customerName"
                                        value={reportData.customerName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Email">
                                    <Input
                                        name="customerEmail"
                                        value={reportData.customerEmail}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} className="section-spacing">
                            <Col span={12}>
                                <Form.Item label="Customer Phone">
                                    <Input
                                        name="customerPhone"
                                        value={reportData.customerPhone}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Sealing Date" required>
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        onChange={handleDateChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Notes">
                                    <Input.TextArea
                                        rows={4}
                                        name="notes"
                                        value={reportData.notes}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Item label="Attach File" name="attachedFile">
                                <Upload
                                    maxCount={1}
                                    listType="picture"
                                    beforeUpload={(file) => {
                                        const isPdf = file.type === "application/pdf";
                                        if (!isPdf) {
                                            message.error("You can only upload PDF file!");
                                        }
                                        return isPdf;
                                    }}
                                    customRequest={uploadFile}
                                    fileList={fileList}
                                    onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create Report
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default SealingReport;
