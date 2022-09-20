import React, { useState } from 'react'
import Select from 'react-select'
function AirportName({setAirport}) {
  const [selected,setSelected] = useState("");
  const options = [
    { value: "ISTANBUL", label: "ISTANBUL AIRPORT" },
  ]
  return (
    <Select
      value={selected}
      options={options}
      placeholder="Select Travel Type"
      onChange={(value)=>{
        setAirport(value.label);
        setSelected(value);
      }}
    />
  )
}

export default AirportName;