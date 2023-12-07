/** @format */

import axiosInstance from ".";

export const authenticateStudent = ({ email, password }) => {
  return axiosInstance
    .post("student/login/", { email, password })
    .then(({ data }) => data)
    .catch(console.error);
};
