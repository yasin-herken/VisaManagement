import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { visaStatus, passportStatus } from '../../Type/status';
const ChangeStatus = () => {
    const [visa, setVisa] = useState([])
    const [passport, setPassport] = useState([])
    useEffect(() => {
        const arrVisa = Object.keys(visaStatus).map(status => {
            return { value: status, label: status }
        })
        setVisa(arrVisa);
        const arrPass = Object.keys(passportStatus).map(status => {
            return { value: status, label: status }
        })
        setPassport(arrPass);
    }, [])
    return (
        <div className="container-fluid p-0" style={{ fontFamily: "Open Sans" }}>
            <div className='row'>
                <div className="col-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Barcode Scan-Change Status</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-6 col-md-6">
                                    <label htmlFor="inputPassport" className="form-label">Select Passport Status</label>
                                    <Select
                                        options={passport}
                                        placeholder={passport[0]?.label ? passport[0].label : "Select .."}
                                    />
                                </div>
                                <div className="mb-6 col-md-6">
                                    <label htmlFor="inputVisa" className="form-label">Select Visa Result Status</label>
                                    <Select
                                        options={passport}
                                        placeholder={"Select Status"}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className='mt-6 row'>
                                <div className='mb-6 col-md-6'>
                                    <label htmlFor="inputPassport" className="form-label"><b>ENTER PASSPORT NO</b></label>
                                    <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {

                                    }} />
                                </div>
                                <div className='mb-6 col-md-6'>
                                    <label htmlFor="inputPassport" className="form-label"><b>ENTER PNR NO</b></label>
                                    <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={(e) => {

                                    }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-6'>
                                    <button className='btn w-100' style={{ backgroundColor: "#0790E8" }} >Add Barcode</button>
                                </div>
                                <div className='mb-3 col-md-6'>
                                    <button className='btn w-100' style={{ backgroundColor: "#0790E8" }}>Add PNR</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-12'>
                                    <button className='btn w-100' style={{ backgroundColor:"#0E61D1" }}>Save and Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeStatus