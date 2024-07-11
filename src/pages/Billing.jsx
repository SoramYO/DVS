import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../components/MySpin";
import { Table, Tag } from "antd";

const Billing = () => {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBillings = async () => {
    setLoading(true);
    await axios
      .get("https://dvs-be-sooty.vercel.app/api/user-bill", {
        withCredentials: true,
      })
      .then((res) => {
        setBillings(res.data.userbills.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBillings();
  }, []);
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (amount) => (
        <span>{`${(amount * 1000).toLocaleString()} VNĐ`}</span>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Status",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  if (loading) {
    return <MySpin />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        paddingTop: "50px",
        paddingLeft: "20px",
        paddingRight: "50px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Your Billings</h1>
      <Table columns={columns} dataSource={billings} />
    </div>
  );
};

export default Billing;
