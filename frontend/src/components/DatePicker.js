import React,{useState} from 'react'
import Datepicker from "react-datepicker";

function DatePicker({setBDate}) {
    const [startDate,setStartDate] = useState(new Date("1980/02/08"))
  return (
        <Datepicker
        selected={startDate}
        className="form-control"
        onChange={(date) => {setStartDate(date)
        setBDate(date)}}
        showYearDropdown
        dateFormatCalendar="MMMM"
        yearDropdownItemNumber={50}
        scrollableYearDropdown
      />
  )
}

export default DatePicker