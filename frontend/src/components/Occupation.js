import React from 'react'
import Select from 'react-select'
function Occupation() {
    const options = [
        { value: 'Agriculture', label: 'Agriculture' },
        { value: 'Armed/Security_Force', label: 'Armed/Security Force' },
        { value: 'Artist/Performer', label: 'Artist/Performer' },
        { value: 'Business', label: 'Business'},
        { value: 'Caregiver_and_BabySitter', label: 'Caregiver and BabySitter'},
        { value: 'Construction', label: 'Construction'},
        { value: 'Culinary/Cookery', label: 'Culinary/Cookery'},
        { value: 'Driver/Lorry', label: 'Driver/Lorry'},
        { value: 'Education_and_Training', label: 'Education and Training'},
        { value: 'Engineer', label: 'Engineer'},
        { value: 'Finance_and_Banking', label: 'Finance and Banking'},
        { value: 'Government', label: 'Government'},
        { value: 'Health/Medical', label: 'Health/Medical'},
        { value: 'Information_Technologies', label: 'Information Technologies'},
        { value: 'Legal_Proffessional', label: 'Legal Proffessional'},
        { value: 'Other', label: 'Other'},
        { value: 'Press/Media', label: 'Press/Media'},
        { value: 'Professional_Functionary', label: 'Professional_Functionary'},
        { value: 'Religious_Functionary', label: 'Religious_Functionary'},
        { value: 'Researcher/Scientist', label: 'Researcher/Scientist'},
        { value: 'Retired', label: 'Retired'},
        { value: 'Seafarer', label: 'Seafarer'},
        { value: 'Self-Employed', label: 'Self-Employed'},
        { value: 'Service_Sector', label: 'Service_Sector'},
        { value: 'Student/Trainee', label: 'Student/Trainee'},
        { value: 'Tourism', label: 'Tourism'},
        { value: 'Unemployed', label: 'Unemployed'},

        
      ]
  return (
    <Select
    placeholder="Select Job.." 
    options={options}

    />
  )
}

export default Occupation