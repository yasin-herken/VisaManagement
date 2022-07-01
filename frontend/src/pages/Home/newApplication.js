import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import {useNavigate} from 'react-router-dom';
import Navbar from './navbar';
import { color, textAlign } from '@mui/system';
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
            <div className="card-header">
                <div className="row">
                    <h4 className="card-title">Visa Prices</h4>
               </div>
            </div>
            <div className='card-body'>
                <table class="table">
                    <thead>
                        <th style={{width:"18%"}}>Visa Name</th>
                        <th style={{width:"18%"}}>Trip Name</th>
                        <th style={{width:"18%"}}>Single Price</th>
                        <th style={{width:"20%"}}>Multi Price</th>
                        <th className="d-none d-md-table-cell" style={{width:"26%"}}>Service Fee Price</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>..</td>
                            <td>..</td>
                            <td>..</td>
                            <td>..</td>
                            <td>..</td>
                        </tr>
                    </tbody>
                </table>
             </div>

        </div>
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <h4 className="card-title">Additional Prices</h4>
               </div>
            </div>
           <div className='card-body'>
                <table className="table table-striped table-sm table-bordered table-responsive">
                    <thead>
                        <th style={{width:"10%"}}></th>
                        <th style={{width:"50%"}}>Service Name</th>
                        <th style={{width:"40%",textAlign:"right"}}>Price</th>
                    </thead>
                    <tbody>
                        <tr >
                            <td>
                                <label class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="option1" />
                                <span class="form-check-label">
                                </span>
								</label>
                            </td>
                            <td>1 MONTH INSURANCE</td>
                            <td style={{textAlign:"right"}}>25000 CFA</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="option1" />
                                <span class="form-check-label">
                                </span>
								</label>
                            </td>
                            <td>12 MONTH INSURANCE</td>
                            <td style={{textAlign:"right"}}>90000 CFA</td>
                        </tr>
                        
                    </tbody>
                </table>
           </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <h4 className="card-title">Total</h4>
               </div>
            </div>
            <div className='card-body'>
                <table className="table table-striped">
                    <thead>
                        <th sytle={{width:"40%"}}></th>
                        <th style={{width:"40%"}}></th>
                        <th style={{width:"20%",textAlign:"right"}}></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ministry Fee</td>
                            <td>:</td>
                            <td style={{textAlign:"right"}} >0</td>
                        </tr>
                        <tr>
                            <td>Additinal & Service Fee</td>
                            <td>:</td>
                            <td style={{textAlign:"right"}}>50000.00 CFA</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:"bold"}} >Total</td>
                            <td>:</td>
                            <td style={{textAlign:"right",fontWeight:"bold"}}>50000.00 CFA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Accompaniment Purpose Multiple Visa Requirements</h5>
            </div>
            <div className="card-body">
                <ul>
                    <li>
                        Valid Passport
                    </li>
                    <li>
                        One biometrix photo
                    </li>
                    <li>
                        Business license
                    </li>
                    <li>
                        Bank stantment with letter
                    </li>
                    <li>
                        Company Letter
                    </li>
                    <li>
                        Invitation from host company
                    </li>
                    <li>
                        Other visas copies (Turkey,Schengen,Uk,Abd,Canada,Ireland)
                    </li>
                    <li>
                        Fly reservation
                    </li>
                    <li>
                        Hotel reservation
                    </li>
                    <li>Travel Insurance</li>
                </ul>
            </div>
            <div className='card-footer'>
                More details available. <a href="/" >Documentation</a>
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