import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import Navbar from './navbar';
import NewApplication from './newApplication';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice';
function Admin({path}) {
    const [username,setUsername] = useState("")
    const [role,setRole] = useState("")
    const [collapse,setCollapse] = useState(false)
    const user = useSelector(selectUser)
    const getUserPage =  async(event) => {
        if(event && event.preventDefault)
            event.preventDefault();
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://194.195.241.214:8001/admin"
        }).then(res=>{
            if(res.data.role==="Admin")
            {
                setUsername(res.data.username);
                setRole(res.data.role);
            }
            else{
                setUsername("")
                setRole("Restricted");
            }
    }
    
    ).catch(err=>console.log(err));
    }
    useEffect(()=>{
        getUserPage()
    },[username,role,collapse])
    useEffect(()=>{
    },[path])
  return (
    <div className="wrapper" >
        <Sidebar username={username} role={role} coll={collapse}/>
        <div className="main" >
            <Navbar username={username} role={role} setColl={setCollapse}/>
            <main className="content">
                {role==="Admin" && path==="/new Application"?<NewApplication />:null}  
                {role==="Admin" && path==="/"?null:null}
            </main>
           <Footer />
        </div>
    </div>
  )
}

export default Admin;