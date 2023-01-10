import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectPrice } from '../pages/Features/singleMultiple';
import { CurrencyForCountry } from '../Variables/currency';

function TotalTable({ sum, entrytype, country }) {
    const prices = useSelector(selectPrice);
    const [fee, setFee] = useState(0);
    useEffect(() => {
        if (entrytype?.value === "single")
            setFee(prices?.single ? +prices.single : null)
        else if (entrytype?.value === "multiple")
            setFee(prices?.multiple ? +prices.multiple : null)
    }, [entrytype, prices]);

    return (
        <table className="table table-striped">
            <tbody>
                {
                    fee === 0 ? null :
                        <tr>
                            <td>{entrytype ? entrytype.label + " Type" : "Ministry Fee: "}</td>
                            <td>:</td>
                            <td style={{ textAlign: "right" }} >{fee} {CurrencyForCountry[country]}</td>
                        </tr>
                }
                <tr>
                    <td rowSpan={1}>Additinal & Service Fee</td>
                    <td rowSpan={1}></td>
                    <td rowSpan={1} style={{ textAlign: "right" }}></td>
                </tr>
                {
                    sum && sum.map((service, index) => {
                        return (
                            <tr key={index}>
                                <td>{service.service}</td>
                                <td>:</td>
                                <td style={{ textAlign: "right" }}>{service.sum} {CurrencyForCountry[country]}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td style={{ fontWeight: "bold" }} >Total</td>
                    <td>:</td>
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{sum && sum.reduce((element, a) => {
                        return +element + +a.sum
                    }, fee)} {CurrencyForCountry[country]}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TotalTable