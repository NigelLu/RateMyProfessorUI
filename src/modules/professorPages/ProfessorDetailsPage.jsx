/** @format */

import { useParams } from "react-router";
import SelfHeader from "../../library/common/components/Header";
import ProfessorServices from "../../main/axios/professorServices";
import RatingCard from "../../library/common/components/RatingCard";
import RatingForm from "../../library/common/components/RatingForm";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Row, Col, Statistic, message, Spin, Divider, List, Modal, Button } from "antd";

const formatter =
  (fontSize = 50, fontWeight = 900) =>
  (value) => (
    <span className='ant-statistic-content-value'>
      <span className='ant-statistic-content-value-int' style={{ fontWeight: fontWeight, fontSize: `${fontSize}px` }}>
        {Math.floor(value)}
      </span>
      <span
        className='ant-statistic-content-value-decimal'
        style={{ fontWeight: fontWeight, fontSize: `${fontSize}px` }}
      >
        {(value - Math.floor(value)).toFixed(1).toString().slice(1)}
      </span>
    </span>
  );
export default function ProfessorDetailsPage() {
  const { id } = useParams();
  const [professor, setProfessor] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [ratingBeingEdit, setRatingBeingEdited] = useState({});
  const ratingDTOList = useMemo(
    () =>
      professor
        ? professor.ratingDTOList.map((rating) => {
            try {
              const dateTime = new Date(rating.dateTime);
              rating.date = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`;
            } catch (error) {}

            return rating;
          })
        : [],
    [professor],
  );
  // * Calculate corresponding rating values
  const averageRating = useMemo(
    () =>
      ratingDTOList.length
        ? (ratingDTOList.reduce((sum, rating) => sum + rating.rating, 0) / ratingDTOList.length).toFixed(1)
        : 0,
    [ratingDTOList],
  );
  const averageDifficulty = useMemo(
    () =>
      ratingDTOList.length
        ? (ratingDTOList.reduce((sum, rating) => sum + rating.difficulty, 0) / ratingDTOList.length).toFixed(1)
        : 0,
    [ratingDTOList],
  );
  const percentageTakeAgain = useMemo(
    () =>
      ratingDTOList.length
        ? ((ratingDTOList.filter((rating) => rating.takeAgain).length / ratingDTOList.length) * 100).toFixed(1)
        : 0,
    [ratingDTOList],
  );

  const ratingCardCommonProps = {
    setModalOpen,
    setRatingBeingEdited,
  };

  const cancelEditRating = useCallback(() => {
    setModalOpen(false);
    setRatingBeingEdited({});
  }, []);

  const handleAddRating = useCallback(() => {
    if (!professor) {
      message.info("Please wait till professor detail is loaded");
      return;
    }
    setRatingBeingEdited({ studentId: localStorage.getItem("id"), professorId: professor.id });
    setModalOpen(true);
  }, [professor]);

  useEffect(() => {
    if (id === undefined) {
      message.error("Your URL does not include professor id, please check if your URL is correct");
      return;
    }
    ProfessorServices.getProfessorDetail({ id }).then(setProfessor);
  }, [id]);

  return (
    <div>
      <SelfHeader />
      {!professor ? (
        <Spin />
      ) : (
        <>
          <Row style={{ marginTop: "5vh" }}>
            <Col span={18} offset={3}>
              <Statistic value={averageRating} suffix={"/ 5"} title='Quality' formatter={formatter()} />
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3}>
              Overall Quality Based on {ratingDTOList.length} ratings.
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col
              span={18}
              offset={3}
              style={{ fontSize: "50px", fontWeight: 900 }}
            >{`${professor.firstName} ${professor.lastName}`}</Col>
          </Row>
          <Row>
            <Col span={16} offset={3}>
              Professor in the{" "}
              <b>
                <i>{professor.departmentName}</i>
              </b>{" "}
              at{" "}
              <b>
                <i>{professor.schoolName}</i>
              </b>
            </Col>
            <Col>
              <Button type='primary' onClick={handleAddRating}>
                Add Rating
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col span={2} offset={3}>
              <Statistic title='Would Take Again' value={percentageTakeAgain} formatter={formatter(30)} suffix={"%"} />
            </Col>

            <Col span={2} offset={1}>
              <Statistic suffix='/ 5' value={averageDifficulty} title='Level of Difficulty' formatter={formatter(30)} />
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3}>
              <Divider style />
            </Col>
          </Row>
          <Row>
            <Col offset={3} span={18}>
              <List
                dataSource={ratingDTOList}
                renderItem={(item) => (
                  <List.Item>
                    <RatingCard
                      {...{
                        rating: item,
                        ...ratingCardCommonProps,
                        // eslint-disable-next-line eqeqeq
                        isMyRating: item.studentId == localStorage.getItem("id"),
                      }}
                    />
                  </List.Item>
                )}
              />
              <Modal
                footer={null}
                open={modalOpen}
                title='Rating'
                onCancel={cancelEditRating}
                style={{ minWidth: "50vw" }}
              >
                <RatingForm rating={ratingBeingEdit} setModalOpen={setModalOpen} />
              </Modal>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
