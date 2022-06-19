import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { emailSignUpStart } from '../../store/user/user.action'

import { SignUpContainer } from './sign-up-form.styles.jsx'
import { useDispatch } from "react-redux";

const SignUpForm = () => {
    const defaultFormfields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formFields, setFormFields] = useState(defaultFormfields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormfields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password do not matc!h');
            return;
        }
        
        try {
            dispatch(emailSignUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('your email was already in use!');               
            } else {
                console.log(error);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                    label='Name'
                    type='text'
                    value={displayName}
                    name='displayName'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Email'
                    type='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Password'
                    type='password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    required
                />
                <Button type='submit'>Sign up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;