import React,{ useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ResrictedPage from './resrictedPage';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Footer from './footer';
import DropDownMenu from './dropDownMenu.js';
import Navbar from './navbar';
import "./css/index.css";
function Home() {
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [role,setRole] = useState()
    const [collapse,setCollapse] = useState(false)
    const getUserPage =  (event) => {
      if(event && event.preventDefault)
          event.preventDefault()
      axios({
          method: "GET",
          withCredentials: true,
          url : "http://localhost:8000/getUser"
      }).then(res=>{
          if(res.data.role==="Admin")
          {
              setUsername(res.data.username)
              setRole(res.data.role)
          }
          else if(res.data.role==="Client")
          {   
              setUsername(res.data.username)
              setRole(res.data.role)
          }
          else if(res.data.role==="Restricted"){
              setRole("Restricted")
          }
  }
  ).catch(err=>console.log(err));
  }
    const handleLogout = async(event) =>{
        event.preventDefault()
        await axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:8000/logout"
        }).then(res=>{
            if(res.data.data==="Succesfully Logout")
                navigate(res.data.direct)
            else{
                alert("There is a problem")
            }
        })
        .catch(err => console.log(err))
    }
    const handleToggle= (event) =>{
        if(!collapse)
            setCollapse(true)
        else
            setCollapse(false)
    }
    useEffect(()=>{
        getUserPage()
    },[role,username])
  return ( 
    <div className="wrapper">
        <Sidebar role={role} coll={collapse}/>
        <div className="main">
            <Navbar usarname={username} role={role}/>
            <main className="content"></main>
        <Footer />
        </div>
    </div>
  )
    
}

export default Home;