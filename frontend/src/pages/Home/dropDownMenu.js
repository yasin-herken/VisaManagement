import React,{useEffect,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { logout } from '../Features/userSlice';
import axios from 'axios';
function DropDownMenu({username}) {
  const [bool,setBool] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = async(event) =>{
    event.preventDefault() 
    event.stopPropagation();
	
    await axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:8000/logout"
    }).then(res=>{
        if(res.data.data==="Succesfully Logout")
           { navigate(res.data.direct)
          dispatch(logout({
            loggedIn:false
          }))}
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
			<a className="nav-icon pe-md-0 dropdown-toggle" href="#" data-bs-toggle="dropdown">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCnbayQIq0SLjq7bdjeYI4R14mT7RiGbuhw&usqp=CAU" className="avatar img-fluid rounded" alt="Charles Hall"/>
			</a>
			<div className="dropdown-menu dropdown-menu-end" data-bs-toggle="none">
				<a className="dropdown-item" href="pages-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile</a>
				<a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart align-middle me-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> Analytics</a>
				<div className="dropdown-divider"></div>
				<a className="dropdown-item" href="pages-settings.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings align-middle me-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Settings &amp;
					Privacy</a>
				<a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-help-circle align-middle me-1"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Help Center</a>
				<div className="dropdown-divider"></div>
				<Link className="dropdown-item" to="/login" onClick={handleLogout}>Log out</Link>
			</div>
		</li>
  )
}

export default DropDownMenu