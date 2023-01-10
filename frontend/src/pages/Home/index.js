import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import "./css/index.css";
import { useLocation, useParams } from 'react-router-dom';
import NewApplication from './newApplication';
import ApplicationList from './applicationList';
import ChangeStatus from './changeStatus';
import Dashboard from './dashboard';
import DeliveryList from './Edit/DeliveryList.js';
import Application from './Edit/Application';
function Home() {
  const [collapse, setCollapse] = useState(false)
  const location = useLocation();
  const params = useParams();
  return (
    <div className="wrapper">
      <Sidebar coll={collapse} />
      <div className="main">
        <Navbar setColl={setCollapse} />
        <main className="content">
          {location.pathname === "/" ? <Dashboard /> : null}
          {location.pathname === "/makeNewApplication" ? <NewApplication /> : null}
          {location.pathname === "/applicationList" ? <ApplicationList /> : null}
          {location.pathname === "/changeStatus" ? <ChangeStatus /> : null}
          {location.pathname === "/deliveryList" ? <DeliveryList /> : null}
          {location.pathname === "/customerReturnList" ? <Application /> : null}
          {location.pathname === `/customerReturnList${params?.id ? "/" + params.id : " "}` ? <Application /> : null}
        </main>
      </div>
    </div>
  )

}

export default Home;