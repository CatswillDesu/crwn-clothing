import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

function SignUp({ signUpStart, onSignUpWaiting }) {

    const [ userCredentials, setCredentials ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials;

    async function handleSignUp() {
        if (password !== confirmPassword) {
            alert("Passwords don't match!")
            return;
        }

        signUpStart({ displayName, email, password });

        setCredentials({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '' 
        })

        onSignUpWaiting();
    }

    function handleChange({ target }) {
        const { name, value } = target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return(
        <div className="sign-up">
            <h2 className="title">A do not have an account yet</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form">
                <FormInput 
                    type="text"
                    onChange={handleChange} 
                    label="Display Name"
                    name="displayName"
                    value={displayName} 
                    required 
                />
                <FormInput 
                    type="email"
                    onChange={handleChange} 
                    label="Email"
                    name="email"
                    value={email} 
                    required 
                />
                <FormInput 
                    type="password"
                    onChange={handleChange} 
                    label="Password"
                    name="password"
                    value={password} 
                    required 
                />
                <FormInput 
                    type="password"
                    onChange={handleChange} 
                    label="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword} 
                    required 
                />
                <CustomButton type="button" onClick={handleSignUp}>SignUp</CustomButton>
            </form>
        </div>
        
    )
}

function mapDispatchToProps(dispatch) {
    return {
        signUpStart: userData => dispatch(signUpStart(userData))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);