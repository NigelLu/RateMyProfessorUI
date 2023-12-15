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

// export const getRatings = ({ studentId }) => {
//   message.info("Fetching your ratings", SUCCESS_DURATION);
//   return axiosInstance
//     .get(`student/ratings/${studentId}`)
//     .then(({ data }) => {
//       message.success(`Successfully fetched your ratings`, SUCCESS_DURATION);
//       return data;
//     })
//     .catch((err) => {
//       message.error(err.response.data.error, ERROR_DURATION);
//     });
// };

export const submitRating = ({
  id,
  grade,
  review,
  rating,
  studentId,
  takeAgain,
  difficulty,
  takenForCredit,
  attendanceMandatory,
}) => {
  return axiosInstance
    .put("edit/rating", {
      id,
      grade,
      review,
      rating,
      takeAgain,
      studentId,
      difficulty,
      takenForCredit,
      attendanceMandatory,
    })
    .then(({ data }) => {
      let ratings;
      try {
        ratings = JSON.parse(localStorage.getItem("ratinglList"));
      } catch (error) {
        message.error(
          "Something went wrong. Please log out and log back in again to see rating changes.",
          ERROR_DURATION,
        );
        localStorage.removeItem("ratinglList");
        ratings = [];
      }
      ratings.forEach((ele) => {
        if (ele.id === data.id) {
          ele.grade = data.grade;
          ele.review = data.review;
          ele.rating = data.rating;
          ele.takeAgain = data.takeAgain;
          ele.difficulty = data.difficulty;
          ele.takenForCredit = data.takenForCredit;
          ele.attendanceMandatory = data.attendanceMandatory;
        }
      });
      localStorage.setItem("ratinglList", JSON.stringify(ratings));
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};

export const saveProfessor = ({ studentId, professorId }) => {
  return axiosInstance
    .post("save", { studentId, professorId })
    .then(({ data }) => {
      const savedProfessorList = JSON.parse(localStorage.getItem("savedProfessorList"));
      savedProfessorList.push(data);
      localStorage.setItem("savedProfessorList", JSON.stringify(savedProfessorList));
      message.success("Successfully saved the professor", SUCCESS_DURATION);
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};

export const unsaveProfessor = ({ studentId, professorId }) => {
  return axiosInstance
    .delete("save", { data: { studentId, professorId } })
    .then(({ data }) => {
      const savedProfessorList = JSON.parse(localStorage.getItem("savedProfessorList"));
      localStorage.setItem(
        "savedProfessorList",
        JSON.stringify(
          savedProfessorList.filter((ele) => ele.studentId === data.studentId && ele.professorId === data.professorId),
        ),
      );

      message.success("Successfully removed the professor", SUCCESS_DURATION);
      return data;
    })
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};

export const getSavedProfessorDetail = ({ savedProfessors }) => {
  const getDetailsPromises = [];
  savedProfessors.forEach((savedProfessor) =>
    getDetailsPromises.push(axiosInstance.get(`professor/${savedProfessor.professorId}`)),
  );
  return Promise.all(getDetailsPromises)
    .then((values) => values.map(({ data }) => data))
    .catch((err) => {
      message.error(err.response.data.error, ERROR_DURATION);
    });
};
