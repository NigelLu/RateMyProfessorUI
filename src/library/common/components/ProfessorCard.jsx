/** @format */

import React, { useState } from "react";
import { Card } from "antd";
import { Col, Row } from "antd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router";


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

export default function ProfessorCard(props) {
  const navigate = useNavigate();

  const [saveIconColor, setSaveIconColor] = useState("pink");

  const professor = props.professor;
  const ratingDTOList = props.professor.ratingDTOList;

  // Calculate corresponding rating values
  const totalRatings = ratingDTOList.length;
  const totalRating = ratingDTOList.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRatings ? (totalRating / totalRatings).toFixed(1) : 0;

  const totalDifficulty = ratingDTOList.reduce((sum, rating) => sum + rating.difficulty, 0);
  const averageDifficulty = totalRatings ? (totalDifficulty / totalRatings).toFixed(1) : 0;

  const totalTakeAgain = ratingDTOList.filter((rating) => rating.takeAgain).length;
  const percentageTakeAgain = totalRatings ? ((totalTakeAgain / totalRatings) * 100).toFixed(1) : 0;

  const ratingColor =
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

  const changeSaveIconColor = (e) => {
    e.preventDefault();
    if (saveIconColor === "pink") {
      setSaveIconColor("rgb(200,200,200)");
    } else {
      setSaveIconColor("pink");
    }
  };

  const clickOnCard = (e) => {
    e.preventDefault();
    navigate("/professor/" + professor.id);
  };

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
      }}>
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
            <p>{totalRatings} ratings</p>
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
            }}>
            <h3>
              {professor.firstName} {professor.lastName}
            </h3>
            <button
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              onClick={changeSaveIconColor}>
              <BookmarkIcon style={{ color: saveIconColor, fontSize: "30px" }} />
            </button>
          </Row>

          <Row style={{ fontSize: "16px", marginTop: "-25px" }} onClick={clickOnCard}>
            <span>{professor.departmentName}</span>
          </Row>

          <Row style={{ fontSize: "16px" }} onClick={clickOnCard}>
            <span>{professor.schoolName}</span>
          </Row>

          {totalRatings === 0 ? (
            <Row onClick={clickOnCard}>
              <p style={{ fontSize: "18px", fontWeight: "bolder" }}>
                The Professor has no ratings yet!
              </p>
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
