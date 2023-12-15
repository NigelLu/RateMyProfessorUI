/** @format */

import axiosInstance from ".";
import { message } from "antd";

const getSchools = () => {
  return axiosInstance
    .get("school")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getProfessors = (schoolId) => {
  return axiosInstance
    .get("professor/list/" + schoolId + "?includeDetails=false")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getProfessorsWithDetials = (schoolId, name) => {
  return axiosInstance
    .get("professor/list/" + schoolId + "?includeDetails=true&name=" + name)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getProfessorDetail = ({ id }) => {
  return axiosInstance
    .get(`professor/${id}`)
    .then(({ data }) => {
      message.success("Successfully loaded professor detail");
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error);
    });
};

const ProfessorServices = {
  getSchools,
  getProfessors,
  getProfessorDetail,
  getProfessorsWithDetials,
};

export default ProfessorServices;
