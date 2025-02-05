import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "../views/Landing.jsx";
import Login from "../views/Login.jsx";
import Signup from "../views/Signup.jsx";
import Dashboard from "../views/Dashboard.jsx";

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
