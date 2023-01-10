import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import { useSelector } from 'react-redux';
import { selectUser } from './pages/Features/userSlice.js';
import Table from "./pages/Home/table.js";
import UpdateList from './pages/Home/Edit/UpdateList.js';
function App() {
  const user = useSelector(selectUser);
  return (
    <Routes>
      {
        (user?.role === "Admin" || user?.role === "All") ?
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/makeNewApplication" element={<Home />} />
            <Route path="/table" element={<Table />} />
            <Route exact path="/applicationList" element={<Home />} />
            <Route path="/applicationList/:id" element={<UpdateList />} />
            <Route path="/register" element={<Home />} />
            <Route path="/changeStatus" element={<Home />} />
            <Route path="/deliveryList" element={<Home />} />
            <Route path="/customerReturnList" element={<Home />} />
            <Route path="/customerReturnList/:id" element={<Home />} />
          </>
          : <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ResrictedPage />} />
            <Route path="/restrictedPage" element={<ResrictedPage />} />
          </>

      }

    </Routes>
  );
}

export default App;
