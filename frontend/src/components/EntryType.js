import React from 'react'
import Select from 'react-select'
function EntryType() {
    const options = [
        { value: "single", label:"Single"},
        { value: "multiple", label: "Multiple"}
    ]
  return (
    <Select 
        options={options}
        placeholder="Select Entry Type"
    />
  )
}

export default EntryType;