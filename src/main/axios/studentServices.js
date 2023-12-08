/** @format */

import axiosInstance from ".";

export const authenticateStudent = ({ email, password }) => {
  return axiosInstance
    .post("student/login/", { email, password })
    .then(({ data }) => data)
    .catch(console.error);
};

export const registerStudent = ({ email, password1, lastName, firstName, expectedYearOfGraduation, schoolId }) => {
  console.log({ email, password1, lastName, firstName, expectedYearOfGraduation, schoolId });
  return axiosInstance
    .post("student/register", {
      email,
      schoolId,
      lastName,
      firstName,
      password: password1,
      expectedYearOfGraduation,
    })
    .then((res) => res.data)
    .catch(console.error);
};
