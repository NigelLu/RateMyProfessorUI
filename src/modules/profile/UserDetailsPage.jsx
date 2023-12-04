/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Input } from "antd";
import SearchBar from "../../library/common/components/SearchBar";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const searchBarStyle = { borderRadius: "10px" };

const autoCompleteStyle = { color: "black" };

const ButtonStyle = { minWidth: "150px", backgroundColor: "black", color: "white" };

export default function UserDetailsPage() {
  const [editable, setEditable] = useState(false);
  const [values, setValues] = useState({ firstName: "Penghao", lastName: "Weng", year: 2025 });
  const [school, setSchool] = useState({ name: "New York University", id: 1 });
  const schools = JSON.parse(localStorage.getItem("schoolsData"));
  const [form] = Form.useForm();

  const handleFirstName = (e) => {
    e.preventDefault();
    let firstName = e.target.value;
    setValues({ ...values, firstName: firstName });
  };

  const handleLastName = (e) => {
    e.preventDefault();
    let lastName = e.target.value;
    setValues({ ...values, lastName: lastName });
  };

  const handleYear = (e) => {
    e.preventDefault();
    let year = e.target.value;
    setValues({ ...values, year: year });
  };

  const handleEditable = (e) => {
    e.preventDefault();
    setEditable(true);
  };

  const handleCancelEdit = useCallback((e) => {
    e.preventDefault();
    setEditable(false);
    // set all input into the original state
    setSchool({ name: "New York University" });
    setValues({ firstName: "Penghao", lastName: "Weng", year: 2025 });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      firstName: values.firstName,
      lastName: values.lastName,
      school: school,
      year: values.year,
    });
  }, [form, values, school, handleCancelEdit]);

  return (
    <div style={{ width: "40%", minWidth: "400px" }}>
      <Form
        form={form}
        size='large'
        name='basic'
        initialValues={{
          firstName: values.firstName,
          lastName: values.lastName,
          school: school,
          year: values.year,
        }}
        labelCol={{ span: 8 }} // Set label column width
        wrapperCol={{ span: 16 }} // Set wrapper column width
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        {/* Form Items */}
        <Form.Item
          label={<span style={{ fontSize: "16px" }}>First Name</span>}
          name='firstName'
          labelAlign='left'
          rules={[
            {
              message: "Please input your First Name!",
            },
          ]}>
          <Input
            onChange={handleFirstName}
            disabled={!editable}
            style={{
              border: editable ? "1px solid #d9d9d9" : "none",
              backgroundColor: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: "16px" }}>Last Name</span>}
          name='lastName'
          labelAlign='left'
          rules={[
            {
              message: "Please input your Last Name!",
            },
          ]}>
          <Input
            onChange={handleLastName}
            disabled={!editable}
            style={{
              border: editable ? "1px solid #d9d9d9" : "none",
              backgroundColor: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: "16px" }}>School</span>}
          name='School'
          labelAlign='left'
          rules={[
            {
              message: "Please input your School!",
            },
          ]}>
          <SearchBar
            options={schools}
            school={school}
            style={searchBarStyle}
            hasPrefix={true}
            searchType={"student"}
            autoCompleteStyle={autoCompleteStyle}
            disabled={!editable}
            setSchool={setSchool}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: "16px" }}>Expected Year of Graduation</span>}
          name='year'
          labelAlign='left'
          rules={[
            {
              pattern: /^(200[0-9]|20[1-4][0-9]|2050)$/,
              message: "Please valid Expected Year of Graduation (2000-2050)!",
            },
          ]}>
          <Input
            onChange={handleYear}
            disabled={!editable}
            style={{
              border: editable ? "1px solid #d9d9d9" : "none",
              backgroundColor: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        {/* Buttons */}
        <Form.Item
          wrapperCol={{
            span: 24,
          }}>
          {editable ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Button style={ButtonStyle}>Save Changes</Button>
              <Button
                style={{ minWidth: "150px" }}
                onClick={(e) => {
                  handleCancelEdit(e);
                  form.setFieldsValue({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    school: values.school,
                    year: values.year,
                  });
                }}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button style={ButtonStyle} onClick={handleEditable}>
              Edit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
