import React from 'react'
import ReactDatePicker from 'react-datepicker'

const DatePickerComponent = ({ labelName, id, value, setValue, ...props }) => {
    return (
        <React.Fragment>
            <label htmlFor={id} className="form-label">{labelName}</label>
            <ReactDatePicker
                selected={value !== "" ? new Date(value) : new Date("1980/02/08")}
                className="form-control"
                onChange={(date) => setValue(date)}
                {...props}
            />
        </React.Fragment>
    )
}

export default DatePickerComponent