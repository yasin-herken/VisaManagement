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
import { useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Table from 'react-bootstrap/Table';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Barcode from 'react-barcode/lib/react-barcode';
import ComponenToPrintWrapper from '../../components/ComponenToPrintWrapper';
import { useReactToPrint } from 'react-to-print';
import ApplicationReceiptPrint from '../../components/ApplicationReceiptPrint';
import { IoHandRightOutline } from "react-icons/io5";
import { BsCash, BsToggleOff, BsFillFunnelFill } from "react-icons/bs";
import { AiOutlinePrinter, AiOutlineDelete } from "react-icons/ai";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
const resultObject = {
    "Rejected": "unqualified",
    "Accepted": "qualified",
    "Waiting": "negotiation",
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
const header = (
    <div className="table-header">
        Application
    </div>
);
const statuses = [
    'Normal', 'VIP', 'URGENT'
];
const visaStatus = [
    'In Mission', 'Documents Ok', 'Returned', 'Ministry Entry Ok', 'Istizan', 'Returned from Mission', 'Returned to Customer'
]

const result = [
    'Waiting', 'Accepted', 'Rejected'
]
const commandDropdown = [
    "Fill Interview",
    "Finger File Upload",
    "Take Payment",
    "Ticket Print",
    "Change Status",
    "Save for BlackList",
    "Apply Docs Upload",
    "Delete All Document",
    "Toggle Lock/Unlock",
]
const commandIcon = {
    "Fill Interview": <BsFillFunnelFill />,
    "Finger File Upload": <IoHandRightOutline />,
    "Take Payment": <BsCash />,
    "Ticket Print": <AiOutlinePrinter />,
    "Change Status": <CgArrowsExchangeAlt />,
    "Save for BlackList": <CgArrowsExchangeAlt />,
    "Apply Docs Upload": <FiUpload />,
    "Delete All Document": <AiOutlineDelete />,
    "Toggle Lock/Unlock": <BsToggleOff />,
}
function PrimeTable() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [currentObject, setCurrentObject] = useState({});
    const [position, setPosition] = useState('center');
    const [entryType, setEntryType] = useState(0);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    // const onClick = (name, position) => {
    //     dialogFuncMap[`${name}`](true);

    //     if (position) {
    //         setPosition(position);
    //     }
    // }
    const onHide = useCallback((name) => {
        const dialogFuncMap = {
            'displayResponsive': setDisplayResponsive,
            'displayPosition': setDisplayPosition,
        }
        dialogFuncMap[`${name}`](false);
    }, [])
    const renderFooter = useCallback((name) => {
        return (
            <>
                <Button label="Print" icon="pi pi-check" onClick={handlePrint} autoFocus />
                <div style={{ display: "none" }}><ApplicationReceiptPrint ref={componentRef} currentObject={currentObject} entryType={entryType} /> </div>
            </>
        );
    }, [currentObject, entryType, handlePrint])
    const barcodeBodyTemplate = useCallback((rowData) => {
        return <>
            <ComponenToPrintWrapper
                rowData={rowData}
            />
        </>
    }, [])
    const statusItemTemplate = useCallback((option) => {
        return <span className={`customer-badge status-${statusObject[option]} text-center fontfamily`}>{option}</span>;
    }, [])
    const statusRowFilterTemplate = useCallback((options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} className="p-column-filter" showClear />;
    }, [statusItemTemplate])
    const statusBodyTemplate = useCallback((rowData) => {
        return <span className={`customer-badge status-${statusObject[rowData.personal.status]} text-center`}>{rowData.personal.status}</span>;
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
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" mask="99/99/9999" />
    }, [])
    const commandItemTemplate = useCallback((option) => {
        return <Button label={option} icon={commandIcon[option]} onClick={() => {
            switch (option) {
                case "Fill Interview":
                    break;
                case "Finger File Upload":
                    break;
                case "Take Payment":
                    break;
                case "Ticket Print":
                    break;
                case "Change Status":
                    break;
                case "Save for BlackList":
                    break;
                case "Apply Docs Upload":
                    break;
                case "Delete All Document":
                    break;
                case "Toggle Lock/Unlock":
                    break;
                default:
            }
        }} className="p-button-sm p-individual-button" />
    }, [])
    const commandsBodyTemplate = useCallback((options, rowData) => {
        return <Dropdown options={commandDropdown} onChange={handleCommands} itemTemplate={commandItemTemplate} showClear placeholder='Action' scrollHeight='100%' className='p-invidiual-dropdown' />;
    }, [commandItemTemplate])
    const handleCommands = (event) => {
        if (event.target.value === "Show") {

        }
    }
    useEffect(() => {
        if (currentObject?.passport?.entryType === "Single") {
            setEntryType(40000);
        } else {
            setEntryType(115000);
        }
    }, [currentObject])
    useEffect(() => {
        const loadPosts = async () => {
            const response = await userRequest.get("/barcode", {
                params: {
                    country: user.country,
                    admin: user.id
                }
            });
            setPosts(response.data);
        }
        loadPosts();
    }, [user.token, user.country, user.id]);
    const calculateSum = useCallback(() => {
        const sum = <>{
            currentObject?.services?.service.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.sum;
            }, 0) + (entryType && entryType)}</>
        return sum;
    }, [currentObject?.services?.service, entryType])
    return (
        <>
            <div className='datatable-filter-demo'>
                <div className='card'>
                    <DataTable size='small' paginator value={posts} header={header} stripedRows className="p-datatable-customers" rows={8} reorderableColumns
                        responsiveLayout="stack" breakpoint="960px"
                        dataKey="id" filterDisplay="row" emptyMessage="No data found."
                        globalFilterFields={['status', 'barcodeValue', 'date', 'passportNo', 'name', 'surname', 'visaType', 'telNo', 'visaStatus', 'result', 'commands']}
                        onRowClick={(e) => {
                            setCurrentObject(e.data);
                        }}
                        resizableColumns
                    >
                        <Column field="personal.status" header="#" showFilterMenu={false} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate}
                            className="text-center"
                        />
                        <Column field="barcodeValue" showFilterMenu={false} header="File Code" body={barcodeBodyTemplate} filter />
                        <Column header="Date" showFilterMenu={false} filterField="createdAt" dataType="date" body={dateBodyTemplate}
                            filter filterElement={dateFilterTemplate}
                            field="Date"
                        />
                        <Column field="passport.passportNo" showFilterMenu={false} header="Pass.No" filter />
                        <Column field="personal.name" header="Name" showFilterMenu={false} filter />
                        <Column field="personal.surname" header="Surname" showFilterMenu={false} filter />
                        <Column field="passport.visaType" header="Visa Type" showFilterMenu={false} filter />
                        <Column field="contact.telNo" header="Gsm Tel" showFilterMenu={false} filter />
                        <Column field="passport.visaStatus" header="Visa Status" showFilterMenu={false} body={visaStatusBodyTemplate} filter filterElement={visaStatusRowFilterTemplate} />
                        <Column field="result" header="Result" showFilterMenu={false} body={resultBodyTemplate} filter filterElement={resultRowFilterTemplate} />
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
                                        MALI
                                        <br />
                                        {new Date().getDay() + "/" + (parseInt(new Date().getMonth()) + 1).toString() + "/" + new Date().getFullYear()}
                                    </td>
                                    <td className='text-end'>Qrcode</td>
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
                                            <td>CFA</td>
                                        </tr>
                                    })
                                }
                                {
                                    entryType ?
                                        <tr>
                                            <td>VISA {currentObject?.passport?.documentType}</td>
                                            <td>{entryType}</td>
                                            <td>CFA</td>
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
                                    <td>CFA Total</td>
                                    <td className='text-end'>{calculateSum()} CFA</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center">
                            {currentObject?.barcodeValue ? <Barcode value={currentObject?.barcodeValue}></Barcode> : null}
                        </div>
                    </Dialog>
                </div>
            </div>

        </>

    )
}

export default PrimeTable