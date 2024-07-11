import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MySpin from "../components/MySpin";
import { Button } from "antd";


const PaymentSucces = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  const fetchSuccess = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://dvs-be-sooty.vercel.app/api/paypalReturn?paymentId=${paymentId}&PayerID=${payerId}`,
        { withCredentials: true }
      );
      console.log(res.data)
      const requestId = res.data.data.transactions[0].item_list.items[0].sku;
      const amount = res.data.data.transactions[0].amount.total;
      const update = await axios.put(
        "https://dvs-be-sooty.vercel.app/api/payment",
        { requestId: requestId, amount: amount },
        { withCredentials: true }
      );
      if (update.status === 200) {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching success:', error);
      setLoading(false); // Ensure to set loading to false in case of an error
    }
  }, [paymentId, payerId]);

  useEffect(() => {
    fetchSuccess();
  }, []);

  if (loading) {
    return <MySpin />
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "50px" }}>Thank you for using our service.</h1>
      <div style={{display: 'flex'}}>
      <Link to={"/"}>
        <button
          style={{
            padding: "20px",
            backgroundColor: "#1677FF",
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            borderRadius: "20px",
            border: "1px solid gray",
            cursor: "pointer",
            marginRight: '20px'
          }}
        >
          Back homepage
        </button>
      </Link>
      <Link to={"/billing"}>
        <button
          style={{
            padding: "20px",
            backgroundColor: "#1677FF",
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            borderRadius: "20px",
            border: "1px solid gray",
            cursor: "pointer",
          }}
        >
          View billing
        </button>
      </Link>
      </div>
    </div>
  );
};

export default PaymentSucces;
