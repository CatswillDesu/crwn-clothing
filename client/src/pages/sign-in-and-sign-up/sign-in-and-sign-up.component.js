import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { removeError } from '../../redux/user/user.actions';
import { selectUserError } from '../../redux/user/user.selectors';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './sign-in-and-sign-up.styles.scss'
const SignInWithSpinner = WithSpinner(SignIn);
const SignUpWithSpinner = WithSpinner(SignUp);

function SignInAndSignUp({ authError, removeError }) {
    const [ isLoading, setLoadingStatus ] = useState(false)

    useEffect(() => {
        return function() {
            setLoadingStatus(false)
        }
    }, [])

    function onAuthLoading() {
        setLoadingStatus(true);
    }

    if (authError) {
        alert(authError);
        setLoadingStatus(false);
        removeError();
    };

    return(
        <div className="sign-in-and-sign-up">
            <SignInWithSpinner isLoading={isLoading} onSignInWaiting={onAuthLoading} />
            <SignUpWithSpinner isLoading={isLoading} onSignUpWaiting={onAuthLoading} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        authError: selectUserError(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeError: () => dispatch(removeError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInAndSignUp);