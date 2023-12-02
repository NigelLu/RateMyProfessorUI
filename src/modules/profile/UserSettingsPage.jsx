/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ButtonStyle = { minWidth: "150px", backgroundColor: "black", color: "white" };

export default function UserSettingsPage() {
  const [editable, setEditable] = useState(false);
  const email = "pw1298@nyu.edu";
  const password = "password";

  const [values, setValues] = useState({
    originalPwd: "",
    newPwd: "",
    confirmedNewPwd: "",
  });

  const [confirmedNewPwdError, setErrors] = useState({ status: false, msg: "" });
  const [form] = Form.useForm();

  const handleOriginalPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setValues({ ...values, originalPwd: password });
  };

  const handleNewPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setValues({ ...values, newPwd: password });
  };

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setValues({ ...values, confirmedNewPwd: password });
  };

  function checkNewPwd(e) {
    e.preventDefault();
    if (values.newPwd !== values.confirmedNewPwd) {
      setErrors({
        status: true,
        msg: "New Password and Confirmed Password Unmatch.",
      });
    } else {
      console.log("true");
      setErrors({
        status: false,
        msg: "",
      });
    }
  }

  const handleEditable = (e) => {
    e.preventDefault();
    setEditable(true);
  };

  const handleCancelEdit = useCallback((e) => {
    e.preventDefault();
    setEditable(false);
    // set all input into the original state
    setValues({ originalPwd: "", newPwd: "", confirmedNewPwd: "" });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      email: email,
      password: password,
      originalPwd: values.originalPwd,
      newPwd: values.newPwd,
      confirmedPwd: values.confirmedNewPwd,
    });
  }, [form, values, handleCancelEdit]);

  return (
    <div
      style={{
        width: "40%",
        minWidth: "200px",
      }}>
      <Form
        form={form}
        size='large'
        name='basic'
        initialValues={{
          email: email,
          password: password,
          originalPwd: values.originalPwd,
          newPwd: values.newPwd,
          confirmedPwd: values.confirmedNewPwd,
        }}
        labelCol={{ span: 7 }} // Set label column width
        wrapperCol={{ span: 17 }} // Set wrapper column width
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        {/* Form Items */}

        <Form.Item label={<span style={{ fontSize: "16px" }}>Email</span>} name='email' labelAlign='left'>
          <Input
            disabled
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        {/* Password Field */}
        {editable ? (
          <>
            <Form.Item
              label={<span style={{ fontSize: "16px" }}>Original Password</span>}
              name='originalPwd'
              labelAlign='left'
              rules={[
                {
                  message: "Please input your original password!",
                },
              ]}>
              <Input.Password
                onChange={handleOriginalPassword}
                style={{
                  border: "1px solid #d9d9d9",
                  backgroundColor: "transparent",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: "16px" }}>New Password</span>}
              name='newPwd'
              labelAlign='left'
              rules={[
                {
                  message: "Please input your new password!",
                },
              ]}>
              <Input.Password
                onChange={handleNewPassword}
                style={{
                  border: "1px solid #d9d9d9",
                  backgroundColor: "transparent",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: "16px" }}>Confirm New Password</span>}
              name='confirmedPwd'
              labelAlign='left'
              hasFeedback={confirmedNewPwdError}
              validateStatus={confirmedNewPwdError.status ? "error" : ""}
              help={confirmedNewPwdError.msg}
              rules={[
                {
                  message: "Please input your confirmed new password!",
                },
              ]}>
              <Input.Password
                onChange={(e) => {
                  handleConfirmedPassword(e);
                }}
                style={{
                  border: "1px solid #d9d9d9",
                  backgroundColor: "transparent",
                }}
              />
            </Form.Item>
          </>
        ) : (
          <Form.Item label={<span style={{ fontSize: "16px" }}>Password</span>} name='password' labelAlign='left'>
            <Input.Password
              disabled
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
            />
          </Form.Item>
        )}

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
              <Button
                style={ButtonStyle}
                onClick={(e) => {
                  checkNewPwd(e);
                }}>
                Reset
              </Button>
              <Button style={{ minWidth: "150px" }} onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button style={ButtonStyle} onClick={handleEditable}>
              Reset Password
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
