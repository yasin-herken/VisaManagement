import React, { useEffect, useState, useReducer } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { selectUser } from '../Features/userSlice';
import "./css/application.css";
import Select from 'react-select';
import { userRequest } from '../../requests/requestMethod';
import Status from "../../Variables/status.js";
import TableTest from './tableTest';
import PrimeTable from './primeTable';
import TotalTable from '../../components/TotalTable';
import VisaTables from '../../components/visaTables';
import AdditionalPrices from '../../components/AdditionalPrices';

const reducer = (state, action) => {
    switch (action.type) {
        case "Type of Travel Doc":
            return {
                state: ["Travel", "Visa"],
                value: [{
                    value: action.payload.value,
                    label: action.payload.label
                }, {}, {}]
            }
        case "Visa Type":
            return {
                state: ["Travel", "Visa", "Document"],
                value: [{
                    value: state?.value[0]?.value,
                    label: state?.value[0]?.label
                }, {
                    value: action.payload.value,
                    label: action.payload.label
                }, {

                }]
            }
        case "Document Type":
            return {
                state: ["Travel", "Visa", "Document", "Last"],
                value: [{
                    value: state?.value[0].value,
                    label: state?.value[0].label
                }, {
                    value: state?.value[1].value,
                    label: state?.value[1].label
                }, {
                    value: action.payload.value,
                    label: action.payload.label
                }]
            }
        default:
            return {
                state: ["Empty"],
                value: ["", "", ""]
            }
    }
}
function NewApp() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telNo, setTelNo] = useState();
    const [collapse, setCollapse] = useState(false);
    const [passportNo, setPassportNo] = useState("");
    const [services, setServices] = useState([]);
    const user = useSelector(selectUser);
    const [status, setStatus] = useState("");
    const [options, setOptions] = useState([
    ]);
    const [prices,setPrices] = useState([]);
    const [sum, setSum] = useState([]);
    const [errType, setErrType] = useState([false, false, false]);
    const [optionVisa, setOptionVisa] = useState([]);
    const [optionDoc, setOptionDoc] = useState([]);
    const [entryType, setEntryType] = useState([{ value: "single", label: "Single" }]);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            lastname: "",
            passportNo: "",
            telNo: "",
            travelType: "",
            visaType: "",
            docType: "",
            entryTypes: "",
        }
    });
    const [state, dispatch] = useReducer(reducer, {
        state: ["First"],
        value: [{
            value: "",
            label: "",
        }, {
            value: "",
            label: "",
        }, {
            value: "",
            label: "",
        }]
    });
    const onHandleSubmit = async () => {
        const ans = state.value.map((element, index) => {
            if (!isNaN(element.value)) {
                const arr = errType;
                arr[index] = true;
                return false;
            } else {
                return true;
            }
        })
        setErrType(ans);
        if (!ans.includes(true)) {
            try {
                const res = await userRequest(user.token.split(" ")[1]).post("/barcode", {
                    name: name,
                    surname: lastName,
                    telNo: telNo,
                    passportNo: passportNo,
                    travelType: state.value[0].label,
                    visaType: state.value[1].label,
                    documentType: state.value[2].label,
                    entryType: entryType.label,
                    status: status.label
                })
                console.log(res.data)
            } catch (err) {

            }
        }

    }
    useEffect(()=>{
        const getAdditionalPrices = async (event) => {
            if (event && event.preventDefault)
                event.preventDefault();
                try {
                    const res = await userRequest(user.token.split(" ")[1]).get("/getPrices");
                    if(res.status===200){
                        setPrices(res.data)
                    }
                } catch(err){
                    console.log(err);
                }  
        }
        getAdditionalPrices()
    },[user.token])
    useEffect(() => {
    }, [errType])
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await userRequest(user.token.split(" ")[1]).get("/getData");
                if (res.status === 200) {
                    console.log(res.data)
                    setServices(res.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
        loadData()
    }, [user.token])
    useEffect(() => {
    }, [user])
    useEffect(() => {
        const travelDoc = []
        const visaDoc = []
        const documentType = []
        if (state.state.includes("Travel") || state.state.includes("First")) {
            services?.map((element, index) => {
                return travelDoc.push({
                    value: index,
                    label: element?.name
                });
            });
            setOptions(travelDoc)
        }
        if (state.state.includes("Visa")) {
            services?.map((service, index) => {
                if (index === state.value[0].value) {
                    service?.visaTypes?.map((visaType, index) => {
                        return visaDoc.push({
                            value: index,
                            label: visaType?.name
                        })
                    })
                }else{
                    return [];
                }
            })
            setOptionVisa(visaDoc);
        }
        if (state.state.includes("Document")) {
            services.map((service, index) => {
                if (index === state.value[0]?.value) {
                    return service.visaTypes.map((visaType, index1) => {
                        if (index1 === state.value[1]?.value) {
                            return visaType.documentTypes.map((documents, index) => {
                                return documentType.push({
                                    value: index,
                                    label: documents?.name
                                })
                            })
                        }else {
                            return [];
                        }
                    })
                }else{
                    return [];
                }
            })
            setOptionDoc(documentType);
        }
    }, [services, state]);
    useEffect(() => {
    }, [optionDoc, optionVisa])
    return (
        <div className="wrapper">
            <Sidebar coll={collapse} />
            <div className="main">
                <Navbar setColl={setCollapse} />
                <main className="content">
                    <div className='container-fluid p-0'>
                        <div className='row'>
                            <div className='col-6 col-lg-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Add New Profile</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputName" className='form-label'>Name</label>
                                                <input
                                                    id="inputName"
                                                    className='form-control'
                                                    placeholder=""
                                                    {
                                                    ...register("name", {
                                                        required: "Name is required.", minLength: {
                                                            value: 5,
                                                            message: "Min Length is 5."
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setName(e.target.value);
                                                    }}
                                                />
                                                {errors?.name ? <p>{errors.name.message}</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputlastName" className="form-label">Surname</label>
                                                <input
                                                    id="inputLastName"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("lastName", {
                                                        required: "Surname is required.", minLength: {
                                                            value: 4,
                                                            message: "Min Length is 4"
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        setLastName(e.target.value);
                                                    }}
                                                />
                                                {errors?.lastName ? <p>{errors.lastName.message}</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputPassportNo" className="form-label">Passport No</label>
                                                <input
                                                    id="inputPassportNo"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("passportNo", {
                                                        required: "PassportNo is required.", minLength: {
                                                            value: 9,
                                                            message: "Min Length is 9."
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: "Max Length is 10."
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        setPassportNo(e.target.value);
                                                    }}
                                                />
                                                {errors?.passportNo ? <p>{errors.passportNo.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputTelNo" className='form-label'>Number</label>
                                                <input
                                                    type="number"
                                                    id="inputTelNo"
                                                    className='form-control'
                                                    placeholder=""
                                                    {
                                                    ...register("telNo", {
                                                        required: "Telephone number is required.", minLength: {
                                                            value: 8,
                                                            message: "Min Length is 8."
                                                        }, maxLength: {
                                                            value: 9,
                                                            message: "Max Length is 8."
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setTelNo(e.target.value);
                                                    }}
                                                />
                                                {errors?.telNo ? <p>{errors.telNo.message}</p> : null}
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
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputTravelDoc" className="form-label">Type of Travel Doc *</label>
                                                <Select
                                                    value={state.value[0]}
                                                    options={options}
                                                    onChange={(value) => {
                                                        dispatch({
                                                            type: "Type of Travel Doc", payload: {
                                                                value: value.value,
                                                                label: value.label
                                                            }
                                                        })
                                                    }}
                                                />
                                                <p>{errType[0] ? "Travel Document is required." : null}</p>
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputVisaDoc" className="form-label">Visa Type *</label>
                                                <Select
                                                    value={state.value[1]}
                                                    options={optionVisa}
                                                    onChange={(value) => {
                                                        setOptionDoc([]);
                                                        dispatch({
                                                            type: "Visa Type", payload: {
                                                                value: value.value,
                                                                label: value.label
                                                            }
                                                        })
                                                    }}
                                                />
                                                {errType[1] ? <p>Visa Document is required.</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputDocumentType" className="form-label">Document Type *</label>
                                                <Select
                                                    value={state.value[2]}
                                                    options={optionDoc}
                                                    onChange={(value) => {
                                                        dispatch({
                                                            type: "Document Type", payload: {
                                                                value: value.value,
                                                                label: value.label
                                                            }
                                                        })
                                                    }}
                                                />
                                                {errType[2] ? <p>Document is required.</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputEntryType" className="form-label">Select Entry</label>
                                                <Select
                                                    value={entryType}
                                                    options={[
                                                        { value: "single", label: "Single" },
                                                        { value: "multiple", label: "Multiple" }
                                                    ]}

                                                    onChange={(value) => {
                                                        setEntryType(value)
                                                    }}
                                                />
                                                {/* {errors?.entryTypes ? <p>{errors.entryTypes.message}</p> : null} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="mb-3 mw-100 col-md-12">
                                        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit(onHandleSubmit)}>Save Application</button>
                                    </div>
                                </div>

                            </div>
                            <div className='col-6 col-lg-6'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <div className='row'>
                                            <h4 className='card-title'>Visa Prices</h4>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <VisaTables entryType={entryType} visaType={state.value[1].label} docType={state.value[2].label} />
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
                                        <TotalTable sum={sum} entrytype={entryType} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Application</h5>
                                    </div>
                                    <div className='card-body'>
                                        <TableTest />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <PrimeTable sum={sum} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default NewApp