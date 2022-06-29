import React from 'react'
import Avatar from '@mui/material/Avatar';
function DropDownMenu({username,handleLogout}) {
  return (
    <li className="nav-item dropdown">
        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="/" data-bs-toggle="dropdown">
            <i className="align-middle" data-feather="settings"></i>
        </a>

        <a className="nav-link dropdown-toggle d-sm-inline-block" href="/profile" data-bs-toggle="dropdown" >
            <span className="text-dark">{username.toUpperCase()}</span>
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