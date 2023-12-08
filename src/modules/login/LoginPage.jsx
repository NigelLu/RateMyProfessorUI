/** @format */

import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { Flex, Form, Input, Button } from "antd";
import { authenticateStudent } from "../../main/axios/studentServices";

const { useForm } = Form;

export default function LoginPage({ setIsModalOpen, setLoggedIn, setStudentFirstName }) {
  const [form] = useForm();
  const navigate = useNavigate();
  const onLogin = useCallback(
    (values) => {
      authenticateStudent(values).then((student) => {
        for (let propertyName of Object.getOwnPropertyNames(student))
          localStorage.setItem(`student-${propertyName}`, student[propertyName]);
        setStudentFirstName(student.firstName);
        setLoggedIn(true);
        setIsModalOpen(false);
      });
    },
    [setLoggedIn, setIsModalOpen, setStudentFirstName],
  );
  const handleRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <Flex gap='large' align='middle' vertical style={{ marginTop: "15px" }}>
      <Flex justify='center' align='center' style={{ fontWeight: "900", fontSize: "2rem" }}>
        Login
      </Flex>
      <Flex justify='center' align='center'>
        <Form
          form={form}
          name='login'
          onFinish={onLogin}
          autoComplete='off'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            hasFeedback
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please check if your email is valid",
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Flex justify='center' align='center'>
        Dont't have an account with us?{" "}
        <Button type='link' style={{ padding: "5px", marginBottom: "2px" }} onClick={handleRegister}>
          Register now
        </Button>
      </Flex>
    </Flex>
  );
}
