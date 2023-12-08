/** @format */

import React from "react";
import { Button, Dropdown } from "antd";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

// Styles

const DropdownSytle = { fontWeight: "bold", fontSize: "20px" };
const ButtonStyle = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  fontSize: "22px",
  width: "auto",
  height: "auto",
  border: "none",
};

export default function ProfSchoolDropDown(props) {
  const items = props.items;
  const searchType = props.searchType;

  return (
    <Dropdown
      style={DropdownSytle}
      menu={{
        items,
      }}
      arrow
    >
      <Button style={ButtonStyle}>
        <span style={{ verticalAlign: "middle" }}>
          {searchType === "professor" ? <PersonSearchIcon /> : <SchoolOutlinedIcon />}
        </span>
        <span style={{ verticalAlign: "middle", marginLeft: "5px", marginBottom: "6px" }}>
          {searchType === "professor" ? "Professors" : "Schools"}
        </span>
      </Button>
    </Dropdown>
  );
}
