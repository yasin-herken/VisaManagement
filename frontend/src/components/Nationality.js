import React,{useState,useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
function Country({setNationality}) {
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const changeHandler = value => {
      setValue(value)
      setNationality(value.value)
    }
  return (
   <div>
       <Select 
       placeholder="Select Nationality Country"
       options={options} 
       value={value} 
       onChange={changeHandler}
       />
   </div>
  )
}

export default Country;