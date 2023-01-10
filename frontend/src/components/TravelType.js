import React, { useEffect, useState } from 'react'
import Select from 'react-select'
function TravelType({ data, setVisaValue, setTreeDoc, travelType = null }) {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const newData = []
    data.map((element, index) => {
      return newData.push({
        value: element.name,
        label: element.name
      })
    })
    setOptions(newData)
  }, [data])
  useEffect(() => {
    console.log(travelType)
    if (typeof travelType==="object" && travelType) {
      setSelected({
        label: travelType.label,
        value: travelType.value
      })
    }else if(typeof travelType==="string" && travelType){
      setSelected({
        label: travelType,
        value: travelType
      })
    }

    console.log("Travel : ", travelType)
  }, [travelType])
  useEffect(() => {
    console.log(selected);
  }, [selected])
  return (
    <Select
      onChange={(value) => {
        setVisaValue(value)
        setSelected(value);
        setTreeDoc([])
      }}
      value={
        selected
      }
      options={options}
      placeholder={"Select Travel Type"}
    />
  )
}

export default TravelType