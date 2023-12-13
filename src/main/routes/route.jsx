/** @format */

import React, { lazy } from "react";
import Home from "../../modules/home/HomePage";
import ProfilePage from "../../modules/profile/ProfilePage";
import RegisterPage from "../../modules/register/RegisterPage";
import AddRatingPage from "../../modules/rating/AddRatingPage";
import EditRatingPage from "../../modules/rating/EditRatingPage";
import UserDetailsPage from "../../modules/profile/UserDetailsPage";
import UserRatingsPage from "../../modules/profile/UserRatingsPage";
import AddProfessorPage from "../../modules/professorPages/AddProfessorPage";
import ProfessorListPage from "../../modules/professorPages/ProfessorListPage";
import UserSavedProfessorsPage from "../../modules/profile/UserSavedProfessorsPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProfessorDetailsPage from "../../modules/professorPages/ProfessorDetailsPage";

const App = lazy(() => import("../../App"));

const routeConfig = function () {
  return (
    <Router>
      <Routes>
        <Route path='/App' element={<App />} />

        {/* if no matching URL, default redirect to home page */}
        <Route path='*' element={<Navigate to='/home' />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='home/:isLogin?' element={<Home />} />
        {/* Professor Pages */}
        <Route path='search/professors/:schoolId/:professorName' element={<ProfessorListPage />} />
        <Route path='professor/:id' element={<ProfessorDetailsPage />} />
        <Route path='add/professor/' element={<AddProfessorPage />} />
        {/* Account Pages */}
        <Route path='account' element={<ProfilePage />}>
          <Route path='profile' element={<UserDetailsPage />} />
          {/* <Route path='settings' element={<UserSettingsPage />} /> */}
          <Route path='ratings' element={<UserRatingsPage />} />
          <Route path='saved-professors' element={<UserSavedProfessorsPage />} />
        </Route>
        {/* Rating Pages */}
        <Route path='edit/professor-rating/:studentId/:ratingId' element={<EditRatingPage />}></Route>
        <Route path='add/professor-rating' element={<AddRatingPage />}></Route>
      </Routes>
    </Router>
  );
};

export default routeConfig;
