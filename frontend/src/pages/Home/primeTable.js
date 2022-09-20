

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "./css/DataTableDemo.css";
import "../../index.css";
import "./css/tables.css";
import React, { useState, useEffect } from 'react';
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
function PrimeTable({ sum }) {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [currentObject, setCurrentObject] = useState({});
    const [position, setPosition] = useState('center');
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive,
        'displayPosition': setDisplayPosition,
    }
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

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    const renderFooter = (name) => {
        return (
            <>
                <Button label="Print" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </>
        );
    }
    const barcodeBodyTemplate = (rowData) => {

        return <>
            <ComponenToPrintWrapper
                rowData={rowData}
            />
        </>
    }
    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${statusObject[option]} text-center`}>{option}</span>;
    }
    const statusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Status" className="p-column-filter" showClear />;
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${statusObject[rowData.status]} text-center`}>{rowData.status}</span>;
    }
    const visaStatusItemTemplate = (option) => {
        return <span className={`customer-badge status-${visaObject[option]}`}>{option}</span>;
    }
    const visaStatusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={visaStatus} onChange={(e) => options.filterApplyCallback(e.value)} style={{ width: "80px" }} itemTemplate={visaStatusItemTemplate} placeholder="Visa Status" className="p-column-filter" showClear />;
    }
    const visaStatusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${visaObject[rowData.visaStatus]}`}>{rowData.visaStatus}</span>;
    }
    const resultItemTemplate = (option) => {
        return <span className={`customer-badge status-${resultObject[option]}`}>{option}</span>;
    }
    const resultRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={result} style={{ width: "75px" }} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={resultItemTemplate} placeholder="Result" className="p-column-filter" showClear />;
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
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="Date" mask="99/99/9999" />
    }
    const commandItemTemplate = (option) => {
        return <Button label={option} icon="pi pi-arrow-down" onClick={() => onClick('displayResponsive', 'top')} className="p-button-warning" />
    }
    const commandsBodyTemplate = (options, rowData) => {
        return <Dropdown options={commandDropdown} placeholder="Action" onChange={handleCommands} itemTemplate={commandItemTemplate} className="p-column-filter" showClear />;
    }
    const handleCommands = (event) => {
        if (event.target.value === "Show") {

        }
    }
    useEffect(() => {
    }, [sum])
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
                    <DataTable size='small' paginator value={posts} header={header} stripedRows className="p-datatable-customers" rows={8} reorderableColumns
                        dataKey="id" filterDisplay="row" responsiveLayout="scroll" emptyMessage="No data found."
                        globalFilterFields={['status', 'barcodeValue', 'date', 'passportNo', 'name', 'surname', 'visaType', 'telNo', 'visaStatus', 'result', 'commands']}
                        onRowClick={(e) => {
                            setCurrentObject(e.data);
                        }}
                        resizableColumns
                    >
                        <Column field="status" header="#" showFilterMenu={false} filterMenuStyle={{ width: '8%', }}
                            style={{ width: "8%" }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate}
                            className="text-center"
                        />
                        <Column field="barcodeValue" showFilterMenu={false} header="File Code" body={barcodeBodyTemplate} filter filterPlaceholder="Barcode" style={{ width: "12%" }} />
                        <Column header="Date" showFilterMenu={false} filterField="createdAt" dataType="date" style={{ width: "10%" }} body={dateBodyTemplate}
                            filter filterElement={dateFilterTemplate}
                            field="Date"
                        />
                        <Column field="passportNo" showFilterMenu={false} header="Pass.No" filter filterPlaceholder='Pass.No' style={{ width: "16%" }} />
                        <Column field="name" header="Name" showFilterMenu={false} filter filterPlaceholder='Name' style={{ width: "12%" }} />
                        <Column field="surname" header="Surname" showFilterMenu={false} filter filterPlaceholder='Surname' style={{ width: "16%" }} />
                        <Column field="visaType" header="Visa Type" showFilterMenu={false} filter filterPlaceholder='Types' style={{ width: "12%" }} />
                        <Column field="telNo" header="Gsm Tel" showFilterMenu={false} filter filterPlaceholder='Tel No' style={{ width: "12%" }} />
                        <Column field="visaStatus" header="Visa Status" showFilterMenu={false} filterMenuStyle={{ width: '8%' }} body={visaStatusBodyTemplate} filter filterElement={visaStatusRowFilterTemplate} />
                        <Column field="result" header="Result" showFilterMenu={false} filterMenuStyle={{ width: '8%' }} body={resultBodyTemplate} filter filterElement={resultRowFilterTemplate} />
                        <Column field="commands" header="Commands" body={commandsBodyTemplate} style={{ width: "8%" }} />
                    </DataTable>
                    <Dialog header="Application Receipt" visible={displayResponsive} position={position} modal style={{ width: '450px' }} footer={renderFooter('displayResponsive')}
                        onHide={() => { onHide('displayResponsive'); console.log("Heree") }}

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
                                    <td className='text-end'>{currentObject.name}</td>
                                </tr>
                                <tr>
                                    <td>Reference No</td>
                                    <td className='text-end'>{currentObject.barcodeValue}</td>
                                </tr>
                                <tr>
                                    <td>Passport No</td>
                                    <td className='text-end'>{currentObject.passportNo}</td>
                                </tr>
                                <tr>
                                    <td>Visa Type</td>
                                    <td className='text-end'>{currentObject.visaType} </td>
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
                                <tr>
                                    <td>Service</td>
                                    <td>50000</td>
                                    <td>CFA</td>
                                </tr>
                                {
                                    sum && sum.map((element) => {
                                        return <>
                                            <tr>
                                                <td>SIGORTA {element.service}</td>
                                                <td>{element.sum}</td>
                                                <td>CFA</td>
                                            </tr>
                                        </>
                                    })
                                }
                                <tr>
                                    <td>VIZE,Touristic/Businesspers</td>
                                    <td>40000</td>
                                    <td>CFA</td>
                                </tr>
                                <tr>
                                    <td>VIZE,Touristic/Businesspers</td>
                                    <td>0</td>
                                    <td>CFA</td>
                                </tr>
                                <tr>
                                    <td>SAIR TAHSILAT</td>
                                    <td>115000</td>
                                    <td>CFA</td>
                                </tr>
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
                                    <td className='text-end'>115000 CFA</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center">
                            {currentObject?.barcodeValue ? <Barcode value={currentObject.barcodeValue}></Barcode> : null}
                        </div>
                    </Dialog>
                </div>
            </div>

        </>

    )
}

export default PrimeTable