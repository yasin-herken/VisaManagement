import React,{useState} from 'react'
import Datepicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function DatePicker() {
    const [startDate,setStartDate] = useState(new Date())
    console.log(startDate)
  return (
        <Datepicker 
            className='form-control'
            selected={startDate} onChange={(date)=>setStartDate(date)}
        />
  )
}

export default DatePicker