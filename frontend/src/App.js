import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import { useSelector } from 'react-redux';
import { selectUser } from './pages/Features/userSlice.js';
import Table from "./pages/Home/table.js";
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
            <Route path="/changeStatus" element={<Home />} />
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
