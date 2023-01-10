import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPost } from '../../Features/postSlice'
import { selectUser } from '../../Features/userSlice'
import CurrencyForCountry, { NameofCountry } from '../../../Variables/currency'
import "../css/deliveryList.css";
import * as moment from "moment";
import { selectPrice } from '../../Features/singleMultiple'
import { Button } from 'primereact/button'
import { useReactToPrint } from 'react-to-print'
const DeliveryList = () => {
    const posts = useSelector(selectPost);
    const [data, setData] = useState([]);
    const user = useSelector(selectUser);
    const price = useSelector(selectPrice);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [date, setDate] = useState(moment(new Date().toISOString()).format("MM/DD/YYYY"));
    const [types, setTypes] = useState({
        single: 0,
        multiple: 0
    })
    useEffect(() => {
        const newPosts = posts.map((item, index) => {
            return { ...item, id: index + 1 }
        }
        )
        setData(newPosts);
    }, [posts])
    useEffect(() => {
        // console.log(moment(date).format( 'DD-MM-YYYY'))
        let items = posts.filter((item) => {
            return moment(new Date(item.createdAt).toISOString()).format('DD/MM/YYYY') === moment(new Date(date).toISOString()).format('DD/MM/YYYY')
        })
        setData(items.map((item, index) => {
            return { ...item, id: index + 1 }
        }
        ))
    }, [date, posts]);
    useEffect(() => {
        let single = 0;
        let multiple = 0;
        data.map((item) => {
            if (item?.passport?.entryType === "Single") {
                single += 1;
            } else if (item?.passport?.entryType === "Multiple") {
                multiple += 1
            }
            return item;
        })
        setTypes({
            single,
            multiple
        })
    }, [data])
    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <div className='card'>
                        <div className="card-header">
                            <div className='d-flex flex-row justify-content-between'>
                                <h5 className="card-title">Consular Delivery Report</h5>
                                <div className='flex-row'>
                                    <Calendar id="basic" value={date} onChange={(e) => setDate(e.value)} dateFormat="mm/dd/yy" style={{marginRight:"10px"}} />
                                    <Button label="Print" icon="pi pi-print" onClick={handlePrint} />
                                </div>
                               
                            </div>
                        </div>
                        <div className='card-body' ref={componentRef}>
                            <div className='mb-3 d-flex flex-row justify-content-between'>
                                <span className='customer-badge'>{`${NameofCountry[user?.country]} ST VISA Firmasından teslim alınan vize başvurularına ilişkin tutanak`}</span>
                                <span>Date: {`${moment(new Date(date).toISOString()).format("MM/DD/YYYY")}`} </span>
                            </div>

                            <DataTable
                                size="small"
                                value={data}
                                className="p-datatable-customers"
                                responsiveLayout='scroll'
                                dataKey='id'
                                emptyMessage="No Data Found."
                                columnResizeMode='expand'
                                style={{ fontSize: "50%" }}
                            >
                                <Column
                                    field="id"
                                    header="No"
                                />
                                <Column
                                    field="barcodeValue"
                                    header="Barcode (Pnr)"

                                />
                                <Column
                                    field='personal.name'
                                    header="Name"
                                />
                                <Column
                                    field='personal.surname'
                                    header="Surname"
                                />
                                <Column
                                    field='passport.passportNo'
                                    header="Passport No"
                                />
                                <Column
                                    field='passport.visaType'
                                    header="Type of Visa"
                                />
                                <Column
                                    field="passport.documentType"
                                    header="Trip Type"
                                />
                                <Column
                                    field="passport.entryType"
                                    header="Entry"
                                />
                                <Column
                                    field='personal.status'
                                    header="Status"
                                />
                                <Column
                                    field="travel.description"
                                    header="Notes"
                                />
                            </DataTable>
                            <div className="card-header">
                                <h5 className="card-title">{`${moment(new Date(date).toISOString()).format("MM/DD/YYYY")} tarihli Harç Ödeme ve Komisyon Bilgisi`}</h5>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column '>
                                        <h6>BÜYÜKELÇİLİK ADINA TESLİM ALAN</h6>
                                        <table style={{ borderCollapse: "collapse", borderSpacing: "0.25em"}}>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        İsim Soyisim:
                                                    </td>
                                                    <td>
                                                        ......................................
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Ünvanı:
                                                    </td>
                                                    <td>
                                                        ......................................
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <h5 className='mb-3'>FİRMA ADINA TESLİM EDİNEN</h5>
                                        <table style={{ borderCollapse: "collapse", borderSpacing: "0.25em"}}>
                                            <thead>
                                                <tr>
                                                    <th ></th>
                                                    <th ></th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        İsim Soyisim:
                                                    </td>
                                                    <td>
                                                        ......................................
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Ünvanı:
                                                    </td>
                                                    <td>
                                                        ......................................
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <h5>Hesap Özeti:</h5>
                                        <table style={{borderCollapse: "collapse",borderSpacing:"0.45em",fontSize:"80%"}} className="table-padding">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>
                                                        Single Entry
                                                    </td>
                                                    <td>{types.single}</td>
                                                    <td style={{ fontWeight: "bold" }}>Single Amount</td>
                                                    <td>{types.single * (price ? price.single : 0)}</td>
                                                    <td>{user?.country ? CurrencyForCountry[user.country] : null}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>
                                                        Multiple Entry
                                                    </td>
                                                    <td>{types.multiple}</td>
                                                    <td style={{ fontWeight: "bold" }}>Multiple Amount</td>
                                                    <td>{types.multiple * (price ? price.multiple : 0)}</td>
                                                    <td>{user?.country ? CurrencyForCountry[user.country] : null}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>
                                                        Total App.
                                                    </td>
                                                    <td>{types.single + types.multiple}</td>
                                                    <td style={{ fontWeight: "bold" }}>Total Amount</td>
                                                    <td>{types.single * (price ? price.single : 0) + types.multiple * (price ? price.multiple : 0)}</td>
                                                    <td>{user?.country ? CurrencyForCountry[user.country] : null}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default DeliveryList