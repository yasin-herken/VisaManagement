import React, { useState } from 'react'
import DropDownMenu from './dropDownMenu.js';
function Navbar({ username, role, setColl }) {
    const [condition, setCondition] = useState(false)

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <div onClick={() => {
                condition ? setCondition(false) : setCondition(true)
                setColl(condition)
            }}>
                <div className="sidebar-toggle js-sidebar-toggle pl-2" data-toggle="collapse">
                    <i className="hamburger align-self-center"></i>
                </div>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    {role === "Restricted" ?
                        <DropDownMenu /> :
                        <DropDownMenu username={username} />
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar