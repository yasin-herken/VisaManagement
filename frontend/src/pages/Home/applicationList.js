import React, { useEffect, useState } from 'react'
import Footer from './footer';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice.js';
import Flatpickr from "react-flatpickr";
import Barcode from "react-barcode";
import cryptoRandomString from 'crypto-random-string';
import BarcodeReader from 'react-barcode-reader'
function ApplicationList() {
    const [collapse, setCollapse] = useState(false);
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [place, setPlace] = useState("");
    const [gender, setGender] = useState("");
    const [date,setDate] = useState("");
    const [text1,setText] = useState("");
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const [barcodeVisible,setBarcodeVisible] = useState();
    const user = useSelector(selectUser);
    const onGenerateFile = () => {
        let text2 = cryptoRandomString({length: 11})
        if (qrCodeVisible) {
            setText(text2)
        } else {
            setQrCodeVisible(true)
            setText(text2)
        }
        console.log(text2)
    };
    const onScanFile = (event) =>{
        
    }
    useEffect(() => {
    }, [user])
    useEffect(()=>{
        console.log(text1)
    },[text1])
    useEffect(() => {
    }, [qrCodeVisible])
    useEffect(()=>{

    },[])
    return (
        <div className="wrapper">
            <Sidebar coll={collapse} />
            <div className="main">
                <Navbar setColl={setCollapse} />
                <main className="content">
                    <div className='container-fluid p-0'>
                        <div className='row'>
                            <div className='col-12 col-lg-7'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Generator</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3 col-md-8'>
                                                <label htmlFor="inputusername" className="form-label">Name</label>
                                                <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }} />
                                            </div>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputlastname" className="form-label">Surname</label>
                                                <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {
                                                    setLastname(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-4'>
                                                <label htmlFor="inputBirthday" className="form-label">Date of Birthday</label>
                                                <Flatpickr
                                                    className='form-control'
                                                    placeholder='Select Date..'
                                                    readOnly={"readonly"}
                                                    onChange={([date]) => {
                                                        setDate(date);
                                                    }}
                                                    style={{ backgroundColor: "white" }}
                                                />

                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <label htmlFor="inputGender" className="form-label">Gender</label>
                                                <select class="form-select" data-live-search="true" onClick={
                                                    (event) => {
                                                        setGender(event.target.value)
                                                    }
                                                }>
                                                    <option data-tokens="Male">Male</option>
                                                    <option data-tokens="Female">Female</option>
                                                </select>

                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <label htmlFor="inputPlace" className="form-label">Place of Birth</label>
                                                <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {
                                                    setPlace(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='mb-3 col-md-3 pt-2'>
                                                <button className='btn btn-info' type="button" onClick={onGenerateFile}>
                                                    Generate Barcode Code
                                                </button>
                                                {qrCodeVisible?
                                                    <Barcode value={text1} />
                                                :null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg-5'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h5 className='card-title'>Scanner</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3 col-md-6'>
                                            <label htmlFor="inputusername" className="form-label">Name</label>
                                                <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={onScanFile} />
                                            </div>
                                        </div>
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

export default ApplicationList