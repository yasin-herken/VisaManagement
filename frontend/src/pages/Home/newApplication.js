import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import {useNavigate} from 'react-router-dom';
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
    }
    ).catch(err=>console.log(err));
    }
    useEffect(()=>{
        getUserPage()
    },[username,role,collapse])
  return (
    <div className="wrapper" >
        <Sidebar role={role} coll={collapse}/>

        <div className="main" >
            <Navbar username={username} role={role} setColl={setCollapse}/>
            <main className="content">
            <div className="container-fluid p-0">

<div className="mb-3">
    <h1 className="h3 d-inline align-middle"> </h1>
    <a className="badge bg-dark text-white ms-2" href="upgrade-to-pro.html"> </a>
</div>
<div className="row">
    <div className="col-12 col-lg-7">
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="mb-3 col-md-8">
                        <label htmlFor="inputEmail4" className="form-label">If there is a linked PNR, please enter:</label>
                        <input id="inputAddress" type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">Status</label>
                        <input id="inputAddress" type="text" className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Title</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-5">
                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">Surname</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Married</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Birth Country</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Birth Date</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Birth City</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Nationality</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Occupation *</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Father Name</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Mother Name</label>
                        <input type="text" className="form-control" placeholder="Last name"/>
                    </div>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Visa-Passport Details</h5>
            </div>
            <div className='row'>
                <div className="col-md-12">
                        <div className="card-body">
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Passport Number</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Passport Issue Date</label>
                                    <input type="text" className="form-control" placeholder="Last name"/>
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Passport Expiry Date</label>
                                    <input type="text" className="form-control" placeholder="Last name"/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Passport Authority</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Passport Issue State</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Type of Travel Doc</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Visa Type</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Document Type</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Entry Type</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Contact Details</h5>
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Phone</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                </div>
                <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Country</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Cities</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                </div>
                <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Address</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Postal Code</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                </div>
            </div>
        </div>
        <div className='card'>
            <div className='card-header'>
                <h5 className="card-title">Travel Details</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Trip Start Date</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Insurance Exp.Date</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                </div>
                <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Airport Name*</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Duration of Stay</label>
                        <input type="text" className="form-control" placeholder=""/>
                    </div>
                </div>
                <div className='row'>
                        <div className="mb-3 col-md-9">
                            <label htmlFor="inputEmail4" className="form-label">Hotel Name</label>
                            <input type="text" class="form-control" placeholder="Search for..." />
                        </div>
                        <div className='mb3 mt-2 col-md-3'>
                            <label className='form-label' />
                            <button type="button" className='form-control' >Add Hotel</button>
                        </div>
                </div>
    
                <div className='row'>
                    <div className="mb-3 col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Description</label>
                       <textarea className='form-control' rows="" placeholder='Text area'></textarea>
                    </div>
                </div> 
            </div>
        </div>
        <div className='row'>
            <div className="mb-3 mw-100 col-md-12">
                <button type="submit" class="btn btn-primary w-100">Save Application</button>
            </div>
        </div>
    </div>
    <div className="col-12 col-lg-5">
        <div className="card">
            <div className="card-body">
               <div  className="row">
                    <h5 className="card-title">Visa Prices</h5>
                        <div style={{border: "0.5px solid #233232"}} className='mb-3 col-sm'>Visa Name</div>
                        <div style={{border: "0.5px dashed #233232"}} className='mb-3 col-sm'>Trip Name</div>
                        <div style={{border: "0.5px dashed #233232"}} className='mb-3 col-sm'>Single Price</div>
                        <div style={{border: "0.5px dashed #233232"}} className='mb-3 col-sm'>Multi Price</div>
                        <div style={{border: "0.5px dashed #233232"}} className='mb-3 col-sm'>Service Price Fee</div>
               </div>
               
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Blockquotes</h5>
                <h6 className="card-subtitle text-muted">For quoting blocks of content from another source within your document.</h6>
            </div>
            <div className="card-body">
                <blockquote>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                    </p>
                    <footer>
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
                <p className="text-muted m-b-15 m-t-20 font-13">
                    Add <code>.blockquote-reverse</code> for a blockquote with right-aligned content.
                </p>
                <blockquote className="blockquote-reverse m-b-0">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                    </p>
                    <footer>
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </div>
        </div>

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">List unordered</h5>
                <h6 className="card-subtitle text-muted">The unordered list items will are marked with bullets.</h6>
            </div>
            <div className="card-body">
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

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">List ordered</h5>
                <h6 className="card-subtitle text-muted">The ordered list items will are marked with numbers.</h6>
            </div>
            <div className="card-body">
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