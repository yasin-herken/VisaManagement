import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select'
import Datatable from '../../components/Table/Datatable';
import { userRequest } from '../../requests/requestMethod';
import { visaStatus, passportStatus } from '../../Type/status';
import { selectUser } from '../Features/userSlice';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import { Chips } from 'primereact/chips';
import "./css/table.css";
const ChangeStatus = () => {
    const [visa, setVisa] = useState([]);
    const [errorPassport, setErrorPassport] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [errorPnr, setErrorPnr] = useState("");
    const [passport, setPassport] = useState([]);
    const [chips, setChips] = useState([]);
    const [chipsPnr, setChipsPnr] = useState([]);
    const [selectedPassportStatus, setSelectedPassportStatus] = useState("");
    const [selectedVisaStatus, setSelectedVisaStatus] = useState("");
    const user = useSelector(selectUser);
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
    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const res = await userRequest(user.token).put("/barcode", {
                items: filteredItems,
                selectedpassportStatus: selectedPassportStatus,
                selectedVisaStatus: selectedVisaStatus,
            });
            if (res.data.success) {
                const items = filteredItems.map((item) => {
                    if (selectedPassportStatus === "" && selectedPassportStatus === "") {
                        return item;
                    } else if (selectedPassportStatus === "") {
                        return { ...item, visaResult: selectedVisaStatus }
                    } else if (selectedVisaStatus === "") {
                        return { ...item, result: selectedPassportStatus }
                    } else {
                        return { ...item, visaStatus: selectedVisaStatus, result: selectedPassportStatus }
                    }
                })
                setFilteredItems(items);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handlePassportSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await userRequest(user.token).get("/barcode", {
                params: {
                    country: user.country,
                    passportNo: chips,
                    admin: user.id
                }
            });
            const filterItems = filteredItems.some((item) =>
                res?.data.some((data) => item.passport.passportNo === data.passport.passportNo)
            )
            if (filterItems) {

            } else {
                setFilteredItems(prevState => [...prevState, ...res.data])
            }
        } catch (err) {
            setErrorPassport(err);
        }
    }
    const handlePnrSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await userRequest(user.token).get("/barcode", {
                params: {
                    country: user.country,
                    pnrNo: chipsPnr,
                    admin: user.id
                }
            })
    
            const filterItems = filteredItems.some((item) =>
                res?.data.some((data) => item.personal.pnr === data.personal.pnr)
            )
            if (filterItems) {

            } else {
                setFilteredItems(prevState => [...prevState, ...res.data])
            }
        } catch (err) {
            setErrorPnr(err);
        }
    }
    const columns = useMemo(() => [
        {
            label: "#Id", accessor: "_id", sortable: true,
        },
        {
            label: "Barcode Value", accessor: "barcodeValue", sortable: true
        },
        {
            label: "Passport No", accessor: "passport.passportNo", sortable: true
        },
        {
            label: "Pnr No", accessor: "personal.pnr", sortable: true
        },
        {
            label: "Result", accessor: "result", sortable: true
        },
        {
            label: "Visa Status", accessor: "visaStatus", sortable: true
        },
        {
            label: "ACTION", render: (row, data) => {
                return (
                    <div className="d-flex justify-content-roundly text-center gap-3">
                        <button style={{ border: "none", background: "none" }} onClick={
                            (e) => console.log("e")
                        }>
                            <TbEdit />
                        </button>
                        <button style={{ border: "none", background: "none" }} onClick={
                            (e) => setFilteredItems(filteredItems.filter((item) =>
                                item._id !== data._id
                            ))
                        }>
                            <MdDeleteOutline />
                        </button>
                    </div>
                )
            }
        },
    ], [filteredItems])
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
                                        options={visa}
                                        placeholder={visa[0]?.label ? visa[0].label : "Select .."}
                                        onChange={(e) => setSelectedPassportStatus(e.value)}
                                    />
                                </div>
                                <div className="mb-6 col-md-6">
                                    <label htmlFor="inputVisa" className="form-label">Select Visa Result Status</label>
                                    <Select
                                        options={passport}
                                        placeholder={"Select Status"}
                                        onChange={(e) => setSelectedVisaStatus(e.value)}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className='mt-6 row'>
                                <div className='mb-6 col-md-6'>
                                    <label htmlFor="inputPassport" className="form-label"><b>ENTER PASSPORT NO</b></label>
                                    <Chips
                                        id="inputAddress"
                                        style={{ display: "block" }}
                                        placeholder=""
                                        value={chips}
                                        separator=","
                                        onChange={(e) => {
                                            setChips(e.value)
                                        }}
                                    />
                                </div>
                                <div className='mb-6 col-md-6'>
                                    <label htmlFor="inputPassport" className="form-label"><b>ENTER PNR NO</b></label>
                                    <Chips
                                        id="inputPnr"
                                        style={{ display: "block" }}
                                        placeholder=""
                                        value={chipsPnr}
                                        separator=","
                                        onChange={(e) => {
                                            setChipsPnr(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-6'>
                                    <button className='btn w-100' style={{ backgroundColor: "#0790E8" }} onClick={handlePassportSubmit}>Add Barcode</button>
                                    {
                                        errorPassport ? <p>errorpassport</p> : null
                                    }
                                </div>
                                <div className='mb-3 col-md-6'>
                                    <button className='btn w-100' style={{ backgroundColor: "#0790E8" }} onClick={handlePnrSubmit}>Add PNR</button>
                                    {
                                        errorPnr ? <p>errorpnr</p> : null
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md-12'>
                                    <button className='btn w-100' style={{ backgroundColor: "#0E61D1", color: "white" }} onClick={
                                        handleSave
                                    }>Save and Change All</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-datatable table-responsive'>
                    <div id='DataTables_Table_0_wrapper' className='dataTables_wrapper dt-bootstrap5'>
                        <div className='card-header  flex-md-row'>
                            <div className='head-label text-center'>
                                <h5 className='card-title mb-0'>List</h5>
                            </div>

                        </div>
                    </div>
                    {
                        <Datatable
                            data={filteredItems}
                            columns={columns}
                            rowsPerPage={5}
                            style={{ width: "100%", maxWidth: "100%", tableLayout: "fixed" }}
                            className="datatables-basic table border-top dataTable no-footer dtr-column"
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default ChangeStatus