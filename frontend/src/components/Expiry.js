import React,{useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function Expiry() {
    const [startDate,setStartDate] = useState(new Date())
    console.log(startDate)
  return (
        <DatePicker 
            className='form-control'
            selected={startDate} onChange={(date)=>setStartDate(date)}
        />
  )
}

export default Expiry