import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function DropDownMenu({username}) {
  const [bool,setBool] = useState(false)
  const navigate = useNavigate()
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
    if(username)
      setBool(true)
    else{
      setBool(false)
    }
  },[username])
  return (
    <li className="nav-item dropdown">
        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="/" data-bs-toggle="dropdown">
            <i className="align-middle" data-feather="settings"></i>
        </a>

        <a className="nav-link dropdown-toggle d-sm-inline-block" href="/profile" data-bs-toggle="dropdown" >
            <span className="text-dark">{bool?username.toUpperCase():null}</span>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
            <a className="dropdown-item" href="/"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="index.html"><i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy</a>
            <a className="dropdown-item" href="/"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
            <div className="dropdown-divider"></div>
            <p className="dropdown-item" onClick={handleLogout}>Log out</p>
        </div>
</li>
  )
}

export default DropDownMenu