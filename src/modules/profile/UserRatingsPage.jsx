/** @format */

import { List, Modal } from "antd";
import React, { useCallback, useState } from "react";
import RatingCard from "../../library/common/components/RatingCard";
import RatingForm from "../../library/common/components/RatingForm";

export default function UserRatingsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ratingBeingEdit, setRatingBeingEdited] = useState({});
  const [ratings] = useState(
    JSON.parse(localStorage.getItem("ratinglList") || "[]").map((rating) => {
      try {
        const dateTime = new Date(rating.dateTime);
        rating.date = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`;
      } catch (error) {}

      return rating;
    }),
  );

  const ratingCardCommonProps = {
    setModalOpen,
    setRatingBeingEdited,
  };

  const submitEditedRating = useCallback(() => {
    console.log(ratingBeingEdit);
  }, [ratingBeingEdit]);

  const cancelEditRating = useCallback(() => {
    setModalOpen(false);
    setRatingBeingEdited({});
  }, []);

  return (
    <div style={{ width: "50%", minWidth: "400px" }}>
      <List
        dataSource={ratings}
        renderItem={(item) => (
          <List.Item>
            <RatingCard {...{ rating: item, ...ratingCardCommonProps }} />
          </List.Item>
        )}
      />
      <Modal
        footer={null}
        open={modalOpen}
        title='Edit Rating'
        onOk={submitEditedRating}
        onCancel={cancelEditRating}
        style={{ minWidth: "50vw" }}
      >
        <RatingForm rating={ratingBeingEdit} setModalOpen={setModalOpen} />
      </Modal>
    </div>
  );
}
