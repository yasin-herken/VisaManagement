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
import "./css/index.css";
function Home() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [role,setRole] = useState("")
    const [login,setLogin] = useState(false)
    const navigate = useNavigate()
    const getUserPage = async (event) => {
        if(event && event.preventDefault)
            event.preventDefault()
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://localhost:8000/getUser"
        }).then(res=>{
            if(res.data===null || res.data==="")
            {
                setLogin(false)
                navigate("/restrictedPage")
            }
            else{
                setLogin(true)
                setUsername(res.data.username)
                setEmail(res.data.email)
                setRole(res.data.role)
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
            console.log(res.data)
            if(res.data.data==="Succesfully Logout")
                navigate(res.data.direct)
            else{
                alert("There is a problem")
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
            getUserPage()
    },[username,email,role])
  return ( 
        <div className="wrapper">
        <Sidebar />

        <div className="main">
            <nav className="navbar navbar-expand navbar-light navbar-bg">
                <a href="/" className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center"></i>
                </a>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="/" id="alertsDropdown" data-bs-toggle="dropdown">
                            <div className="position-relative">
                                <Badge>
                                    <NotificationsNoneIcon style={{transform:"scale(1.3)"}} fontSize='large' className='align-middle' />
                                </Badge>
                                <span className="indicator">4</span>
                            </div>
                        </a>
                        </li>
                        <DropDownMenu username={username} handleLogout={handleLogout}/>
                    </ul>
                </div>
            </nav>

            <main className="content">
                
            </main>

           <Footer />
        </div>
     </div>
  )
    
}

export default Home;