import './App.css';
import React,{useEffect} from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import Admin from './pages/Home/admin.js';
import { useSelector} from 'react-redux';
import { selectUser} from './pages/Features/userSlice.js';
function App() {
  const user = useSelector(selectUser);
  useEffect(()=>{
  },[user])
  useEffect(()=>{
  },[])
  return ( 
        <Routes>
            <Route exact path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/"  element={<Home />} />
            <Route path="/restrictedPage" element={<ResrictedPage />} />
            <Route path="/admin/newApplication" element={user?.role==="Admin"?<Admin path={"newApplication"} />:<Navigate to="/restrictedPage"></Navigate>} />
            <Route path="*" element={<ResrictedPage />} />  
        </Routes>
  );
}

export default App;
