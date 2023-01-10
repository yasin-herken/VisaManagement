import React, { useRef } from 'react'
import { useEffect } from 'react';
import "./css/input.css";
const Input = React.forwardRef(({
    id,
    labelName,
    placeholder,
    type="text",
    name,
    value,
    setValue,
    register = null
}, ref) => {
    let show = useRef(false);

    useEffect(() => {
        if (register)
            show.current = true
    }, [register])
    return (
        <React.Fragment>
            <label htmlFor={id} className="form-label">{labelName}</label>
            {
                show.current ? <input ref={ref}
                    id={id}
                    className="form-control"
                    name={name}
                    type={type}
                    placeholder={value.length ? value : placeholder}
                    value={value.length ? value : ""}
                    {...register(name, { required: true, minLength: 2 })}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                /> :
                    <input
                        ref={ref}
                        id={id}
                        className="form-control"
                        type={type}
                        placeholder={value.length ? value : placeholder}
                        value={value.length ? value : ""}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
            }
        </React.Fragment>
    )
}
)

export default Input