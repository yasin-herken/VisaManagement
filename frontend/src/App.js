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
    console.log(user)
  },[user])
  useEffect(()=>{
  },[])
  return ( 
        <Routes>
          {console.log(new Date(),"router begin",user && user.role)}
            <Route exact path="/admin" element={user && user.role==="Restricted"?<ResrictedPage />:<Admin path="/admin" />} />
            <Route path="/login" element={user && user.role==="Admin" && user.role==="Client" ?<Home />:<Login />} />
            <Route path="/register" element={user && user.role?<Navigate replace to="/" />:<Register />} />
            <Route exact path="/"  element={user &&user.role==="Admin"?<Admin path="/"/>:<Home />} />
            <Route path="/restrictedPage" element={<ResrictedPage />} />
            <Route path="/newApplication" element={user && user.role==="Admin"?<Admin path="/new Application"/>:"null"} />
            <Route path="*" element={<ResrictedPage />} />  
        </Routes>
  );
}

export default App;
