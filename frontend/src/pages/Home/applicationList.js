import React, { useEffect, useState, useRef  } from 'react'
import Footer from './footer';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Flatpickr from "react-flatpickr";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import cryptoRandomString from 'crypto-random-string';
import Barcode from "react-barcode";
import { useForm, Controller } from "react-hook-form";
import "flatpickr/dist/themes/material_green.css";
import { userRequest } from "../../requests/requestMethod.js";
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice';
import Table from './table';

function ApplicationList() {
    const [identification, setIdentification] = useState("");
    const [collapse, setCollapse] = useState(false);
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [place, setPlace] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [text1, setText] = useState("");
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const [barcodeVisible, setBarcodeVisible] = useState(false);
    const [errIdentification, setErrIdentification] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [data, setData] = useState("");
    const qrRef = useRef(null);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const [filterText, setFilterText] = useState('');


    const user = useSelector(selectUser);
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: "",
            lastname: "",
            dateofBirthday: "",
            validUpTo: "",
            gender: "",
            place: ""
        }
    });
    const onGenerateFile = async () => {
        const text2 = cryptoRandomString({ length: 11 });
        const img = <Barcode value={text2}></Barcode>;
        setImage(img);
        try {
            const res = await userRequest(user.token.split(" ")[1]).post("/barcode", {
                identification: identification,
                username: username,
                lastname: lastname,
                dateOfBirthday: date,
                status: "pending",
                placeOfBirthday: place,
                gender: gender,
                barcodeValue: text2,
            });
            if (res?.data.success) {
                //reset();
                const answer = !qrCodeVisible ? setQrCodeVisible(true) : null;
                setErrIdentification(false);
            } else if (res?.data.error.code === 11000) {
                setErrIdentification(true);
            }
        } catch (err) {
            console.log(err);
        }
        // reset();



    };

    const onScanFile = () => {
        qrRef.current?.openImageDialog();
        setBarcodeVisible(true)
    }
    const onSearchFile = (event) => {
       console.log(event.target.value)
    }
    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await userRequest(user.token.split(" ")[1]).get("/barcode");
            setPosts(response.data);
            setLoading(false);
        }
        loadPosts();
    }, [user.token,posts,filterText])
    useEffect(() => {
    }, [text1])
    useEffect(() => {
    }, [qrCodeVisible])
    useEffect(() => {
    }, [])
    useEffect(() => {
        setBarcodeVisible(false)
    }, [data])
    useEffect(() => {
        console.log(errors)
    }, [errors])
    return (
        <div className="wrapper">
            <Sidebar coll={collapse} />
            <div className="main">
                <Navbar setColl={setCollapse} />
                <main className="content">
                    <div className='container-fluid p-0'>
                        <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Add New </h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputIdentification" className="form-label">Identification</label>
                                                <input
                                                    id="inputIdentification"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("identification", {
                                                        required: "This is required.", minLength: {
                                                            value: 11,
                                                            message: "Min Length is 11."
                                                        },
                                                        maxLength: {
                                                            value: 11,
                                                            message: "Max Length is 11."
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        e.preventDefault()
                                                        setIdentification(e.target.value);
                                                    }}
                                                />
                                                {errors?.identification ? <p>{errors.identification.message}</p> : null}
                                                {errIdentification ? <p>Identification is already exists</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputusername" className="form-label">Name</label>
                                                <input
                                                    id="inputAddress"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("username", {
                                                        required: "This is required.", minLength: {
                                                            value: 4,
                                                            message: "Min Length is 4."
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        e.preventDefault()
                                                        setUsername(e.target.value);
                                                    }}
                                                />
                                                {errors?.username ? <p>{errors.username.message}</p> : null}
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputlastname" className="form-label">Surname</label>
                                                <input
                                                    id="inputAddress"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("lastname", {
                                                        required: "This is required.", minLength: {
                                                            value: 3,
                                                            message: "Min Length is 3"
                                                        }
                                                    })
                                                    }
                                                    onChange={(e) => {
                                                        setLastname(e.target.value);
                                                    }}
                                                />
                                                {errors?.lastname ? <p>{errors.lastname.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputBirthday" className="form-label">Date of Birthday</label>
                                                <Controller
                                                    value={date}

                                                    name="validUpTo"
                                                    control={control}
                                                    rules={{ required: { value: false, message: "Date is required" } }}
                                                    render={({ field }) => (
                                                        <Flatpickr
                                                            {...field}
                                                            name="validUpTo"
                                                            className="form-control"
                                                            placeholder="Select Date.."
                                                            style={{ backgroundColor: "white" }}
                                                            onChange={([date]) => {
                                                                setDate(date);
                                                            }}
                                                        />
                                                    )
                                                    }
                                                />
                                                {errors?.validUpTo ? <p>{errors.validUpTo.message}</p> : null}

                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <label htmlFor="inputGender" className="form-label">Gender</label>
                                                <select
                                                    className="form-select form-select-color-blue"
                                                    data-live-search="true"

                                                    {...register("gender", { required: { value: true, message: "Gender is required" } })}
                                                    defaultValue={"default"}
                                                    onClick={
                                                        (event) => {
                                                            setGender(event.target.value)
                                                        }
                                                    }
                                                >
                                                    <option value="default" disabled hidden >Choose here</option>
                                                    <option data-tokens="Male">Male</option>
                                                    <option data-tokens="Female">Female</option>
                                                </select>
                                                {errors?.gender ? <p>{errors.gender.message}</p> : null}
                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <label htmlFor="inputPlace" className="form-label">Place of Birth</label>
                                                <input
                                                    id="inputAddress"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    {...register("place", { required: { value: true, message: "Place is required" } })}
                                                    onChange={(e) => {
                                                        setPlace(e.target.value);
                                                    }}
                                                />
                                                {errors?.place ? <p>{errors.place.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-3 pt-2'>
                                                <button className='btn btn-info' type="button" onClick={handleSubmit(onGenerateFile)}>
                                                    Generate Barcode Code
                                                </button>
                                                {qrCodeVisible ?
                                                    <><img src={image} alt=""></img></>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Scanner</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3 col-md-6 '>

                                                <label htmlFor="inputbarcode" className="form-label ">Enter Passport Number</label>
                                                <div className='input-group mb-3'>
                                                    <input id="inputAddress" type="text" className="form-control" value={data} placeholder="" onChange={(e) => { setData(e.target.value); setShowFilter(true) }} />
                                                    <button className='btn btn-info' onClick={onScanFile}>Scan</button>
                                                </div>
                                                <button className='btn btn-info pt-2' onClick={onSearchFile}>Search</button>
                                            </div>
                                            <div className='mb-3 col-md-6'>
                                                {barcodeVisible ?
                                                    <>
                                                        {barcodeVisible ? <button ref={(el) => { el && el.style.setProperty("display", "flex", "important"); el && el.style.setProperty("text-align", "right", "important") }} className='btn btn-info pt-2' style={{ marginRight: "auto" }} onClick={() => setBarcodeVisible(false)}>Close</button> : null}
                                                        <BarcodeScannerComponent
                                                            delay={300}
                                                            onUpdate={(err, result) => {
                                                                if (result) {
                                                                    setData(result.text)
                                                                }
                                                                else { setData("") }
                                                            }}
                                                        />
                                                    </> : null}

                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-6'>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Table />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default ApplicationList