import './App.css';
import React,{useState,useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import Admin from './pages/Home/admin.js';
import { useSelector} from 'react-redux';
import { logout,selectUser} from './pages/Features/userSlice.js';
import {useDispatch} from 'react-redux';
function App() {
  const [role,setRole] = useState("");
  const user = useSelector(selectUser);
  const dispact = useDispatch();
  console.log(dispact(logout()))
  useEffect(()=>{
    if(user && user.role==="Admin"){
        setRole("Admin")
    }else if(user && user.role==="Client"){
        setRole("Client")
    }else if(user===null){
        setRole("null")
    }
  },[user])
  return ( 
        <Routes>
            <Route exact path="/admin" element={role==="Restricted"?<ResrictedPage />:<Admin path="/admin" />} />
            <Route path="/login" element={role==="Admin" && role==="Client" ?<Home />:<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/"  element={role==="Admin"?<Admin path="/"/>:<Home />} />
            <Route path="/restrictedPage" element={<ResrictedPage />} />
            <Route path="/newApplication" element={role==="Admin"?<Admin path="/new Application"/>:"null"} />
            <Route path="*" element={<ResrictedPage />} />  
        </Routes>
  );
}

export default App;
