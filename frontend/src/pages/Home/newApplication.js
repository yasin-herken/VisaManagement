import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import Country from '../../components/Country.js';
import DatePicker from '../../components/DatePicker';
import Nationality from '../../components/Nationality';
import Occupation from '../../components/Occupation';
import Issue from '../../components/Issue';
import Expiry from '../../components/Expiry';
import TravelType from '../../components/TravelType';
import VisaType from '../../components/VisaType';
import EntryType from '../../components/EntryType';
import DocumentType from '../../components/DoumentType';
import BirthCountry from '../../components/BirthCountry';
import TripStart from '../../components/TripStart';
import InsuranceExp from '../../components/InsuranceExp';
import AirportName from '../../components/AirportName';
import DurationStay from '../../components/DurationStay';
import VisaTable from '../../components/VisaTable';
import AdditionalPrices from '../../components/AdditionalPrices';
import TotalTable from '../../components/TotalTable';
import Status from '../../Variables/status';
import Select from 'react-select';
import Gender from '../../Variables/gender';
import Married from '../../Variables/married';
function NewApplication() {
    const [username,setUsername] = useState("")
    const [role,setRole] = useState("")
    const [collapse,setCollapse] = useState(false)
    const [PNR,setPNR] = useState("")
    const [status, setStatus] = useState();
    const [gender,setGender] = useState();
    const [name,setName] = useState();
    const [surname,setSurname] = useState();
    const [married,setMarried] = useState();
    const [bcountry,setBCountry] = useState();
    const [bdate,setBDate] = useState();
    const [bcity,setBCity] = useState();
    const [nationality,setNationality] = useState();
    const [job,setJob] = useState();
    const [fname,setFName] = useState();
    const [lname,setLName] = useState();
    const [pnumber,setPNumber] = useState();
    const [pissue,setPIssue] = useState();
    const [pexpiry,setPExpiry] = useState();
    const [pauthority,setPAuthority] = useState();
    const [pistate,setPIState] = useState();
    const [phone,setPhone] = useState();
    const [email,setEmail] = useState();
    const [country,setCountry] = useState();
    const [city,setCity] = useState();
    const [address,setAddress] = useState();
    const [postal,setPostal] = useState();
    const [tripstart,setTripStart] = useState();
    const [insuranceExp,setInsuranceExp] = useState();
    const [visaValue,setVisaValue] = useState();
    const [data,setData] = useState([]);
    const [documentValue,setDocumentValue] = useState();
    const [entrytype,setEntryType] = useState();
    const [treeDoc,setTreeDoc] = useState([]);
    const [sum,setSum] = useState(0)
    const [prices,setPrices] = useState();
    const getData = async(event) =>{
        if(event && event.preventDefault)
          event.preventDefault()
          await axios({
            method: "GET",
            withCredentials: true,
            url : "http://194.195.241.214:8000/getData"
        }).then((res)=>{
          setData(res.data)
          console.log(res.data)
        }).catch((err)=>console.log("error in new application"))
      }
    const getUserPage =  async(event) => {
        if(event && event.preventDefault)
            event.preventDefault();
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://194.195.241.214:8000/getUser"
        }).then(res=>{
            if(res.data.role==="Admin")
            {
                setUsername(res.data.username);
                setRole(res.data.role);
            }
            else if(res.data.role==="Client")
            {   
                setUsername(res.data.username);
                setRole(res.data.role);
            }
            else if(res.data.role==="Restricted"){
                setRole("Restricted");
            }
    }
    
    ).catch(err=>console.log(err));
    }
    const getAdditionalPrices = async(event) => {
        if(event && event.preventDefault)
            event.preventDefault();
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://194.195.241.214:8000/getPrices"
        }).then(res=>{
            setPrices(res.data)
            console.log("here")
        }).catch(err=>console.log(err))
    }
    const handleSubmit = ()=>{
        console.log("-------------------------")
        console.log(PNR,status,gender,name,surname,married,bcountry,bdate,nationality,job,fname,lname,bcity)
    }
    //Contact Info Update Render
    useEffect(()=>{
    },[status,gender,PNR,name,surname,married,bcountry,bdate,nationality,job,fname,lname,bcity])
    // Visa Passport Details
    useEffect(()=>{
    },[pnumber,pissue,pexpiry,pauthority,pistate])
    useEffect(()=>{
       
    },[entrytype])
    // Contact Details
    useEffect(()=>{
    },[phone,email,country,city,address,postal])
    // Travel Details
    useEffect(()=>{
        getData()
    },[tripstart,insuranceExp,visaValue])
    useEffect(()=>{
        getUserPage()
        getAdditionalPrices()
    },[username,role,collapse])
  return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-12 col-lg-7">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Personal Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-md-8">
                                    <label htmlFor="inputEmail4" className="form-label">If there is a linked PNR, please enter:</label>
                                    <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {
                                        setPNR(e.target.value);
                                    }}/>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="inputEmail4" className="form-label">Status</label>
                                    <Select 
                                    options={Status}
                                    id="inputAddress" 
                                    placeholder="Select Status" 
                                    value={status} 
                                    onChange={(value) => {
                                        setStatus(value)
                                    }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Title</label>
                                    <Select 
                                    options={Gender}
                                    id="inputAddress" 
                                    type="text" 
                                    placeholder="Select Gender" 
                                    value={gender}
                                    onChange={(value)=>setGender(value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-5">
                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}  
                                    />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="inputEmail4" className="form-label">Surname</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Last name"
                                    onChange={(e)=>setSurname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Married</label>
                                    <Select 
                                    options={Married}
                                    id="inputAddress" 
                                    type="text" 
                                    placeholder="Select Married" 
                                    onChange={(value)=>setMarried(value)}
                                    />                                          
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="exampleDataList" className="form-label">Birth Country</label>
                                    <BirthCountry setBCountry={setBCountry}/>
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Birth Date</label>
                                    <DatePicker setBDate={setBDate}/>
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="inputEmail4" className="form-label">Birth City</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Birth Place"
                                    onChange={(e) => {setBCity(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Nationality</label>
                                    <Nationality setNationality={setNationality}/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Occupation *</label>
                                    <Occupation setJob={setJob}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Father Name</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Father Name"
                                    onChange={(e) => {setFName(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Mother Name</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Last Name"
                                    onChange={(e) => {setLName(e.target.value)}}
                                    />

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
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                placeholder=""
                                                onChange={(e) => {setPNumber(e.target.value)}}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-3">
                                                <label htmlFor="inputEmail4" className="form-label">Passport Issue Date</label>
                                                <Issue setPIssue={setPIssue} />
                                            </div>
                                            <div className="mb-3 col-md-3">
                                                <label htmlFor="inputEmail4" className="form-label">Passport Expiry Date</label>
                                                <Expiry setPExpiry={setPExpiry} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Passport Authority</label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder=""
                                                onChange={(e) => {setPAuthority(e.target.value)}}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Passport Issue State</label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder=""
                                                onChange={(e) => {setPIState(e.target.value)}}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Type of Travel Doc</label>
                                                <TravelType data={data} setVisaValue={setVisaValue} setTreeDoc={setTreeDoc}/>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Visa Type</label>
                                                <VisaType data={data} visaValue={visaValue} setDocumentValue={setDocumentValue}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Document Type</label>
                                                <DocumentType data={data} documentValue={documentValue} setTreeDoc={setTreeDoc} />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Entry Type</label>
                                                <EntryType setEntryType={setEntryType} treeDoc={treeDoc} />
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
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Phone"
                                    onChange={(e) => {setPhone(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Country</label>
                                    <Country setCountry={setCountry}/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Cities</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder=""
                                    onChange={(e) => {setCity(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Address</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder=""
                                    onChange={(e) => {setAddress(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Postal Code</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder=""
                                    onChange={(e) => {setPostal(e.target.value)}}
                                    />
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
                                    <TripStart setTripStart={setTripStart} />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Insurance Exp.Date</label>
                                    <InsuranceExp setInsuranceExp={setInsuranceExp} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Airport Name*</label>
                                    <AirportName />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Duration of Stay</label>
                                    <DurationStay />
                                </div>
                            </div>
                            <div className='row'>
                                    <div className="mb-3 col-md-9">
                                        <label htmlFor="inputEmail4" className="form-label">Hotel Name</label>
                                        <input type="text" className="form-control" placeholder="Search for..." />
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
                            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Save Application</button>
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
                            <VisaTable entryType={entrytype} treeDoc={treeDoc} />
                        </div>

                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <h4 className="card-title">Additional Prices</h4>
                        </div>
                        </div>
                    <div className='card-body'>
                            <AdditionalPrices setSum={setSum} prices={prices} />
                    </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <h4 className="card-title">Total</h4>
                        </div>
                        </div>
                        <div className='card-body'>
                            <TotalTable sum={sum} entrytype={entrytype}/>
                            
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
  )
}

export default NewApplication;