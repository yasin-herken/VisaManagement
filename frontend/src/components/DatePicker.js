import React,{useState} from 'react'
import Datepicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function DatePicker({setBDate}) {
    const [startDate,setStartDate] = useState(new Date())
  return (
        <Datepicker 
            className='form-control'
            selected={startDate} onChange={(date)=>{setStartDate(date)
            setBDate(date)
            }}
        />
  )
}

export default DatePicker