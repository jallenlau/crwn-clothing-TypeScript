import FormInput from '../form-input/form-input.component';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../store/user/user.action';

import {
    ButtonsContainer,
    SignInContainer,
} from './sign-in-form.styles.jsx'

const defaultSignInFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [signInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
    const { email, password } = signInFormFields;
    const dispatch = useDispatch();
    
    const signInWithGoogle = () => {
        dispatch(googleSignInStart());
    };

    const resetFormFields = () => {
        setSignInFormFields(defaultSignInFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInFormFields({...signInFormFields, [name]: value})     
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong Password!');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this!')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign in</Button>
                    <Button
                        type='button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                    Google sign in
                    </Button>    
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;