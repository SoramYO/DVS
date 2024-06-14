import React from "react";
import { Link } from "react-router-dom";

const PaymentSucces = () => {
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
