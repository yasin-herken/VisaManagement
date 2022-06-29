import React from 'react'

function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="/admin">
        <span className="align-middle">VisaManagement</span>
        </a>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Pages
                    </li>

                    <li className="sidebar-item active">
                        <a className="sidebar-link" href="/admin">
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-profile.html">
                            <i className="align-middle" data-feather="user"></i> <span className="align-middle">Make New Application</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-sign-up.html">
                            <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Application List</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a className="sidebar-link" href="pages-blank.html">
                            <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
  )
}

export default Sidebar