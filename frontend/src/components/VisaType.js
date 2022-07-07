import React, { useEffect,useState } from 'react'
import Select from 'react-select'
function VisaType({visaValue,data,setDocumentValue}) {
    const [options,setOptions] = useState([]);
    const [selected,setSelected] =useState();
    useEffect(()=>{
      const newData = [
      ]
      data.map(async(element,index)=>{
        let i = 0;
        if(visaValue && element.name ===visaValue.label)
        {
          await element.visaTypes.map((element2,index2)=>{
            newData.push({
              value:i,
              label:element2.name
            })
            i++;
          })
        }
        setOptions(newData)
        setSelected(null)
      })
    },[visaValue,data])
    useEffect(()=>
    {
      
    },[selected])
  return (
    <Select 
      onChange={(value)=>{
        setSelected(value)
        setDocumentValue({value,visaValue})
      }}
      value={selected}
      options={options}
      placeholder="Select Visa Type"
    />
  )
}

export default VisaType;