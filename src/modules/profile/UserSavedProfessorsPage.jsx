/** @format */

import React from "react";
import ProfessorCard from "../../library/common/components/ProfessorCard";
import { List } from "antd";

export default function UserSavedProfessorsPage() {
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
  return (
    <div style={{ width: "50%", minWidth: "400px" }}>
      <List
        dataSource={Professors}
        renderItem={(item) => (
          <List.Item>
            <ProfessorCard professor={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
