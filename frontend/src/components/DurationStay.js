import React from 'react'
import Select from 'react-select'
function DurationStay({setDuration}) {
    const options = [
        { value: "Companion", label:"Companion (90 days)"},
        { value: "Education", label:"Education (90 days)"},
        { value: "Health", label:"Health (90 days)"},
        { value: "Other", label:"Other (30 days)"},
        { value: "Touristic30", label:"Touristic 30 (30 days)"},
        { value: "Touristic60", label:"Touristic 60 (60 days)"},
        { value: "Touristic90", label:"Touristic 90 (90 days)"},
    ]
  return (
    <Select 
        options={options}
        placeholder="Select Travel Type"
        onChange={(value)=>{
          setDuration(value.label);
        }}
    />
  )
}

export default DurationStay;