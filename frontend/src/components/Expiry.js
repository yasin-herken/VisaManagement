import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const days = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}
function Expiry({ setPExpiry,setErrorInsuranceExp }) {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker
      className='form-control'
      selected={new Date(startDate)} onChange={(date) => {
        if (days(date, new Date()) > 90) {
          setPExpiry(date);
          setStartDate(date)
          setErrorInsuranceExp(false);
        }
        else{
          setPExpiry(date);
          setStartDate(date);
          setErrorInsuranceExp(true);
        }
          
      }}
    />
  )
}

export default Expiry;