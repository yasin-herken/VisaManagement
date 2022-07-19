import React,{useState,useEffect} from 'react'
import DropDownMenu from './dropDownMenu.js';
function Navbar({username,role,setColl}) {
    const [condition,setCondition] = useState(false)
    useEffect(()=>{
        console.log(username)
    },[username,role,setColl])
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
        <div onClick={()=>{
            condition ? setCondition(false):setCondition(true)
            setColl(condition)
        }}>
        <a className="sidebar-toggle js-sidebar-toggle" data-toggle="collapse">
        <i className="hamburger align-self-center"></i>
    </a>
    </div>
    <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
            <li class="nav-item dropdown">
				<a class="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
					<div class="position-relative">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square align-middle"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
					</div>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-icon js-fullscreen d-none d-lg-block" href="#">
					<div class="position-relative">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize align-middle"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
					</div>
				</a>
			</li>
                        
            { role==="Restricted"? 
            <DropDownMenu />:
            <DropDownMenu username={username}/>
            }
        </ul>
    </div>
</nav>
  )
}

export default Navbar