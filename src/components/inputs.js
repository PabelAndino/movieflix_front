import React from 'react';
import {useField,ErrorMessage, Field} from "formik";
import Select from "react-select";

export const TextField = ({label,...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className={`form-group ${props.inputsize}`}>
            <label htmlFor={field.name}>{label}</label>

            {
                props.type === 'textarea' ? <textarea rows={4} className={`form-control ${meta.touched && meta.error && 'is-invalid'}` } autoComplete={"off"}
                                                     {...field}{...props}/>  : <input className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} autoComplete={"off"}{...field}{...props} />
            }




            <ErrorMessage component={"div"}  className="invalid-feedback animated fadeInUp"
                          style={{display: "block"}} name={field.name}/>
        </div>
    );
};

export const SelectFormik2 = ({label,onBlur,...props}) =>{
    const [field, meta] = useField(props)

    return(
        <div className={`form-group ${props.inputsize} ${meta.touched && meta.error && 'is-invalid'}`}>
            <label>{label}</label>
            <Select
                onBlur ={onBlur}
                defaultValue={props.value}
                onChange={props.onChange}
                options={props.options}
                name={field.name}
            />
            <ErrorMessage component={"div"}  className="invalid-feedback animated fadeInUp"
                          style={{display: "block"}} name={field.name}/>
        </div>

    )
}

export const SelectFormik = ({label,selectLabel,...props}) =>{
    const [field, meta] = useField(props)
    return(
        <div className={`form-group ${props.inputsize} ${meta.touched && meta.error && 'is-invalid'}`}>
            <label>{label}</label>
            <Field
                component={'select'}
                className={'form-control default-select form-control-lg'}
                value={props.value}
                onChange={field.onChange}
                name={field.name}

            >
                <option value={''}>{`Select a ${selectLabel}`}</option>
                {
                    (props.options).map((i)=>
                        <option key={i.value} disabled={i.isDisabled} value={i.value} >{i.label}</option>
                    )
                }
            </Field>

            <ErrorMessage component={"div"}  className="invalid-feedback animated fadeInUp"
                          style={{display: "block"}} name={field.name}/>
        </div>
    )
}


