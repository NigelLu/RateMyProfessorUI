/** @format */

import React from "react";
import { Card } from "antd";
import { EditOutlined } from "@mui/icons-material";
import { Col, Row } from "antd";

export default function RatingCard(props) {
  const rating = props.rating;

  const ratingColor =
    rating.rating > 4 && rating.rating <= 5
      ? "rgb(28,255,7,0.5)"
      : rating.rating > 3 && rating.rating <= 4
      ? "rgb(255,253,7,0.5)"
      : rating.rating > 2 && rating.rating <= 3
      ? "rgb(255,202,7,0.5)"
      : rating.rating > 1 && rating.rating <= 2
      ? "rgb(255,126,7,0.5)"
      : rating.rating >= 0 && rating.rating <= 1
      ? "rgb(255,7,7,0.5)"
      : "rgb(111,111,111,0.3)";

  const difficultyColor =
    rating.difficulty > 4 && rating.difficulty <= 5
      ? "rgb(255,7,7,0.5)"
      : rating.difficulty > 3 && rating.difficulty <= 4
      ? "rgb(255,126,7,0.5)"
      : rating.difficulty > 2 && rating.difficulty <= 3
      ? "rgb(255,202,7,0.5)"
      : rating.difficulty > 1 && rating.difficulty <= 2
      ? "rgb(255,253,7,0.5)"
      : rating.difficulty >= 0 && rating.difficulty <= 1
      ? "rgb(28,255,7,0.5)"
      : "rgb(111,111,111,0.3)";

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
  }

  return (
    <Card
      size='large'
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "20px" }}>
              <span style={{ fontWeight: "bolder" }}>
                {rating.professorFirstName} {rating.professorLastName} &#183;&nbsp;
              </span>

              <span>{rating.professorSchoolName}</span>
            </p>
          </div>
          <a
            href={"/edit/professor-rating/" + rating.studentId + "/" + rating.id}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>
            <EditOutlined style={{ width: "16px" }} />
            <span style={{ marginLeft: "3px", fontSize: "15px" }}>Edit</span>
          </a>
        </div>
      }
      bordered={true}
      style={{
        backgroundColor: "rgb(251, 251, 251)",
        width: "100%",
        minWidth: "400px",
        fontFamily: "Poppins, sans-serif",
      }}>

      <Row style={{ marginTop: "-30px" }}>
        {/* Rating score and color */}
        <Col span={6} style={{ fontWeight: "bold" }}>
          <Row>
            <h3 style={leftStyle}>QUALITY</h3>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <div style={{ ...divStyle, backgroundColor: ratingColor }}>{rating.rating.toFixed(1)}</div>
          </Row>
          <Row>
            <h3 style={leftStyle}>DIFFICULTY</h3>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <div style={{ ...divStyle, backgroundColor: difficultyColor }}>{rating.difficulty.toFixed(1)}</div>
          </Row>
        </Col>
        {/* Rating details */}
        <Col span={18}>
          <Row style={{ display: "flex", justifyContent: "right", fontSize: "18px", fontWeight: "bolder" }}>
            <p>Date: {rating.date}</p>
          </Row>

          <Row style={{ fontSize: "16px", marginTop:"-30px" }}>
            <p>
              For Credit:&nbsp;
              <span style={{ fontWeight: "bold" }}>{rating.takenForCredit ? "Yes" : "No"} </span>
              &nbsp;&nbsp;
            </p>
            <p>
              Attendance:&nbsp;
              <span style={{ fontWeight: "bold" }}>{rating.attendanceMandatory ? "Mandatory" : "Not Mandatory"} </span>
              &nbsp;&nbsp;
            </p>
            <p>
              Grade:&nbsp;
              <span style={{ fontWeight: "bold" }}>{rating.grade} </span>
              &nbsp;&nbsp;
            </p>
          </Row>

          <Row style={{ fontSize: "16px", marginTop:"-10px" }}>
            <p>
              Would Take Again:&nbsp;
              <span style={{ fontWeight: "bold" }}>{rating.takeAgain ? "Yes" : "No"}</span>
            </p>
          </Row>

          <Row style={{ fontSize: "18px", fontWeight: "bolder", marginTop:"-10px" }}>
            <p>{rating.review}</p>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
