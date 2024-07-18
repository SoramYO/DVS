import { ExceptionOutlined, FileDoneOutlined, FileOutlined, SolutionOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logoweb1.png";
const { Sider } = Layout;


const Sidebar = () => {
  return (
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        background: "#003366",
      }}
    >
      <div
      >
        <img
          // src="https://t4.ftcdn.net/jpg/02/39/44/75/360_F_239447528_qWYSonUIwGoNC290SfOBq8Gvy3x8ownV.jpg"
          src={Logo}
          alt="Logo"
          style={{ width: "80%", height: "80%", marginLeft: "20px" }}
        />
      </div>
      <Menu theme='light' defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<FileOutlined />}>
          <Link to="/consultingStaff"><strong>Orders</strong></Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ExceptionOutlined />}>
          <Link to="/consultingStaff/takedRequest"><strong>Request received</strong></Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SolutionOutlined />}>
          <Link to="/consultingStaff/finishRequest"><strong>Request Finish</strong></Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileDoneOutlined />}>
          <Link to="/consultingStaff/requestApproval"><strong>Request Approval</strong></Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileDoneOutlined />}>
          <Link to="/consultingStaff/chat"><strong>Chat</strong></Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar