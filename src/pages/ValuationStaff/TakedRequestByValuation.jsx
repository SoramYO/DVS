import {
  Button,
  Card,
  Col,
  FloatButton,
  Row,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";
import {
  serviceColors,
  statusColors,
  statusIcons,
} from "../../components/constants";

const TakedRequestByValuation = () => {
  const [requests, setRequests] = useState([]);
//   const [serviceFilter, setServiceFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const getAllRequests = async () => {
    setLoading(true);
    await axios
      .get("https://dvs-be-sooty.vercel.app/api/take-request-by-valuation", {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setRequests(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  const handleSendToConsultingStaff = async (requestId) => {
    try {
      const response = await axios.post(
        "https://dvs-be-sooty.vercel.app/api/send-valuation-result",
        { requestId },
        { withCredentials: true }
      );
      if (response.data.message) {
        setLoading(false);
        message.success(response.data.message);
        getAllRequests();
      } else {
        console.error("Failed to send request to valuation staff");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending request to valuation staff:", error);
      console.error("Error sending request to valuation staff");
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
        <Tag
          icon={statusIcons[record.processStatus]}
          color={statusColors[record.processStatus]}
        >
          {record.processStatus || "Unprocessed"}
        </Tag>
      ),
    },
    {
      title: "Service",
      key: "service",
      dataIndex: "service",
      filters: [
        {
          text: "Advanced Valuation",
          value: "Advanced Valuation",
        },
        {
          text: "Basic Valuation",
          value: "Basic Valuation",
        },
      ],
      onFilter: (value, record) => record.serviceName.indexOf(value) === 0,
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
          {record.processStatus === "Valuated" ? (
            <Button
              onClick={() => handleSendToConsultingStaff(record.requestId)}
            >
              Send to consulting staff
            </Button>
          ) : (
            <Button
              disabled={
                record.processStatus === "Sent to Consulting" ||
                record.processStatus === "Completed" ||
                record.processStatus === "Done" ||
                record.processStatus === "Rejected Commitment" ||
                record.processStatus === "Rejected Sealing" ||
                record.processStatus === "Sealing" ||
                record.processStatus === "Commitment"
              }
            >
              <Link to={`/valuationStaff/valuation/${record.requestId}`}>
                Continute valuation
              </Link>
            </Button>
          )}
        </Space>
      ),
    },
  ];

//   const handleServiceFilterChange = (e) => {
//     setServiceFilter(e.target.value);
//   };

//   const filteredRequests = requests.filter((request) => {
//     if (serviceFilter !== "All" && request.serviceName !== serviceFilter) {
//       return false;
//     }
//     return true;
//   });

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="tabled">
      <FloatButton
        href=""
        tooltip={<div>New diamond for valuate</div>}
        // badge={{
        //   count: filteredRequests.length,
        //   color: "blue",
        // }}
      />
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            // title="Requests Table"
            // extra={
            //   <>
            //     <div style={{ textAlign: "center", margin: "10px 0" }}>
            //       <Radio.Group
            //         onChange={handleServiceFilterChange}
            //         defaultValue="All"
            //         buttonStyle="solid"
            //       >
            //         <Radio.Button
            //           value="All"
            //           style={{
            //             padding: "10px 20px",
            //             backgroundColor: "#007bff",
            //             color: "#fff",
            //             border: "none",
            //             borderRadius: "5px",
            //             margin: "5px",
            //             display: "flex",
            //             justifyContent: "center",
            //             alignItems: "center",
            //           }}
            //         >
            //           All
            //         </Radio.Button>
            //         <Radio.Button
            //           value="Advanced Valuation"
            //           style={{
            //             padding: "10px 20px",
            //             backgroundColor: "#ffc107",
            //             color: "#fff",
            //             border: "none",
            //             borderRadius: "5px",
            //             margin: "5px",
            //             display: "flex",
            //             justifyContent: "center",
            //             alignItems: "center",
            //           }}
            //         >
            //           Advanced Valuation
            //         </Radio.Button>
            //         <Radio.Button
            //           value="Basic Valuation"
            //           style={{
            //             padding: "10px 20px",
            //             backgroundColor: "#6c757d",
            //             color: "#fff",
            //             border: "none",
            //             borderRadius: "5px",
            //             margin: "5px",
            //             display: "flex",
            //             justifyContent: "center",
            //             alignItems: "center",
            //           }}
            //         >
            //           Basic Valuation
            //         </Radio.Button>
            //       </Radio.Group>
            //     </div>
            //   </>
            // }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={requests}
                pagination={{ pageSize: 10 }}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TakedRequestByValuation;
