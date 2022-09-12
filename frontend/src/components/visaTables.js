import React,{useEffect,useState} from 'react'

function VisaTables({entryType,docType,visaType}) {
    const [isEmpty,setIsEmpty] = useState(false);
    useEffect(()=>{
        if(docType && visaType){
            setIsEmpty(true);
        }
    },[entryType,docType,visaType])
  return (
    <table className="table  table-striped table-sm table-bordered table-responsive">
        <thead>
            <tr>
                <th style={{width:"20%"}}>Visa Name</th>
                <th style={{width:"20%"}}>Trip Name</th>
                <th style={{width:"20%"}}>Single Price</th>
                <th style={{width:"20%"}}>Multi Price</th>
                <th className="d-none d-md-table-cell" style={{width:"20%"}}>Service Fee Price</th>
            </tr>
        </thead>
        <tbody>
            <tr style={{fontSize:"16px"}}>
                <td>{isEmpty?docType:".."}</td>
                <td>{isEmpty?visaType:".."}</td>
                <td>{isEmpty?"40000 CFA":".."}</td>
                <td>{isEmpty?"115000 CFA":".."}</td>
                <td>{isEmpty?"0":".."}</td>
            </tr>
        </tbody>
    </table>
  )
}

export default VisaTables