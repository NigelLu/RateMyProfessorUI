/** @format */

import axiosInstance from ".";

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

const ProfessorServices = {
  getSchools,
  getProfessors,
  getProfessorsWithDetials,
};

export default ProfessorServices;
