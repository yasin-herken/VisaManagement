import React, { useEffect, useState} from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice.js';
import "./css/index.css";
import { useLocation } from 'react-router-dom';
import NewApplication from './newApplication';
import ApplicationList from './applicationList';
function Home() {
  const [collapse, setCollapse] = useState(false)
  const user = useSelector(selectUser);
  const location = useLocation();
  useEffect(()=>{

  },[user])
   
  return (
    <div className="wrapper">
      <Sidebar coll={collapse} />
      <div className="main">
        <Navbar setColl={setCollapse} />
        <main className="content">
        {location.pathname==="/makeNewApplication"?<NewApplication />:null}
        {location.pathname==="/applicationList"?<ApplicationList />:null}
        </main>
      </div>
    </div>
  )

}

export default Home;