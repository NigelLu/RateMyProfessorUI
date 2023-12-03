/** @format */

import React from "react";
import SelfHeader from "../../library/common/components/Header";
import ProfessorCard from "../../library/common/components/ProfessorCard";
import { List, Button } from "antd";

const ButtonStyle = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  width: "250px",
  borderRadius: "50px",
  fontSize: "16px",
  height: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingTop: "10px",
  paddingBottom: "16px",
  borderColor: "blue",
};

export default function ProfessorListPage() {
  const school = { name: "New York University", id: 1 };
  const Professors = [
    {
      id: 1300,
      firstName: "David",
      lastName: " Handschuh",
      schoolName: "New York University",
      departmentName: "Journalism department",
      schoolId: 125,
      ratingDTOList: [],
    },
    {
      id: 1393,
      firstName: "Yik-Cheung",
      lastName: "Tam",
      schoolName: "New York University",
      departmentName: "Computer Science",
      schoolId: 125,
      ratingDTOList: [
        {
          id: 1,
          rating: 5.0,
          difficulty: 2.0,
          takeAgain: true,
          takenForCredit: true,
          attendanceMandatory: true,
          grade: "A",
          review: "Good Professor",
          professorId: 1393,
          studentId: 1,
          professorFirstName: "Yik-Cheung",
          professorLastName: "Tam",
          professorSchoolName: "New York University",
          date: "2023-11-30",
        },
        {
          id: 2,
          rating: 3.0,
          difficulty: 5.0,
          takeAgain: false,
          takenForCredit: true,
          attendanceMandatory: true,
          grade: "B",
          review: "Bad Professor",
          professorId: 1393,
          studentId: 2,
          professorFirstName: "Yik-Cheung",
          professorLastName: "Tam",
          professorSchoolName: "New York University",
          date: "2023-11-30",
        },
      ],
    },
  ];
  const numProfessors = Professors.length;
  const path = window.location.pathname.split("/");

  return (
    <div>
      <SelfHeader />
      <div style={{ marginLeft: "50px", marginTop: "50px", minWidth: "600px" }}>
        <p style={{ fontSize: "22px" }}>
          {numProfessors} professors with
          <span style={{ fontWeight: "bold" }}>"{path[path.length - 1]}"</span>
          &nbsp;in their names at&nbsp;
          <span style={{ fontWeight: "bold" }}>{school.name}</span>
        </p>
        <List
          style={{ width: "60%", maxWidth: "800px", minWidth: "600px" }}
          dataSource={Professors}
          renderItem={(item) => (
            <List.Item>
              <ProfessorCard professor={item} />
            </List.Item>
          )}
        />
        <div
          style={{
            width: "60%",
            maxWidth: "800px",
            minWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}>
          <Button size='large' style={ButtonStyle}>
            Show More
          </Button>
          <span style={{ marginTop: "20px" }}>Don't see the professor you're looking for?</span>
          <a href='/add/professor/' style={{ color: "black", marginTop: "10px" }}>
            Add a Professor
          </a>
        </div>
      </div>
    </div>
  );
}
