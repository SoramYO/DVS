import { Button, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MySpin from "../components/MySpin";

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

  const handleCreatePayment = async (requestId, amount) => {
    setLoading(true);
    try {
      console.log(requestId, amount);
      const response = await axios.post(
        `https://dvs-be-sooty.vercel.app/api/paypal`,
        { amount, requestId },
        {
          withCredentials: true,
        }
      );

      window.open(response.data.data, '_self');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
        <span>{`${amount.toLocaleString()} $`}</span>
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
        <Tag color={status === "Paid" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "continuePay",
      render: (_, record) =>
        record.paymentStatus === "Pending" ? (
          <Button
            type="primary"
            onClick={() => handleCreatePayment(record.id, record.paymentAmount)}
          >
            Continue Pay
          </Button>
        ) : null,
    },
  ];

  if (loading) {
    return <MySpin />;
  }

  return (
    <div
      style={{
        width: "100vw",
        paddingTop: "50px",
        paddingLeft: "20px",
        paddingRight: "50px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Your Billings</h1>
      <Table columns={columns} dataSource={billings} rowKey="id" />
    </div>
  );
};

export default Billing;
