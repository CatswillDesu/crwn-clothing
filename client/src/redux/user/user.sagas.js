import { takeLatest, put, all } from 'redux-saga/effects';

import { createUserProfileDocument, updateUserDocumentWithNewCart, auth, googleProvider, getCurrentUser } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, updateUserCartFailure, updateUserCartSuccess } from './user.actions';
import userActionTypes from './user.types';

function* isUserAuthorized() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield updateCurrentUserWithAuth(userAuth);
    } catch (err) {
        yield put(signInFailure(err.message));
    }
}

function* userSessionCheckWatch() {
    yield takeLatest(
        userActionTypes.CHECK_USER_SESSION,
        isUserAuthorized
    )
}

function* signUp({ payload: { email, password, displayName, cart } }) {
    try {
        const { user: userAuth } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ userAuth, additionalData: { displayName, cart } }));
    } catch(err) {
        yield put(signUpFailure(err.message))
    }
}

function* signInAfterSignUp({ payload: { userAuth, additionalData } }) {
    yield updateCurrentUserWithAuth(userAuth, additionalData);
}

function* signUpStartWatch() {
    yield takeLatest(
        userActionTypes.SIGN_UP_START,
        signUp
    )
}

function* signUpSuccessWatch() {
    yield takeLatest(
        userActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

function* updateCurrentUserWithAuth(userAuth, additionalData) {
    const userRef = yield createUserProfileDocument(userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({
        id: userAuth.uid,
        ...userSnapshot.data()
    }))
}

function* signInWithGoogle() {
    try {
        const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
        yield updateCurrentUserWithAuth(userAuth, );
    } catch(err) {
        yield put(signInFailure(err.message))
    }
}

function* googleSignInWatch() {
    yield takeLatest(
        userActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user: userAuth } = yield auth.signInWithEmailAndPassword(email, password);
        yield updateCurrentUserWithAuth(userAuth);
    } catch (err) {
        yield put(signInFailure(err.message));
    }
}

function* emailSignInWatch() {
    yield takeLatest(
        userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (err) {
        yield put(signOutFailure(err.message))
    }
}

function* signOutWatch() {
    yield takeLatest(
        userActionTypes.SIGN_OUT_START,
        signOut
    )
}

export function* updateUserCartWatch() {
    yield takeLatest(
        userActionTypes.UPDATE_USER_CART_START,
        updateUserCart
    )
}

export function* updateUserCart({ payload: { user, cart } }) {
    try {
        yield updateUserDocumentWithNewCart(user, cart);
        yield put(updateUserCartSuccess());
    } catch (error) {
        yield put(updateUserCartFailure(error.message));
        console.info(error.message);
    }
}

export default function* userRootSaga() {
    yield all([
        signUpStartWatch(),
        signUpSuccessWatch(),
        googleSignInWatch(),
        emailSignInWatch(),
        userSessionCheckWatch(),
        signOutWatch(),
        updateUserCartWatch()
    ])
}