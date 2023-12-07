/** @format */

import React, { useCallback } from "react";
import { Flex, Form, Input, Button } from "antd";
import { authenticateStudent } from "../../main/axios/studentServices";

const { useForm } = Form;

export const REQUIRED_STUDENT_PROPERTY_NAMES = [
  "student-id",
  "student-email",
  "student-schoolId",
  "student-lastName",
  "student-firstName",
  "student-ratinglList",
  "student-savedProfessorList",
];

export default function LoginPage({ setIsModalOpen, setLoggedIn, setStudentFirstName }) {
  const [form] = useForm();
  const onLogin = useCallback(
    (values) => {
      authenticateStudent(values).then((student) => {
        for (let propertyName of Object.getOwnPropertyNames(student))
          localStorage.setItem(`student-${propertyName}`, student[propertyName]);
        setStudentFirstName(student.firstName);
      });
      setLoggedIn(true);
      setIsModalOpen(false);
    },
    [setLoggedIn, setIsModalOpen, setStudentFirstName],
  );

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
          initialValues={{ remember: true }}>
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
            validateTrigger='onBlur'>
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
            validateTrigger='onBlur'>
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
}
