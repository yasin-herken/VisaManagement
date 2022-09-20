import React, { useEffect, useState } from 'react'

function TotalTable({ sum, entrytype}) {
    const [fee, setFee] = useState(0);
    useEffect(() => {
        if (entrytype?.value === "single")
            setFee(40000)
        else if (entrytype?.value === "multiple")
            setFee(115000)
    }, [entrytype]);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th sytle={{ width: "40%" }}></th>
                    <th style={{ width: "40%" }}></th>
                    <th style={{ width: "20%", textAlign: "right" }}></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{entrytype?entrytype.label+" Type":"Ministry Fee: "}</td>
                    <td>:</td>
                    <td style={{ textAlign: "right" }} >{fee} CFA</td>
                </tr>
                <tr>
                    <td rowSpan={1}>Additinal & Service Fee</td>
                    <td rowSpan={1}>:</td>
                    <td rowSpan={1} style={{ textAlign: "right" }}>CFA</td>
                </tr>
                {
                    sum && sum.map((service,index)=>{
                        return (
                            <tr key={index}>
                                <td>{service.service}</td>
                                <td></td>
                                <td style={{ textAlign: "right" }}>{service.sum} CFA</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td style={{ fontWeight: "bold" }} >Total</td>
                    <td>:</td>
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{sum && sum.reduce((element, a) => {
                        return element + a.sum
                    }, fee)} CFA</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TotalTable