/** @format */

import { Card } from "antd";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { saveProfessor, unsaveProfessor } from "../../../main/axios/studentServices";

const divStyle = {
  textAlign: "center",
  borderRadius: "15px",
  width: "50%",
  minWidth: "70px",
  display: "flex",
  justifyContent: "center",
  fontSize: "40px",
};

const leftStyle = {
  textAlign: "center",
  width: "50%",
  display: "flex",
  justifyContent: "center",
  marginTop: "-10px",
};

const getRatingColor = ({ averageRating }) =>
  averageRating > 4 && averageRating <= 5
    ? "rgb(28,255,7,0.5)"
    : averageRating > 3 && averageRating <= 4
    ? "rgb(255,253,7,0.5)"
    : averageRating > 2 && averageRating <= 3
    ? "rgb(255,202,7,0.5)"
    : averageRating > 1 && averageRating <= 2
    ? "rgb(255,126,7,0.5)"
    : averageRating >= 0 && averageRating <= 1
    ? "rgb(255,7,7,0.5)"
    : "rgb(111,111,111,0.3)";

export default function ProfessorCard({ professor, saved }) {
  const navigate = useNavigate();
  const [ratingDTOList] = useState(professor.ratingDTOList);
  const [saveIconColor, setSaveIconColor] = useState("pink");
  const [isProfessorSaved, setIsProfessorSaved] = useState(saved);

  // * Calculate corresponding rating values
  const [averageRating] = useState(
    ratingDTOList.length
      ? (ratingDTOList.reduce((sum, rating) => sum + rating.rating, 0) / ratingDTOList.length).toFixed(1)
      : 0,
  );
  const [averageDifficulty] = useState(
    ratingDTOList.length
      ? (ratingDTOList.reduce((sum, rating) => sum + rating.difficulty, 0) / ratingDTOList.length).toFixed(1)
      : 0,
  );
  const [percentageTakeAgain] = useState(
    ratingDTOList.length
      ? ((ratingDTOList.filter((rating) => rating.takeAgain).length / ratingDTOList.length) * 100).toFixed(1)
      : 0,
  );

  const ratingColor = getRatingColor({ averageRating });

  const toggleSaveProfessor = () => {
    if (isProfessorSaved)
      unsaveProfessor({ studentId: localStorage.getItem("id"), professorId: professor.id }).then(() => {
        setIsProfessorSaved(!isProfessorSaved);
      });
    else
      saveProfessor({ studentId: localStorage.getItem("id"), professorId: professor.id }).then(() => {
        setIsProfessorSaved(!isProfessorSaved);
        window.location.reload();
      });
  };

  const clickOnCard = () => {
    navigate("/professor/" + professor.id);
  };

  // * change icon color once professorSaved status changes
  useEffect(() => {
    if (isProfessorSaved && saveIconColor !== "pink") setSaveIconColor("pink");
    if (!isProfessorSaved && saveIconColor !== "rgb(200,200,200)") setSaveIconColor("rgb(200,200,200)");
  }, [isProfessorSaved, saveIconColor]);

  return (
    <Card
      size='large'
      bordered={true}
      hoverable={true}
      style={{
        width: "100%",
        minWidth: "400px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "rgb(251, 251, 251)",
      }}
    >
      <Row style={{ marginTop: "-10px" }}>
        {/* Professor Rating  */}
        <Col span={6} style={{ fontWeight: "bold" }} onClick={clickOnCard}>
          <Row style={leftStyle}>
            <h3>QUALITY</h3>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <div style={{ ...divStyle, backgroundColor: ratingColor }}>{averageRating}</div>
          </Row>
          <Row style={{ ...leftStyle, marginTop: 0 }}>
            <p>{ratingDTOList.length} ratings</p>
          </Row>
        </Col>

        {/* Rating details */}
        <Col span={18}>
          <Row
            style={{
              fontSize: "20px",
              fontWeight: "bolder",
              marginTop: "-20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>
              {professor.firstName} {professor.lastName}
            </h3>
            <button
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              onClick={toggleSaveProfessor}
            >
              <BookmarkIcon style={{ color: saveIconColor, fontSize: "30px" }} />
            </button>
          </Row>

          <Row style={{ fontSize: "16px", marginTop: "-25px" }} onClick={clickOnCard}>
            <span>{professor.departmentName}</span>
          </Row>

          <Row style={{ fontSize: "16px" }} onClick={clickOnCard}>
            <span>{professor.schoolName}</span>
          </Row>

          {!ratingDTOList.length ? (
            <Row onClick={clickOnCard}>
              <p style={{ fontSize: "18px", fontWeight: "bolder" }}>The Professor has no ratings yet!</p>
            </Row>
          ) : (
            <Row onClick={clickOnCard}>
              <p>
                <span style={{ fontSize: "20px", fontWeight: "bolder" }}>{percentageTakeAgain}%</span>
                &nbsp;&nbsp;Would Take Again &nbsp;|&nbsp;
                <span style={{ fontSize: "20px", fontWeight: "bolder" }}>&nbsp;{averageDifficulty}</span>
                &nbsp;&nbsp;level of difficulty
              </p>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
}
