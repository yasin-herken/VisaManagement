import './App.css';
import React,{useState,useEffect} from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
import NewApplication from './pages/Home/newApplication.js';
import axios from 'axios';
function App() {
  const [username,setUsername] = useState("")
  const [role,setRole] = useState()
  const getUserPage =  async(event) => {
    if(event && event.preventDefault)
        event.preventDefault()
    await axios({
        method: "GET",
        withCredentials: true,
        url : "http://localhost:8000/getUser"
    }).then(res=>{
        if(res.data.role==="Admin")
        {
            setUsername(res.data.username)
            setRole("Admin")
        }
        else if(res.data.role==="Client")
        {   
            setUsername(res.data.username)
            setRole("Client")
        }
        else if(res.data.role==="Restricted"){
            setRole("Restricted")
        }
        console.log(role)
}
).catch(err=>console.log(err));
}
useEffect(()=>{
  getUserPage()
},[role,username])
  return ( 
        <Routes>
            <Route path="/admin" exact element={role==="Restricted"?<ResrictedPage />:<Home />} />
            <Route path="/login" element={(role==="Admin" || role==="Client")?<Navigate to="/" />:<Login /> } />
            <Route path="/register" element={<Register />} />
            <Route exact path="/"  element={<Home />} />
            <Route path="/visa" element={role==="Admin"?<NewApplication />:<Home /> } />
            <Route path="/restrictedPage" element={<ResrictedPage />} />
            <Route path="*" element={<ResrictedPage />} />   
        </Routes>
  );
}

export default App;
