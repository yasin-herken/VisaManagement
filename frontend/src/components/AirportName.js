import React from 'react'
import Select from 'react-select'
function AirportName() {
    const options = [
        { value: "ISTANBUL", label:"ISTANBUL AIRPORT"},
    ]
  return (
    <Select 
    options={options}
        placeholder="Select Travel Type"
    />
  )
}

export default AirportName;