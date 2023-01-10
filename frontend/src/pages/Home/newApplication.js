import React, { useState, useEffect } from 'react';
import Country from '../../components/Country.js';
import DatePicker from '../../components/DatePicker';
import Nationality from '../../components/Nationality';
import Occupation from '../../components/Occupation';
import Issue from '../../components/Issue';
import Expiry from '../../components/Expiry';
import EntryType from '../../components/EntryType';
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
import { publicRequest, userRequest } from '../../requests/requestMethod.js';
import "./css/newApplication.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../Features/userSlice.js';
import { useSelector } from 'react-redux';
function NewApplication() {
    let pnr = "";
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [married, setMarried] = useState("");
    const [bcountry, setBCountry] = useState("");
    const [bdate, setBDate] = useState("");
    const [bcity, setBCity] = useState("");
    const [nationality, setNationality] = useState("");
    const [job, setJob] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [pnumber, setPNumber] = useState("");
    const [pissue, setPIssue] = useState("");
    const [pexpiry, setPExpiry] = useState("");
    const [pauthority, setPAuthority] = useState("");
    const [pistate, setPIState] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [tripstart, setTripStart] = useState();
    const [insuranceExp, setInsuranceExp] = useState();
    const [visaValue, setVisaValue] = useState();
    const [data, setData] = useState([]);
    const [documentValue, setDocumentValue] = useState();
    const [entrytype, setEntryType] = useState();
    const [treeDoc, setTreeDoc] = useState([]);
    const [sum, setSum] = useState([])
    const [prices, setPrices] = useState();
    const [airport, setAirport] = useState("");
    const [hotel, setHotel] = useState("");
    const [description, setDescription] = useState("");
    const [durationOfStay, setDurationOfStay] = useState("");
    const [loading, setLoading] = useState(false);
    const [succedd, setSuccedd] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [errorInsuranceExp, setErrorInsuranceExp] = useState(false);
    const [optionsTravelDoc, setOptionsTravelDoc] = useState([]);
    const [optionsVisaDoc, setOptionsVisaDoc] = useState([]);
    const [optionsDocument, setOptionsDocument] = useState([]);
    const [senddata, setsenddata] = useState();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event?.preventDefault();
        setLoading(true);
        try {
            const res = await userRequest(user.token).post("/barcode", {
                personal: {
                    pnr: pnr,
                    status: status,
                    title: gender,
                    name: name,
                    surname: surname,
                    birthCountry: bcountry,
                    birthDate: bdate,
                    birthCity: bcity,
                    nationality: nationality,
                    occupation: job,
                    fatherName: fname,
                    motherName: lname,
                    married: married,
                },
                passport: {
                    passportNo: pnumber,
                    passportIssueDate: pissue,
                    passportExpiryDate: pexpiry,
                    passportAuthority: pauthority,
                    passportIssueState: pistate,
                    travelType: treeDoc[0],
                    visaType: treeDoc[1],
                    documentType: treeDoc[2],
                    entryType: entrytype
                },
                contact: {
                    telNo: phone,
                    email: email,
                    country: country,
                    city: city,
                    address: address,
                    postalCode: postal
                },
                travel: {
                    tripStartDate: tripstart,
                    insuranceExpiryDate: insuranceExp,
                    airportName: airport,
                    durationOfStay: durationOfStay,
                    hotelName: hotel,
                    description: description
                },
                services: {
                    service: sum.map((element) => {
                        return element;
                    })
                },
                country: user?.country,
                admin: user?.id
            });
            if (res.data?.success) {
                setSuccedd(true);
                toast(res.data?.message);
            } else {
                setShowErr(true);
                console.log(res.data.error)
                toast(res.data.error?.message.split(",")[0]);
            }
        } catch (err) {
            setShowErr(true);
            toast(err);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (succedd) {
            const interval = setInterval(() => {
                navigate("/applicationList");
            }, 2000);
            return () => clearInterval(interval)
        }
    }, [succedd, navigate])
    useEffect(() => {
        setLoading(true);
        const getData = async (event) => {
            if (event && event.preventDefault)
                event.preventDefault()
            try {
                const res = await publicRequest("/getData");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (err) {
                toast(err);
            }

        }
        const getAdditionalPrices = async (event) => {
            if (event && event.preventDefault)
                event.preventDefault();
            try {
                const res = await publicRequest("/getPrices", {
                    params: {
                        country: user.country,
                    }
                });
                if (res.status === 200) {
                    setPrices(res.data);
                }
            } catch (err) {
                toast(err);
            }
        }

        if (!(user.country === "All")) {
            getAdditionalPrices();
            getData();
        }
        setLoading(false);
    }, [user.country, user.role])
    useEffect(() => {
        const newData = []
        data.map((element) => {
            return newData.push({
                value: element.name,
                label: element.name
            })
        })
        setOptionsTravelDoc(newData);
    }, [data]);
    useEffect(() => {
        const newData = [];
        data.map((element) => {
            if (visaValue && element.name === visaValue.label) {
                return element.visaTypes.map((element2) => {
                    newData.push({
                        value: element2.name,
                        label: element2.name
                    })
                    return "";
                })
            }
            setOptionsVisaDoc(newData);
            return "";
        })
    }, [visaValue, data])
    useEffect(() => {
        const newData = [];
        const sendData = []
        data.map((element) => {
            if (element.name === visaValue?.label) {
                sendData.push(element.name)
                return element.visaTypes.map((element2) => {
                    if (element2.name === documentValue?.label) {
                        sendData.push(element2.name);
                        element2.documentTypes.map((element3) => {
                            return newData.push({
                                value: element3.name,
                                label: element3.name
                            })
                        })
                        setsenddata(sendData);
                    }
                    return element;
                })
            }
            return "";
        })
        setOptionsDocument(newData);
    }, [documentValue, data, visaValue])

    return (
        <>
            {
                <div className="container-fluid p-0" style={{ fontFamily: "Open Sans" }}>
                    <div className="row">
                        <div className="col-7 col-lg-7">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Personal Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="mb-3 col-lg-8">
                                            <label htmlFor="inputEmail4" className="form-label">If there is a linked pnr, please enter:</label>
                                            <input id="inputAddress" type="text" className="form-control" placeholder="" disabled />
                                        </div>
                                        <div className="mb-3 col-lg-4">
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
                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="inputEmail4" className="form-label">Title</label>
                                            <Select
                                                options={Gender}
                                                id="inputAddress"
                                                type="text"
                                                placeholder="Select Gender"
                                                value={gender}
                                                onChange={(value) => setGender(value)}
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-5">
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
                                        <div className="mb-3 col-lg-4">
                                            <label htmlFor="inputEmail4" className="form-label">Surname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last name"
                                                onChange={(e) => setSurname(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="inputEmail4" className="form-label">Married</label>
                                            <Select
                                                options={Married}
                                                id="inputAddress"
                                                type="text"
                                                placeholder="Select Married"
                                                onChange={(value) => setMarried(value)}
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="exampleDataList" className="form-label">Birth Country</label>
                                            <BirthCountry setBCountry={setBCountry} />
                                        </div>
                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="inputEmail4" className="form-label">Birth Date</label>
                                            <DatePicker setBDate={setBDate} />
                                        </div>
                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="inputEmail4" className="form-label">Birth City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Birth Place"
                                                onChange={(e) => { setBCity(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Nationality</label>
                                            <Nationality setNationality={setNationality} />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Occupation *</label>
                                            <Occupation setJob={setJob} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Father Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Father Name"
                                                onChange={(e) => { setFName(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Mother Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                onChange={(e) => { setLName(e.target.value) }}
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
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Passport Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        onChange={(e) => { setPNumber(e.target.value) }}
                                                    />
                                                </div>
                                                <div className="mb-3 col-lg-3">
                                                    <label htmlFor="inputEmail4" className="form-label">Passport Issue Date</label>
                                                    <Issue setPIssue={setPIssue} />
                                                </div>
                                                <div className="mb-3 col-lg-3">
                                                    <label htmlFor="inputEmail4" className="form-label">Passport Expiry Date</label>
                                                    <Expiry setPExpiry={setPExpiry} setErrorInsuranceExp={setErrorInsuranceExp} />
                                                    {errorInsuranceExp ?
                                                        <div className="alert alert-danger pt-2 ml-2 text-warning" role="alert">
                                                            Less than 90 days to the passport expiry date.
                                                        </div> : null
                                                    }
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Passport Authority</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        onChange={(e) => { setPAuthority(e.target.value) }}
                                                    />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Passport Issue State</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        onChange={(e) => { setPIState(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Type of Travel Doc</label>
                                                    {/* <TravelType data={data} setVisaValue={setVisaValue} setTreeDoc={setTreeDoc} /> */}
                                                    <Select
                                                        onChange={(value) => {
                                                            setVisaValue(value);
                                                        }}
                                                        value={visaValue}
                                                        options={optionsTravelDoc}
                                                        placeholder={visaValue ? visaValue.label : "Select Travel Type"}
                                                    />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Visa Type</label>
                                                    {/* <VisaType data={data} visaValue={visaValue} setDocumentValue={setDocumentValue} /> */}
                                                    <Select
                                                        onChange={(value) => {
                                                            setDocumentValue(value)
                                                        }}
                                                        value={documentValue}
                                                        options={optionsVisaDoc}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Document Type</label>
                                                    {/* <DocumentType data={data} documentValue={documentValue} setTreeDoc={setTreeDoc} /> */}
                                                    <Select
                                                        onChange={(value) => {
                                                            setTreeDoc([...senddata, value.label])
                                                        }}
                                                        value={{
                                                            label: treeDoc[2],
                                                            value: treeDoc[2]
                                                        }}
                                                        options={optionsDocument}
                                                    />
                                                </div>
                                                <div className="mb-3 col-lg-6">
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
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Phone"
                                                onChange={(e) => { setPhone(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value); }}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Country</label>
                                            <Country setCountry={setCountry} />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Cities</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                onChange={(e) => { setCity(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                onChange={(e) => { setAddress(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Postal Code</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                onChange={(e) => { setPostal(e.target.value) }}
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
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Trip Start Date</label>
                                            <TripStart setTripStart={setTripStart} />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Insurance Exp.Date</label>
                                            <InsuranceExp setInsuranceExp={setInsuranceExp} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Airport Name*</label>
                                            <AirportName setAirport={setAirport} />
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="inputEmail4" className="form-label">Duration of Stay</label>
                                            <DurationStay setDuration={setDurationOfStay} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-lg-9">
                                            <label htmlFor="inputEmail4" className="form-label">Hotel Name</label>
                                            <input type="text" className="form-control" placeholder="Search for..." onChange={(e) => setHotel(e.target.value)} />
                                        </div>
                                        <div className='mb3 mt-2 col-lg-3'>
                                            <label className='form-label' />
                                            <button type="button" className='form-control' >Add Hotel</button>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-lg-12">
                                            <label htmlFor="inputEmail4" className="form-label">Description</label>
                                            <textarea className='form-control' rows="" placeholder='Text area' onChange={(e) => setDescription(e.target.value)} ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 mw-100 col-md-12">
                                    {loading ? <button className="btn btn-primary w-100" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </button> : <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Save Application</button>}

                                </div>
                            </div>
                        </div>
                        <div className="col-5 col-lg-5">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <h4 className="card-title">Visa Prices</h4>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <VisaTable entryType={entrytype} treeDoc={treeDoc} visaType={documentValue} country={user?.country} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <h4 className="card-title">Additional Prices</h4>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <AdditionalPrices setSum={setSum} prices={prices} country={user?.country} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <h4 className="card-title">Total</h4>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <TotalTable sum={sum} entrytype={entrytype} country={user?.country} />
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
                        <div className='col-5 col-lg-5'>
                            {
                                showErr ?
                                    (
                                        <>
                                            <div>
                                                <ToastContainer
                                                    position="top-center"
                                                    type="error"
                                                    theme='dark'
                                                    autoClose={5000}
                                                    hideProgressBar={false}
                                                    newestOnTop={false}
                                                    closeOnClick
                                                    rtl={false}
                                                    pauseOnFocusLoss
                                                    draggable
                                                    pauseOnHover
                                                />
                                            </div>
                                        </>

                                    )
                                    : null
                            }
                        </div>
                    </div>
                </div>
            }

        </>

    )
}

export default NewApplication;