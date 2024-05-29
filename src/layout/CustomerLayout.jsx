import { Layout } from "antd";
import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const CustomerLayout = () => {
  return (
    <Layout>
      <Header />
      <Navbar />
      <Content
        style={{
          background: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default CustomerLayout;
