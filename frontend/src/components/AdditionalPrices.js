import React, { useEffect, useState } from 'react'
import "./AdditionalPrices.css";
function AdditionalPrices({ setSum, prices }) {
    const [sum, setSummation] = useState([]);
    const [checked, setChecked] = useState([]);
    const [show,setShow] = useState(false);
    if (prices) {
        if (checked <= prices?.length) {
            prices?.map((price, index) => {
                return setChecked(prevState => [...prevState, false])
            })
        }
    }
    useEffect(()=>{
        if(typeof prices==="object"){
            setShow(true);
        }else{
            setShow(false);
        }
    },[prices])
    useEffect(() => {
        setSum(sum)
    }, [sum,setSum])
    return (
        <table className="table table-sm table-bordered table-responsive striped">
            <thead>
                <tr>
                    <th style={{ width: "10%" }}></th>
                    <th style={{ width: "50%" }}>Service Name</th>
                    <th style={{ width: "40%", textAlign: "right" }}>Price</th>
                </tr>
            </thead>
            <tbody>
                {show ? prices?.map((price, index) => {
                    if (!price) return null
                    return (
                        <tr key={price?.service?.name} style={{backgroundColor:(checked[index]?"#73C2FB":"")}}>
                            <td>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" value={(index + 1).toString()} onClick={(e) => {
                                        if (e.target.checked) {
                                            setSummation([...sum,{
                                                sum: price.service.price,
                                                service: price.service.name
                                            }])
                                            let newArr = [...checked];
                                            newArr[index] = true;
                                            setChecked(newArr);
                                        } else if (!e.target.checked) {
                                            setSummation((sums)=> sums.filter((service)=>{
                                                console.log(service)
                                                return service.service!== price.service.name
                                            }))
                                            let newArr = [...checked];
                                            newArr[index] = false;
                                            setChecked(newArr);
                                        }
                                    }} />
                                    <span className="form-check-label">
                                    </span>
                                </label>
                            </td>
                            <td>{price?.service?.name}</td>
                            <td style={{ textAlign: "right" }}>{price?.service?.price} CFA</td>
                        </tr>)
                }) : null}
            </tbody>
        </table>
    )
}

export default AdditionalPrices