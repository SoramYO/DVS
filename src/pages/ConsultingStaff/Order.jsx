import { Button, Card, Col, FloatButton, Radio, Row, Space, Table, Tag, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySpin from "../../components/MySpin";
import { serviceColors, statusColors, statusIcons } from '../../components/constants';


const Request = () => {
  const [requests, setRequests] = useState([]);
  const [serviceFilter, setServiceFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const getAllRequests = async () => {
    setLoading(true)
    await axios
      .get("https://dvs-be-sooty.vercel.app/api/new-request", { withCredentials: true })
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

  const takeRequest = async (requestId) => {
    setLoading(true)
    try {
      let response = await axios.post('https://dvs-be-sooty.vercel.app/api/take-request', { requestId }, { withCredentials: true });
      if (response.data.message) {
        setLoading(false)
        message.success(response.data.message);
        getAllRequests();
      } else {
        console.error('Failed to take request');
      }
    } catch (error) {
      setLoading(false)
      console.error('Error taking request:', error);
      console.error('Error taking request');
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
          <Button onClick={() => takeRequest(record.requestId)}>
            <Link to={`/consultingStaff/requestReceived/detail/${record.requestId}`}>Take request</Link>
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
          color: '#003366',
        }}
      />
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="REQUESTS TABLE"
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

export default Request;
