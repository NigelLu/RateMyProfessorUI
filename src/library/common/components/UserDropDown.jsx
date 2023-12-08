/** @format */

import { Button, Dropdown, Modal } from "antd";
import LoginPage from "../../../modules/login/LoginPage";
import React, { useState, useMemo, useCallback } from "react";
import { REQUIRED_STUDENT_PROPERTY_NAMES, isLoggedIn } from "./RequireLoggedIn";

// Styles
const aTagStyle = { fontSize: "15px", fontWeight: "bold" };
const DropdownSytle = { fontWeight: "bold", fontSize: "20px" };
const ButtonStyle = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  fontSize: "20px",
  width: "auto",
  height: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingTop: "2px",
  paddingBottom: "10px",
};

export default function UserDropDown({ isLogin }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isModalOpen, setIsModalOpen] = useState(isLogin && !isLoggedIn());
  const [studentFirstName, setStudentFirstName] = useState(localStorage.getItem("student-firstName"));

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleLogout = useCallback((e) => {
    e.preventDefault();
    for (let propertyName of REQUIRED_STUDENT_PROPERTY_NAMES) {
      localStorage.removeItem(propertyName);
    }
    setLoggedIn(false);
  }, []);

  const items = useMemo(
    () =>
      // Items for redirection
      [
        {
          key: "1",
          label: (
            <a href='/account/profile' style={aTagStyle}>
              Profile
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a href='/account/settings' style={aTagStyle}>
              Account Settings
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a href='/account/ratings' style={aTagStyle}>
              Your Ratings
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a href='/account/saved-professors' style={aTagStyle}>
              Saved Professors
            </a>
          ),
        },
        {
          key: "5",
          label: (
            <a href='#logout' style={aTagStyle} onClick={handleLogout}>
              Logout
            </a>
          ),
        },
      ],
    [handleLogout],
  );

  const loginPageProps = {
    setLoggedIn,
    setIsModalOpen,
    setStudentFirstName,
  };
  return (
    <>
      <Modal
        centered
        title=''
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ minHeight: "50vh", width: "30vw" }}
      >
        <LoginPage {...loginPageProps} />
      </Modal>
      {loggedIn ? (
        <Dropdown style={DropdownSytle} menu={{ items }} arrow>
          <Button style={ButtonStyle}>{`Hey ${studentFirstName}`}</Button>
        </Dropdown>
      ) : (
        <Button type='primary' size='large' onClick={showModal} style={{ fontWeight: "bolder" }}>
          Login/Register
        </Button>
      )}
    </>
  );
}
