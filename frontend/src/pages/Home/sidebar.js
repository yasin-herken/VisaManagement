import React, { useEffect, useRef, useState } from 'react';
import './css/sidebar.css';
import AppsIcon from '@mui/icons-material/Apps';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice.js';
import { AiFillFolder } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Navs = styled.nav`
    id: "sidebar";
    transition: all 0.5s ease;
    margin-left: ${props => (props.active ? "-256px" : "0px")};
`;

const Ul = styled.ul`
    class: ${props => props.active ? "" : "collapse"};
    transition: all 0.5s ease;
    opacity: ${props => props.active ? 0 : 1};;
    ${({ show }) => show && css`
        transition: all 0.5s ease;
    `}
`;
function Sidebar({ coll }) {
    const [active, setActive] = useState(false);
    const [reportsCollapse, setReportsCollapse] = useState(false);
    const user = useSelector(selectUser);
    const nodeRef = useRef(null);
    const selectRef = useRef(null);
    const getNavLink = (path) => {
        return path === window.location.pathname ? "sidebar-item active" : "sidebar-item"
    }

    useEffect(() => {
        if (coll === false) {
            setActive(false)
        }
        else {
            setActive(true)
        }
    }, [coll])
    return (
        <Navs active={active}>
            <div className="sidebar-content js-simplebar" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: "0px" }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                    </div>
                    <div className="simplebar-mask">
                        <div className='simplebar-offset' style={{ right: "0px", bottom: "0px" }}>
                            <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{ height: "100%", overflow: "hidden scroll" }}>
                                <div className="simplebar-content" style={{ padding: "0px" }}>
                                    <Link className="sidebar-brand" to="#" style={{ textDecoration: "none" }}>
                                        <span className="sidebar-brand-text align-middle">VisaManagement</span>
                                        <svg className="sidebar-brand-icon align-middle" width="32px" height="32px" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" color="#FFFFFF" style={{ marginLeft: " -3px" }}>
                                            <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"></path>
                                            <path d="M20 12L12 16L4 12"></path>
                                            <path d="M20 16L12 20L4 16"></path>
                                        </svg>
                                    </Link>
                                    <ul className="sidebar-nav" style={{ marginTop: "80px" }}>
                                        <li className="sidebar-header">
                                            Pages
                                        </li>
                                        <li className={(getNavLink("/"))}>
                                            <NavLink className={"sidebar-link collapsed"} to="/">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg> <span className="align-middle">Dashboards</span>
                                            </NavLink>
                                        </li>
                                        {
                                            ((user ? user.role === "Admin" : null) ?
                                                <li className={(getNavLink("/makeNewApplication"))}>
                                                    <NavLink className="sidebar-link" to="/makeNewApplication">
                                                        <ChatBubbleOutlineOutlinedIcon className="align-middle" fontSize={"small"}></ChatBubbleOutlineOutlinedIcon>
                                                        <span>Make New Application</span>
                                                    </NavLink>
                                                </li> : null
                                            )
                                        }
                                        {
                                            ((user ? user.role === "Admin" : null) ?
                                                <li className={(getNavLink("/applicationList"))}>
                                                    <NavLink className="sidebar-link" to="/applicationList">
                                                        <AppsIcon className="align-middle" fontSize={"small"}></AppsIcon>
                                                        <span>Application List</span>
                                                    </NavLink>
                                                </li> : null
                                            )
                                        }
                                        {
                                            ((user?.role !== "Admin") && (user?.role !== "Client")) ? <li className="sidebar-item">
                                                <Link id="auth1" to="#auth" data-bs-toggle="collapse" className="sidebar-link" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users align-middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> <span className="align-middle">Auth</span>
                                                </Link>
                                                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar" >
                                                    <li className="sidebar-item">
                                                        <Link className="sidebar-link" to="/login" >Sign In </Link>
                                                    </li>
                                                    <li className="sidebar-item">
                                                        <Link className="sidebar-link" to="/register">Sign Up</Link>
                                                    </li>
                                                </ul>
                                            </li> : null
                                        }
                                        {
                                            ((user ? user.role === "Admin" : null) ?
                                                <li className={(getNavLink("/changeStatus"))}>
                                                    <NavLink className="sidebar-link" to="/changeStatus">
                                                        <AppsIcon className="align-middle" fontSize={"small"}></AppsIcon>
                                                        <span>Scan-Change Status</span>
                                                    </NavLink>
                                                </li> : null
                                            )
                                        }
                                        {
                                            user?.role === "Admin" ?
                                                <li className={`sidebar-item `} onClick={() => setReportsCollapse(p => !p)} >
                                                    <Link className="sidebar-link box" to="#" width="100%">
                                                        <AiFillFolder className="align-middle" />
                                                        <span>Reports</span>
                                                        <BsChevronDown className={`afterIcon`} style={{ transform: `${reportsCollapse ? "rotate(0deg)" : "rotate(180deg)"}` }} ref={selectRef} />
                                                    </Link>
                                                    {
                                                        reportsCollapse ? null :
                                                            <CSSTransition nodeRef={nodeRef} in={reportsCollapse} timeout={300} classNames="my-node">
                                                                <Ul active={reportsCollapse} className={`sidebar-dropdown list-unstyled`} ref={nodeRef}>
                                                                    <li className="sidebar-item">
                                                                        <Link className="sidebar-link" to="/passportDeliveryList" >Passport Delivery List</Link>
                                                                    </li>
                                                                    <li className="sidebar-item">
                                                                        <Link className="sidebar-link" to="/customerReturnList">Customer Return List</Link>
                                                                    </li>
                                                                    <li className="sidebar-item">
                                                                        <Link className="sidebar-link" to="/appReportToExcel">App. Report to Excel</Link>
                                                                    </li>
                                                                </Ul>
                                                            </CSSTransition>
                                                    }

                                                </li>
                                                : null
                                        }
                                    </ul>

                                    <div className='sidebar-cta'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{ width: "auto", height: "1334px" }}>
                    </div>
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }}>
                    <div className="simplebar-scrollbar" style={{ width: "0px", display: "none" }}></div>
                </div>
                <div className="simplebar-track simplebar-vertical" style={{ visibility: "visible" }}>
                    <div className="simplebar-scrollbar" style={{ height: "608px", transform: "translate3d(0px, 293px, 0px)", display: "block" }}>
                    </div>
                </div>
            </div>
        </Navs>
    )
}

export default Sidebar