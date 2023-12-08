/** @format */

import { updateStudent } from "../../main/axios/studentServices";
import { Button, Form, Input, AutoComplete, Row, Col } from "antd";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { REQUIRED_STUDENT_PROPERTY_NAMES } from "../../library/common/components/RequireLoggedIn";

export default function UserDetailsPage() {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(
    REQUIRED_STUDENT_PROPERTY_NAMES.reduce((prev, propertyName) => {
      if (localStorage.getItem(propertyName)) prev[propertyName] = localStorage.getItem(propertyName);
      return prev;
    }, {}),
  );
  const [formEditable, setFormEditable] = useState(false);
  const schools = JSON.parse(localStorage.getItem("schoolsData"));

  // * name->id map, for submission
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

  // * id->name map for automatically setting school field label value
  const schoolIdNameMap = useMemo(
    () =>
      schools
        ? schools.reduce((prev, cur) => {
            if (!prev[cur.id]) {
              prev[cur.id] = cur.name;
              return prev;
            }
            console.error(`Duplicated school ids detected: "${cur.id}"`);
            return prev;
          }, {})
        : {},
    [schools],
  );

  const onUpdateProfile = useCallback(
    (values) => {
      updateStudent({ ...values, schoolId: schoolNameIdMap[values.schoolName] })
        .then((student) => {
          if (!student) return;
          for (let propertyName of Object.getOwnPropertyNames(student))
            localStorage.setItem(`${propertyName}`, student[propertyName]);
          setFormEditable(false);
        })
        .catch(() => {
          setFormValues(
            REQUIRED_STUDENT_PROPERTY_NAMES.reduce((prev, propertyName) => {
              if (localStorage.getItem(propertyName)) prev[propertyName] = localStorage.getItem(propertyName);
              return prev;
            }, {}),
          );
        });
    },
    [schoolNameIdMap],
  );

  // * automatically set the school field value
  useEffect(() => {
    if (
      (!form.getFieldValue("schoolName") ||
        form.getFieldValue("schoolName") !== schoolIdNameMap[formValues.schoolId]) &&
      schoolIdNameMap[formValues.schoolId]
    )
      form.setFieldValue("schoolName", schoolIdNameMap[formValues.schoolId]);
  }, [schoolIdNameMap, formValues, form]);

  return (
    <div style={{ width: "40%", minWidth: "400px" }}>
      <Form
        form={form}
        name='register'
        autoComplete='off'
        disabled={!formEditable}
        labelCol={{ span: 10 }}
        onFinish={onUpdateProfile}
        wrapperCol={{ span: 14 }}
        initialValues={formValues}
      >
        <Form.Item
          labelAlign='left'
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
          labelAlign='left'
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
          labelAlign='left'
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
          labelAlign='left'
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
          labelAlign='left'
          label='School'
          name='schoolName'
          rules={[
            {
              required: true,
              message: "Please select a school",
            },
            {
              validator: (_, value) =>
                value in schoolNameIdMap ? Promise.resolve() : Promise.reject("Please select a valid school option"),
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
            filterOption={(inputValue, option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
          ></AutoComplete>
        </Form.Item>

        <Form.Item
          hidden={!formEditable}
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Button type='primary' htmlType='submit' style={{ marginTop: "1.5vh" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col offset={12} span={12}>
          <Button type={formEditable ? "default" : "primary"} onClick={() => setFormEditable(!formEditable)}>
            {formEditable ? "Cancel" : "Edit"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
