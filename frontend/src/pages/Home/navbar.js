import React,{useState,useEffect} from 'react'
import { Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DropDownMenu from './dropDownMenu.js';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function Navbar({username,role}) {
    const [collapse,setCollapse] = useState(false)
    const navigate = useNavigate()
    const handleToggle= (event) =>{
        if(!collapse)
            setCollapse(true)
        else
            setCollapse(false)
    }
    const handleLogout = async(event) =>{
        event.preventDefault() 
        event.stopPropagation()
        await axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:8000/logout"
        }).then(res=>{
            if(res.data.data==="Succesfully Logout")
                navigate(res.data.direct)
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        
    },[username,role])
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
    <div onClick={handleToggle}>
        <a  className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
    </a>
    </div>
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
            { role==="Restricted"? 
            <DropDownMenu />:
            <DropDownMenu username={username} handleLogout={handleLogout}/>
            }
        </ul>
    </div>
</nav>
  )
}

export default Navbar