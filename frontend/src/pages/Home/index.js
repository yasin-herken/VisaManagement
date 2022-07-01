import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Footer from './footer';
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
  ).catch(err=>console.log("Error in index js"));
  }
    useEffect(()=>{
        getUserPage()
    },[role,username,collapse])
  return ( 
    <div className="wrapper">
        <Sidebar role={role} coll={collapse}/>
        <div className="main">
          <Navbar usarname={username} role={role} setColl={setCollapse}/>
            <main className="content"></main>
        <Footer />
        </div>
    </div>
  )
    
}

export default Home;