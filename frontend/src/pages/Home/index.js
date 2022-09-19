import React, { useEffect, useState} from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice.js';
import "./css/index.css";
function Home() {
  const [collapse, setCollapse] = useState(false)
  const user = useSelector(selectUser);
  useEffect(()=>{

  },[user])
   
  return (
    <div className="wrapper">
      <Sidebar coll={collapse} />
      <div className="main">
        <Navbar setColl={setCollapse} />
        <main className="content"></main>
      </div>
    </div>
  )

}

export default Home;