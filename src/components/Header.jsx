import {
  DownOutlined,
  MailFilled,
  PhoneFilled,
  TwitchFilled,
} from "@ant-design/icons";
import React from "react";
import "../css/Header.css";
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <div className="languageIcon">
          <img src="../assets/language.png" alt="" className="languageIconImage" />
        </div>
        <DownOutlined className="downIcon" />
        <h4>English</h4>
      </div>
      <div className="headerRight">
        <TwitchFilled className="headerIcon" />
        <MailFilled className="headerIcon" />
        <PhoneFilled className="headerIcon" />
        <h5>0032-3-233-91-60</h5>
      </div>
    </div>
  );
};

export default Header;
