/** @format */

import React from "react";
import { Button, Dropdown } from "antd";

// Styles
const aTagStyle = { fontSize: "15px", fontWeight: "bold" };
const DropdownSytle = { fontWeight: "bold", fontSize: "20px" };
const ButtonStyle = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  fontSize: "20px",
  width: "auto",
  height: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingTop: "2px",
  paddingBottom: "10px",
};

// Items for redirection
const items = [
  {
    key: "1",
    label: (
      <a href='/account/profile' style={aTagStyle}>
        Profile
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a href='/account/settings' style={aTagStyle}>
        Account Settings
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a href='/account/ratings' style={aTagStyle}>
        Your Ratings
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a href='/account/saved-professors' style={aTagStyle}>
        Saved Professors
      </a>
    ),
  },
  {
    key: "5",
    label: (
      <a href='home' style={aTagStyle}>
        Logout
      </a>
    ),
  },
];


export default function UserDropDown() {
  const userName = "Hey, Penghao";

  return (
    <Dropdown
      style={DropdownSytle}
      menu={{
        items,
      }}
      arrow>
      <Button style={ButtonStyle}>{userName}</Button>
    </Dropdown>
  );
}
