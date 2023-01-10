import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { selectPost } from '../../Features/postSlice';
import Select from "react-select";
import Status from "../../../Variables/status.js";
import Gender from '../../../Variables/gender';
import Married from "../../../Variables/married";
import countryList from 'react-select-country-list';
import { selectUser } from '../../Features/userSlice';
import DatePicker from "react-datepicker";
import { optionsOccupations } from '../../../Variables/occupations';
import Input from '../../../components/Tag/Input';
import SelectComponent from '../../../components/Tag/SelectComponent';
import DatePickerComponent from '../../../components/Tag/DatePickerComponent';
import { publicRequest, userRequest } from '../../../requests/requestMethod';
import { toast, ToastContainer } from 'react-toastify';
import { optionsDurationOfDay } from '../../../Variables/duration';
import { CurrencyForCountry } from "../../../Variables/currency.js";
import { selectPrice } from '../../Features/singleMultiple';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
  "duration": yup.string().required("Duration of Stay is required."),
  "airport": yup.string().required("Airport name is required"),
  "country": yup.string().required("Country is required"),
  "entry": yup.string().required("Entry Type is required"),
  "document": yup.string().required("Document Type is required"),
  "visa": yup.string().required("Visa Type is required."),
  "travel": yup.string().required("Travel Doc is required."),
  "occupation": yup.string().required("Occupation is required"),
  "nationality": yup.string().required("Nationality is required"),
  "bcountry": yup.string().required("Birth Country is required"),
  "married": yup.string().required("Title is required"),
  "name": yup.string().required("Name is required."),
  "surname": yup.string().required("Surname is required."),
  "fname": yup.string().required("Father name is required."),
  "lname": yup.string().required("Mother name is required."),
  "status": yup.string().required("Status is required"),
  "gender": yup.string().required("Title is required"),
  "bCity": yup.string().required("Birth City is required."),
  "pnumber": yup.string().required("Passport number is required."),
  "pauthority": yup.string().required("Passport authority is required."),
  "pistate": yup.string().required("Passport issue date is required."),
  "phone": yup.string().required("Phone number is required"),
  "email": yup.string().required("Mail is required"),
  "city": yup.string().required("City is required"),
  "address": yup.string().required("Address is required"),
  "postal": yup.string().required("Postal number is required."),
  "hotel": yup.string().required("Hotel name is required."),
}).required();
const days = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}
const optionsEntry = [
  { value: "single", label: "Single" },
  { value: "multiple", label: "Multiple" }
]
const Application = () => {
  let method = useRef("posts");
  const [currentObject, setCurrentObject] = useState();
  const optionsCountries = useMemo(() => countryList().getData(), [])
  const params = useParams();
  const posts = useSelector(selectPost);
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [married, setMarried] = useState("");
  const [bcountry, setBCountry] = useState("");
  const [bdate, setBDate] = useState("");
  const [bCity, setBCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [occupation, setOccupation] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [pnumber, setPNumber] = useState("");
  const [pissue, setPIssue] = useState("")
  const [pexpiry, setPExpiry] = useState("")
  const [pauthority, setPAuthority] = useState("");
  const [pistate, setPIState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [tripstart, setTripStart] = useState("");
  const [insuranceExp, setInsuranceExp] = useState("");
  const [visaValue, setVisaValue] = useState("");
  const [data, setData] = useState([]);
  const [showErr, setShowErr] = useState("");
  const [documentValue, setDocumentValue] = useState("");
  const [entrytype, setEntryType] = useState("");
  const [durationOfStay, setDurationOfStay] = useState("");
  const [treeDoc, setTreeDoc] = useState([]);
  const [prices, setPrices] = useState([]);
  const [airport, setAirport] = useState({});
  const [hotel, setHotel] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorInsuranceExp, setErrorInsuranceExp] = useState(false);
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
  const user = useSelector(selectUser);

  const formMethods = useForm({
    defaultValues: {
      "duration": currentObject?.travel.durationOfStay ? currentObject.travel.durationOfStay : "",
      "airport": currentObject?.travel.airportName ? currentObject.travel.airportName : "",
      "country": currentObject?.contact.country ? countryList().getLabel(currentObject.contact.country) : "",
      "entry": currentObject?.passport.entryType ? currentObject.passport.entryType : "",
      "document": currentObject?.passport.documentType ? currentObject.passport.documentType : "",
      "visa": currentObject?.passport.visaType ? currentObject.passport.visaType : "",
      "travel": currentObject?.passport.travelType ? currentObject.passport.travelType : "",
      "occupation": currentObject?.personal.occupation ? currentObject.personal.occupation : "",
      "nationaliy": currentObject?.personal.nationality ? countryList().getLabel(currentObject.personal.nationality) : "",
      "bcountry": currentObject?.personal.birthCountry ? currentObject.personal.birthCountry : "",
      "married": currentObject?.personal.married ? currentObject.personal.married : "",
      "status": currentObject?.personal.status ? currentObject.personal.status : "",
      "name": currentObject?.personal.name ? currentObject.personal.name : "",
      "surname": currentObject?.personal.surname ? currentObject.personal.surname : "",
      "fname": currentObject?.personal.fatherName ? currentObject.personal.fatherName : "",
      "lname": currentObject?.personal.motherName ? currentObject.personal.motherName : "",
      "bCity": currentObject?.personal.birthCity ? currentObject.personal.birthCity : "",
      "pnumber": currentObject?.passport.passportNo ? currentObject.passport.passportNo : "",
      "pauthority": currentObject?.passport.passportAuthority ? currentObject.passport.passportAuthority : "",
      "pistate": currentObject?.passport.passportIssueState ? currentObject.passport.passportIssueState : "",
      "phone": currentObject?.contact.telNo ? currentObject.contact.telNo : "",
      "email": currentObject?.contact.email ? currentObject.contact.email : "",
      "city": currentObject?.contact.city ? currentObject.contact.city : "",
      "address": currentObject?.contact.address ? currentObject.contact.address : "",
      "postal": currentObject?.contact.postalCode ? currentObject.contact.postalCode : "",
      "hotel": currentObject?.travel.hotelName ? currentObject.travel.hotelName : "",
      "description": currentObject?.travel.description ? currentObject.travel.description : ""
    },
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const { register, handleSubmit, control, reset, formState: { errors } } = formMethods;
  const onSubmit = (data) => {
    if (method.current === "posts") {
      handleSubmitPost(data);
    } else if (method.current === "put") {
      handleSubmitPut(data);
    }
  }

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };
  const navigate = useNavigate();
  const handleSubmitPost = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      const res = await userRequest(user.token).post("/barcode", {
        personal: {
          pnr: pnr,
          status: data.status,
          title: data.gender,
          name: data.name,
          surname: data.surname,
          birthCountry: countryList().getValue(data.bcountry),
          birthDate: bdate,
          birthCity: data.bCity,
          nationality: countryList().getValue(data.nationality),
          occupation: data.occupation,
          fatherName: data.fname,
          motherName: data.lname,
          married: data.married,
        },
        passport: {
          passportNo: data.pnumber,
          passportIssueDate: pissue,
          passportExpiryDate: pexpiry,
          passportAuthority: data.pauthority,
          passportIssueState: data.pistate,
          travelType: data.travel,
          visaType: data.visa,
          documentType: data.document,
          entryType: data.entry
        },
        contact: {
          telNo: data.phone,
          email: data.email,
          country: countryList().getValue(data.country),
          city: data.city,
          address: data.address,
          postalCode: postal
        },
        travel: {
          tripStartDate: tripstart,
          insuranceExpiryDate: insuranceExp,
          airportName: data.airport,
          durationOfStay: data.duration,
          hotelName: data.hotel,
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
        console.log(res.data)
        //toast(res.data.error?.message.split(",")[0]);
      }
    } catch (err) {
      console.log(err);
      setShowErr(true);
      toast("Something went wrong");
    }
    setLoading(false);
  }
  const handleSubmitPut = async () => {
    setLoading(true);
    try {
      const res = await userRequest(user.token).put("/barcodeUpdate", {
        personal: {
          pnr: pnr,
          status: data.status,
          title: data.gender,
          name: data.name,
          surname: data.surname,
          birthCountry: data.bcountry,
          birthDate: bdate,
          birthCity: data.bCity,
          nationality: data.nationality,
          occupation: data.occupation,
          fatherName: data.fname,
          motherName: data.lname,
          married: data.married,
        },
        passport: {
          passportNo: data.pnumber,
          passportIssueDate: pissue,
          passportExpiryDate: pexpiry,
          passportAuthority: data.pauthority,
          passportIssueState: data.pistate,
          travelType: data.travel,
          visaType: data.visa,
          documentType: data.document,
          entryType: data.entry
        },
        contact: {
          telNo: data.phone,
          email: data.email,
          country: data.country,
          city: data.city,
          address: data.address,
          postalCode: postal
        },
        travel: {
          tripStartDate: tripstart,
          insuranceExpiryDate: insuranceExp,
          airportName: data.airport,
          durationOfStay: data.duration,
          hotelName: data.hotel,
          description: data.description
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
      toast("Something Went Wrong.")
    }
  }
  useEffect(() => {
    console.log(entrytype, price)
    if (entrytype === "Single")
      setFee(price ? +price.single : null)
    else if (entrytype === "Multiple")
      setFee(price ? +price.multiple : null)
  }, [entrytype, price]);
  useEffect(() => {
    const array = prices.map((price) => {
      return currentObject?.services.service.some((service) => service.service === price.name)
    });
    setChecked(array);
  }, [prices, currentObject])
  useEffect(() => {
    if (typeof prices === "object") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [prices]);
  useEffect(() => {
    console.log(currentObject)
  }, [currentObject])
  useEffect(() => {
    if (params?.id) {
      const currentObject = (posts.filter((item) => item._id === params.id))[0]
      setPnr(currentObject.personal.pnr);
      setStatus(currentObject.personal.status);
      setGender(currentObject.personal.title);
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
      setVisaValue(currentObject.passport.travelType)
      setDocumentValue(currentObject.passport.visaType)
      setEntryType(currentObject.passport.entryType)
      setDurationOfStay(currentObject.travel.durationOfStay)
      setTreeDoc([
        currentObject.passport.travelType,
        currentObject.passport.visaType,
        currentObject.passport.documentType
      ])
      setAirport(currentObject.travel.airportName)
      setHotel(currentObject.travel.hotelName)
      setDescription(currentObject.travel.description)
      setSummation(currentObject.services.service)
      // setDocumentType({
      //   label: currentObject.passport.documentType,
      //   value: currentObject.passport.documentType
      // })
      setCurrentObject(currentObject);
      method.current = "put";
      let defaultValues = {
        "duration": currentObject?.travel.durationOfStay ? currentObject.travel.durationOfStay : "",
        "airport": currentObject?.travel.airportName ? currentObject.travel.airportName : "",
        "country": currentObject?.contact.country ? countryList().getLabel(currentObject.contact.country) : "",
        "entry": currentObject?.passport.entryType ? currentObject.passport.entryType : "",
        "document": currentObject?.passport.documentType ? currentObject.passport.documentType : "",
        "visa": currentObject?.passport.visaType ? currentObject.passport.visaType : "",
        "travel": currentObject?.passport.travelType ? currentObject.passport.travelType : "",
        "occupation": currentObject?.personal.occupation ? currentObject.personal.occupation : "",
        "nationaliy": currentObject?.personal.nationality ? countryList().getLabel(currentObject.personal.nationality) : "",
        "bcountry": currentObject?.personal.birthCountry ? countryList().getLabel(currentObject.personal.birthCountry) : "",
        "married": currentObject?.personal.married ? currentObject.personal.married : "",
        "status": currentObject?.personal.status ? currentObject.personal.status : "",
        "name": currentObject?.personal.name ? currentObject.personal.name : "",
        "surname": currentObject?.personal.surname ? currentObject.personal.surname : "",
        "fname": currentObject?.personal.fatherName ? currentObject.personal.fatherName : "",
        "lname": currentObject?.personal.motherName ? currentObject.personal.motherName : "",
        "bCity": currentObject?.personal.birthCity ? currentObject.personal.birthCity : "",
        "pnumber": currentObject?.passport.passportNo ? currentObject.passport.passportNo : "",
        "pauthority": currentObject?.passport.passportAuthority ? currentObject.passport.passportAuthority : "",
        "pistate": currentObject?.passport.passportIssueState ? currentObject.passport.passportIssueState : "",
        "phone": currentObject?.contact.telNo ? currentObject.contact.telNo : "",
        "email": currentObject?.contact.email ? currentObject.contact.email : "",
        "city": currentObject?.contact.city ? currentObject.contact.city : "",
        "address": currentObject?.contact.address ? currentObject.contact.address : "",
        "postal": currentObject?.contact.postalCode ? currentObject.contact.postalCode : "",
        "hotel": currentObject?.travel.hotelName ? currentObject.travel.hotelName : "",
        "description": currentObject?.travel.description ? currentObject.travel.description : ""
      }
      reset(defaultValues)
    }
  }, [params, posts, reset]);
  useEffect(() => {
    if (treeDoc[0] && treeDoc[1] && treeDoc[2]) {
      setIsEmpty(true)
    }
  }, [treeDoc]);
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
    setLoading(true);
    const getData = async (event) => {
      event?.preventDefault();
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
    const newData = [];
    data.map((element) => {
      if (visaValue && element.name === visaValue) {
        element.visaTypes.map((element2) => {
          newData.push({
            value: element2.name,
            label: element2.name
          })
          return element;
        })
      }

      return element;
    })
    setOptionsVisaDoc(newData);
  }, [visaValue, data])
  useEffect(() => {
    if (succedd) {
      const interval = setInterval(() => {
        navigate("/applicationList");
      }, 2000);
      return () => clearInterval(interval)
    }
  }, [succedd, navigate])
  useEffect(() => {
    const newData = [];
    const sendData = []
    data.map((element) => {
      if (element.name === visaValue) {
        sendData.push(element.name)
        return element.visaTypes.map((element2) => {
          if (element2.name === documentValue) {
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
  useEffect(() => {
    console.log("1", errors)
  }, [errors])
  return (
    <FormProvider {...formMethods}>
      <div className='container-fluid p-0' style={{ fontFamily: "Open Sans" }}>
        <div className='row'>
          <div className='col-7 col-lg-7'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='card-title'>Personal Details</h5>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className="mb-3 col-lg-8">
                      <label htmlFor="inputPnr" className="form-label">If there is a linked pnr, please enter:</label>
                      <input id="inputPnr" type="text" className="form-control" placeholder="" disabled value={pnr} />
                    </div>
                    <div className='mb-3 col-lg-4'>
                      <SelectComponent
                        id="inputStatus"
                        options={Status}
                        control={control}
                        name="status"
                        placeholder={"Select Status"}
                        value={status}
                        setValue={setStatus}
                        labelName="Status"
                      />
                      {getFormErrorMessage("status")}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-lg-4'>
                      <SelectComponent
                        id="inputTitle"
                        options={Gender}
                        control={control}
                        name="gender"
                        placeholder={"Select Gender.."}
                        value={gender}
                        setValue={setGender}
                        labelName="Title"
                      />
                      {getFormErrorMessage("gender")}
                    </div>
                    <div className='mb-3 col-lg-4'>
                      <Input
                        id="inputName"
                        value={name}
                        placeholder="Enter Name.."
                        register={register}
                        name="name"
                        {...register("name", { required: true, minLength: 1 })}
                        setValue={setName}
                        labelName="Name"
                      />
                      {getFormErrorMessage("name")}
                    </div>
                    <div className='mb-3 col-lg-4'>
                      <Input
                        id="inputSurname"
                        value={surname}
                        placeholder="Enter Surname.."
                        register={register}
                        name="surname"
                        {...register("surname", { required: true, minLength: 1 })}
                        setValue={setSurname}
                        labelName="Surname"
                      />
                      {getFormErrorMessage("surname")}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-lg-3'>
                      <SelectComponent
                        id="inputMarried"
                        options={Married}
                        control={control}
                        name="married"
                        placeholder={"Select Married"}
                        value={married}
                        setValue={setMarried}
                        labelName="Married"
                      />
                      {getFormErrorMessage("married")}
                    </div>
                    <div className='mb-3 col-lg-3'>
                      <SelectComponent
                        id="exampleDataList"
                        options={optionsCountries}
                        placeholder={"Birth Country.."}
                        control={control}
                        name="bcountry"
                        value={bcountry}
                        setValue={setBCountry}
                        labelName="Birth Country"
                      />
                      {getFormErrorMessage("bcountry")}
                    </div>
                    <div className='mb-3 col-lg-3'>
                      <DatePickerComponent
                        id="inputBDate"
                        labelName={"Birth Date"}
                        value={bdate}
                        setValue={setBDate}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={50}
                        scrollableYearDropdown
                      />
                    </div>
                    <div className='mb-3 col-lg-3'>
                      <Input
                        id="inputCity"
                        value={bCity}
                        placeholder="Birth City.."
                        register={register}
                        name="bCity"
                        {...register("bCity", { required: true, minLength: 1 })}
                        setValue={setBCity}
                        labelName="Birth City"
                      />
                      {getFormErrorMessage("bCity")}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-lg-6'>
                      <SelectComponent
                        id="inputNationality"
                        options={optionsCountries}
                        control={control}
                        name="nationality"
                        placeholder={"Nationality Country.."}
                        value={nationality}
                        setValue={setNationality}
                        labelName="Nationality"
                      />
                      {getFormErrorMessage("nationality")}
                    </div>
                    <div className='mb-3 col-lg-6'>
                      <SelectComponent
                        id="inputJob"
                        options={optionsOccupations}
                        placeholder={"Occupation.."}
                        control={control}
                        name="occupation"
                        value={occupation}
                        setValue={setOccupation}
                        labelName="Occupation *"
                      />
                      {getFormErrorMessage("occupation")}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-lg-6'>
                      <Input
                        id="inputFather"
                        value={fname}
                        setValue={setFName}
                        name="fname"
                        register={register}
                        {...register("fname", { required: true, minLength: 1 })}
                        placeholder="Enter Father Name.."
                        labelName="Father Name"
                      />
                      {getFormErrorMessage("fname")}
                    </div>
                    <div className='mb-3 col-lg-6'>
                      <Input
                        id="inputMother"
                        value={lname}
                        name="lname"
                        register={register}
                        {...register("lname", { required: true, minLength: 1 })}
                        setValue={setLName}
                        placeholder="Enter Mother Name.."
                        labelName={"Mother Name"}
                      />
                      {getFormErrorMessage("lname")}
                    </div>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='card-title'>Visa-Passport Details</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <Input
                            id="inputPassportNo"
                            value={pnumber}
                            placeholder="Enter Passport Number.."
                            register={register}
                            {...register("pnumber", { required: true, minLength: 1 })}
                            name="pnumber"
                            setValue={setPNumber}
                            labelName="Passport Number"
                          />
                          {getFormErrorMessage("pnumber")}
                        </div>
                        <div className="mb-3 col-lg-3">
                          <DatePickerComponent
                            id="inputPassportIssue"
                            labelName={"Passport Issue Date"}
                            value={pissue}
                            setValue={setPIssue}
                          />
                        </div>
                        <div className="mb-3 col-lg-3">
                          <label htmlFor="inputExpiry" className="form-label">Passport Expiry Date</label>
                          <DatePicker
                            id="inputExpiry"
                            className='form-control'
                            selected={pexpiry !== "" ? new Date(pexpiry) : new Date()}
                            onChange={(date) => {
                              setPExpiry(date);
                              if (days(date, new Date()) > 90) {
                                setErrorInsuranceExp(false);
                              } else {
                                setErrorInsuranceExp(true);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <Input
                            id="inputPAuthority"
                            value={pauthority}
                            name="pauthority"
                            register={register}
                            {...register("pauthority", { required: true, minLength: 1 })}
                            setValue={setPAuthority}
                            placeholder="Enter Passport Authority Name.."
                            labelName="Passport Authority "
                          />
                          {getFormErrorMessage("pauthority")}
                        </div>
                        <div className='mb-3 col-lg-6'>
                          <Input
                            id="inputIssueState"
                            value={pistate}
                            name="pistate"
                            register={register}
                            {...register("pistate", { required: true, minLength: 1 })}
                            setValue={setPIState}
                            placeholder="Enter Passport Issue State.."
                            labelName="Passport Issue State "
                          />
                          {getFormErrorMessage("pistate")}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <SelectComponent
                            id="inputTravel"
                            options={optionsTravelDoc}
                            placeholder={"Select Travel Type.."}
                            control={control}
                            name="travel"
                            value={visaValue}
                            setValue={setVisaValue}
                            labelName="Type of Travel Doc"
                          />
                          {getFormErrorMessage("travel")}
                        </div>
                        <div className="mb-3 col-lg-6">
                          <SelectComponent
                            id="inputVisa"
                            options={optionsVisaDoc}
                            placeholder={"Select Visa Type.."}
                            control={control}
                            name="visa"
                            value={documentValue}
                            setValue={setDocumentValue}
                            labelName="Visa Type"
                          />
                          {getFormErrorMessage("visa")}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label htmlFor="inputDocument" className="form-label">Document Type</label>
                          <Controller
                            name="document"
                            control={control}
                            defaultValue={entrytype}
                            render={({ field }) => {
                              return <Select
                                id="inputDocument"
                                onChange={(value) => {
                                  field.onChange(value.label);
                                  setTreeDoc([...senddata, value.label])
                                }}
                                value={treeDoc.length > 2 ? {
                                  label: treeDoc[2],
                                  value: treeDoc[2]
                                } : null}
                                options={optionsDocument}
                                placeholder={treeDoc.length ? treeDoc[2] : "Select Document Type.."}
                              />
                            }}
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <SelectComponent
                            id="inputEntry"
                            value={entrytype}
                            control={control}
                            name="entry"
                            setValue={setEntryType}
                            options={optionsEntry}
                            labelName="Entry Type"
                            placeholder={"Select Entry Type.."}
                          />
                          {getFormErrorMessage("entry")}
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
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <Input
                        id="inputPhone"
                        labelName={"Phone"}
                        value={phone}
                        name="phone"
                        register={register}
                        {...register("phone", { required: true, minLength: 1 })}
                        setValue={setPhone}
                        placeholder={"Enter Phone Number.."}
                      />
                      {getFormErrorMessage("phone")}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <Input
                        id="inputEmail"
                        type="text"
                        labelName={"Mail"}
                        name="email"
                        register={register}
                        {...register("email", { required: "Mail is required", minLength: 1 })}
                        value={email}
                        setValue={setEmail}
                        placeholder={"Enter Mail.."}
                      />
                      {getFormErrorMessage("email")}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <SelectComponent
                        id="inputCountry"
                        options={optionsCountries}
                        placeholder={"Select Country.."}
                        control={control}
                        name="country"
                        value={country}
                        setValue={setCountry}
                        labelName="Country"
                      />
                      {getFormErrorMessage("country")}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <Input
                        placeholder={"Select City.."}
                        value={city}
                        name="city"
                        register={register}
                        {...register("city", { required: true, minLength: 1 })}
                        setValue={setCity}
                        id="inputCity"
                        labelName={"City"}
                      />
                      {getFormErrorMessage("city")}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <Input
                        placeholder={"Select Address.."}
                        value={address}
                        name="address"
                        register={register}
                        {...register("address", { required: true, minLength: 1 })}
                        setValue={setAddress}
                        id="inputAddress"
                        labelName={"Address"}
                      />
                      {getFormErrorMessage("address")}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <Input
                        placeholder={"Select Postal Code.."}
                        value={postal}
                        type="text"
                        register={register}
                        name="postal"
                        {...register("postal", { required: true, minLength: 1 })}
                        setValue={setPostal}
                        id="inputPostal"
                        labelName={"Postal Code"}
                      />
                      {getFormErrorMessage("postal")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className='card-header'>
                  <h5 className="card-title">Travel Details</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <DatePickerComponent
                        id="inputTripStart"
                        labelName={"TripStart Date"}
                        value={tripstart}
                        setValue={setTripStart}
                      />
                    </div>
                    <div className="mb-3 col-lg-6">
                      <DatePickerComponent
                        id="inputExpDate"
                        labelName={"Insurance Exp.Date"}
                        value={insuranceExp}
                        setValue={setInsuranceExp}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <SelectComponent
                        id="inputAirport"
                        value={airport}
                        setValue={setAirport}
                        control={control}
                        name="airport"
                        options={[{ value: "ISTANBUL", label: "ISTANBUL AIRPORT" }]}
                        labelName="Airport Name"
                        placeholder={"Select Airport Name.."}
                      />
                      {getFormErrorMessage("airport")}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <SelectComponent
                        id="inputStay"
                        value={durationOfStay}
                        setValue={setDurationOfStay}
                        control={control}
                        name="duration"
                        options={optionsDurationOfDay}
                        labelName="Duration of Stay"
                        placeholder={"Select Duration of Stay.."}
                      />
                      {getFormErrorMessage("duration")}
                    </div>
                  </div>
                  <div className='row'>
                    <div className="mb-3 col-lg-9">
                      <Input
                        id="inputHotel"
                        labelName={"Hotel Name"}
                        placeholder={"Search for.."}
                        name="hotel"
                        register={register}
                        value={hotel}
                        setValue={setHotel}
                      />
                      {getFormErrorMessage("hotel")}
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
                      {getFormErrorMessage("description")}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="mb-3 mw-100 col-md-12">
                  {loading ?
                    <button className="btn btn-primary w-100" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="visually-hidden">Loading...</span>
                    </button> :
                    user?.admin ?
                      <button type="submit" className="btn btn-primary w-100" /> : null
                  }
                </div>
              </div>
            </form>
          </div>
          <div className="col-5 col-lg-5">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <h4 className="card-title">Visa Prices</h4>
                </div>
              </div>
              <div className="card-body">
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
                      <td>{isEmpty ? documentValue : ".."}</td>
                      <td>{isEmpty ? treeDoc[2] : ".."}</td>
                      <td>{isEmpty ? `${price?.single} ${user?.country ? CurrencyForCountry[user?.country] : null}` : ".."}</td>
                      <td>{isEmpty ? `${price?.multiple} ${user?.country ? CurrencyForCountry[user?.country] : null}` : ".."}</td>
                      <td>{isEmpty ? "0" : ".."}</td>
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
              <div className="card-body">
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
                          <td style={{ textAlign: "right" }}>{price?.price === -1 ? "" : price.price} {CurrencyForCountry[user.country]}</td>
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
                          <td>{entrytype ? entrytype + " Type" : "Ministry Fee: "}</td>
                          <td>:</td>
                          <td style={{ textAlign: "right" }} >{fee} {CurrencyForCountry[user?.country]}</td>
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
                            <td style={{ textAlign: "right" }}>{service.sum} {CurrencyForCountry[user.country]}</td>
                          </tr>
                        )
                      })
                    }
                    <tr>
                      <td style={{ fontWeight: "bold" }} >Total</td>
                      <td>:</td>
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{sum && sum.reduce((element, a) => {
                        return +element + +a.sum
                      }, fee)} {CurrencyForCountry[user.country]}</td>
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
      </div>
    </FormProvider>
  )
}

export default Application