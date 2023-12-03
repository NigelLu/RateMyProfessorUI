/** @format */

import React from "react";
import RatingCard from "../../library/common/components/RatingCard";
import { List } from "antd";

export default function UserRatingsPage() {
  const Ratings = [
    {
      id: 1,
      rating: 5.0,
      difficulty: 2.0,
      takeAgain: true,
      takenForCredit: true,
      attendanceMandatory: true,
      grade: "A",
      review: "Good Professor",
      professorId: 2,
      studentId: 1,
      professorFirstName: "Lihua",
      professorLastName: "Xu",
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
      professorId: 1,
      studentId: 1,
      professorFirstName: "Yik-Cheung",
      professorLastName: "Tam",
      professorSchoolName: "New York University",
      date: "2023-11-30",
    },
  ];

  return (
    <div style={{ width: "40%", minWidth: "400px" }}>
      <List
        dataSource={Ratings}
        renderItem={(item) => (
          <List.Item>
            <RatingCard rating={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
