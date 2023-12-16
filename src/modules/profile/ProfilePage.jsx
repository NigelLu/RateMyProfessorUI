/** @format */

import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import SelfHeader from "../../library/common/components/Header";
import RequireLoggedIn from "../../library/common/components/RequireLoggedIn";
import { ProfileOutlined, StarOutlined, HeartOutlined } from "@ant-design/icons";

// Tab items
const items = [
  {
    key: "1",
    label: (
      <span>
        <ProfileOutlined />
        Profile
      </span>
    ),
  },
  // {
  //   key: "2",
  //   label: (
  //     <span>
  //       <SettingOutlined />
  //       Account Settings
  //     </span>
  //   ),
  // },
  {
    key: "3",
    label: (
      <span>
        <StarOutlined />
        Ratings
      </span>
    ),
  },
  {
    key: "4",
    label: (
      <span>
        <HeartOutlined />
        Saved Professors
      </span>
    ),
  },
];

const MainContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const pStyle = {
  width: "50%",
  minWidth: "400px",
  fontSize: "32px",
  fontWeight: "900",
  fontFamily: "Poppins, sans-serif",
  marginTop: "100px",
};

export default function ProfilePage() {
  const user = { name: localStorage.getItem("firstName") };
  const navigate = useNavigate();
  const [key, setKey] = useState("1");

  const handleTabsChange = (key) => {
    switch (key) {
      case "1":
        navigate("/account/profile");
        break;
      // case "2":
      //   navigate("/account/settings");
      //   break;
      case "3":
        navigate("/account/ratings");
        break;
      case "4":
        navigate("/account/saved-professors");
        break;
      default:
        navigate("/account/profile");
    }
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/account":
      case "/account/":
        navigate("/account/profile");
        break;
      case "/account/profile":
      case "/account/profile/":
        setKey("1");
        break;
      // case "/account/settings":
      // case "/account/settings/":
      //   setKey("2");
      //   break;
      case "/account/ratings":
      case "/account/ratings/":
        setKey("3");
        break;
      case "/account/saved-professors":
      case "/account/saved-professors/":
        setKey("4");
        break;
      default:
        navigate("/account/profile");
    }
  }, [navigate]);

  return (
    <div>
      <SelfHeader />
      <div className='MainContent' style={MainContentStyle}>
        {/* name display */}
        <p style={pStyle}>Hey, {user.name}</p>
        {/* component to check login status and navigate back to login page if not logged in */}
        <RequireLoggedIn />
        {/* tabs */}
        <Tabs
          activeKey={key}
          tabBarGutter={60}
          items={items}
          size='large'
          onChange={handleTabsChange}
          style={{
            width: "50%",
            minWidth: "400px",
          }}
        ></Tabs>

        {/* content */}
        <Outlet />
      </div>
    </div>
  );
}
