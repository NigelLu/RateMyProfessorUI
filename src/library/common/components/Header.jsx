/** @format */

import React from "react";
import { useState } from "react";
import UserDropDown from "./UserDropDown";
import { Row, Col } from "antd";
import smallLogo from "../../../resources/images/small_RMP_Logo.svg";
import ProfSchoolDropDown from "./ProfSchoolDropDown";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SearchBar from "./SearchBar";

const buttonTagStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const searchBarStyle = {
  width: "auto",
  minWidth: "350px",
  borderRadius: "50px",
  height: "18px",
  fontSize: "18px",
  padding: "18px",
  marginLeft: "20px",
};

export default function Header() {
  const [school, setSchool] = useState({ name: "New York University", id:1 });
  const [schoolSearch, setSchoolSearch] = useState(false);
  const [searchType, setSearchType] = useState("professor");

  const handleSearchType = () => {
    if (searchType === "professor") {
      setSearchType("school");
    } else {
      setSearchType("professor");
    }
  };

  // This is the items of the professor / school selection drop down
  let items = [
    {
      key: "1",
      label: (
        <button href='home' style={buttonTagStyle} onClick={handleSearchType}>
          {searchType === "professor" ? "Schools" : "Professors"}
        </button>
      ),
      icon: <>{searchType === "professor" ? <SchoolOutlinedIcon /> : <PsychologyAltIcon />}</>,
    },
  ];

  // This function is to handle the onclick event of "at University" button and show the search bar for the schools
  const handleSchoolSearch = (e) => {
    e.preventDefault();
    setSchoolSearch(true);
  };

  return (
    <Row style={{ backgroundColor: "black", padding: "10px" }}>
      <Col span={2} style={{ paddingTop: "5px", paddingLeft: "15px", minWidth: "120px" }}>
        <a href='/home'>
          <img src={smallLogo} alt='' />
        </a>
      </Col>

      <Col span={18} style={{ minWidth: "900px" }}>
        <ProfSchoolDropDown items={items} searchType={searchType} />
        <SearchBar style={searchBarStyle} hasPrefix={false} searchType={searchType} current_school={school} />
        {searchType === "professor" ? (
          <span style={{ color: "white", marginLeft: "20px", fontSize: "18px" }}>
            at &nbsp;
            {schoolSearch ? (
              <SearchBar
                style={searchBarStyle}
                hasPrefix={false}
                searchType={"school"}
                setSchool={setSchool}
                setSearchType={setSearchType}
                // handle the header school search auto hidden
                schoolSearch={schoolSearch}
                setSchoolSearch={setSchoolSearch}
              />
            ) : (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={handleSchoolSearch}>
                <span style={{ textDecoration: "underline" }}>{school.name}</span>
              </button>
            )}
          </span>
        ) : (
          <></>
        )}
      </Col>

      <Col span={3}>
        <UserDropDown />
      </Col>
    </Row>
  );
}
