/** @format */

import React from "react";
import { useState } from "react";
import { Layout } from "antd";
import UserDropDown from "../../library/common/components/UserDropDown";
import bigLogo from "../../resources/images/big_RMP_Logo.svg";
import backgroundImage from "../../resources/images/background.jpg";
import SearchBar from "../../library/common/components/SearchBar";
import smallLogo from "../../resources/images/small_RMP_Logo.svg";

const { Header, Content } = Layout;

const contentStyle = {
  marginTop: "180px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "100%",
  overflow: "hidden",
};

const backgroundDivStyle = {
  width: "100%",
  height: "500px",
  background: backgroundImage ? `url(${backgroundImage})` : "none", // Use the backgroundImage variable if available
  backgroundSize: "cover",
  backgroundPosition: "center",
  clipPath: "inset(0 0 0 0)", // Adjust the inset values as needed
};

const autoCompleteStyle = {
  marginTop: "30px",
  marginBottom: "30px",
};

const searchBarStyle = {
  minWidth: "550px",
  borderRadius: "50px",
  height: "60px",
  fontSize: "22px",
  paddingLeft: "20px",
};

// for darker background
const coverStyle = {
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.55)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Home() {
  const [school, setSchool] = useState({ name: "New York University", id: 1 });
  const [searchType, setSearchType] = useState("professor");

  const handleSearchType = () => {
    if (searchType === "professor") {
      setSearchType("school");
    } else {
      setSearchType("professor");
    }
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header style={{ backgroundColor: "transparent", marginTop: "12px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <a href='home'>
              <img src={smallLogo} alt='' style={{ backgroundColor: "black", padding: "5px" }} />
            </a>

            <UserDropDown />
        </div>
      </Header>

      <Content style={contentStyle}>
        <div style={backgroundDivStyle}>
          <div style={coverStyle}>
            <img src={bigLogo} alt='' style={{ height: "60px", width: "auto", marginTop: "80px" }} />

            {searchType === "professor" ? (
              <h1 style={{ color: "white", marginTop: "50px", fontSize: "30px" }}>
                Find a professor at&nbsp;
                <span style={{ textDecoration: "underline" }}>{school.name}</span>
              </h1>
            ) : (
              <h1 style={{ color: "white", marginTop: "50px", fontSize: "30px" }}>Enter Your school to get started</h1>
            )}

            <SearchBar
              current_school={school}
              style={searchBarStyle}
              hasPrefix={true}
              searchType={searchType}
              autoCompleteStyle={autoCompleteStyle}
              setSchool={setSchool}
              setSearchType={setSearchType}></SearchBar>

            <button
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              onClick={handleSearchType}>
              <h1 style={{ color: "white", marginTop: "15px", fontSize: "16px" }}>
                {searchType === "professor"
                  ? "I want to find a professor at a different school"
                  : "I'd like to look up a professor by name"}
              </h1>
            </button>
          </div>
        </div>
      </Content>
    </Layout>
  );
}