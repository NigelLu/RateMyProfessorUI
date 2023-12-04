/** @format */

import axios from "axios";

const rootURL = "http://localhost:8080/";

const getSchools = () => {
  return axios
    .get(rootURL + "school")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getProfessors = (schoolId) => {
  return axios
    .get(rootURL + "professor/list/" + schoolId + "?includeDetails=false")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getProfessorsWithDetials = (schoolId, name) => {
  return axios
    .get(rootURL + "professor/list/" + schoolId + "?includeDetails=true&name=" + name)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const ProfessorServices = {
  getSchools,
  getProfessors,
  getProfessorsWithDetials
};

export default ProfessorServices;
