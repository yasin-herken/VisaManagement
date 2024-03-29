import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InsuranceExp({ setInsuranceExp }) {
  const [startDate,setStartDate] = useState(new Date());
  return (
    <DatePicker
      className='form-control'
      selected={new Date(startDate)} onChange={(date) => {
        setStartDate(date);
        setInsuranceExp(date)
      }
      }
    />
  )
}

export default InsuranceExp;