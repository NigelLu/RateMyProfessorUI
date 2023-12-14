/** @format */

import TextArea from "antd/es/input/TextArea";
import { CheckBox } from "@mui/icons-material";
import { Flex, Form, Input, Button, Layout, Select } from "antd";
import React, { useCallback, useEffect } from "react";
import { submitRating } from "../../../main/axios/studentServices";

const { useForm } = Form;
const { Content } = Layout;
const GRADE_VALUE_MAP = {
  RATHER_NOT_SAY: 0,
  NOT_SURE_YET: 1,
  INCOMPLETE: 2,
  DROP_WITHDRAW: 3,
  AUDIT_NO_GRADE: 4,
  FAIL: 5,
  D_MINUS: 6,
  C_MINUS: 7,
  B_MINUS: 8,
  A_MINUS: 9,
  D: 10,
  C: 11,
  B: 12,
  A: 13,
  D_PLUS: 14,
  C_PLUS: 15,
  B_PLUS: 16,
  A_PLUS: 17,
};

const GRADE_OPTIONS = [
  { label: "Rather Not Say", value: 0 },
  { label: "Not Sure Yet", value: 1 },
  { label: "Incomplete", value: 2 },
  { label: "Drop/Withdraw", value: 3 },
  { label: "Audit No Grade", value: 4 },
  { label: "Fail", value: 5 },
  { label: "D-", value: 6 },
  { label: "C-", value: 7 },
  { label: "B-", value: 8 },
  { label: "A-", value: 9 },
  { label: "D", value: 10 },
  { label: "C", value: 11 },
  { label: "B", value: 12 },
  { label: "A", value: 13 },
  { label: "D+", value: 14 },
  { label: "C+", value: 15 },
  { label: "B+", value: 16 },
  { label: "A+", value: 17 },
];

export default function RatingForm({ rating = {}, setModalOpen }) {
  const [form] = useForm();

  const onRating = useCallback(() => {
    submitRating({ ...rating, ...form.getFieldsValue() }).then(() => {
      setModalOpen(false);
      window.location.reload();
    });
  }, [form, rating, setModalOpen]);

  // * load value to form if rating is present
  useEffect(() => {
    if (Object.getOwnPropertyNames(rating).length)
      form.setFieldsValue({
        review: rating.review,
        rating: rating.rating,
        takeAgain: rating.takeAgain,
        difficulty: rating.difficulty,
        takenForCredit: rating.takenForCredit,
        grade: GRADE_VALUE_MAP[rating.grade],
        attendanceMandatory: rating.attendanceMandatory,
      });
  }, [rating, form]);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>
        <Flex gap='large' align='middle' justify='center' vertical style={{ marginTop: "2.5vh" }}>
          <Flex justify='center' align='center'>
            <Form
              form={form}
              name='editRating'
              autoComplete='off'
              onFinish={onRating}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              style={{ minWidth: "40vw" }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                labelAlign='left'
                hasFeedback
                name='rating'
                label='Quality'
                rules={[
                  {
                    required: true,
                    message: "Please input the quality of class",
                  },
                  {
                    validator: (_, value) => {
                      if (Number.isNaN(Number(value)))
                        return Promise.reject("Please check if the quality of class is a valid decimal number");
                      const quality = Number(value);
                      if (quality < 0 || quality > 5)
                        return Promise.reject("Quality of class should be between 0.0 to 5.0 (inclusive)");
                      return Promise.resolve();
                    },
                  },
                ]}
                validateTrigger='onBlur'
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelAlign='left'
                label='Difficulty'
                name='difficulty'
                rules={[
                  {
                    required: true,
                    message: "Please input the difficulty of class",
                  },
                  {
                    validator: (_, value) => {
                      if (Number.isNaN(Number(value)))
                        return Promise.reject("Please check if the difficulty of class is a valid decimal number");
                      const quality = Number(value);
                      if (quality < 0 || quality > 5)
                        return Promise.reject("Difficulty of class should be between 0.0 to 5.0 (inclusive)");
                      return Promise.resolve();
                    },
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item labelAlign='left' label='For credit' name='takenForCredit'>
                <CheckBox />
              </Form.Item>

              <Form.Item labelAlign='left' label='Take again' name='takeAgain'>
                <CheckBox />
              </Form.Item>

              <Form.Item labelAlign='left' label='Attendance mandatory' name='attendanceMandatory'>
                <CheckBox />
              </Form.Item>

              <Form.Item
                labelAlign='left'
                label='Grade'
                name='grade'
                rules={[
                  {
                    required: true,
                    message: "Please select a grade",
                  },
                ]}
              >
                <Select style={{ width: 240 }} options={GRADE_OPTIONS} />
              </Form.Item>

              <Form.Item
                labelAlign='left'
                label='Review'
                name='review'
                rules={[
                  {
                    required: true,
                    message: "Review content cannot be empty",
                  },
                ]}
                validateTrigger='onBlur'
                hasFeedback
              >
                <TextArea />
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
        </Flex>
      </Content>
    </Layout>
  );
}
