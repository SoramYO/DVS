import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PaymentSucces = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  const fetchSuccess = async () => {
    const res = await axios.get(
      `https://dvs-be-sooty.vercel.app/api/paypalReturn?paymentId=${paymentId}&PayerID=${payerId}`,
      { withCredentials: true }
    );
    const requestId = res.data.data.transactions[0].item_list.items[0].sku;
    console.log(requestId)
    const update = await axios.put(
      "https://dvs-be-sooty.vercel.app/api/payment",
      { requestId: requestId },
      { withCredentials: true }
    );
    console.log(update)
  };
  useEffect(() => {
    fetchSuccess();
  }, []);

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
          }}
        >
          Back homepage
        </button>
      </Link>
    </div>
  );
};

export default PaymentSucces;
