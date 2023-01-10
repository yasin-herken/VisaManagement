import React, { useEffect, useState } from 'react'
import Select from 'react-select'
function EntryType({ setEntryType, treeDoc, entryType = null }) {
  const [entryTypes, setEntryTypes] = useState(null);
  const options = [
    { value: "single", label: "Single" },
    { value: "multiple", label: "Multiple" }
  ]
  // useEffect(() => {
  //   if (typeof entryType === "string") {
  //     setEntryTypes({
  //       value: entryType,
  //       label: entryType,
  //     })
  //   } else if (typeof entryType === "object") {
  //     setEntryTypes(entryType)
  //   }
  // }, [entryType])
  useEffect(()=>{
    setEntryTypes(entryType);
  },[entryType])
  return (
    <Select
      onChange={(value) => {
        setEntryType(value)
        setEntryTypes(value);
      }}
      value={entryTypes}
      options={options}
      placeholder="Select Entry Type"
    />
  )
}

export default EntryType;