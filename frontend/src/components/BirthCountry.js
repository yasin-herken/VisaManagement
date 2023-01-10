import React,{useState,useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
function BirthCountry({setBCountry}) {
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const changeHandler = value => {
      setValue(value)
      setBCountry(value.value)
    }
  return (
   <div>
       <Select options={options} value={value} onChange={changeHandler} />
   </div>
  )
}

export default BirthCountry;