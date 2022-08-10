import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Footer from './footer';
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
        <Footer />
      </div>
    </div>
  )

}

export default Home;