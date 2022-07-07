import React, { useEffect,useState } from 'react'
import Select from 'react-select'
function TravelType({data,setVisaValue,setTreeDoc}) {
    const[options,setOptions] = useState([])
    
    useEffect(()=>{
      const newData = []
      data.map((element,index)=>{
        newData.push({
          value:index,
          label:element.name
        })
      })
      setOptions(newData)
    },[data])
  return (
    <Select 
      onChange={(value)=>{
        setVisaValue(value)
        setTreeDoc([])
        }}
      options={options}
      placeholder="Select Travel Type"
    />
  )
}

export default TravelType