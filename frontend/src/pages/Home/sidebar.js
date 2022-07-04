import React, { useEffect,useState } from 'react';
import './css/sidebar.css';
function Sidebar({role,coll,username}) {
    const [css,setCss] = useState("")
    useEffect(()=>{
        if(coll===false)
            setCss("")
        else{
            setCss("collapse")
        }
    },[coll,username])
  return (
        <nav id="sidebar" className={"sidebar js-sidebar "+ css}>
            <div className="sidebar-content js-simplebar" data-simplebar="init">
                <div className="simplebar-wrapper" style={{margin:"0px"}}>
                    <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                    </div>
                    <div className="simplebar-mask">
                        <div className='simplebar-offset' style={{right:"0px",bottom:"0px"}}>
                            <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{height:"100%",overflow:"hidden scroll"}}>
                                <div className="simplebar-content" style={{padding:"0px"}}>
                                    <a className="sidebar-brand" href="#">
                                        <span className="sidebar-brand-text align-middle">VisaManagement</span>
                                    </a>
                                    <div className="sidebar-user" >
                                        <div className='d-flex justify-content-center'>
                                            <div className='flex-shrink-0'>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCnbayQIq0SLjq7bdjeYI4R14mT7RiGbuhw&usqp=CAU" className="avatar img-fluid rounded me-1 " alt="Image" />
                                            </div>
                                            <div className="flex-grow-1 ps-2" >
                                                <a className="sidebar-user-title dropdown-toggle" style={{color:"white"}} href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {username.toUpperCase()}
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-start" >
                                                    <a className="dropdown-item" href="pages-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin={"round"} className="feather feather-user align-middle me-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile</a>
                                                    <a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-pie-chart align-middle me-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> Analytics</a>
                                                        <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="pages-settings.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-settings align-middle me-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Settings &amp;
                                                        Privacy</a>
                                                    <a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className="feather feather-help-circle align-middle me-1"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Help Center</a>
                                                        <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Log out</a>
                                                </div>
                                                <div className="sidebar-user-subtitle" style={{color:"white"}}>{role}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="sidebar-nav">
                                        <li className="sidebar-header">
                                            Pages
                                        </li>

                                        <li className="sidebar-item ">
                                            <a className="sidebar-link" href="/">
                                                <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                                            </a>
                                        </li>
                                        {
                                            (role==="Admin" ?
                                        <li className="sidebar-item">
                                            <a className="sidebar-link" href="/visa">
                                                <i className="align-middle" data-feather="user"></i> <span className="align-middle">Make New Application</span>
                                            </a>
                                        </li>: null)
                                        }
                                        {
                                            role==="Admin" ?
                                        <li className="sidebar-item">
                                            <a className="sidebar-link" href="pages-sign-up.html">
                                                <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Application List</span>
                                            </a>
                                        </li>: null
                                        }
                                        <li className="sidebar-item">
                                            <a className="sidebar-link" href="pages-blank.html">
                                                <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{width:"auto",height:"1334px"}}>    
                    </div> 
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{visibility:"hidden"}}>
                    <div className="simplebar-scrollbar" style={{width:"0px",display:"none"}}></div>
                </div>
                <div className="simplebar-track simplebar-vertical" style={{visibility: "visible"}}>
                    <div className="simplebar-scrollbar" style={{height: "608px", transform: "translate3d(0px, 293px, 0px)",display:"block"}}>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Sidebar