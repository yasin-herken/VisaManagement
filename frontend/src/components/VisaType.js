import React from 'react'
import Select from 'react-select'
function VisaType() {
    const options = [
        { value: "IHB", label:"IHB Saglik"},
        { value: "Official", label:"Official Visa"},
        { value: "Other", label:"Other Visas"},
        { value: "Student", label:"Student/Education Visa"},
        { value: "Touristic", label:"Touristic/Businessperson"},
        { value: "Work", label:"Work Visa"}
    ]
  return (
    <Select 
    options={options}
        placeholder="Select Visa Type"
    />
  )
}

export default VisaType;