import React , {useEffect, useState} from 'react'
import "./AdditionalPrices.css";
function AdditionalPrices({setSum}) {
    const [optionSelect,setOptionSelect] = useState(false)
    const [optionSelect2,setOptionSelect2] = useState(false)
    const [optionSelect3,setOptionSelect3] = useState(false)
    const [optionSelect4,setOptionSelect4] = useState(false)
    const [optionSelect5,setOptionSelect5] = useState(false)
    const [optionSelect6,setOptionSelect6] = useState(false)
    const [sum,setSummation] = useState(0)
    const prices ={
        "1 MONTH INSURANCE":25000,
        "12 MONTH INSURANCE":90000,
        "3 MONTH INSURANCE":50000,
        "FAST SERVICE":50000,
        "VIP VISA SERVIS FEE":100000,
        "VISA SERVIS FEE":50000
    }
    useEffect(()=>{
        setSum(sum)
    },[optionSelect,optionSelect2,optionSelect3,optionSelect4,optionSelect5,optionSelect6])
  return (
    <table className="table table-striped table-sm table-bordered table-responsive">
        <thead>
            <tr>
                <th style={{width:"10%"}}></th>
                <th style={{width:"50%"}}>Service Name</th>
                <th style={{width:"40%",textAlign:"right"}}>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr className="row1" >
                <td >
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option1" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect===true)
                        {
                            setOptionSelect(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                            setSummation(sum-prices['1 MONTH INSURANCE']);
                        })
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                            setSummation(sum+prices['1 MONTH INSURANCE']);
                            setOptionSelect(true)   
                        }
                        
                    }} />
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>1 MONTH INSURANCE</td>
                <td style={{textAlign:"right"}}>{prices['1 MONTH INSURANCE']} CFA</td>
            </tr>
            <tr className="row2">
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option2" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect2===true)
                        {
                            setOptionSelect2(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                        })
                        setSummation(sum-prices['12 MONTH INSURANCE']);
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                            setOptionSelect2(true)  
                            setSummation(sum+prices['12 MONTH INSURANCE']); 
                        }
                        
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>12 MONTH INSURANCE</td>
                <td style={{textAlign:"right"}}>{prices['12 MONTH INSURANCE']} CFA</td>
            </tr>
            <tr className="row3">
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option3" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect3===true)
                        {
                            setOptionSelect3(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                        })
                            setSummation(sum-prices['3 MONTH INSURANCE']);
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                            setOptionSelect3(true)   
                            setSummation(sum+prices['3 MONTH INSURANCE']);
                        }
                        
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>3 MONTH INSURANCE</td>
                <td style={{textAlign:"right"}}>{prices['3 MONTH INSURANCE']} CFA</td>
            </tr>
            <tr className="row4">
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option4" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect4===true)
                        {
                            setOptionSelect4(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                        })
                        setSummation(sum-prices['FAST SERVICE']);
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                        setSummation(sum+prices['FAST SERVICE']);
                            setOptionSelect4(true)   
                        }
                        
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>FAST SERVICE</td>
                <td style={{textAlign:"right"}}>{prices['FAST SERVICE']} CFA</td>
            </tr>
            <tr className="row5">
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option5" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect5===true)
                        {
                            setOptionSelect5(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                            setSummation(sum-prices['VIP VISA SERVIS FEE']);
                        })
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                            setSummation(sum+prices['VIP VISA SERVIS FEE']);
                            setOptionSelect5(true)   
                        }
                        
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>VIP VISA SERVIS FEE</td>
                <td style={{textAlign:"right"}}>{prices['VIP VISA SERVIS FEE']} CFA</td>
            </tr>
            <tr className="row6">
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="option6" onClick={(event)=>{
                         const letter = event.target.value.slice(-1);
                        const className = "row"+letter;
                        const elements = Array.from(document.getElementsByClassName(className));
                        if(optionSelect6===true)
                        {
                            setOptionSelect6(false);
                            elements.map(element=>{
                            element.style.backgroundColor = "";
                        })
                        setSummation(sum-prices['VISA SERVIS FEE']);
                        }
                        else{
                            elements.map(element=>{
                            element.style.backgroundColor = "#73C2FB";
                        })
                            setOptionSelect6(true)   
                            setSummation(sum+prices['VISA SERVIS FEE']);
                        }
                        
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>VISA SERVIS FEE</td>
                <td style={{textAlign:"right"}}>{prices['VISA SERVIS FEE']} CFA</td>
            </tr>
        </tbody>
    </table>
  )
}

export default AdditionalPrices