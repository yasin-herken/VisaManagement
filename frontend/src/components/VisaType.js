import React, { useEffect, useState } from 'react'
import Select from 'react-select'
function VisaType({ visaValue, data, setDocumentValue, visaType = null }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const newData = [
    ]
    data.map(async (element, index) => {
      if (visaValue && element.name === visaValue.label) {
        await element.visaTypes.map((element2, index2) => {
          newData.push({
            value: element2.name,
            label: element2.name
          })
          return "";
        })
      }
      setOptions(newData)
    })
  }, [visaValue, data]);
  return (
    <Select
      onChange={(value) => {
        setSelected({
          label: value.label,
          value: value.value
        })
        setDocumentValue({ value, visaValue })
      }}
      value={selected}
      options={options}
      placeholder={visaType ? selected?.label?selected.label: typeof visaType==="string"?visaType:visaType.label : "Select Visa Type"}
    />
  )
}

export default VisaType;