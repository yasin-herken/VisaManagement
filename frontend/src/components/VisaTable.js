import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectPrice } from '../pages/Features/singleMultiple';
import CurrencyForCountry from "../Variables/currency.js";
function VisaTable({ entryType, treeDoc, visaType = null, country }) {
    const [isEmpty, setIsEmpty] = useState(false);
    const prices = useSelector(selectPrice);
    useEffect(() => {
        if (treeDoc[0] && treeDoc[1] && treeDoc[2]) {
            setIsEmpty(true)
        }
    }, [entryType, treeDoc])
    return (
        <table className="table  table-striped table-sm table-bordered table-responsive">
            <thead>
                <tr>
                    <th style={{ width: "20%" }}>Visa Name</th>
                    <th style={{ width: "20%" }}>Trip Name</th>
                    <th style={{ width: "20%" }}>Single Price</th>
                    <th style={{ width: "20%" }}>Multi Price</th>
                    <th className="d-none d-md-table-cell" style={{ width: "20%" }}>Service Fee Price</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{ fontSize: "16px" }}>
                    <td>{isEmpty ? visaType ? visaType.label : treeDoc[1] : ".."}</td>
                    <td>{isEmpty ? treeDoc[2] : ".."}</td>
                    <td>{isEmpty ? `${prices?.single} ${country ? CurrencyForCountry[country] : null}` : ".."}</td>
                    <td>{isEmpty ? `${prices?.multiple} ${country ? CurrencyForCountry[country] : null}` : ".."}</td>
                    <td>{isEmpty ? "0" : ".."}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default VisaTable