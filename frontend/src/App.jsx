import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "../components/Landing.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
