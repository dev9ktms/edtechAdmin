import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./componets/home/index";
import TutoriaTrack from "./componets/tutorialTrack/index.js";
import TestRoute from "./componets/testRoute"
import TutorialPage from "./componets/tutorialTrack/tutorialPage.js";
import ModuleVideoPage from "./componets/tutorialTrack/moduleVideoPage";
import AdminSignUp from "./componets/admin/signUp";
import AdminLogin from "./componets/admin/login";
import AdminProfile from "./componets/admin/profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/tutorial" element={<TutoriaTrack/>} />
        <Route path="/account/tutorial/tutorialPage" element={<TutorialPage/>} />
        <Route path="/account/testroute" element={<TestRoute/>} />
        <Route path="/account/tutorial/tutorialPage/modulevideo" element={<ModuleVideoPage/>} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/profile" element={<AdminProfile/>} />
      </Routes>
    </div>
  );
}

export default App;
