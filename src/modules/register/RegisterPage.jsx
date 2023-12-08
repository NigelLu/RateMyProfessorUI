/** @format */

import { useNavigate } from "react-router";
import { IS_LOGIN_PARAM } from "../home/HomePage";
import smallLogo from "../../resources/images/small_RMP_Logo.svg";
import { registerStudent } from "../../main/axios/studentServices";
import ProfessorServices from "../../main/axios/professorServices";
import { Flex, Form, Input, Button, Layout, AutoComplete } from "antd";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { isLoggedIn } from "../../library/common/components/RequireLoggedIn";

const { useForm } = Form;
const { Content, Header } = Layout;

export default function RegisterPage() {
  const [form] = useForm();
  const navigate = useNavigate();

  const [schools, setSchools] = useState(JSON.parse(localStorage.getItem("schoolsData")));

  const schoolNameIdMap = useMemo(
    () =>
      schools
        ? schools.reduce((prev, cur) => {
            if (!prev[cur.name]) {
              prev[cur.name] = cur.id;
              return prev;
            }
            console.error(`Duplicated school names detected: "${cur.name}"`);
            return prev;
          }, {})
        : {},
    [schools],
  );

  // * login callback
  const handleLogin = useCallback(() => navigate(`/home/${IS_LOGIN_PARAM}`), [navigate]);

  // * register form submission
  const onRegister = useCallback(
    (values) => {
      registerStudent({ ...values, schoolId: schoolNameIdMap[values.schoolName] }).then((student) => {
        for (let propertyName of Object.getOwnPropertyNames(student))
          localStorage.setItem(`student-${propertyName}`, student[propertyName]);
        navigate("/home");
      });
    },
    [navigate, schoolNameIdMap],
  );

  // * redirect user to home if user is logged in
  useEffect(() => {
    if (isLoggedIn()) navigate("/home");
  }, [navigate]);

  // * fetch schools if schools are not present
  useEffect(() => {
    if (!schools)
      ProfessorServices.getSchools().then((schoolsData) => {
        setSchools(schoolsData);
        localStorage.setItem("schoolsData", JSON.stringify(schoolsData));
      });
  }, [schools]);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header style={{ backgroundColor: "transparent" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href='home' style={{ marginTop: "3vh" }}>
            <img src={smallLogo} alt='' style={{ backgroundColor: "black", padding: "5px" }} />
          </a>
        </div>
      </Header>
      <Content>
        <Flex gap='large' align='middle' justify='center' vertical style={{ marginTop: "15vh" }}>
          <Flex justify='center' align='center' style={{ fontWeight: "900", fontSize: "2rem" }}>
            Register
          </Flex>
          <Flex justify='center' align='center'>
            <Form
              form={form}
              name='register'
              autoComplete='off'
              onFinish={onRegister}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              style={{ minWidth: "50vw", marginLeft: "-10vw" }}
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
                name='password1'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Confirm Password'
                name='password2'
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    message: "The two passwords you entered do not match",
                    validator: (_, val) =>
                      val === form.getFieldValue("password1") ? Promise.resolve() : Promise.reject(),
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='First Name'
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Expected Year of Graduation'
                name='expectedYearOfGraduation'
                rules={[
                  {
                    required: true,
                    message: "Please input your expected year of graduation!",
                  },
                  {
                    validator: (_, value) => {
                      if (Number.isNaN(Number(value))) return Promise.reject("Please input a valid year number");
                      return Number(value) <= 2000 || Number(value) >= 2050
                        ? Promise.reject("Please input a year after 2000 and before 2050")
                        : Promise.resolve();
                    },
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='School'
                name='schoolName'
                rules={[
                  {
                    required: true,
                    message: "Please select a school",
                  },
                  {
                    validator: (_, value) =>
                      value in schoolNameIdMap
                        ? Promise.resolve()
                        : Promise.reject("Please select a valid school option"),
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <AutoComplete
                  dropdownStyle={{
                    maxHeight: "auto",
                    overflowY: "scroll",
                  }}
                  options={schools ? schools.map((option) => ({ value: option.name, label: option.name })) : []}
                  filterOption={(inputValue, option) =>
                    option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                  }
                ></AutoComplete>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 13,
                  span: 11,
                }}
              >
                <Button type='primary' htmlType='submit' style={{ marginTop: "1.5vh" }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Flex>
          <Flex justify='center' align='center' style={{ marginTop: "-2.5vh" }}>
            Have an account?{" "}
            <Button type='link' style={{ padding: "5px", marginBottom: "2px" }} onClick={handleLogin}>
              Login
            </Button>
          </Flex>
        </Flex>
      </Content>
    </Layout>
  );
}
