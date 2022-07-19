import React , {useEffect, useState} from 'react'
import "./AdditionalPrices.css";
function AdditionalPrices({setSum,prices}) {
    const [sum,setSummation] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState([])
    useEffect(() =>{
        if(prices){
            if(selectedIndex<=prices.length)
            {
                prices.map((price,index)=>
                setSelectedIndex((prev)=>[...prev,{
                    state: false,
                    index: index
                }]))
            }
            
        }
    },[prices,selectedIndex])
    useEffect(()=>{
        setSum(sum)
    },[sum,setSum])
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
            {prices?prices.map((price,index)=>{
                if(!price) return null
                return (<tr key={price.service.name} style={{ backgroundColor: (selectedIndex[index])&&((index === selectedIndex[index].index) && (selectedIndex[index].state)) ?  '#73C2FB' : 'white'}}>
                <td>
                    <label className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value={"option"+(index+1).toString()} onClick={()=>{
                        if(selectedIndex[index] && selectedIndex[index].state ===false){
                            let newArr = [...selectedIndex];
                            newArr[index] ={
                                index: index,
                                state:true
                            }
                            setSummation(sum+price.service.price)
                            setSelectedIndex(newArr)
                        }else if(selectedIndex[index] && selectedIndex[index].state ===true){
                            let newArr = [...selectedIndex];
                            newArr[index] ={
                                index: index,
                                state:false
                            }
                            setSummation(sum-price.service.price)
                            setSelectedIndex(newArr)
                        }
                    }}/>
                    <span className="form-check-label">
                    </span>
                    </label>
                </td>
                <td>{price.service.name}</td>
                <td style={{textAlign:"right"}}>{price.service.price} CFA</td>
            </tr>)
            }):null}
        </tbody>
    </table>
  )
}

export default AdditionalPrices