

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "./css/DataTableDemo.css";
import "../../index.css";
import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { userRequest } from '../../requests/requestMethod.js';
import { selectUser } from '../Features/userSlice.js';
import { useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Overlay from "react-overlay-component";
function PrimeTable() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setOverlay] = useState(false);
    const closeOverlay = () => setOverlay(false);
    const [currentObject, setCurrentObject] = useState({});
    const [filters, setFilters] = useState({
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'barcodeValue': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'createdAt': { value: null, matchMode: FilterMatchMode.DATE_IS },
        'passportNo': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'result': { value: null, matchMode: FilterMatchMode.EQUALS },
        'telNo': { value: null, matchMode: FilterMatchMode.CONTAINS },

    });
    const configs = {
        animate: true,
        // clickDismiss: false,
        // escapeDismiss: false,
        // focusOutline: false,
    };
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
        "Vip": "negotiation",
        "Urgent": "unqualified",
    }
    const header = (
        <div className="table-header">
            Application
        </div>
    );
    const statuses = [
        'Normal', 'Vip', 'Urgent'
    ];
    const visaStatus = [
        'In Mission', 'Documents Ok', 'Returned', 'Ministry Entry Ok', 'Istizan', 'Returned from Mission', 'Returned to Customer'
    ]

    const result = [
        'Waiting', 'Accepted', 'Rejected'
    ]
    const commandDropdown = [
        'Show', "Don't show"
    ]
    const barcodeBodyTemplate = (rowData) => {
        return <Link to={rowData.barcodeValue}><span className={`customer-badge status-${rowData.barcodeValue}`}>{rowData.barcodeValue}</span></Link>
    }
    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${statusObject[option]}`}>{option}</span>;
    }
    const statusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${statusObject[rowData.status]}`}>{rowData.status}</span>;
    }
    const visaStatusItemTemplate = (option) => {
        return <span className={`customer-badge status-${visaObject[option]}`}>{option}</span>;
    }
    const visaStatusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={visaStatus} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={visaStatusItemTemplate} placeholder="Select a Visa Status" className="p-column-filter" showClear />;
    }
    const visaStatusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${visaObject[rowData.visaStatus]}`}>{rowData.visaStatus}</span>;
    }
    const resultItemTemplate = (option) => {
        return <span className={`customer-badge status-${resultObject[option]}`}>{option}</span>;
    }
    const resultRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={result} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={resultItemTemplate} placeholder="Select a result" className="p-column-filter" showClear />;
    }
    const resultBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${resultObject[rowData.result]}`}>{rowData.result}</span>;
    }
    const formatDate = (value) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.createdAt);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }
    const commandsBodyTemplate = (options, rowData) => {
        return <Dropdown options={commandDropdown} placeholder="Action" onChange={handleCommands} className="p-column-filter" showClear />;
    }
    const handleCommands = (event) => {
        if (event.target.value === "Show") {
            setOverlay(true);
        }
    }
    useEffect(() => {
        const loadPosts = async () => {
            const response = await userRequest(user.token.split(" ")[1]).get("/barcode");
            setPosts(response.data);
        }
        loadPosts();
    }, [user.token]);
    return (
        <>
            <div className='datatable-filter-demo'>
                <div className='card'>
                    <DataTable paginator value={posts} header={header} filters={filters} stripedRows className="p-datatable-customers" rows={11}
                        dataKey="id" filterDisplay="row" responsiveLayout="scroll" emptyMessage="No data found."
                        globalFilterFields={['status', 'barcodeValue', 'date', 'passportNo', 'name', 'surname', 'visaType', 'telNo', 'visaStatus', 'result', 'commands']}
                        onRowClick={(e) => { setCurrentObject(e.data); console.log(e.data) }}
                    >
                        <Column field="status" header="#" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
                            style={{ minWidth: '4rem', width: "4rem" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate}
                        />
                        <Column field="barcodeValue" header="File Code" body={barcodeBodyTemplate} filter filterPlaceholder="Search by barcode" style={{ minWidth: '2rem', width: "16rem" }} />
                        <Column header="Date" filterField="createdAt" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate}
                            filter filterElement={dateFilterTemplate} />
                        <Column field="passportNo" header="Pass.No" filter filterPlaceholder='Search by Pass.No' style={{ minWidth: '8rem', width: "16rem" }} />
                        <Column field="name" header="Name" filter filterPlaceholder='Search by Name' style={{ minWidth: '8rem', width: "16rem" }} />
                        <Column field="surname" header="Surname" filter filterPlaceholder='Search by SurName' style={{ minWidth: '8rem', width: "16rem" }} />
                        <Column field="visaType" header="Visa Type" filter filterPlaceholder='Search by Types' style={{ minWidth: '8rem', width: "16rem" }} />
                        <Column field="telNo" header="Gsm Tel" filter filterPlaceholder='Search by Tel' style={{ minWidth: '8rem', width: "16rem" }} />
                        <Column field="visaStatus" header="Visa Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
                            style={{ minWidth: '4rem', width: "4rem" }} body={visaStatusBodyTemplate} filter filterElement={visaStatusRowFilterTemplate} />
                        <Column field="result" header="Result" showFilterMenu={false} filterMenuStyle={{ width: '7rem' }}
                            style={{ minWidth: '4rem', width: "4rem" }} body={resultBodyTemplate} filter filterElement={resultRowFilterTemplate} />
                        <Column field="commands" header="Commands" body={commandsBodyTemplate} />
                    </DataTable>
                    <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay} >
                        
                        <button
                            className="danger"
                            onClick={() => {
                                setOverlay(false);
                            }}
                        >
                            close modal
                        </button>
                    </Overlay>
                </div>
            </div>

        </>

    )
}

export default PrimeTable