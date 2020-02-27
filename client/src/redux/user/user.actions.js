import userActionTypes from './user.types';

export function checkUserSession() {
    return {
        type: userActionTypes.CHECK_USER_SESSION
    }
}

export function signUpStart(userData) {
    return {
        type: userActionTypes.SIGN_UP_START,
        payload: userData
    }
}

export function signUpSuccess(userData) {
    return {
        type: userActionTypes.SIGN_UP_SUCCESS,
        payload: userData
    }
}

export function signUpFailure(error) {
    return {
        type: userActionTypes.SIGN_UP_FAILURE,
        payload: error
    }
}

export function signInWithGoogleStart() {
    return {
        type: userActionTypes.GOOGLE_SIGN_IN_START
    }
}

export function signInWithEmailStart(emailAndPassword) {
    return {
        type: userActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    }
}

export function signInSuccess(user) {
    return {
        type: userActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }
}

export function signInFailure(error) {
    return {
        type: userActionTypes.SIGN_IN_FAILURE,
        payload: error
    }
}

export function signOutStart() {
    return {
        type: userActionTypes.SIGN_OUT_START
    }
}

export function signOutSuccess() {
    return {
        type: userActionTypes.SIGN_OUT_SUCCESS
    }
}

export function signOutFailure(errMessage) {
    return {
        type: userActionTypes.SIGN_OUT_FAILURE,
        payload: errMessage
    }
}

export function updateUserCartStart(user, cart) {
    return {
        type: userActionTypes.UPDATE_USER_CART_START,
        payload: { user, cart }
    }
}

export function updateUserCartSuccess() {
    return {
        type: userActionTypes.UPDATE_USER_CART_SUCCESS
    }
}

export function updateUserCartFailure(error) {
    return {
        type: userActionTypes.UPDATE_USER_CART_FAILURE,
        payload: error
    }
}

export function removeError() {
    return {
        type: userActionTypes.REMOVE_ERROR
    }
}

