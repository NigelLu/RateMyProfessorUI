/** @format */
import axiosInstance from ".";
import { message } from "antd";

const ERROR_DURATION = 5;
const SUCCESS_DURATION = 2;

export const authenticateStudent = ({ email, password }) => {
  return axiosInstance
    .post("student/login/", { email, password })
    .then(({ data }) => {
      message.success(`Welcome back, ${data.firstName}`, SUCCESS_DURATION);
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};

export const registerStudent = ({ email, password1, lastName, firstName, expectedYearOfGraduation, schoolId }) => {
  return axiosInstance
    .post("student/register", {
      email,
      schoolId,
      lastName,
      firstName,
      password: password1,
      expectedYearOfGraduation,
    })
    .then(({ data }) => {
      message.success(`Welcome to Rate My Professor, ${data.firstName}`, SUCCESS_DURATION);
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};

export const updateStudent = ({ email, firstName, lastName, expectedYearOfGraduation, schoolId }) => {
  return axiosInstance
    .post("student/update", {
      email,
      lastName,
      schoolId,
      firstName,
      expectedYearOfGraduation,
      id: localStorage.getItem("id") || -1, // * fallback for no ID
    })
    .then(({ data }) => {
      message.success(`Profile updated`, SUCCESS_DURATION);
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};
