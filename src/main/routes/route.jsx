/** @format */

import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../modules/home/HomePage";
import ProfessorListPage from "../../modules/profList/ProfessorListPage";
import ProfessorDetailsPage from "../../modules/profDetails/ProfessorDetailsPage";
import UserRatingsPage from "../../modules/profile/UserRatingsPage"
import UserDetailsPage from "../../modules/profile/UserDetailsPage"
import UserSavedProfessorsPage from "../../modules/profile/UserSavedProfessorsPage"
import UserSettingsPage from "../../modules/profile/UserSettingsPage"
import ProfilePage from "../../modules/profile/ProfilePage";

const App = lazy(() => import("../../App"));

const routeConfig = function () {
  return (
    <Router>
      <Routes>
        <Route path='/App' element={<App />} />

        {/* if no matching URL, default redirect to home page */}
        <Route path='*' element={<Navigate to='/home' />} />
        <Route path="home" element={<Home/>}></Route>
        <Route path="search/professors/*" element={<ProfessorListPage/>}></Route>
        <Route path="professor/:id" element={<ProfessorDetailsPage/>}></Route>
        <Route path = "account" element={<ProfilePage/>}>
          <Route path = "profile" element={<UserDetailsPage/>}></Route>
          <Route path = "settings" element={<UserSettingsPage/>}></Route>
          <Route path = "ratings" element={<UserRatingsPage/>}></Route>
          <Route path = "saved-professors" element={<UserSavedProfessorsPage/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default routeConfig;
