/** @format */

import { List } from "antd";
import { useParams } from "react-router";
import React, { useEffect, useMemo, useState } from "react";
import SelfHeader from "../../library/common/components/Header";
import ProfessorServices from "../../main/axios/professorServices";
import ProfessorCard from "../../library/common/components/ProfessorCard";

// const ButtonStyle = {
//   backgroundColor: "black",
//   color: "white",
//   fontWeight: "bold",
//   width: "250px",
//   borderRadius: "50px",
//   fontSize: "16px",
//   height: "auto",
//   paddingLeft: "15px",
//   paddingRight: "15px",
//   paddingTop: "10px",
//   paddingBottom: "16px",
//   borderColor: "blue",
// };

export default function ProfessorListPage() {
  const { schoolId, professorName } = useParams();
  const [professors, setProfessors] = useState([]);
  const [school] = useState(JSON.parse(localStorage.getItem("currentSchool")));
  const [savedProfessorList] = useState(JSON.parse(localStorage.getItem("savedProfessorList") || "[]"));

  const savedProfessorMap = useMemo(
    () =>
      savedProfessorList.reduce((prev, cur) => {
        prev[cur.professorId] = true;
        return prev;
      }, {}),
    [savedProfessorList],
  );

  useEffect(() => {
    ProfessorServices.getProfessorsWithDetials(schoolId, professorName)
      .then((professorsData) => {
        setProfessors(professorsData);
      })
      .catch((error) => {
        throw error;
      });
  }, [schoolId, professorName]);

  const numProfessors = professors.length;

  return (
    <div>
      <SelfHeader />
      <div style={{ marginLeft: "50px", marginTop: "50px", minWidth: "600px" }}>
        <p style={{ fontSize: "22px" }}>
          {numProfessors} professors with
          <span style={{ fontWeight: "bold" }}>"{professorName}"</span>
          &nbsp;in their names at&nbsp;
          <span style={{ fontWeight: "bold" }}>{school.name}</span>
        </p>
        <List
          style={{ width: "60%", maxWidth: "800px", minWidth: "600px" }}
          dataSource={professors}
          renderItem={(item) => (
            <List.Item>
              <ProfessorCard professor={item} saved={Boolean(savedProfessorMap[item.id])} />
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
          }}
        >
          {/* <Button size='large' style={ButtonStyle}>
            Show More
          </Button> */}
          <span style={{ marginTop: "20px" }}>Don't see the professor you're looking for?</span>
          <a href='/add/professor/' style={{ color: "black", marginTop: "10px" }}>
            Add a Professor
          </a>
        </div>
      </div>
    </div>
  );
}
