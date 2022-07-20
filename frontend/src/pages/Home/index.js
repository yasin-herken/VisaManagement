import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import Navbar from './navbar';
import "./css/index.css";
function Home() {
    const [username,setUsername] = useState("")
    const [role,setRole] = useState()
    const [collapse,setCollapse] = useState(false)
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
        else{
          
        }
  }
  ).catch(err=>console.log("Error in index js"));
  }
  useEffect(()=>{
    getUserPage()
},[username,role,collapse])
  return ( 
    <div className="wrapper">
        <Sidebar username={username} role={role} coll={collapse}/>
        <div className="main">
          <Navbar username={username} role={role} setColl={setCollapse}/>
            <main className="content"></main>
        <Footer />
        </div>
    </div>
  )
    
}

export default Home;