/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import UserDropDown from "./UserDropDown";
import { Row, Col } from "antd";
import smallLogo from "../../../resources/images/small_RMP_Logo.svg";
import ProfSchoolDropDown from "./ProfSchoolDropDown";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SearchBar from "./SearchBar";
import ProfessorServices from "../../../main/axios/professorServices";
import { useNavigate } from "react-router";

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
  const [school, setSchool] = useState(JSON.parse(localStorage.getItem("currentSchool")));
  const schools = JSON.parse(localStorage.getItem("schoolsData"));
  const [professors, setProfessors] = useState(JSON.parse(localStorage.getItem("professorsData")));
  const [schoolSearch, setSchoolSearch] = useState(false);
  const [searchType, setSearchType] = useState("professor");
  const navigate = useNavigate();

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
      icon: <>{searchType === "professor" ? <SchoolOutlinedIcon /> : <PersonSearchIcon />}</>,
    },
  ];

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  // This function is to handle the onclick event of "at University" button
  // and show the search bar for the schools
  const handleSchoolSearch = (e) => {
    e.preventDefault();
    setSchoolSearch(true);
  };

  // This useEffect is to handle the situation when the selected university changes
  // we need to retrieve new professors data
  // Get professor lists when selected school changes
  useEffect(() => {
    if (school !== "") {
      ProfessorServices.getProfessors(school.id)
        .then((professorsData) => {
          setProfessors(professorsData);
          localStorage.setItem("professorsData", JSON.stringify(professorsData));
        })
        .catch((error) => {
          console.error("Error fetching professors, error: ", error);
        });
    }
  }, [school]);

  return (
    <div>
      {schools.length > 0 && school !== "" && professors.length > 0 ? (
        <Row style={{ backgroundColor: "black", padding: "10px" }}>
          <Col span={2} style={{ paddingTop: "5px", paddingLeft: "15px", minWidth: "120px" }}>
            <button
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              onClick={navigateToHome}
            >
              <img src={smallLogo} alt='' />
            </button>
          </Col>

          <Col span={18} style={{ minWidth: "900px" }}>
            <ProfSchoolDropDown items={items} searchType={searchType} />
            <SearchBar
              options={searchType === "school" ? schools : professors}
              current_school={school}
              style={searchBarStyle}
              hasPrefix={false}
              searchType={searchType}
              setSchool={setSchool}
              setSearchType={setSearchType}
            />
            {searchType === "professor" ? (
              <span style={{ color: "white", marginLeft: "20px", fontSize: "18px" }}>
                at &nbsp;
                {schoolSearch ? (
                  <SearchBar
                    options={schools}
                    current_school={school}
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
                    onClick={handleSchoolSearch}
                  >
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
      ) : (
        <></>
      )}
    </div>
  );
}
