import React from 'react'
import Select from 'react-select'
function DocumentType() {
    const options = [
        { value: "IHB", label:"IHB Saglik"}
    ]
  return (
    <Select 
    options={options}
        placeholder="Select Document Type"
    />
  )
}

export default DocumentType;