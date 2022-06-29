import React,{ useState , useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import {useNavigate} from 'react-router-dom';
import DropDownMenu from './dropDownMenu';
import Navbar from './navbar';
function NewApplication() {
    const [username,setUsername] = useState("")
    const [role,setRole] = useState("")
    const navigate =useNavigate()
    const [collapse,setCollapse] = useState(false)
    const getUserPage =  (event) => {
        if(event && event.preventDefault)
            event.preventDefault()
        axios({
            method: "GET",
            withCredentials: true,
            url : "http://localhost:8000/getUser"
        }).then(res=>{
            if(res.data.role==="Admin")
            {
                setUsername(res.data.username)
                setRole(res.data.role)
            }
            else if(res.data.role==="Client")
            {   
                setUsername(res.data.username)
                setRole(res.data.role)
            }
            else if(res.data.role==="Restricted"){
                setRole("Restricted")
            }
            console.log("here")
    }
    ).catch(err=>console.log(err));
    }
    const handleLogout = async(event) =>{
        event.preventDefault() 
        event.stopPropagation()
        await axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:8000/logout"
        }).then(res=>{
            if(res.data.data==="Succesfully Logout")
                navigate(res.data.direct)
        })
        .catch(err => console.log(err))
    }
    const handleToggle= (event) =>{
        if(!collapse)
            setCollapse(true)
        else
            setCollapse(false)
    }
    useEffect(()=>{
        getUserPage()
    },[username,role])
  return (
    <div className="wrapper" >
        <Sidebar role={role} coll={collapse}/>

        <div className="main" >
            <Navbar username={username} role={role}/>
            <main className="content">
            <div class="container-fluid p-0">

<div class="mb-3">
    <h1 class="h3 d-inline align-middle">Typography</h1>
    <a class="badge bg-dark text-white ms-2" href="upgrade-to-pro.html">
Get more typography examples
</a>
</div>
<div class="row">
    <div class="col-12 col-lg-7">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-8">
                        <label htmlFor="inputEmail4" class="form-label">If there is a linked PNR, please enter:</label>
                        <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="col-4">
                        <label htmlFor="inputEmail4" class="form-label">Status</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label htmlFor="inputEmail4" class="form-label">Title</label>
                        <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="col-5">
                        <label htmlFor="inputEmail4" class="form-label">Name</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                    <div class="col-4">
                        <label htmlFor="inputEmail4" class="form-label">Surname</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label htmlFor="inputEmail4" class="form-label">Married</label>
                        <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="col-3">
                        <label htmlFor="inputEmail4" class="form-label">Birth Country</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                    <div class="col-3">
                        <label htmlFor="inputEmail4" class="form-label">Birth Date</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                    <div class="col-3">
                        <label htmlFor="inputEmail4" class="form-label">Birth City</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label htmlFor="inputEmail4" class="form-label">Nationality</label>
                        <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="col-6">
                        <label htmlFor="inputEmail4" class="form-label">Occupation *</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label htmlFor="inputEmail4" class="form-label">Father Name</label>
                        <input type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="col-6">
                        <label htmlFor="inputEmail4" class="form-label">Mother Name</label>
                        <input type="text" class="form-control" placeholder="Last name"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Coloured text</h5>
                <h6 class="card-subtitle text-muted">Contextual text classes.</h6>
            </div>
            <div class="card-body">
                <p class="text-primary">This line of text contains the text-primary class.</p>
                <p class="text-secondary">This line of text contains the text-secondary class.</p>
                <p class="text-success">This line of text contains the text-success class.</p>
                <p class="text-danger">This line of text contains the text-danger class.</p>
                <p class="text-warning">This line of text contains the text-warning class.</p>
                <p class="text-info">This line of text contains the text-info class.</p>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-5">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Inline text</h5>
                <h6 class="card-subtitle text-muted">Styling for common inline HTML5 elements.</h6>
            </div>
            <div class="card-body">
                <p>You can use the mark-tag to <mark>highlight</mark> text.</p>
                <p><del>This line of text can be treated as deleted text.</del></p>
                <p><ins>This line of text can be treated as an addition to the document.</ins></p>
                <p><strong>Bold text using the strong-tag</strong></p>
                <p><em>Italicized text using the em-tag</em></p>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Blockquotes</h5>
                <h6 class="card-subtitle text-muted">For quoting blocks of content from another source within your document.</h6>
            </div>
            <div class="card-body">
                <blockquote>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                    </p>
                    <footer>
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
                <p class="text-muted m-b-15 m-t-20 font-13">
                    Add <code>.blockquote-reverse</code> for a blockquote with right-aligned content.
                </p>
                <blockquote class="blockquote-reverse m-b-0">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                    </p>
                    <footer>
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title">List unordered</h5>
                <h6 class="card-subtitle text-muted">The unordered list items will are marked with bullets.</h6>
            </div>
            <div class="card-body">
                <ul>
                    <li>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li>
                        Consectetur adipiscing elit
                    </li>
                    <li>
                        Nulla volutpat aliquam velit
                    </li>
                    <li>
                        Phasellus iaculis neque
                    </li>
                    <li>
                        Eget porttitor lorem
                    </li>
                </ul>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title">List ordered</h5>
                <h6 class="card-subtitle text-muted">The ordered list items will are marked with numbers.</h6>
            </div>
            <div class="card-body">
                <ol>
                    <li>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li>
                        Consectetur adipiscing elit
                    </li>
                    <li>
                        Nulla volutpat aliquam velit
                    </li>
                    <li>
                        Phasellus iaculis neque
                    </li>
                    <li>
                        Eget porttitor lorem
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>

</div>
            </main>

           <Footer />
        </div>
    </div>
  )
}

export default NewApplication;