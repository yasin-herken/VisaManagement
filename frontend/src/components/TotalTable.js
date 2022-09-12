import React, { useEffect ,useState} from 'react'

function TotalTable({sum,entrytype}) {
    const [fee,setFee] = useState(0);
    useEffect(()=>{
        if(entrytype.value==="single")
            setFee(40000)
        else if(entrytype.value==="multiple")
            setFee(115000)
    },[sum,entrytype])
  return (
    <table className="table table-striped">
        <thead>
            <tr>
                <th sytle={{width:"40%"}}></th>
                <th style={{width:"40%"}}></th>
                <th style={{width:"20%",textAlign:"right"}}></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ministry Fee</td>
                <td>:</td>
                <td style={{textAlign:"right"}} >{fee} CFA</td>
            </tr>
            <tr>
                <td>Additinal & Service Fee</td>
                <td>:</td>
                <td style={{textAlign:"right"}}>{sum} CFA</td>
            </tr>
            <tr>
                <td style={{fontWeight:"bold"}} >Total</td>
                <td>:</td>
                <td style={{textAlign:"right",fontWeight:"bold"}}>{sum+fee} CFA</td>
            </tr>
        </tbody>
    </table>
  )
}

export default TotalTable