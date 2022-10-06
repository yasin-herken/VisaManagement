import React, { useState} from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import "./css/index.css";
import { useLocation } from 'react-router-dom';
import NewApplication from './newApplication';
import ApplicationList from './applicationList';
import ChangeStatus from './changeStatus';
import Dashboard from './dashboard';
function Home() {
  const [collapse, setCollapse] = useState(false)
  const location = useLocation();
  return (
    <div className="wrapper">
      <Sidebar coll={collapse} />
      <div className="main">
        <Navbar setColl={setCollapse} />
        <main className="content">
        {location.pathname==="/"?<Dashboard />:null}
        {location.pathname==="/makeNewApplication"?<NewApplication />:null}
        {location.pathname==="/applicationList"?<ApplicationList />:null}
        {location.pathname==="/changeStatus"?<ChangeStatus />:null}
        </main>
      </div>
    </div>
  )

}

export default Home;