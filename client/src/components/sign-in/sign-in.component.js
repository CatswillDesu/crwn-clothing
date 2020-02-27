import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import { signInWithEmailStart, signInWithGoogleStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

function SignIn({ signInWithEmailStart, signInWithGoogleStart, onSignInWaiting }) {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            signInWithEmailStart({email, password});
            setCredentials({password: '', email: ''});
            onSignInWaiting();
        } catch(err) {
            alert(err.message);
            console.error(err);
        }
    }
    
    function handleChange({ target }) {
        const {name, value} = target;

        setCredentials({...userCredentials, [name]: value})
    }

    return (
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span className="sub-title">Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email}
                    label="Email"
                    onChange={handleChange} 
                    required
                />
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password}
                    label="Password"
                    onChange={handleChange} 
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogleStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        signInWithGoogleStart: () => dispatch(signInWithGoogleStart()),
        signInWithEmailStart: passwordAndEmail => dispatch(signInWithEmailStart(passwordAndEmail))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);