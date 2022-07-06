import React, { useEffect } from 'react'
import Select from 'react-select'
function EntryType({setEntryType,treeDoc}) {
    const options = [
        { value: "single", label:"Single"},
        { value: "multiple", label: "Multiple"}
    ]
    useEffect(()=>{
      console.log(treeDoc)
    },[treeDoc])
  return (
    <Select 
    onChange={(value)=>{
      setEntryType(value.value)
    }}
        options={options}
        placeholder="Select Entry Type"
    />
  )
}

export default EntryType;