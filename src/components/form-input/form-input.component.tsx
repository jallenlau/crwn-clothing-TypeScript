import { InputHTMLAttributes, FC } from 'react';
import {
    FormInputLabel,
    Input,
    Group,
} from './form-input.styles'

type FormInputProps = {
    label: string; 
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps}/> 
            {label && (
                <FormInputLabel shrink={
                    otherProps &&
                    typeof otherProps.value === 'string' &&
                    Boolean(otherProps.value.length)
                }>
                    {label}
                </FormInputLabel>
            )}              
        </Group>
    )
} 

export default FormInput; 