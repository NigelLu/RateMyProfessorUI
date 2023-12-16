/** @format */

import React, { useEffect, useState } from "react";
import ProfessorCard from "../../library/common/components/ProfessorCard";
import { List } from "antd";
import { getSavedProfessorDetail } from "../../main/axios/studentServices";

export default function UserSavedProfessorsPage() {
  const [savedProfessors] = useState(JSON.parse(localStorage.getItem("savedProfessorList") || "[]"));
  const [savedProfessorsWithDetails, setSavedProfessorsWithDetails] = useState([]);
  useEffect(() => {
    getSavedProfessorDetail({ savedProfessors }).then((values) => setSavedProfessorsWithDetails(values));
  }, [savedProfessors]);

  return (
    <div style={{ width: "50%", minWidth: "400px" }}>
      <List
        dataSource={savedProfessorsWithDetails}
        renderItem={(item) => (
          <List.Item>
            <ProfessorCard professor={item} saved={true} />
          </List.Item>
        )}
      />
    </div>
  );
}
