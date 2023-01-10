import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "./css/DataTableDemo.css";
import "../../index.css";
import "./css/tables.css";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { userRequest } from '../../requests/requestMethod.js';
import { selectUser } from '../Features/userSlice.js';
import { selectPrice } from "../Features/singleMultiple.js";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Table from 'react-bootstrap/Table';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Barcode from 'react-barcode/lib/react-barcode';
import ComponenToPrintWrapper from '../../components/ComponenToPrintWrapper';
import { useReactToPrint } from 'react-to-print';
import ApplicationReceiptPrint from '../../components/ApplicationReceiptPrint';
import { BsFillFunnelFill } from "react-icons/bs";
import { AiOutlinePrinter, AiOutlineDelete, AiFillEye } from "react-icons/ai";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { addPosts, selectPost } from '../Features/postSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Toast } from 'primereact/toast';
import * as moment from "moment";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { visaStatus as statusOfVisa, passportStatus } from '../../Type/status';
import CurrencyForCountry, { NameofCountry } from '../../Variables/currency';
const resultObject = {
    "Rejected": "unqualified",
    "Accepted": "qualified",
    "Waiting": "negotiation",
    "Canceled Customer": "proposal"
}
const visaObject = {
    "In Mission": "negotiation",
    "Documents Ok": "qualified",
    "Returned": "new",
    "Ministry Entry Ok": "renewal",
    "Istizan": "proposal",
    "Returned from Mission": "unqualified",
    "Returned to Customer": "renewal",
}
const statusObject = {
    "Normal": "qualified",
    "VIP": "negotiation",
    "URGENT": "unqualified",
}

const statuses = [
    'Normal', 'VIP', 'URGENT'
];
const visaStatus = [
    'In Mission', 'Documents Ok', 'Returned', 'Ministry Entry Ok', 'Istizan', 'Returned from Mission', 'Returned to Customer'
]

