/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { Tabs } from "antd";
import SelfHeader from "../../library/common/components/Header";
import { ProfileOutlined, SettingOutlined, StarOutlined, HeartOutlined } from '@ant-design/icons';

// Tab items
const items = [
  {
    key: "1",
    label: <span><ProfileOutlined/>Profile</span>,
  },
  {
    key: "2",
    label: <span><SettingOutlined />Account Settings</span>,
  },
  {
    key: "3",
    label: <span><StarOutlined/>Ratings</span>,
  },
  {
    key: "4",
    label: <span><HeartOutlined/>Saved Professors</span>,
  },
];

const MainContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const pStyle = {
  width: "40%",
  minWidth: "400px",
  fontSize: "32px",
  fontWeight: "1000",
  fontFamily: "Poppins, sans-serif",
  marginTop: "100px",
};

export default function ProfilePage() {
  const user = { name: "Penghao" };
  const navigate = useNavigate();
  const [key, setKey] = useState("1")

  const handleTabsChange = (key) => {
    if (key === "1") {
      navigate("/account/profile");
    } else if (key === "2") {
      navigate("/account/settings");
    } else if (key === "3") {
      navigate("/account/ratings");
    } else if (key === "4") {
      navigate("/account/saved-professors");
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/account" || window.location.pathname === "/account/") {
      navigate("/account/profile");
    }
    if (window.location.pathname.includes("profile")) {
        setKey("1")
    }
    else if (window.location.pathname.includes("settings")) {
        setKey("2")
    }
    else if (window.location.pathname.includes("ratings")) {
        setKey("3")
    }
    else if (window.location.pathname.includes("saved-professors")) {
        setKey("4")
    }
  }, [navigate]);

  return (
    <div>
      <SelfHeader />
      <div className='MainContent' style={MainContentStyle}>
        {/* name display */}
        <p style={pStyle}>Hey, {user.name}</p>

        {/* tabs */}
        <Tabs
          activeKey={key}
          tabBarGutter={60}
          items={items}
          size='large'
          onChange={handleTabsChange}
          style={{
            width: "40%",
            minWidth: "400px",
          }}></Tabs>

        {/* content */}
        <Outlet />
      </div>
    </div>
  );
}
