import React from 'react'
import Select from 'react-select'
function TravelType() {
    const options = [
        { value: "Alien", label:"Alien's Passport"},
        { value: "Diplomatic", label:"Diplomatic Passport"},
        { value: "Nansen", label:"Nansen Passport"},
        { value: "Ordinary", label:"Ordinary Passport"},
        { value: "Other", label:"Other Passport"},
        { value: "Refugee", label:"Refugee Travel Document"},
        { value: "Service", label:"Service Passport"},
        { value: "Special", label:"Special Passport"}
    ]
  return (
    <Select 
    options={options}
        placeholder="Select Travel Type"
    />
  )
}

export default TravelType