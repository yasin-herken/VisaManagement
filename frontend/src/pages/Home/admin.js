import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
import NewApplication from './newApplication';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice';
function Admin({ path }) {
    const [collapse, setCollapse] = useState(false);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const redirect = useCallback(
        (props) => {
            navigate(props, { replace: true })
        },
        [navigate]
    );
    useEffect(() => {
        if(user?.role!=="Admin"){
            redirect("/");
        }
    }, [user,redirect])
    return (
        <div className="wrapper" >
            <Sidebar username={user?.username} role={user?.role} coll={collapse} />
            <div className="main" >
                <Navbar username={user?.username} role={user?.role} setColl={setCollapse} />
                <main className="content">
                    {user?.role === "Admin" && path === "newApplication" ? <NewApplication /> : null}
                    {user?.role === "Admin" && path === "/" ? null : null}
                </main>
            </div>
        </div>
    )
}

export default Admin;
