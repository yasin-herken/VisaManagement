import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../navbar';
import CurrencyForCountry from "../../../Variables/currency.js";
import Sidebar from '../sidebar';
import Status from "../../../Variables/status.js";
import Gender from '../../../Variables/gender.js';
import Married from '../../../Variables/married.js';
import Select from 'react-select';
import Datepicker from "react-datepicker";
import { optionsOccupations } from '../../../Variables/occupations';
import countryList from 'react-select-country-list'
import { publicRequest, userRequest } from '../../../requests/requestMethod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Features/userSlice';
import EntryType from '../../../components/EntryType';
import { optionsDurationOfDay } from '../../../Variables/duration';
import Currency from "../../../Variables/currency.js";
import { selectPost } from '../../Features/postSlice';
import { selectPrice } from '../../Features/singleMultiple';
const days = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}

const UpdateList = () => {
  const posts = useSelector(selectPost);
  const [currentObject, setCurrentObject] = useState();
  const params = useParams();
  const [collapse, setCollapse] = useState(false);
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [married, setMarried] = useState(null);
  const [bcountry, setBCountry] = useState(null);
  const [bdate, setBDate] = useState(null);
  const [bCity, setBCity] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [pnumber, setPNumber] = useState(null);
  const [pissue, setPIssue] = useState(new Date("1980/02/08"))
  const [pexpiry, setPExpiry] = useState(new Date("1980/02/08"))
  const [pauthority, setPAuthority] = useState(null);
  const [pistate, setPIState] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [postal, setPostal] = useState(null);
  const [tripstart, setTripStart] = useState(new Date("1980/02/08"));
  const [insuranceExp, setInsuranceExp] = useState(new Date("1980/02/08"));
  const [visaValue, setVisaValue] = useState(null);
  const [data, setData] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [documentValue, setDocumentValue] = useState(null);
  const [entrytype, setEntryType] = useState(null);
  const [durationOfStay, setDurationOfStay] = useState(null);
  const [treeDoc, setTreeDoc] = useState([]);
  const [prices, setPrices] = useState([]);
  const [airport, setAirport] = useState({});
  const [hotel, setHotel] = useState(null);
  const [description, setDescription] = useState(null);
  const optionsCountries = useMemo(() => countryList().getData(), []);
  const [loading, setLoading] = useState(false);
  const [errorInsuranceExp, setErrorInsuranceExp] = useState(false);
  const user = useSelector(selectUser);
  const [isEmpty, setIsEmpty] = useState(false);
  const [checked, setChecked] = useState([]);
  const [show, setShow] = useState(false);
  const [sum, setSummation] = useState([]);
  const [fee, setFee] = useState(0);
  const [succedd, setSuccedd] = useState(false);
  const [optionsTravelDoc, setOptionsTravelDoc] = useState([]);
  const [optionsVisaDoc, setOptionsVisaDoc] = useState([]);
  const [optionsDocument, setOptionsDocument] = useState([]);
  const [senddata, setsenddata] = useState();
  const price = useSelector(selectPrice);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await userRequest(user.token).put("/barcodeUpdate", {
        personal: {
          pnr: pnr,
          status: status,
          title: gender,
          name: name,
          surname: surname,
          birthCountry: bcountry,
          birthDate: bdate,
          birthCity: bCity,
          nationality: nationality,
          occupation: occupation,
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
          entryType: entrytype.label
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
          airportName: airport.label,
          durationOfStay: durationOfStay.label,
          hotelName: hotel,
          description: description
        },
        services: {
          service: sum.map((element) => {
            return element;
          })
        },
        country: user?.country,
        admin: user?.id,
        _id: currentObject._id
      })
      if (res.data?.success) {
        setSuccedd(true);
      }
    } catch (err) {
      setShowErr(true);
      toast("Something went wrong")
    }
    setLoading(false);
  }
  useEffect(() => {
    if (entrytype?.label === "Single")
      setFee(price ? +price.single : null)
    else if (entrytype?.label === "Multiple")
      setFee(price ? +price.multiple : null)
  }, [entrytype, price]);
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
  }, [user.country])
  useEffect(() => {
    if (treeDoc[0] && treeDoc[1] && treeDoc[2]) {
      setIsEmpty(true)
    }
  }, [treeDoc]);
  useEffect(() => {
    if (typeof prices === "object") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [prices]);
  useEffect(() => {
    const currentObject = (posts.filter((item) => item._id === params.id))[0]
    setPnr(currentObject.barcodeValue);
    setStatus(currentObject.personal.status);
    setGender(currentObject.personal.title)
    setName(currentObject.personal.name);
    setSurname(currentObject.personal.surname);
    setMarried(currentObject.personal.married);
    setBCountry(countryList().getLabel(currentObject.personal.birthCountry));
    setBDate(new Date(currentObject.personal.birthDate));
    setBCity(currentObject.personal.birthCity);
    setNationality(countryList().getLabel(currentObject.personal.nationality));
    setOccupation(currentObject.personal.occupation);
    setFName(currentObject.personal.fatherName);
    setLName(currentObject.personal.motherName);
    setPNumber(currentObject.passport.passportNo);
    setPIssue(new Date(currentObject.passport.passportIssueDate))
    setPExpiry(new Date(currentObject.passport.passportExpiryDate))
    setPAuthority(currentObject.passport.passportAuthority)
    setPIState(currentObject.passport.passportIssueState)
    setPhone(currentObject.contact.telNo)
    setEmail(currentObject.contact.email)
    setCountry(countryList().getLabel(currentObject.contact.country))
    setCity(currentObject.contact.city)
    setAddress(currentObject.contact.address)
    setPostal(currentObject.contact.postalCode)
    setTripStart(new Date(currentObject.travel.tripStartDate))
    setInsuranceExp(new Date(currentObject.travel.insuranceExpiryDate))
    setVisaValue({
      label: currentObject.passport.travelType,
      value: currentObject.passport.travelType
    })
    setDocumentValue({
      label: currentObject.passport.visaType,
      value: currentObject.passport.visaType
    })
    setEntryType({
      label: currentObject.passport.entryType,
      value: currentObject.passport.entryType
    })
    setDurationOfStay({
      label: currentObject.travel.durationOfStay,
      value: currentObject.travel.durationOfStay,
    })
    setTreeDoc([
      currentObject.passport.travelType,
      currentObject.passport.visaType,
      currentObject.passport.documentType
    ])
    setAirport({
      label: currentObject.travel.airportName,
      value: currentObject.travel.airportName,
    })
    setHotel(currentObject.travel.hotelName)
    setDescription(currentObject.travel.description)
    setSummation(currentObject.services.service)
    // setDocumentType({
    //   label: currentObject.passport.documentType,
    //   value: currentObject.passport.documentType
    // })
    setCurrentObject(currentObject);
  }, [posts, params])
  useEffect(() => {
    const array = prices.map((price) => {
      return currentObject.services.service.some((service) => service.service === price.name)
    });
    setChecked(array);
  }, [prices, currentObject])
  useEffect(() => {
    if (succedd) {
      const interval = setInterval(() => {
      }, 5000);
      navigate("/applicationList");
      return () => clearInterval(interval)
    }
  }, [succedd, navigate])
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
          return element;
        })
      }
      setOptionsVisaDoc(newData);
      return element;
    })
  }, [visaValue, data])
  useEffect(() => {
    const newData = [];
    const sendData = []
    data.map((element) => {
      if (element.name === visaValue.label) {
        sendData.push(element.name)
        return element.visaTypes.map((element2) => {
          if (element2.name === documentValue.label) {
            sendData.push(element2.name);
            element2.documentTypes.map((element3) => {
              return newData.push({
                value: element3.name,
                label: element3.name
              })
            })
            setsenddata(sendData);
          }
          return element2;
        })
      }
      return element;
    })
    setOptionsDocument(newData);
  }, [documentValue, data, visaValue])
  return (
    <div className="wrapper">
      <Sidebar coll={collapse} />
      <div className="main">
        <Navbar setColl={setCollapse} />
        <main className="content">
          <div className='container-fluid p-0' style={{ fontFamily: "Open Sans" }}>
            <div className='row'>
              <div className='col-7 col-lg-7'>
                <div className='card'>
                  <div className='card-header'>
                    <h5 className='card-title'>Personal Details</h5>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className="mb-3 col-lg-8">
                        <label htmlFor="inputEmail4" className="form-label">If there is a linked pnr, please enter:</label>
                        <input id="inputAddress" type="text" className="form-control" value={pnr} placeholder={pnr} disabled />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label htmlFor="inputEmail4" className="form-label">Status</label>
                        <Select
                          options={Status}
                          id="inputAddress"
                          placeholder={status}
                          value={{
                            label: status,
                            value: status
                          }}
                          onChange={(value) => {
                            setStatus(value.label)
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
                          placeholder={gender}
                          value={{
                            label: gender,
                            value: gender
                          }}
                          onChange={(value) => setGender(value.label)}
                        />
                      </div>
                      <div className="mb-3 col-lg-5">
                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={name}
                          value={name}
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
                          placeholder={surname}
                          value={surname}
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
                          placeholder={married}
                          value={{
                            label: married,
                            value: married
                          }}
                          onChange={(value) => setMarried(value.label)}
                        />
                      </div>
                      <div className="mb-3 col-lg-3">
                        <label htmlFor="exampleDataList" className="form-label">Birth Country</label>
                        <Select
                          options={optionsCountries}
                          value={{
                            label: bcountry,
                            value: bcountry
                          }} onChange={(value) => setBCountry(value.label)} />
                      </div>
                      <div className="mb-3 col-lg-3">
                        <label htmlFor="inputEmail4" className="form-label">Birth Date</label>
                        <Datepicker
                          selected={bdate ? bdate : new Date("1980/02/08")}
                          className="form-control"
                          onChange={(date) => {
                            setBDate(date)
                          }}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={50}
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="mb-3 col-lg-3">
                        <label htmlFor="inputEmail4" className="form-label">Birth City</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={bCity}
                          value={bCity}
                          onChange={(e) => { setBCity(e.target.value) }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Nationality</label>
                        <Select
                          placeholder="Select Nationality Country"
                          options={optionsCountries}
                          value={{
                            label: nationality,
                            value: nationality,
                          }}
                          onChange={(value) => setNationality(value.label)}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Occupation *</label>
                        <Select
                          placeholder="Select Job.."
                          options={optionsOccupations}
                          value={{
                            label: occupation,
                            value: occupation
                          }}
                          onChange={(value) => setOccupation(value.label)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Father Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={fname}
                          value={fname}
                          onChange={(e) => { setFName(e.target.value) }}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Mother Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={lname}
                          value={lname}
                          onChange={(e) => { setLName(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card'>
                  <div className='card-header'>
                    <h5 className='card-title'>Visa-Passport Details</h5>
                  </div>
                  <div className='card-body'>
                    <div className="row">
                      <div className='col-lg-12'>
                        <div className='row'>
                          <div className="mb-3 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">Passport Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={pnumber}
                              value={pnumber}
                              onChange={(e) => { setPNumber(e.target.value) }}
                            />
                          </div>
                          <div className="mb-3 col-lg-3">
                            <label htmlFor="inputEmail4" className="form-label">Passport Issue Date</label>
                            <Datepicker
                              className='form-control'
                              selected={new Date(pissue)}
                              onChange={(date) => {
                                setPIssue(date)
                              }}
                            />
                          </div>
                          <div className="mb-3 col-lg-3">
                            <label htmlFor="inputEmail4" className="form-label">Passport Expiry Date</label>
                            <Datepicker
                              className='form-control'
                              selected={new Date(pexpiry)}
                              onChange={(date) => {
                                if (days(date, new Date()) > 90) {
                                  setPExpiry(date)
                                  setErrorInsuranceExp(false);
                                }
                                else {
                                  console.log("here")
                                  setPExpiry(date)
                                  setErrorInsuranceExp(true);
                                }
                              }
                              }
                            />
                            {errorInsuranceExp ?
                              <div className="alert alert-danger pt-2 ml-2 text-warning" role="alert">
                                Less than 90 days to the passport expiry date.
                              </div> : null}
                          </div>
                        </div>
                        <div className='row'>
                          <div className="mb-3 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">Passport Authority</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={pauthority}
                              value={pauthority}
                              onChange={(e) => { setPAuthority(e.target.value) }}
                            />
                          </div>
                          <div className="mb-3 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">Passport Issue State</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={pistate}
                              value={pistate}
                              onChange={(e) => { setPIState(e.target.value) }}
                            />
                          </div>
                        </div>
                        <div className='row'>
                          <div className="mb-3 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">Type of Travel Doc</label>
                            {/* <TravelType data={data} setVisaValue={setVisaValue} setTreeDoc={setTreeDoc} travelType={visaValue} /> */}
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
                            {/* <VisaType data={data} visaValue={visaValue} setDocumentValue={setDocumentValue} visaType={documentValue} /> */}
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
                            {/* <DocumentType data={data} documentValue={documentValue} setTreeDoc={setTreeDoc} documentType={documentType} /> */}
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
                            <EntryType setEntryType={setEntryType} treeDoc={treeDoc} entryType={entrytype} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card'>
                  <div className="card-header">
                    <h5 className="card-title">Contact Details</h5>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={phone}
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value) }}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={email}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); }}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Country</label>
                        <Select
                          options={optionsCountries}
                          value={{
                            label: country,
                            value: country
                          }}
                          onChange={(value) => setCountry(value.label)} />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Cities</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={city}
                          value={city}
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
                          placeholder={address}
                          value={address}
                          onChange={(e) => { setAddress(e.target.value) }}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Postal Code</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder={postal}
                          value={postal}
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
                        {/* <TripStart setTripStart={setTripStart} /> */}
                        <Datepicker
                          className='form-control'
                          selected={new Date(tripstart)}
                          onChange={(date) => {
                            setTripStart(date)
                          }}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Insurance Exp.Date</label>
                        <Datepicker
                          className='form-control'
                          selected={new Date(insuranceExp)}
                          onChange={(date) => {
                            setInsuranceExp(date);
                          }
                          } />
                      </div>
                    </div>
                    <div className='row'>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Airport Name*</label>
                        <Select
                          value={airport}
                          options={[{ value: "ISTANBUL", label: "ISTANBUL AIRPORT" }]}
                          placeholder={airport ? airport.label : "Select Travel Type"}
                          onChange={(value) => {
                            setAirport(value.label);
                          }}
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label htmlFor="inputEmail4" className="form-label">Duration of Stay</label>
                        <Select
                          options={optionsDurationOfDay}
                          placeholder={durationOfStay ? durationOfStay : "Select Travel Type"}
                          value={durationOfStay}
                          onChange={(value) => {
                            setDurationOfStay(value);
                          }}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className="mb-3 col-lg-9">
                        <label htmlFor="inputEmail4" className="form-label">Hotel Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for..."
                          value={hotel}
                          onChange={(e) => setHotel(e.target.value)} />
                      </div>
                      <div className='mb3 mt-2 col-lg-3'>
                        <label className='form-label' />
                        <button type="button" className='form-control' >Add Hotel</button>
                      </div>
                    </div>
                    <div className='row'>
                      <div className="mb-3 col-lg-12">
                        <label htmlFor="inputEmail4" className="form-label">Description</label>
                        <textarea
                          className='form-control'
                          rows=""
                          placeholder='Text area'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} >
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="mb-3 mw-100 col-md-12">
                    {loading ? <button className="btn btn-primary w-100" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="visually-hidden">Loading...</span>
                    </button> : user?.admin ? <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Save Application</button> : null}
                  </div>
                </div>
              </div>
              <div className='col-5 col-lg-5'>
                <div className='card'>
                  <div className="card-header">
                    <div className="row">
                      <h4 className="card-title">Visa Prices</h4>
                    </div>
                  </div>
                  <div className='card-body'>
                    <table className="table  table-striped table-sm table-bordered table-responsive">
                      <thead>
                        <tr>
                          <th style={{ width: "20%" }}>Visa Name</th>
                          <th style={{ width: "20%" }}>Trip Name</th>
                          <th style={{ width: "20%" }}>Single Price</th>
                          <th style={{ width: "20%" }}>Multi Price</th>
                          <th className="d-none d-md-table-cell" style={{ width: "20%" }}>Service Fee Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ fontSize: "16px" }}>
                          <td>{isEmpty ? documentValue.label : ".."}</td>
                          <td>{isEmpty ? treeDoc[2] : ".."}</td>
                          <td>{isEmpty ? `${price?.single} ${country ? CurrencyForCountry[user.country] : null}` : ".."}</td>
                          <td>{isEmpty ? `${price?.multiple} ${country ? CurrencyForCountry[user.country] : null}` : ".."}</td>
                          <td>{isEmpty ? "0" : ".."}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='card'>
                  <div className="card-header">
                    <div className="row">
                      <h4 className="card-title">Additional Prices</h4>
                    </div>
                  </div>
                  <div className='card-body'>
                    <table className="table table-sm table-bordered table-responsive striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10%" }}></th>
                          <th style={{ width: "50%" }}>Service Name</th>
                          <th style={{ width: "40%", textAlign: "right" }}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {show ? prices?.map((price, index) => {
                          if (!price) return null
                          return (
                            <tr key={price?.name} style={{ backgroundColor: (checked[index] ? "#73C2FB" : "") }}>
                              <td>
                                <label className="form-check form-check-inline">
                                  <input className="form-check-input" type="checkbox" value={(index + 1).toString()} defaultChecked={checked[index]} onClick={(e) => {
                                    if (e.target.checked) {
                                      setSummation([...sum, {
                                        sum: price.price === -1 ? 0 : price.price,
                                        service: price.name
                                      }])
                                      let newArr = [...checked];
                                      newArr[index] = true;
                                      setChecked(newArr);
                                    } else if (!e.target.checked) {
                                      setSummation((sums) => sums.filter((service) => {
                                        return service.service !== price.name
                                      }))
                                      let newArr = [...checked];
                                      newArr[index] = false;
                                      setChecked(newArr);
                                    }
                                  }} />
                                  <span className="form-check-label"></span>
                                </label>
                              </td>
                              <td>{price?.name}</td>
                              <td style={{ textAlign: "right" }}>{price?.price === -1 ? "" : price.price} {Currency[user.country]}</td>
                            </tr>)
                        }) : null}
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
                      <tbody>
                        {
                          fee === 0 ? null :
                            <tr>
                              <td>{entrytype ? entrytype.label + " Type" : "Ministry Fee: "}</td>
                              <td>:</td>
                              <td style={{ textAlign: "right" }} >{fee} {Currency[user?.country]}</td>
                            </tr>
                        }
                        <tr>
                          <td rowSpan={1}>Additinal & Service Fee</td>
                          <td rowSpan={1}></td>
                          <td rowSpan={1} style={{ textAlign: "right" }}></td>
                        </tr>
                        {
                          sum && sum?.map((service, index) => {
                            return (
                              <tr key={index}>
                                <td>{service.service}</td>
                                <td>:</td>
                                <td style={{ textAlign: "right" }}>{service.sum} {Currency[user.country]}</td>
                              </tr>
                            )
                          })
                        }
                        <tr>
                          <td style={{ fontWeight: "bold" }} >Total</td>
                          <td>:</td>
                          <td style={{ textAlign: "right", fontWeight: "bold" }}>{sum && sum.reduce((element, a) => {
                            return +element + +a.sum
                          }, fee)} {Currency[user.country]}</td>
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
        </main>
      </div>
    </div>
  )
}

export default UpdateList