const result = [
    'Waiting', 'Accepted', 'Rejected', 'Canceled Customer'
]
const commandDropdown = [
    "Edit Application",
    "Ticket Print",
    "Change Status",
    "Delete Application",
]
const commandDropdownFalse = [
    "View Application",
    "Ticket Print",
    "Change Status"
]
const commandIconFalse = {
    "View Application": <AiFillEye />,
    "Ticket Print": <AiOutlinePrinter />,
    "Change Status": <CgArrowsExchangeAlt />,
}
const commandIcon = {
    "Edit Application": <BsFillFunnelFill />,
    "Ticket Print": <AiOutlinePrinter />,
    "Change Status": <CgArrowsExchangeAlt />,
    "Delete Application": <AiOutlineDelete />,
}
function PrimeTable() {
    const user = useSelector(selectUser);
    const price = useSelector(selectPrice);
    const [visa, setVisa] = useState([]);
    const [passport, setPassport] = useState([]);
    const [date, setDate] = useState(moment(new Date().toISOString()).format('DD/MM/YYYY'))
    const [posts, setPosts] = useState([]);
    const [currentObject, setCurrentObject] = useState({});
    const [entryType, setEntryType] = useState(0);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const componentRef = useRef();
    const [errDeleteAll, setErrDeleteAll] = useState(false);
    const deleteToast = useRef(null);
    const [position, setPosition] = useState('center');
    const [selectedPassportStatus, setSelectedPassportStatus] = useState("");
    const [selectedVisaStatus, setSelectedVisaStatus] = useState("");
    const data = useSelector(selectPost);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            let data = [];
            posts.map((item) => {
                let temp = {
                    barcodeValue: item.barcodeValue,
                    country: item.country,
                    result: item.result,
                    visaStatus: item.visaStatus,
                    passportNo: item.passport.passportNo,
                    pnr: item.personal.pnr,
                    _id: item._id
                }
                data.push(temp);
                return item
            })
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'products');
        });
    }
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }
    const header = (
        <div className='d-flex flex-row justify-content-between'>
            <div className="table-header">
                Application
            </div>
            <button className='btn btn-primary' onClick={exportExcel} data-pr-tooltip="CSV">Export CSV </button>
        </div>
    );
    const onClick = useCallback((name, position) => {
        const dialogFuncMap = {
            'displayResponsive': setDisplayResponsive,
            'displayBasic': setDisplayBasic,
        }
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }, [])
    const onHide = useCallback((name) => {
        const dialogFuncMap = {
            'displayResponsive': setDisplayResponsive,
            'displayBasic': setDisplayBasic,
        }
        dialogFuncMap[`${name}`](false);
    }, [])


    const renderFooter = useCallback((name) => {
        return (
            <>
                <Button label="Print" icon="pi pi-check" onClick={handlePrint} autoFocus />
                <div style={{ display: "none" }}><ApplicationReceiptPrint ref={componentRef} currentObject={currentObject} entryType={entryType} country={user?.country} /> </div>
            </>
        );
    }, [currentObject, entryType, handlePrint, user.country])
    const renderExit = useCallback(() => {
        const handleChangeStatus = async (event) => {
            event.preventDefault();
            try {
                const res = await userRequest(user.token).put("/barcode", {
                    items: [currentObject],
                    selectedpassportStatus: selectedPassportStatus,
                    selectedVisaStatus: selectedVisaStatus,
                })
                if (res.data.success) {
                    toast("Succesfully changed");
                    const items = posts?.map((item) => {
                        if (item._id === currentObject._id) {
                            if (selectedPassportStatus === "" && selectedPassportStatus === "") {
                                return item;
                            } else if (selectedPassportStatus === "") {
                                return { ...item, visaResult: selectedVisaStatus }
                            } else if (selectedVisaStatus === "") {
                                return { ...item, result: selectedPassportStatus }
                            } else {
                                return { ...item, visaStatus: selectedVisaStatus, result: selectedPassportStatus }
                            }
                        }
                        return item;
                    })
                    setPosts(items);
                } else {
                    toast("Data did not update")
                }
            } catch (err) {
                toast("Something went wrong")
            }
        }
        return (
            <Button label="Change Status" icon="pi pi-check" onClick={handleChangeStatus} />
        )
    }, [currentObject, selectedPassportStatus, selectedVisaStatus, user.token, posts])
    const barcodeBodyTemplate = useCallback((rowData) => {
        return <>
            <ComponenToPrintWrapper
                rowData={rowData}
            />
        </>
    }, [])
    const statusItemTemplate = useCallback((option) => {
        return <span className={`customer-badge status-${statusObject[option]} fontfamily`}>{option}</span>;
    }, [])
    const statusRowFilterTemplate = useCallback((options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} className="p-column-filter" showClear showFilterClear />;
    }, [statusItemTemplate])
    const statusBodyTemplate = useCallback((rowData) => {
        return <span className={`customer-badge status-${statusObject[rowData.personal.status]}`}>{rowData.personal.status}</span>;
    }, [])
    const visaStatusItemTemplate = useCallback((option) => {
        return <span className={`customer-badge status-${visaObject[option]}`}>{option}</span>;
    }, [])
    const visaStatusRowFilterTemplate = useCallback((options) => {
        return <Dropdown value={options.value} options={visaStatus} onChange={(e) => options.filterApplyCallback(e.value)} style={{ width: "125px" }} itemTemplate={visaStatusItemTemplate} className="p-column-filter" showClear />;
    }, [visaStatusItemTemplate])
    const visaStatusBodyTemplate = useCallback((rowData) => {
        return <span className={`customer-badge status-${visaObject[rowData.visaStatus]}`}>{rowData.visaStatus}</span>;
    }, [])
    const resultItemTemplate = useCallback((option) => {
        return <span className={`customer-badge status-${resultObject[option]}`}>{option}</span>;
    }, [])
    const resultRowFilterTemplate = useCallback((options) => {
        return <Dropdown value={options.value} options={result} style={{ width: "80px" }} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={resultItemTemplate} className="p-column-filter" showClear />;
    }, [resultItemTemplate])
    const resultBodyTemplate = useCallback((rowData) => {
        return <span className={`customer-badge status-${resultObject[rowData.result]}`}>{rowData.result}</span>;
    }, [])
    const formatDate = useCallback((value) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }, [])
    const dateBodyTemplate = useCallback((rowData) => {
        return formatDate(rowData.createdAt);
    }, [formatDate])

    const dateFilterTemplate = useCallback((options) => {
        const handleDate = (date1) => {
            let items = data.filter((item) => {
                return moment(new Date(item.createdAt).toISOString()).format('DD/MM/YYYY') === moment(new Date(date1).toISOString()).format('DD/MM/YYYY')
            })
            setPosts(items);
            setDate(date1);
        }
        return <Calendar id="basic" value={date} onChange={(e) => handleDate(e.value)} dateFormat="mm/dd/yy" placeholder={date} />
    }, [date, data]);

    const commandItemTemplate = useCallback((option) => {
        return <Button label={option} icon={user?.admin ? commandIcon[option] : commandIconFalse[option]} onClick={() => {
            switch (option) {
                case "View Application":
                    navigate(`/applicationList/${currentObject._id}`)
                    break;
                case "Edit Application":
                    navigate(`/applicationList/${currentObject._id}`)
                    break;
                case "Ticket Print":
                    onClick('displayResponsive');
                    break;
                case "Change Status":
                    onClick('displayBasic');
                    break;
                case "Delete Application":
                    const confirmPosition = () => {
                        const accept = () => {
                            if (user?.admin === true && (user?.role === "Admin" || user?.role === "All")) {
                                const deleteData = async () => {
                                    try {
                                        const res = await userRequest(user.token).delete("/barcode", {
                                            data: {
                                                id: currentObject._id,
                                                admin: user.admin
                                            }
                                        })
                                        if (res.data.success) {
                                            setPosts(posts.filter((item) => item._id !== currentObject._id));
                                            dispatch(addPosts(posts.filter((item) => item._id !== currentObject._id)));
                                        } else {
                                            if (res.data?.success === false) {
                                                toast(res.data?.message);
                                            }
                                        }
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                                deleteData();
                            }
                            else {
                                toast("You are not allowed to delete application")
                                setErrDeleteAll(true);
                            }
                            deleteToast.current.show(
                                {
                                    severity: 'info',
                                    summary: 'Confirmed',
                                    detail: 'You have accepted',
                                    life: 3000
                                }
                            )
                        }
                        const reject = () => {
                            deleteToast.current.show(
                                {
                                    severity: 'warn',
                                    summary: 'Rejected',
                                    detail: 'You have rejected',
                                    life: 3000
                                });
                        }
                        confirmDialog({
                            message: "Do you want to delete this record?",
                            header: "Delete Confirmation",
                            icon: "pi pi-info-circle",
                            acceptClassName: 'p-button-danger',
                            accept,
                            reject,
                        })
                    }
                    confirmPosition();

                    break;
                default:
            }
        }} className="p-button-sm p-individual-button" />
    }, [user?.admin, currentObject, onClick, navigate, dispatch, user?.token, posts, user?.role])
    const commandsBodyTemplate = useCallback((options, rowData) => {
        return <Dropdown options={user?.admin ? commandDropdown : commandDropdownFalse} itemTemplate={commandItemTemplate} placeholder='Action' scrollHeight='100%' className='p-invidiual-dropdown' />;
    }, [commandItemTemplate, user?.admin])
    useEffect(() => {
        if (currentObject?.passport?.entryType === "Single") {
            setEntryType(price ? +price.single : null);
        } else {
            setEntryType(price ? +price.multiple : null);
        }
    }, [currentObject, price])
    useEffect(() => {
        const loadPosts = async () => {
            const response = await userRequest(user.token).get("/barcode", {
                params: {
                    country: user.country,
                    admin: user.id
                }
            });
            dispatch(addPosts(response.data));
            setPosts(response.data.filter((item) => {
                return moment(new Date(item.createdAt).toISOString()).format('DD/MM/YYYY') === moment(new Date().toISOString()).format('DD/MM/YYYY')
            }));
        }
        loadPosts();
    }, [user.token, user.country, user.id, dispatch]);

    const calculateSum = useCallback(() => {
        const sum = <>{
            currentObject?.services?.service.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.sum;
            }, 0) + (entryType && entryType)}</>
        return sum;
    }, [currentObject?.services?.service, entryType])
    useEffect(() => {
        const arrVisa = Object.keys(statusOfVisa).map(status => {
            return { value: status, label: status }
        })
        setVisa(arrVisa);
        const arrPass = Object.keys(passportStatus).map(status => {
            return { value: status, label: status }
        })
        setPassport(arrPass);
    }, [])
    return (
        <>
            <div className='datatable-filter-demo'>
                <div className='card'>
                    <Toast ref={deleteToast} />
                    <DataTable
                        size='small'
                        paginator
                        value={posts}
                        header={header}
                        stripedRows
                        className="p-datatable-customers"
                        rows={8}
                        responsiveLayout="scroll"
                        dataKey="id"
                        filterDisplay="row"
                        emptyMessage="No data found."
                        // globalFilterFields={['status', 'barcodeValue', 'date', 'passportNo', 'name', 'surname', 'visaType', 'telNo', 'visaStatus', 'result', 'commands']}
                        onRowClick={(e) => {
                            setCurrentObject(e.data);
                        }}
                        resizableColumns
                        style={{ fontSize: "60%" }}
                    >
                        <Column field="personal.status" header="#" showFilterMenu={false} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate}
                        />
                        <Column field="barcodeValue" showFilterMenu={false} header="Barcode (Pnr)" body={barcodeBodyTemplate} filter sortable />
                        <Column header="Date" showFilterMenu={false} filterField="createdAt" dataType="date" body={dateBodyTemplate} sortable
                            filter filterElement={dateFilterTemplate}
                            field="Date"
                        />
                        <Column field="passport.passportNo" showFilterMenu={false} header="Pass.No" filter sortable />
                        <Column field="personal.name" header="Name" showFilterMenu={false} filter sortable />
                        <Column field="personal.surname" header="Surname" showFilterMenu={false} filter sortable />
                        <Column field="passport.visaType" header="Visa Type" showFilterMenu={false} filter sortable />
                        <Column field="contact.telNo" header="Gsm Tel" showFilterMenu={false} filter sortable />
                        <Column field="passport.visaStatus" header="Visa Status" showFilterMenu={false} body={visaStatusBodyTemplate} filter filterElement={visaStatusRowFilterTemplate} sortable />
                        <Column field="result" header="Result" showFilterMenu={false} body={resultBodyTemplate} filter filterElement={resultRowFilterTemplate} sortable />
                        <Column field="commands" header="Commands" body={commandsBodyTemplate} />
                    </DataTable>
                    <Dialog header="Application Receipt" visible={displayResponsive} position={position} modal style={{ width: '450px' }} footer={renderFooter('displayResponsive')}
                        onHide={() => { onHide('displayResponsive'); }}

                        draggable={false}
                        resizable={false}
                    >
                        <Table>
                            <thead>
                                <tr></tr>
                                <tr className='text-end'></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {currentObject?.country ? NameofCountry[currentObject.country] : null}
                                        <br />
                                        {new Date().getDay() + "/" + (parseInt(new Date().getMonth()) + 1).toString() + "/" + new Date().getFullYear()}
                                    </td>
                                    <td className='text-end'></td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td className='text-end'>{currentObject.personal?.name}</td>
                                </tr>
                                <tr>
                                    <td>Reference No</td>
                                    <td className='text-end'>{currentObject.barcodeValue}</td>
                                </tr>
                                <tr>
                                    <td>Passport No</td>
                                    <td className='text-end'>{currentObject.passport?.passportNo}</td>
                                </tr>
                                <tr>
                                    <td>Travel Type</td>
                                    <td className='text-end'>{currentObject.passport?.travelType} </td>
                                </tr>
                                <tr>
                                    <td>Visa Type</td>
                                    <td className='text-end'>{currentObject.passport?.visaType} </td>
                                </tr>
                                <tr>
                                    <td>Document Type</td>
                                    <td className='text-end'>{currentObject.passport?.documentType} </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentObject?.services?.service.map((service, index) => {
                                        return <tr key={index}>
                                            <td>{service.service}</td>
                                            <td>{service.sum}</td>
                                            <td>{CurrencyForCountry[currentObject.country]}</td>
                                        </tr>
                                    })
                                }
                                {
                                    entryType ?
                                        <tr>
                                            <td>VISA {currentObject?.passport?.documentType}</td>
                                            <td>{entryType}</td>
                                            <td>{CurrencyForCountry[currentObject.country]}</td>
                                        </tr> : null
                                }
                            </tbody>
                        </Table>
                        <br />
                        <hr />
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='text-end'></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{CurrencyForCountry[currentObject.country]} Total</td>
                                    <td className='text-end'>{calculateSum()} {CurrencyForCountry[currentObject.country]}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center">
                            {currentObject?.barcodeValue ? <Barcode value={currentObject?.barcodeValue}></Barcode> : null}
                        </div>
                    </Dialog>
                    <Dialog header="Change Status" visible={displayBasic} footer={renderExit} onHide={() => onHide('displayBasic')} style={{ width: "50vw", height: "30vw" }}>
                        <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <div className='row'>
                                    <div className='mb-6 col-md-6'>
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
                            </div>
                        </div>
                    </Dialog>
                    <div className='col-5 col-lg-5'>
                        {
                            errDeleteAll ?
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
                    <ConfirmDialog />
                </div>
            </div>

        </>

    )
}

export default PrimeTable