import './App.css';
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import Admin from './pages/Home/admin.js';
import { useSelector } from 'react-redux';
import { selectUser } from './pages/Features/userSlice.js';
import ApplicationList from './pages/Home/applicationList';
import Table from "./pages/Home/table.js";
import NewApp from './pages/Home/newApplicationTest';
function App() {
  const user = useSelector(selectUser);
  useEffect(() => {
  }, [user])
  useEffect(() => {
  }, [])
  return (
    <Routes>
      {
        user?.role === "Admin" ?
          <>
            <Route path="/login" element={<Home />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/makeNewApplication" element={<Home />}></Route>
            <Route path="/table" element={<Table />}></Route>
            <Route path="/applicationList" element={<Home />}></Route>
            <Route path="/register" element={<Home />} />
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
