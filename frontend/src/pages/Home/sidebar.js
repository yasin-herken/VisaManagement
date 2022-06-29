import React, { useEffect,useState } from 'react'
function Sidebar({role,coll}) {
    const [collapse,setCollapse] = useState("")
    useEffect(()=>{
        if(coll)
            setCollapse("collapse") 
        else{
            setCollapse("")
        }
        console.log(coll) 
    },[coll])
  return (
        <nav id="sidebar" className={"sidebar js-sidebar "+ collapse}>
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="#">
                    <span className="align-middle">VisaManagement</span>
                </a>

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
        </nav>
  )
}

export default Sidebar