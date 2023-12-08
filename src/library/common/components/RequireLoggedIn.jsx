/** @format */

import React, { useEffect } from "react";
import { IS_LOGIN_PARAM } from "../../../modules/home/HomePage";

export const REQUIRED_STUDENT_PROPERTY_NAMES = [
  "id",
  "email",
  "schoolId",
  "lastName",
  "firstName",
  "ratinglList",
  "savedProfessorList",
  "expectedYearOfGraduation",
];
export function isLoggedIn() {
  return REQUIRED_STUDENT_PROPERTY_NAMES.reduce((prev, cur) => prev && Boolean(localStorage.getItem(cur)), true);
}

export default function RequireLoggedIn() {
  useEffect(() => {
    // * for some reason, navigate() does not work well here
    // * so I am using window.location instead
    if (!isLoggedIn()) window.location = `/home/${IS_LOGIN_PARAM}`;
  }, []);

  return <></>;
}
