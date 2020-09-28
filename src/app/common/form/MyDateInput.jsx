import React from 'react';
import DatePicker from 'react-datepicker'
import {FormField, Label} from "semantic-ui-react";
import {useField, useFormikContext} from "formik";
import 'react-datepicker/dist/react-datepicker.css'

const MyDateInput = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext()
    const [field, meta] = useField(props)

    return (
        <FormField error={meta.touched && !!meta.error}>
            {label ? <label htmlFor={meta.name}>{label}</label> : null}
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(value => setFieldValue(field.name, value))}
            />

            {meta.touched && !!meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}

        </FormField>
    );
};

export default MyDateInput;