import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Features/userSlice';
function DropDownMenu({ username }) {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const handleLogout = async(event) => {
		event.preventDefault()
		dispatch(logout({
			loggedIn: false
		}))
		navigate("/login")
	}
	useEffect(() => {
	}, [])
	return (
		<li className="nav-item dropdown">
			<Link className="nav-icon pe-md-0 dropdown-toggle" to="#" data-bs-toggle="dropdown">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCnbayQIq0SLjq7bdjeYI4R14mT7RiGbuhw&usqp=CAU" className="avatar img-fluid rounded" alt="Avatar not found" height={"24px"} width={"24px"} />
			</Link>
			<div className="dropdown-menu dropdown-menu-end" data-bs-toggle="none">
				<div className="dropdown-divider"></div>
				<Link className="dropdown-item" to="/login" onClick={handleLogout}>Log out</Link>
			</div>
		</li>
	)
}

export default DropDownMenu