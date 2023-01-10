import React, { useRef } from 'react'
import { useEffect } from 'react';
import Select from "react-select";
import { Controller } from "react-hook-form";
const SelectComponent = React.forwardRef(({
    options,
    id,
    placeholder,
    control,
    name,
    value,
    setValue,
    labelName
}, ref) => {
    let show = useRef(false);
    useEffect(() => {
        if (control)
            show.current = true
    }, [control])
    return (
        <React.Fragment>
            <label htmlFor={id} className="form-label">{labelName}</label>
            {show.current ?
                <Controller
                    name={name}
                    control={control}
                    defaultValue={value}
                    render={({ field }) => {
                        return <Select
                            ref={ref}
                            options={options}
                            id={id}
                            placeholder={value?.length ? value : placeholder}
                            value={value?.length ? {
                                label: value,
                                value: value,
                            } : null
                            }
                            onChange={(value) => {
                                setValue(value.label);
                                field.onChange(value.label)
                            }}
                        />
                    }
                    }
                />
                :
                <Select
                    ref={ref}
                    options={options}
                    id={id}
                    placeholder={value?.length ? value : placeholder}
                    value={value?.length ? {
                        label: value,
                        value: value,
                    } : null
                    }
                    onChange={(value) => {
                        setValue(value.label)
                    }}
                />
            }


        </React.Fragment>
    )
}
)
export default SelectComponent