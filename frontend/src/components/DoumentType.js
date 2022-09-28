import React, { useEffect, useState } from 'react'
import Select from 'react-select'
function DocumentType({ documentValue, data, setTreeDoc }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const [senddata, setsenddata] = useState();
  useEffect(() => {
    const newData = [
    ]
    const sendData = []
    data.map(async (element, index) => {
      if (documentValue && documentValue.visaValue && element.name === documentValue.visaValue.label) {
        sendData.push(element.name)
        await element.visaTypes.map(async (element2, index2) => {
          if (element2.name === documentValue.value.label) {
            sendData.push(element2.name)
            let i = 0;
            await element2.documentTypes.map(async (element3, index3) => {
              newData.push({
                value: i,
                label: element3.name
              })
              i++;
              setsenddata(sendData)
            })
          }
        })
      }
    })
    setOptions(newData)
    setSelected(null)
  }, [documentValue, data])
  return (
    <Select
      onChange={(value) => {
        setSelected(value)
        setTreeDoc([...senddata, value.label])
      }}
      value={selected}
      options={options}
      placeholder="Select Document Type"
    />
  )
}

export default DocumentType;