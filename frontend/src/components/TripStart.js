import React,{useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function TripStart({setTripStart}) {
    const [startDate,setStartDate] = useState(new Date())
  return (
        <DatePicker 
            className='form-control'
            selected={startDate} onChange={(date)=>{setStartDate(date)
            setTripStart(date)}}
        />
  )
}

export default TripStart;